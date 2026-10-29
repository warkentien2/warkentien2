# Editing the compact portfolio

`apps/legacy/public/me/` is the complete source for `/me/`. It is static HTML, CSS, local fonts/images, and a small module. The existing legacy public-asset pipeline copies it into `dist/me/`; no separate app, build step, framework, or deployment setting is required. Use `npm run dev:legacy` for development or the combined `npm run preview` after building.

- `index.html`: semantic sections, copy, inline SVG illustrations, navigation, metadata, and public chart/table sample values. Employer examples are described in prose; illustrations and demo values are explicitly labeled.
- `tokens.css`: local font faces, palette, typography, spacing, page width, geometry, borders, and motion. The approved ZIP's `DESIGN.md` supplies the tokens. Its structured color/type values take precedence over conflicting prose, and its explicit zero-radius rule takes precedence over the export's rounded utility classes.
- `styles.css`: scoped `.me-page` styles and component layouts. Desktop uses the 12-column proportions at 1280px+, tablet margins apply at 768px, and mobile type/margins apply below 768px. Sections stack below 1024px. The chart intentionally scrolls inside its bounded panel.
- `interactions.js`: paired chart/table scroll positions, mobile-menu closing after navigation, and Escape focus restoration. Content, links, and native disclosure navigation remain usable without JavaScript.
- `media/`: optimized Awwwards illustration reused from the original portfolio and a local sharing image. `fonts/` holds Space Grotesk, Inter, JetBrains Mono and their OFL licenses.

Edit native anchors directly to change navigation. Keep target IDs and scroll offsets consistent with the sticky header. To change demonstration data, update both the accessible HTML table and the matching inline SVG curves. These are original public sample values, not employer product data.

The reference ZIP is only in `docs/design/stitch-me-2026/` and is ignored by Git. Its screenshot, HTML, and `DESIGN.md` are not build inputs. There is no PDF in the supplied folder/archive. Removing these reference files has no effect on the application. All production imagery and fonts are served locally; there is no Stitch/Tailwind/font-CDN runtime.

Run `npm run check`; focused browser coverage is `npm run test:e2e -- tests/browser/me.spec.ts`. The existing evidence runner records the story with `npm run evidence:ux -- --name me-review --grep 'compact portfolio story'`. Its state images explicitly use 1440 × 900 and 390 × 844. Other tests cover 320, 768, and 1920px, static delivery, direct refresh, no-JavaScript content, keyboard input, and axe. Reference comparison and documented differences belong in nonpublished `docs/review/`.
