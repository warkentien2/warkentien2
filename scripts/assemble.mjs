import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
// Only generated output is removed. Neither app's sources are public wholesale.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('apps/web/out', 'dist', { recursive: true });
await cp('apps/legacy/dist', 'dist/legacy', { recursive: true });
// Preserve the historic projects URL as real files: no host rewrites needed.
await cp('apps/legacy/public/projects', 'dist/projects', { recursive: true });
await writeFile('dist/.nojekyll', '');
