import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
// Only generated output is removed. Neither app's sources are public wholesale.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
// The original portfolio and projects keep their existing root URLs.
await cp('apps/legacy/dist', 'dist', { recursive: true });
// Next's basePath matches this mount point, including client navigation/assets.
await cp('apps/web/out', 'dist/2026', { recursive: true });
await cp('apps/web/out/404.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
