---
name: portfolio-release
description: Verify this portfolio combined static build, archive compatibility, and publishing configuration. Use for build or release work in this repository, not generic application changes.
---

Read `docs/deployment.md` before release changes. `master` contains source; the current publishing contract uses GitHub Actions with a manual deployment of `dist/`. The old `gh-pages` branch is a rollback source. Inspect current Pages settings when publishing behavior matters; never publish the source branch root.

Run `npm run check`. The assembled `dist/` must contain the original React site at `/`, unchanged `/projects/`, modern localized HTML and assets only under `/2026/`, `404.html`, CNAME, and `.nojekyll`. Only `dist/` is deployable. Inspect changes to the assembler or public directories for accidental publication of developer files. Keep legacy project assets byte-preserved unless specifically updating them.

Report what was tested and any unverified hosting behavior. A build or PR request does not imply a launch: follow the user authorized release scope. When publishing is requested, use the documented workflow and verify direct route loads afterward. Keep GoDaddy domain ownership distinct from static hosting; domain changes are rarely needed for code updates.

Verify modern deep-link refreshes and locale navigation at `/2026/`, and footer links back to `/` and `/projects/`. Neither root route may be replaced by the modern app without an explicit owner request. The shared path needs no subdomain or DNS changes.

Follow the shared READY-to-PR process in `AGENTS.md` and `docs/ai-development.md`. For relevant visual or interactive changes, use the existing Playwright capture/recording commands in `docs/evidence.md`; do not add a competing test framework.
