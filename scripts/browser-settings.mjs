// Shared by the existing Playwright config, preview command, and evidence runner.
export const browserProjects = [
  { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
  { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
];

export function browserAddress(env = process.env) {
  const value = env.PORTFOLIO_PORT ?? '4173';
  if (!/^\d+$/.test(value) || Number(value) < 1024 || Number(value) > 65535) {
    throw new Error('PORTFOLIO_PORT must be an integer from 1024 to 65535');
  }
  return { port: Number(value), baseURL: `http://127.0.0.1:${Number(value)}` };
}
