import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

test('compact portfolio exports at /me with metadata and self-contained asset paths', async () => {
  const html = await readFile('dist/me/index.html', 'utf8');
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Philip Warkentien II — Staff UI Engineer<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/warkentien2\.com\/me\/"/);
  assert.match(html, /property="og:image" content="https:\/\/warkentien2\.com\/me\/media\/social.png"/);
  assert.doesNotMatch(html, /href="#"|99\/100|500,000|GPG:|120 FPS|checkbox state-machines/);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(fragment), fragment);
  const css = await readFile('dist/me/styles.css', 'utf8') + await readFile('dist/me/tokens.css', 'utf8');
  const assets = [...html.matchAll(/(?:src|href)="(\/me\/[^"#]+)"/g), ...css.matchAll(/url\(['"]?(\/me\/[^)'" ]+)/g)];
  for (const [, url] of assets) assert.ok((await readFile(`dist${url}`)).length > 0, url);
  await readFile('dist/me/media/social.png');
  for (const font of ['spacegrotesk', 'inter', 'jetbrainsmono']) {
    assert.equal((await readFile(`dist/me/fonts/${font}.woff2`)).subarray(0, 4).toString(), 'wOF2');
    await readFile(`dist/me/fonts/${font}-OFL.txt`);
  }
});

test('compact portfolio publishes no design references or external runtime dependencies', async () => {
  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await inspect(file);
      else {
        assert.doesNotMatch(file, /\.(zip|pdf|map)$|DESIGN\.md|code\.html|screen\.png$/);
        if (/\.(html|css|js)$/.test(file)) {
          const text = await readFile(file, 'utf8');
          assert.doesNotMatch(text, /stitch-me-reference|docs\/design|cdn\.tailwindcss|fonts\.googleapis|fonts\.gstatic/);
          assert.doesNotMatch(text, /<script[^>]+src="https?:|@import\s+url\(['"]?https?:/);
        }
      }
    }
  }
  await inspect('dist/me');
});
