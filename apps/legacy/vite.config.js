import { defineConfig } from 'vite';
import { cp, readdir } from 'node:fs/promises';
import path from 'node:path';

// Keep historical URLs while serving gallery previews without ad-size URL tokens.
function projectPreviewPaths() {
  let config;
  return {
    name: 'project-preview-paths',
    configResolved(resolved) {
      config = resolved;
    },
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        request.url = request.url?.replace(
          /^\/projects\/studies\/([1-9]\d*)\//,
          '/projects/banners/300x250_v$1/',
        );
        next();
      });
    },
    async closeBundle() {
      if (config.command !== 'build') return;
      const source = path.join(config.publicDir, 'projects/banners');
      const output = path.resolve(config.root, config.build.outDir, 'projects/studies');
      for (const entry of await readdir(source, { withFileTypes: true })) {
        const match = /^300x250_v([1-9]\d*)$/.exec(entry.name);
        if (entry.isDirectory() && match) {
          await cp(path.join(source, entry.name), path.join(output, match[1]), { recursive: true });
        }
      }
    },
  };
}

export default defineConfig({
  base: '/',
  esbuild: { jsx: 'transform' },
  plugins: [projectPreviewPaths()],
});
