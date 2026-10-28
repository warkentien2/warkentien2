import { test, expect } from '@playwright/test';
import rules from '../fixtures/preview-filter-rules.json';

test('motion studies render and replay with known EasyList rules active', { tag: '@journey' }, async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const failures: string[] = [];
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => {
    if (new URL(request.url()).pathname.startsWith('/projects/studies/')) failures.push(request.url());
  });
  // Apply the identified network and cosmetic rules, including inside every iframe.
  // This is a deterministic regression for these rules, not an entire extension.
  await page.route('**/*', route => {
    if (rules.networkSubstrings.some(pattern => route.request().url().includes(pattern))) return route.abort('blockedbyclient');
    return route.continue();
  });
  await page.addInitScript(selectors => {
    document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style');
      style.textContent = `${selectors.join(',')} { display: none !important; }`;
      document.head.appendChild(style);
    });
  }, rules.hiddenSelectors);
  await page.goto('/projects/');
  await expect(page.getByText(/disable.*ad.?block/i)).toHaveCount(0);

  await test.step('Verify filtering stays enabled', async () => {
    expect(await page.evaluate(async () => {
      try { await fetch('/projects/banners/300x250_v1/'); return true; }
      catch { return false; }
    })).toBe(false);
    await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.id = 'content-ad';
      probe.textContent = 'Cosmetic filter probe';
      document.body.appendChild(probe);
    });
    await expect(page.locator('#content-ad')).toBeHidden();
    await page.locator('#content-ad').evaluate(element => element.remove());
  });

  await test.step('Load all 27 animation previews and their local artwork', async () => {
    await expect(page.locator('.motion-study iframe[src]')).toHaveCount(27);
    for (let index = 1; index <= 27; index++) {
      const frame = page.frameLocator(`iframe[title="Motion study ${index}"]`);
      const canvas = frame.locator('body > div').first();
      await expect(canvas).toBeVisible();
      await expect.poll(() => canvas.evaluate(element => Number(getComputedStyle(element).opacity))).toBe(1);
      const artwork = frame.locator('#study-artwork, #study_artwork, #study_container');
      if (await artwork.count()) await expect(artwork.first()).toBeVisible();
      await expect.poll(() => frame.locator('img').evaluateAll(images =>
        images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
      )).toBe(true);
    }
    if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') {
      await testInfo.attach('All studies loaded while filtering remains active', {
        body: await page.screenshot({ fullPage: true, animations: 'disabled' }), contentType: 'image/png',
      });
    }
  });

  await test.step('Replay a study using the keyboard and refresh a direct preview', async () => {
    const replay = page.getByRole('button', { name: 'Replay motion study 1', exact: true });
    await replay.focus();
    await expect(replay).toBeFocused();
    const reloaded = page.waitForEvent('framenavigated', frame => /\/projects\/studies\/1\/$/.test(frame.url()));
    await replay.press('Enter');
    await reloaded;
    await expect(page.frameLocator('iframe[title="Motion study 1"]').locator('body > div').first()).toBeVisible();
    if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') {
      await testInfo.attach('Keyboard replay with visible focus', {
        body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png',
      });
    }
    await page.goto('/projects/studies/1/');
    await page.reload();
    await expect(page.locator('#study-artwork')).toBeVisible();
  });
  expect(failures).toEqual([]);
  expect(errors).toEqual([]);
});
