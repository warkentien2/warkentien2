# Repository guidance

The source branch is `master`. Read `README.md` and the relevant document in `docs/` before changing build boundaries or publishing behavior.

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

Repository skills:
- `.agents/skills/portfolio-content/SKILL.md`: localized sections, articles, and interactive components.
- `.agents/skills/portfolio-release/SKILL.md`: build composition and static release verification.
