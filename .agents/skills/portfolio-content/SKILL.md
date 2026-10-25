---
name: portfolio-content
description: Add or edit localized pages, articles, and interactive UI in this repository modern portfolio. Use for portfolio content and component work, excluding archived 2019 pages.
---

Read `docs/contributing.md` for locale and authoring conventions. Work in `apps/web`; leave the archive isolated. All modern UI is temporarily mounted at `/2026/`; the original site stays at `/` and `/projects/`. Next Link prefixes route hrefs automatically; public asset URLs and plain modern links need the basePath explicitly. Use plain anchors for links back to the original site. The site exports to static files: new dynamic route segments need all parameters enumerated at build time. Strings belong in typed locale content, and each locale needs correct HTML language and route metadata.

Use build-time components for content and small client components for interaction. Preserve semantic navigation, keyboard focus, and reduced-motion alternatives. Do not seed fabricated work history or blog entries. Keep development notes outside public assets.

For new routes or interactions, extend the artifact/browser tests with observable behavior. Run `npm run check` against the combined output; both archive links must still resolve. Language changes currently go to locale home pages; account for this when implementing equivalent-page switching.

Follow the shared READY-to-PR process in `AGENTS.md` and `docs/ai-development.md`. For relevant visual or interactive changes, use the existing Playwright capture/recording commands in `docs/evidence.md`; do not add a competing test framework.
