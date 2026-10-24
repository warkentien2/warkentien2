# Architecture decision: two applications, one static artifact

## Modern app

Use Next.js App Router with React and strict TypeScript, `output: 'export'`, and `trailingSlash: true`. Pages are generated at build time; the host only serves files. This gives blog entries and localized subpages indexable HTML and independent titles without adding a custom prerender pipeline. Keep Server Components as the default (they run during the build), adding small client components for interaction. Static content does not limit animation complexity.

React + Vite would also work, especially for a single-page experience. For this portfolio's many subpages, localized metadata, and future articles, Next's route and static generation conventions justify the extra framework. Vite alone would require multi-page entry points or a prerender system to provide the same HTML behavior. Do not use an SPA fallback to disguise missing static pages.

[Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports) and [Vite static deployment documentation](https://vite.dev/guide/static-deploy.html).

No request-time APIs, cookies, middleware/proxy, server actions, ISR, or default server image optimization. Next Image is configured unoptimized; create correctly sized modern image variants ahead of time, provide dimensions and responsive sizes, and budget their download cost. Self-host fonts rather than adding build-time font network dependencies.

## Legacy app

The archive has its own React 16 and ReactDOM 16 dependencies. Vite replaces the old Create React App build tool; JSX files use `.jsx`, SCSS compiles directly, and asset URLs are based at `/legacy/`. The original components, animations, copy, and standalone banners are retained. No need to port them to modern React or TypeScript to start the new site. React versions never share a browser root or runtime bundle.

The local preview server uses a root `compression` override to pick up the patched 1.8.2+ release; review whether this override is still needed when updating `serve`.

The old `react-scripts`, `gh-pages`, and unused JSON loader are removed; npm now owns one workspace lockfile. `docs/legacy-package.json` records the original package manifest. Old compiled CSS and maps are retained as historical source reference, but SCSS is authoritative and the old generated files are not deployed.

This is a preservation boundary, not a claim that the 2019 implementation meets current accessibility or dependency standards. Validate it separately and review any future archive fixes explicitly. CDN libraries and remotely linked resources may age independently.

## Build composition

1. Next exports to `apps/web/out/`.
2. Vite builds the archive to `apps/legacy/dist/`.
3. `scripts/assemble.mjs` creates a clean `dist/`, copies the modern output, adds the legacy output under `legacy/`, and copies original projects to `/projects/` for compatibility.
4. `dist/.nojekyll` prevents underscore-prefixed Next assets from being filtered by Jekyll in branch hosting.

The artifact works on GitHub Pages or another host that serves directory `index.html` files. It targets a domain root (`warkentien2.com`), not a repository subpath like `/warkentien2/`. Supporting a subpath would require coordinated Next basePath, legacy base, and cross-app link changes and their tests.

Docs, tests, AI instructions, package metadata, and node_modules are never copied wholesale. Source maps from historical standalone projects remain archive assets; modern bundle source maps are disabled by default.

## Delivery stages

This PR establishes the build boundary, route skeleton, two initial locale dictionaries, and checks. Before launch: replace preview content, author actual project/article pages, add designed imagery and interactive components, review page-specific canonical/alternate metadata and social images, add sitemap entries for real content, and validate on real devices with keyboard and assistive technology. Keep deployment manual until the result is ready. No invented articles or achievements are seeded.
