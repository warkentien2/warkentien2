import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory()
          ? files(path.join(dir, entry.name))
          : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
test("all engineering case studies and workbench pages have localized static HTML", async () => {
  for (const locale of ["en", "pt-BR"]) {
    for (const route of [
      "work/design-systems",
      "work/frontend-performance",
      "work/data-visualization",
      "work/creative-engineering",
      "workbench",
    ]) {
      const html = await readFile(
        `dist/2026/${locale}/${route}/index.html`,
        "utf8",
      );
      assert.ok(html.includes(`lang="${locale}"`));
      assert.match(html, /<h1[ >]/);
      assert.match(html, /href="\/projects\/"/);
    }
  }
});
test("modern production files are independent of design services and private references", async () => {
  for (const file of await files("dist/2026")) {
    assert.doesNotMatch(file, /(?:stitch|\.zip|DESIGN\.md)/i);
    if (!/\.(html|css|js|txt)$/.test(file)) continue;
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(
      content,
      /lh3\.googleusercontent\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.tailwindcss\.com|stitch\.withgoogle|docs\/design/,
    );
    assert.doesNotMatch(
      content,
      /CSS Falcon|12M\+ Monthly|4,200|1,000,000\+|zero-jank|66% LCP|engineering.hour savings/i,
    );
  }
  for (const name of ["syne", "hanken-grotesk", "jetbrains-mono"]) {
    const font = await readFile(`dist/2026/fonts/${name}.woff2`);
    assert.ok(font.length > 1000);
    assert.equal(font.subarray(0, 4).toString(), "wOF2");
  }
  const home = await readFile("dist/2026/en/index.html", "utf8");
  assert.equal([...home.matchAll(/data-tile="/g)].length, 12);
  const images = [...home.matchAll(/src="(\/2026\/images\/[^"]+)"/g)];
  assert.ok(images.length >= 6);
  for (const [, image] of images) await readFile(`dist${image}`);
});
