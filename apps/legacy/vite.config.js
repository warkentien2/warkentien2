import { defineConfig } from 'vite';
export default defineConfig({ base: '/legacy/', esbuild: { jsx: 'transform' } });
