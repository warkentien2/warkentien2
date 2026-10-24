import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  basePath: '/2026',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
