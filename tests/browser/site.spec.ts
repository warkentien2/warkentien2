import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const locale of ['en', 'pt-BR']) {
  for (const section of ['', 'about/', 'work/', 'journal/']) {
    test(`${locale}/${section} loads directly, fits the viewport, and passes axe`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(`/2026/${locale}/${section}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}
test('keyboard skip link moves focus to content and locale navigation works', { tag: '@journey' }, async ({ page }) => {
  await page.goto('/2026/en/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.getByRole('link', { name: 'Português', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engenharia');
});
test('legacy React page renders its lazy creature and assets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Philip');
  await expect(page.locator('.tarantula').first()).toBeAttached();
  expect(await page.locator('img').first().evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(errors).toEqual([]);
});
test('original projects path loads styles and all 27 banners remain available', async ({ page, request }) => {
  await page.goto('/projects/');
  await expect(page.locator('h1')).toContainText('Philip');
  for (let index = 1; index <= 27; index++) {
    expect((await request.get(`/projects/banners/300x250_v${index}/`)).status()).toBe(200);
  }
  expect((await request.get('/projects/styles.css')).status()).toBe(200);
});
test('missing URLs return 404', async ({ page }) => {
  for (const url of ['/missing-page/', '/2026/missing-page/', '/en/']) {
    expect((await page.goto(url))?.status()).toBe(404);
  }
});

test('language chooser is accessible and content works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/2026/');
  const portuguesePrompt = page.getByRole('heading', { level: 1 }).getByText('Escolha seu idioma', { exact: true });
  expect(await portuguesePrompt.evaluate((element) => element.closest('[lang]')?.getAttribute('lang'))).toBe('pt-BR');
  await expect(page.getByRole('link', { name: 'English', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('UI engineering');
  await page.getByRole('navigation', { name: 'Home', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/2026\/en\/about\//);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About');
  await context.close();
});
test('language chooser passes axe', async ({ page }) => {
  await page.goto('/2026/');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});

test('modern links and assets stay under /2026 and footer returns to original URLs', { tag: '@journey' }, async ({ page, baseURL }, testInfo) => {
  const badResponses: string[] = [];
  page.on('response', (response) => {
    if (response.url().startsWith(`${baseURL}/`) && response.status() >= 400) badResponses.push(response.url());
  });
  await test.step('Open and refresh the localized work page', async () => {
    await page.goto('/2026/en/work/');
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Work');
  });
  await page.getByRole('link', { name: 'Português', exact: true }).click();
  await expect(page).toHaveURL(/\/2026\/pt-BR\//);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') {
    await testInfo.attach('Portuguese home after switching locale', { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  }
  await expect(page.locator('footer a').nth(0)).toHaveAttribute('href', '/');
  await expect(page.locator('footer a').nth(1)).toHaveAttribute('href', '/projects/');
  await page.locator('footer a').nth(1).click();
  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.locator('h1')).toContainText('Philip');
  if (process.env.PORTFOLIO_EVIDENCE_MODE === 'ux') {
    await testInfo.attach('Original projects reached from the footer', { body: await page.screenshot({ animations: 'disabled' }), contentType: 'image/png' });
  }
  await page.goto('/2026/en/');
  await page.getByRole('link', { name: '2019 portfolio', exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/`);
  await expect(page.locator('.tarantula').first()).toBeAttached();
  expect(badResponses).toEqual([]);
});
