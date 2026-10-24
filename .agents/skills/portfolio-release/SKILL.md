---
name: portfolio-release
description: Verify this portfolio combined static build, archive compatibility, and publishing configuration. Use for build or release work in this repository, not generic application changes.
---

Read `docs/deployment.md` before release changes. `master` contains source; the inspected live site uses the `gh-pages` branch, while the proposed Actions workflow is manual. Inspect current settings if publishing behavior matters; do not assume this historical observation is still current.

Run `npm run check`. The assembled `dist/` must contain modern localized HTML, `/legacy/`, `/legacy/projects/`, original `/projects/`, `404.html`, CNAME, and `.nojekyll`. Only `dist/` is deployable. Inspect changes to the assembler or public directories for accidental publication of developer files. Keep legacy project assets byte-preserved unless specifically updating them.

Report what was tested and any unverified hosting behavior. A build or PR request does not imply a launch: follow the user authorized release scope. When publishing is requested, use the documented workflow and verify direct route loads afterward. Keep GoDaddy domain ownership distinct from static hosting; domain changes are rarely needed for code updates.
