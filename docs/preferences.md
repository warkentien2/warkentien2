# Owner preferences and collaboration

These preferences come from the portfolio cleanup and PR requests. They apply to this repository; update them when the owner changes direction. Architecture decisions and implementation details live in [architecture.md](architecture.md), rather than becoming permanent personal preferences.

## Product priorities

- Build a portfolio that reflects a Staff UI Engineer's work: rich interaction, animation, thoughtful imagery, responsive layouts, accessibility, and multiple languages.
- Keep content static, including manually authored blog entries. No accounts, credentials, database, or dynamic data service is needed.
- React and TypeScript are the owner's familiar tools. Next.js is welcome when its benefits justify it; the current foundation uses static export for localized pages and subpages.
- Plan a landing page with multiple sections that open dedicated subpages. The foundation scaffold is not the final visual design.
- Keep `warkentien2.com/` and `warkentien2.com/projects/` serving the original 2019 pages for now. Place all new UI temporarily under `warkentien2.com/2026/`, with footer links to those original paths. A subdomain was acceptable if simpler; the shared `/2026/` path was chosen to avoid DNS and separate hosting configuration. Promoting the new UI to the root requires a later owner request. Avoid requiring a full rewrite of archived components to develop the new portfolio.
- Keep hosting compatible with static publishing. GoDaddy manages the domain; GitHub Pages is the existing host. Domain registration and application hosting are separate concerns.
- Separate production assets from development documentation, tests, and AI guidance. Publish only `dist/`.

English and Brazilian Portuguese are the foundation's initial locale choices, inferred during implementation from the existing site's USA/Brazil background. The owner requested multilingual support but did not specify this exact locale set.

## Working together

The owner prefers continuous execution and explicitly asked to assume yes for routine follow-up questions. Make reasonable implementation decisions, finish authorized work, and avoid stopping for repeated confirmation of steps already covered by the request. Share concise progress updates explaining findings and remaining work.

Ask only when a necessary answer cannot be inferred or when an action requires approval beyond the task's authorization. This preference does not grant blanket permission to merge, publish, change DNS, delete unrelated work, or bypass tool-enforced approval requirements. A request to create or update a PR authorizes the branch, commits, push, PR description, and relevant review replies; the portfolio's launch remains a separate action.

## Pull requests and review

- Target `master`. Update the existing task branch and PR when one is already open; do not create a duplicate PR for the same work.
- Include appropriate tests and report the actual results. Explain what changed, why it matters, and material limitations.
- Add screenshots when they help review visible changes. Include desktop and mobile views when relevant, label locale and viewport, and distinguish foundation previews from completed design work.
- Keep review images in `docs/review/`, outside the deployed artifact. Embed images in the PR description using commit-pinned URLs. Reuse existing images for changes that do not alter their appearance; refresh them when the visible result changes.
- Read inline findings as well as the review summary. Fix valid issues and add a focused regression check when warranted. For a finding that does not apply, explain the evidence instead of making an unrelated change.
- Reply to addressed findings with the fix and validation, then resolve completed threads. Keep the PR description current and preserve relevant visual evidence.
- Finish by linking the PR and stating validation status. Do not merge or deploy as part of an ordinary PR update.

This file, `AGENTS.md`, and the repository skills are development guidance and must stay out of `public/` and `dist/`.
