import { test, expect } from '@playwright/test';
// Selected only by evidence:ui through the existing Playwright configuration.
// For a stateful UI, replace navigation with the relevant deterministic setup.
test('capture requested UI state', async ({ page }, testInfo) => {
  const response = await page.goto(process.env.PORTFOLIO_EVIDENCE_ROUTE!);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const screenshot = testInfo.outputPath('ui-state.png');
  await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', caret: 'hide' });
  await testInfo.attach('ui-state', { path: screenshot, contentType: 'image/png' });
});
