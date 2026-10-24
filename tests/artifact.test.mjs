import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
test('all modern routes have static HTML and the correct language', async () => {
  for (const locale of ['en', 'pt-BR']) {
    for (const route of ['', 'work/', 'about/', 'journal/']) {
      const html = await readFile(`dist/2026/${locale}/${route}index.html`, 'utf8');
      assert.ok(html.includes(`lang="${locale}"`));
      assert.match(html, /<h1[ >]/);
      assert.match(html, /href="\/"/);
      assert.match(html, /href="\/projects\/"/);
    }
  }
});
test('legacy entry bundles resolve at their deployed URL', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  const bundles = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)];
  assert.ok(bundles.length >= 2);
  for (const [, url] of bundles) await readFile(`dist${url}`);
  await readFile('dist/awwwards.png');
});
test('original projects path preserves every file byte for byte', async () => {
  const source = 'apps/legacy/public/projects';
  for (const file of await walk(source)) {
    assert.deepEqual(await readFile(path.join('dist/projects', path.relative(source, file))), await readFile(file), file);
  }
});
test('deployment contains no development instructions, sources, or dependencies', async () => {
  const files = await walk('dist');
  assert.equal((await readFile('dist/CNAME', 'utf8')).trim(), 'warkentien2.com');
  await readFile('dist/.nojekyll');
  await readFile('dist/404.html');
  for (const file of files) {
    assert.doesNotMatch(file, /(?:^|\/)(?:node_modules|docs|scripts|tests|\.agents|\.github)(?:\/|$)/);
    assert.doesNotMatch(file, /(?:AGENTS|SKILL|README)\.md$/);
    // Archive banner source maps are historical public assets; new app maps stay private.
    if (!file.includes('/projects/')) assert.ok(!file.endsWith('.map'), file);
  }
});

test('modern assets and navigation stay under /2026 while original routes remain at root', async () => {
  const legacy = await readFile('dist/index.html', 'utf8');
  assert.match(legacy, /id="root"/);
  assert.doesNotMatch(legacy, /Choose your language/);
  const modern = await readFile('dist/2026/index.html', 'utf8');
  assert.match(modern, /Choose your language/);
  assert.match(modern, /href="\/2026\/en\/"/);
  assert.match(modern, /href="\/2026\/pt-BR\/"/);
  const assets = [...modern.matchAll(/(?:src|href)="(\/2026\/_next\/[^"]+)"/g)];
  assert.ok(assets.length > 0);
  for (const [, url] of assets) await readFile(`dist${url}`);
  const files = await readdir('dist');
  for (const misplaced of ['en', 'pt-BR', '_next']) assert.ok(!files.includes(misplaced));
});
