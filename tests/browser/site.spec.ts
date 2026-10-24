import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const locale of ['en', 'pt-BR']) {
  for (const section of ['', 'about/', 'work/', 'journal/']) {
    test(`${locale}/${section} loads directly, fits the viewport, and passes axe`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const response = await page.goto(`/${locale}/${section}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}
test('keyboard skip link moves focus to content and locale navigation works', async ({ page }) => {
  await page.goto('/en/');
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
  await page.goto('/legacy/');
  await expect(page.locator('h1')).toContainText('Philip');
  await expect(page.locator('.tarantula').first()).toBeAttached();
  expect(await page.locator('img').first().evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(errors).toEqual([]);
});
test('both projects paths load styles and all 27 banners remain available', async ({ page, request }) => {
  for (const base of ['/projects/', '/legacy/projects/']) {
    await page.goto(base);
    await expect(page.locator('h1')).toContainText('Philip');
    for (let index = 1; index <= 27; index++) {
      expect((await request.get(`${base}banners/300x250_v${index}/`)).status()).toBe(200);
    }
    expect((await request.get(`${base}styles.css`)).status()).toBe(200);
  }
});
test('missing URLs return 404', async ({ page }) => {
  expect((await page.goto('/missing-page/'))?.status()).toBe(404);
});

test('language chooser is accessible and content works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'English', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('UI engineering');
  await page.getByRole('navigation', { name: 'Home', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/about\//);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About');
  await context.close();
});
test('language chooser passes axe', async ({ page }) => {
  await page.goto('/');
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
});
