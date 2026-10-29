# Architecture decision: two applications, one static artifact

## Modern app

Use Next.js App Router with React and strict TypeScript, `output: 'export'`, `basePath: '/2026'`, and `trailingSlash: true`. Pages are generated at build time; the host only serves files. This gives blog entries and localized subpages indexable HTML and independent titles without adding a custom prerender pipeline. Keep Server Components as the default (they run during the build), adding small client components for interaction. Static content does not limit animation complexity.

React + Vite would also work, especially for a single-page experience. For this portfolio's many subpages, localized metadata, and future articles, Next's route and static generation conventions justify the extra framework. Vite alone would require multi-page entry points or a prerender system to provide the same HTML behavior. Do not use an SPA fallback to disguise missing static pages.

[Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports) and [Vite static deployment documentation](https://vite.dev/guide/static-deploy.html).

No request-time APIs, cookies, middleware/proxy, server actions, ISR, or default server image optimization. Next Image is configured unoptimized; create correctly sized modern image variants ahead of time, provide dimensions and responsive sizes, and budget their download cost. Self-host fonts rather than adding build-time font network dependencies.

## Legacy app

The archive has its own React 16 and ReactDOM 16 dependencies. Vite replaces the old Create React App build tool; JSX files use `.jsx`, SCSS compiles directly, and asset URLs are based at `/`. The original components, animations, copy, and standalone banners are retained. No need to port them to modern React or TypeScript to start the new site. React versions never share a browser root or runtime bundle.

The local preview server uses a root `compression` override to pick up the patched 1.8.2+ release; review whether this override is still needed when updating `serve`.

The old `react-scripts`, `gh-pages`, and unused JSON loader are removed; npm now owns one workspace lockfile. `docs/legacy-package.json` records the original package manifest. Old compiled CSS and maps are retained as historical source reference, but SCSS is authoritative and the old generated files are not deployed.

This is a preservation boundary, not a claim that the 2019 implementation meets current accessibility or dependency standards. Validate it separately and review any future archive fixes explicitly. CDN libraries and remotely linked resources may age independently.

The `/projects/` gallery uses neutral `/projects/studies/{number}/` preview URLs. Vite copies each original `public/projects/banners/300x250_v{number}/` directory to that static alias at build time and internally maps the same paths during legacy development. Historical URLs remain available. This avoids EasyList's `/300x250_` network rule; artwork IDs formerly matching `#content-ad`, `#content_ad`, and `#container_ad` use neutral study names, with their CSS/JavaScript references updated together. No advertising metadata, ad-serving SDK, blocker detection, or allowlisting is needed. The compatibility aliases add approximately 4.9 MB to the static artifact, not to a page's requested assets.

`tests/fixtures/preview-filter-rules.json` records the inspected EasyList version and specific matching rules. The browser regression applies those network and cosmetic rules, proves filtering remains active, loads all 27 previews, and exercises keyboard replay and direct refresh. It is a focused regression, not a claim that every extension or custom filter configuration has been tested. Third-party archive font, icon, and GSAP dependencies remain unchanged.

## Compact portfolio at `/me/`

The compact landing page is ordinary semantic HTML, scoped CSS, and one small JavaScript module in `apps/legacy/public/me/`. Vite copies this public directory into the legacy output; the existing assembler therefore produces `dist/me/index.html` without another build tool, framework, or changes to Next's `/2026` base path. All page assets and self-hosted fonts live under `/me/`. Its styles are scoped to `.me-page` and are only linked by that document.

The approved design export is a reference, not a build input. The page implements its typography, palette, composition, and SVG artwork with local source. Illustrative charts use public sample values, never employer data. Native anchors and a native mobile disclosure menu work without JavaScript; a small module synchronizes the demonstration chart/table scroll positions and closes the menu after navigation. See [editing the compact portfolio](me-portfolio.md).

## Build composition

1. Next exports to `apps/web/out/`.
2. Vite builds the archive to `apps/legacy/dist/`.
3. `scripts/assemble.mjs` creates a clean `dist/`, copies the legacy output to its root (including `/projects/`), and mounts the modern output under `dist/2026/`. It copies the modern 404 document to `dist/404.html` for host-level errors.
4. `dist/.nojekyll` prevents underscore-prefixed Next assets from being filtered by Jekyll in branch hosting.

The artifact works on GitHub Pages or another host that serves directory `index.html` files. The original site stays at `warkentien2.com/` and `warkentien2.com/projects/`. The Next.js portfolio remains under `warkentien2.com/2026/`; the compact static landing page is independently served at `warkentien2.com/me/`. A subdomain such as `me.warkentien2.com` is unnecessary for this arrangement and would require separate domain/hosting configuration. The artifact targets the domain root, not an additional GitHub repository prefix.

Next Link automatically adds the build-time `/2026` basePath to app routes; do not prepend it again to Link hrefs. Plain anchors to `/` and `/projects/` intentionally leave the modern app. For public images and plain app links, include `/2026/` explicitly; the exported files physically live under that mount. See [Next basePath documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath). The host-level CNAME belongs to the legacy public directory because its output owns the domain root.

Docs, tests, AI instructions, package metadata, and node_modules are never copied wholesale. Source maps from historical standalone projects remain archive assets; modern bundle source maps are disabled by default.

## Delivery stages

The modern app now includes a localized editorial tile grid, four palettes, four engineering case studies, a workbench, and an SVG demonstration. Typed content, presentation variants, and design tokens remain separate; see [portfolio customization](portfolio-ui.md). Design-reference files are not application inputs. The journal links to actual published technical articles rather than seeding fictional local posts.

Before launch, review on real devices and with assistive technology, and review social images and search indexing for the final published content. Deployment stays manual. The original portfolio and projects remain at their original URLs.
