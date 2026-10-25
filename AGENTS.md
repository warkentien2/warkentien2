# Repository guidance

The source branch is `master`. Read `.github/PORTFOLIO.md` (repository engineering guide) and the relevant document in `docs/` before changing build boundaries or publishing behavior. The root `README.md` is the personal GitHub profile. Keep the engineering guide under its distinct filename: a `.github/README.md` overrides the personal introduction on the live GitHub profile as well as the repository homepage.

Read [owner preferences](docs/preferences.md) for product priorities, autonomy, PR updates, screenshots, and review handling. Continue authorized work without routine confirmation prompts; keep changes on the task's existing PR when one is open.

- New portfolio: `apps/web` (Next.js static export, React, strict TypeScript).
- Archive: `apps/legacy` (React 16 + Vite); retain its content and asset paths unless the task explicitly changes them.
- Publish only assembled `dist/`. Development docs, tests, and `.agents/` must stay out of it.
- Keep the original portfolio at `/` and its original projects at `/projects/`. Mount all new UI and its assets under `/2026/` until the owner requests a cutover. Use plain anchors to cross between apps; Next Link adds the modern basePath automatically.
- Modern routes must export without a production server. Enumerate dynamic params; don't add request-time services to solve static routing.
- Keep public assets free of credentials and developer instructions. No credentials are required by this application.
- Use npm workspaces and the root package-lock.json. Keep old/new React runtimes isolated.
- Validate changes with `npm run check`; setup: Node 22.13+, `npm ci`, `npx playwright install chromium`.
- Deployment remains manual until the portfolio is ready. A code PR does not require changing Pages/DNS settings.

## Standard task workflow

Classify intent by meaning, not keywords: **QUESTION** is read-only; **TASK DEFINITION** needs inspection and only essential product clarification; **PLAN** investigates a material design decision without assuming implementation is authorized; **IMPLEMENT** executes a scoped task; **PLAN_AND_IMPLEMENT** reasons through authorized design work then implements without waiting for routine plan approval.

Before meaningful implementation, inspect applicable instructions, README, architecture, package scripts, test/config/CI files, and related code. Infer discoverable answers. A task is **READY** once the observable outcome, affected flow, acceptance criteria, validation method, relevant evidence, and scope boundaries are clear enough to proceed. Keep this lightweight; obvious tasks need no formal document. Ask focused questions only for material product/architecture ambiguity that inspection cannot settle.

For authorized implementation, after READY, make ordinary reversible implementation decisions autonomously. Create a **new branch before changes** for new work; continue the same branch for an existing task/PR. Complete implementation, run checks, diagnose and fix failures, rerun affected checks, collect relevant evidence, review the diff, commit, push, and create one coherent PR against `master`. Do not stop at a plan, edits, partial tests, or a fixable failure. Merge and deployment remain separate unless explicitly requested.

Pause only for a necessary unresolved product decision, destructive/irreversible approval, missing required credentials/services/permissions, contradictory acceptance criteria/architecture, or repeated attempts showing likely damage or unsafe guessing. Report what failed, what was tried, and the smallest specific action needed. Ordinary test failures are repair work, not blockers. Respect tool-enforced approval boundaries while avoiding routine confirmation questions.

Use deeper reasoning for architecture, new subsystems, state/data ownership, complex interactions/animation, substantial refactors, performance/accessibility design, difficult debugging, and competing approaches. Use normal economical execution for an established plan, routine code, and tests. This session has no supported tool for switching its own parent model/reasoning level; instructions govern behavior, not runtime settings. Do not claim automatic model changes or modify global Codex configuration to emulate them.

**Done means verified and reviewable:** run `npm run check` (typecheck, both builds, native Node tests, existing Playwright + axe flows). Preserve existing infrastructure. Add targeted tests for changed behavior and use additional lint/component/performance checks only if present or justified by the task; don't claim nonexistent suites passed. For static UI changes, capture a real before/after at the same route/state/viewport. For changed interactions, exercise the story in Playwright and collect video, state images, and useful traces. Omit irrelevant evidence; don't fabricate a baseline or mark an unrun check as passed.

The PR must describe the outcome/reason, exact validation results, relevant UI/UX evidence, performance impact or its absence, accessibility checks where applicable, and only actual risks/follow-ups. Link reviewer-accessible artifacts, not local paths. Completion reports include the PR URL and any real limitations.

See [AI development](docs/ai-development.md) for the inspected stack and validation policy, [evidence](docs/evidence.md) for runnable capture commands, and [worktrees](docs/worktrees.md) for isolated parallel work. Use separate worktrees/branches for independent write-heavy tasks when parallel work is authorized; avoid concurrent ownership of the same files. No external orchestration framework is required.

Repository skills:
- `.agents/skills/portfolio-content/SKILL.md`: localized sections, articles, and interactive components.
- `.agents/skills/portfolio-release/SKILL.md`: build composition and static release verification.
