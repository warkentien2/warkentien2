import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 390, 768, 1440, 1920]) {
  test(`compact portfolio directly loads, refreshes and passes axe at ${width}px`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 900 });
    const failures: string[] = [];
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    page.on('request', request => expect(request.url().startsWith(`${baseURL}/`)).toBe(true));
    expect((await page.goto('/me/'))?.status()).toBe(200);
    expect((await page.reload())?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveTitle('Philip Warkentien II — Staff UI Engineer');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bridging Design& Engineering.');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://warkentien2.com/me/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const image = page.getByRole('img', { name: /Pablo Stanley at Awwwards/ });
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    for (const [name, href] of [
      ['GitHub /warkentien2', 'https://github.com/warkentien2'],
      ['CodePen /warkentien2', 'https://codepen.io/warkentien2/'],
      ['LinkedIn', 'https://www.linkedin.com/in/warkentien2/'],
      ['DeviantArt', 'https://www.deviantart.com/warkentien2/'],
      ['Animation archive', 'https://warkentien2.com/projects/'],
    ]) await expect(page.getByRole('navigation', { name: 'Connect and explore' }).getByRole('link', { name: new RegExp(name) })).toHaveAttribute('href', href);
    expect(failures).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('compact portfolio story: keyboard navigation and synchronized chart columns', { tag: '@journey' }, async ({ page }, testInfo) => {
  const mobile = testInfo.project.name === 'mobile';
  const width = mobile ? 390 : 1440;
  await page.setViewportSize({ width, height: mobile ? 844 : 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/me/');
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  if (mobile) {
    const summary = page.locator('.mobile-menu summary');
    await summary.focus();
    await summary.press('Enter');
    await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') await testInfo.attach('Mobile navigation at 390px', { body: await page.screenshot(), contentType: 'image/png' });
    await page.keyboard.press('Escape');
    await expect(summary).toBeFocused();
    await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
    await summary.press('Enter');
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: '02 / Philosophy' }).click();
    await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '');
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: '02 / Philosophy' }).click();
  }
  await expect(page).toHaveURL(/#philosophy$/);
  expect(await page.locator('#philosophy').evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(64);
  const chart = page.locator('[data-chart-scroll]');
  const table = page.locator('[data-table-scroll]');
  await chart.focus();
  await chart.press('ArrowRight');
  await expect.poll(() => chart.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await expect.poll(async () => Math.abs(await chart.evaluate(e => e.scrollLeft) - await table.evaluate(e => e.scrollLeft))).toBeLessThanOrEqual(1);
  await table.evaluate(element => { element.scrollLeft = element.scrollWidth; });
  await expect.poll(async () => Math.abs(await chart.evaluate(e => e.scrollLeft) - await table.evaluate(e => e.scrollLeft))).toBeLessThanOrEqual(1);
  await table.focus();
  const previous = await table.evaluate(e => e.scrollLeft);
  await table.press('ArrowLeft');
  await expect.poll(() => table.evaluate(e => e.scrollLeft)).toBeLessThan(previous);
  if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') await testInfo.attach(`Synchronized chart and table at ${width}px`, { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  await page.getByRole('img', { name: /Pablo Stanley at Awwwards/ }).scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.comparison img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await page.evaluate(() => {
    document.querySelectorAll('[data-chart-scroll], [data-table-scroll]').forEach(element => { element.scrollLeft = 0; });
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
  if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') await testInfo.attach(`Final compact portfolio at ${width}px`, { body: await page.screenshot({ fullPage: true, animations: 'disabled' }), contentType: 'image/png' });
  await expect(page.getByRole('link', { name: /Article & technical breakdown.*Curious Geckos/ })).toHaveAttribute('href', 'https://dev.to/warkentien2/curious-geckos-the-most-precise-css-only-position-aware-mini-game-16i2');
  await expect(page.getByRole('link', { name: /Article & technical breakdown.*Desert Racer/ })).toHaveAttribute('href', 'https://dev.to/warkentien2/desert-racer-worlds-first-css-only-swipe-aware-game-4j0h');
});

test('compact portfolio remains readable with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto('/me/');
    await expect(page.getByRole('heading', { name: 'Impossible CSS', exact: true })).toBeVisible();
    await page.locator('.mobile-menu summary').click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: '05 / Contact' }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByRole('link', { name: /philip@warkentien2.com/ }).first()).toHaveAttribute('href', 'mailto:philip@warkentien2.com');
    expect(await page.locator('table tbody tr').count()).toBe(3);
  } finally { await context.close(); }
});
