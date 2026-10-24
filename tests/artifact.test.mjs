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
      const html = await readFile(`dist/${locale}/${route}index.html`, 'utf8');
      assert.ok(html.includes(`lang="${locale}"`));
      assert.match(html, /<h1[ >]/);
      assert.match(html, /href="\/legacy\/"/);
      assert.match(html, /href="\/legacy\/projects\/"/);
    }
  }
});
test('legacy entry bundles resolve at their deployed URL', async () => {
  const html = await readFile('dist/legacy/index.html', 'utf8');
  const bundles = [...html.matchAll(/(?:src|href)="(\/legacy\/assets\/[^"]+)"/g)];
  assert.ok(bundles.length >= 2);
  for (const [, url] of bundles) await readFile(`dist${url}`);
  await readFile('dist/legacy/awwwards.png');
});
test('both archive projects paths preserve every original file byte for byte', async () => {
  const source = 'apps/legacy/public/projects';
  for (const file of await walk(source)) {
    for (const prefix of ['dist/projects', 'dist/legacy/projects']) {
      assert.deepEqual(await readFile(path.join(prefix, path.relative(source, file))), await readFile(file), file);
    }
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
