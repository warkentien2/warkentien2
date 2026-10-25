import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { browserAddress, browserProjects } from './scripts/browser-settings.mjs';
const { baseURL } = browserAddress();
const evidenceDir = process.env.PORTFOLIO_EVIDENCE_DIR;
const captureUI = process.env.PORTFOLIO_EVIDENCE_MODE === 'ui';
export default defineConfig({
  testDir: './tests/browser',
  forbidOnly: Boolean(process.env.CI),
  testMatch: captureUI ? '**/*.evidence.ts' : '**/*.spec.ts',
  outputDir: evidenceDir ? path.join(evidenceDir, 'test-results') : 'test-results',
  reporter: evidenceDir ? [
    ['list'],
    ['html', { open: 'never', outputFolder: path.join(evidenceDir, 'playwright-report') }],
    ['json', { outputFile: path.join(evidenceDir, 'results.json') }],
  ] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: evidenceDir ? 'on' : 'retain-on-failure',
    video: process.env.PORTFOLIO_EVIDENCE_MODE === 'ux' ? 'on' : 'off',
    screenshot: 'only-on-failure',
    ...(captureUI ? { reducedMotion: 'reduce', locale: 'en-US', timezoneId: 'UTC', colorScheme: 'dark' } : {}),
  },
  // Never silently test another worktree's server. Reuse requires an explicit choice.
  webServer: { command: 'npm run preview', url: baseURL, reuseExistingServer: !process.env.CI && process.env.PORTFOLIO_REUSE_SERVER === '1' },
  projects: browserProjects.map((project) => ({
    ...project,
    use: { ...project.use, ...(process.env.PORTFOLIO_EVIDENCE_MODE === 'ux' ? { video: { mode: 'on', size: project.use.viewport } } : {}) },
  })),
});
