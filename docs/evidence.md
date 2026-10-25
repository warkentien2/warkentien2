# Review evidence with the existing Playwright stack

Use Node 22.13+, `npm ci`, `npx playwright install chromium`, and a current **`npm run build`**. Evidence commands start the existing static preview themselves and fail if its port is occupied, unless `PORTFOLIO_REUSE_SERVER=1` is deliberately set for a verified server from the same checkout. Set `PORTFOLIO_PORT` for concurrent worktrees. No second browser framework or production server is introduced.

## Static UI: same route/state, before and after

Before editing application UI, build and capture the baseline:

```sh
npm run build
npm run evidence:ui -- --name hero-layout --phase before --route /2026/en/
```

After implementing and rebuilding:

```sh
npm run build
npm run evidence:ui -- --name hero-layout --phase after --route /2026/en/
```

Both commands use the existing desktop (1440 × 900) and mobile (375 × 812) projects. Use `--project desktop` or `--project mobile` on both sides to select one. Protocol-relative and external routes are rejected against the configured preview origin. Their route and selected viewports must match; an AFTER run cannot silently invent BEFORE or trust a manifest without every selected project’s nonempty screenshot file. Capture labels are lowercase slugs. Existing run directories are never overwritten: use a new name for a retry/comparison.

Open `artifacts/evidence/hero-layout/index.html` for a side-by-side comparison, and `report.md` for links. Each phase keeps its own manifest, Playwright HTML/JSON results, screenshots, and trace. Manifests record the route, viewports, commit, dirty-tree flag, note, and status. `--note "..."` can explain fixture/state or an unchanged-UI workflow demonstration. A failed/skipped/empty or media-less run exits nonzero and is not reported as passing evidence.

This is human visual review, not a pixel-diff assertion or a replacement for E2E. Screenshots wait for fonts, disable CSS animations/caret, and use reduced motion, dark scheme, UTC, and en-US for consistency. JavaScript-driven animation or stateful data may need task-specific deterministic setup; don't compare random frames. The capture test in `tests/browser/ui.evidence.ts` intentionally just opens a route. For interactive states, use assertions and state attachments in the actual story test instead of claiming that this generic screenshot exercised a workflow.

If implementation started before a baseline, build the base commit in an isolated [worktree](worktrees.md), run BEFORE there with the same route/project, then copy the entire ignored `artifacts/evidence/<name>/before/` directory into the task worktree before AFTER. Preserve the recorded commit/state. Never label a screenshot of the changed app as the original baseline. Rebuild between source revisions; `dist/` is not automatically refreshed by capture commands.

For documentation/tooling changes with no product UI change, omit a product before/after claim. A same-UI capture can demonstrate this tooling, but label it explicitly as a workflow exercise.

## Interactive UX: record the changed story

```sh
npm run evidence:ux -- --name navigation-story
# Select an existing or newly extended test by its title/tag:
npm run evidence:ux -- --name locale-change --grep 'keyboard skip link' --project desktop
```

The default selects existing `@journey` stories: keyboard skip-link/locale switching and modern deep-link refresh → Portuguese home → original projects → original portfolio. This reuses `tests/browser/site.spec.ts`; no parallel story implementation exists. A real feature should extend/add the E2E story for its acceptance criteria and select it with `--grep`. Opening a page alone is not UX evidence. Add `test.step` names and `testInfo.attach` screenshots at important states, with assertions for each outcome. Test persistence/reload only when the feature promises persistence; this portfolio has no account/data backend.

Outputs go to `artifacts/evidence/<name>/ux/`. The top-level HTML report links each test's video, state screenshots, Playwright report, and trace. The video records real interaction; Playwright writes it when the test context closes. A video-less or zero-test selection fails. State screenshots are useful supplements, not substitutes for the recording. Review results in the HTML report or open a downloaded trace with `npx playwright show-trace <path-to-trace.zip>`.

## CI and PR delivery

The existing Validate workflow runs `npm run check`, then `npm run evidence:ux -- --name ci-navigation`. It uploads the existing `playwright-report` artifact on success/failure, now containing `playwright-report/`, `test-results/`, and `artifacts/evidence/`. Download/extract the artifact from the workflow run to inspect `artifacts/evidence/ci-navigation/index.html` and all media. Retention is 14 days. Normal E2E still uses its standard HTML report/failure traces; successful video/trace collection is opt-in to evidence mode.

Link the workflow run and artifact name in the PR. For static UI changes, selectively copy representative BEFORE/AFTER PNGs into `docs/review/<task>/` and embed commit-pinned raw GitHub URLs, or attach them via GitHub's UI. Link a downloadable artifact for full local captures and recordings; local file paths aren't review evidence. GitHub artifact URLs require repository access and expire; preserve small curated images or another approved attachment when long-term review evidence is needed. No upload credentials/service is added by this workflow.

`artifacts/`, browser reports, and test outputs are ignored and must never enter `public/` or `dist/`. Avoid capturing credentials or private data. All example stories here use the existing static portfolio content. Reports are not proof of screen-reader accessibility or performance; use the existing axe checks and task-specific measurements as appropriate.
