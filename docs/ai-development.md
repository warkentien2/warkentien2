# AI development: inspect → READY → verified PR

`AGENTS.md` is the entrypoint for Codex. These conventions extend the working repository; they do not replace its testing or deployment. An instruction is a behavioral contract, not an autonomous orchestration service.

## Understand intent and reach READY

| Intent | Expected behavior |
| --- | --- |
| QUESTION | Explain or investigate read-only; don't modify tracked files without authorization. |
| TASK DEFINITION | Inspect, infer acceptance criteria, ask only for essential unresolved product decisions. |
| PLAN | Investigate a meaningful architecture/UX/state/data/performance/security decision. Do not infer permission to implement a request for advice alone. |
| IMPLEMENT | Execute a sufficiently scoped change. |
| PLAN_AND_IMPLEMENT | Plan authorized design work internally, then implement without stopping for routine plan approval. |

Classify the whole request semantically. “Can you fix…” usually authorizes implementation; “what would you change?” usually asks for analysis. Repository facts take precedence over guessing from a keyword.

Before meaningful work, read relevant AGENTS files, the [repository engineering guide](../.github/README.md), architecture/content/deployment docs, package scripts, tests, CI configuration, and related implementation. READY means enough is known about the observable outcome, affected subsystem/flow, acceptance criteria, validation, useful evidence, and important non-goals. Keep a short working summary for complex tasks; a small obvious change can be READY immediately after inspection.

Infer answers from existing code and conventions. Ask focused product/architecture questions only when a wrong assumption would materially change the result. Ordinary reversible choices consistent with the architecture are already authorized. Once READY, proceed through implementation, debugging, verification, evidence, commit, push, and one coherent PR. Fix a normal failing test and retry the affected checks; don't present it as a reason to stop.

Spend more reasoning on architecture, new subsystems, state/data ownership, complex UI/animation, major refactors, performance, accessibility, difficult debugging, and multiple viable designs. Stay economical for deterministic execution and routine tests. This runtime exposes no supported way for the agent to change its own parent model/reasoning setting mid-task. Do not pretend otherwise, pin a model, or alter personal `~/.codex` settings. Model/effort selection belongs to the client's available controls. See [official Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference). No repository `.codex` configuration existed at inspection; AGENTS and the existing repository skills provide durable guidance without adding one.

## Inspected infrastructure

| Area | Existing solution and validation |
| --- | --- |
| Package manager/runtime | npm workspaces, one package-lock.json, Node 22.13+, `.nvmrc` |
| Modern frontend | Next.js static export, React 19, strict TypeScript; all new UI at `/2026/` |
| Original frontend | React 16 + Vite + SCSS; `/` and `/projects/` retain original content |
| Backend/data | No backend, credentials, database, or dynamic service |
| Type check | `npm run typecheck` runs Next type generation and tsc on the modern app |
| Production build | `npm run build` builds both apps and assembles only deployable files into `dist/` |
| Unit/artifact checks | `npm test` uses native `node:test` for output invariants and evidence-runner behavior |
| Component rendering / E2E | Existing Playwright Chromium desktop/mobile tests against the combined static output; no separate component-test framework |
| Accessibility | Existing axe WCAG A/AA scans plus keyboard, focus, locale, and no-JavaScript navigation assertions |
| Browser diagnostics | Existing HTML report and failure traces; now failure screenshots and opt-in media through the same config |
| Visual review | Curated images in `docs/review/`; new paired capture/report workflow. No automated pixel-diff regression baseline |
| Lint/performance | No configured linter or performance benchmark. Do not report these as passed or add a duplicate system just to tick a box |
| CI | Existing Validate workflow runs the full suite; records existing navigation stories and uploads reports/media on success and failure |
| CD | Manual, master-only Pages artifact workflow and source preflight; a development PR does not deploy |

## Definition of done

1. Implement the intended observable behavior and focused regression tests, preserving routing and existing tests.
2. Run setup once per checkout: `npm ci`, then `npx playwright install chromium` (Linux: `--with-deps chromium`). Run **`npm run check`** before the PR: typecheck, both production builds, native tests, and all existing browser/axe checks. Fix failures caused by the change. Run focused tests while iterating; don't repeat an unchanged passing full suite without a new reason.
3. For a visible static change, collect a real [before/after comparison](evidence.md) with matching state/viewport. For interactions, record an assertion-backed story using the existing Playwright tests. Review the actual images/recording; a successful tool exit does not establish that the UI looks right.
4. If changing animation/rendering, image loading, bundle boundaries, or other performance-sensitive areas, choose a task-specific before/after measurement (for example transferred asset bytes or a representative browser profile) with the same scenario. Report conditions and limits. Otherwise state that no performance-sensitive application code changed. No synthetic “performance passed” claim.
5. Report relevant automated accessibility results and manual limits. Axe does not replace screen-reader, real-device, or visual inspection. Preserve separate archive expectations.
6. Review the final diff and ensure docs/evidence stay outside `dist/`. Commit logically scoped work, push the task branch, and create/update one PR against `master`. Follow existing reviews through valid fixes and clear validation replies. Verify CI when available; distinguish a pending/external failure from local results.

The PR should explain what changed and why, commands/results, relevant UI/UX evidence, performance impact, accessibility findings, and only actual risks/deferred work. Use the repository PR template as a guide; omit irrelevant evidence headings. Link a workflow artifact or commit-pinned curated image, not an inaccessible local path. Keep raw media out of Git unless a small curated sample improves review. A PR request does not authorize merging or deployment.

## Genuine blockers

Stop only for an unresolved necessary product decision; destructive/irreversible approval; unavailable required credentials, services, infrastructure, or permissions; acceptance criteria that materially contradict each other/architecture; or repeated attempts demonstrating likely damage/unsafe guessing. Explain the blocker, what was tried, and the smallest specific human action needed. A repairable implementation/test failure is not a blocker. Tool-enforced approval remains binding; do not manufacture additional approval gates for routine work.

New tasks start on a new branch. Existing task/PR follow-ups stay together. For parallel work, use [isolated worktrees](worktrees.md), explicit file ownership, and the same shared instructions. No external orchestration framework or automatic agent spawning is introduced.
