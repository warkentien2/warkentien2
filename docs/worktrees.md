# Isolated worktrees for parallel work

This repository is suitable for independent worktrees: static apps, npm lockfile, no shared database or credentials, and relative generated outputs. No orchestration framework is needed. Parallel agents are optional and must be authorized/available in the current runtime; this document does not spawn agents.

## Start one independent task

From a clean repository, inspect `git status --short` and `git worktree list`. Fetch `origin/master`, then choose a unique branch and sibling path:

```sh
git fetch origin master
git worktree add -b feat/keyboard-navigation ../warkentien2-keyboard origin/master
cd ../warkentien2-keyboard
# Select Node 22.13+ using your version manager.
npm ci
npx playwright install chromium
PORTFOLIO_PORT=4175 npm run check
PORTFOLIO_PORT=4175 npm run evidence:ux -- --name keyboard-story --grep 'keyboard skip link'
```

The primary checkout defaults to port 4173; allocate a different free `PORTFOLIO_PORT` to each simultaneous worktree (4175, 4177, etc.). The setting controls both preview and Playwright's base URL. Tests fail rather than silently connecting to another task's server. Explicit reuse with `PORTFOLIO_REUSE_SERVER=1` is only for a server verified to serve this worktree's current `dist/`.

Each worktree must install its own node_modules and generate its own `.next`, `out`, `dist`, reports, and evidence. Do not symlink mutable dependencies/build directories between worktrees. Browser downloads and package-manager caches may be shared by their tools; task outputs must not be. Run builds/checks/captures sequentially within a worktree because they write shared local output directories. App dev servers can use separate explicit Next/Vite `--port` arguments when needed; evidence tests use the combined static preview instead.

## Ownership and integration

Assign non-overlapping write ownership for independent work. Shared files such as package-lock.json, package.json, AGENTS.md, Playwright config, and workflows need a single integration owner or serialized changes. Avoid multiple agents editing the same files, even with separate checkouts, when that just creates preventable conflicts. Worktrees isolate writes, not design decisions.

Every agent reads the same repository instructions, understands the outcome/acceptance criteria, and reports branch, files, validation, and evidence. Keep dependent work sequential. Integrate completed work with a reviewed merge/cherry-pick or a coherent task PR; run `npm run check` on the combined result and resolve conflicts deliberately. Do not force-push, reset someone else's branch, or discard their uncommitted work to make integration easier.

Use `git worktree list` to inspect paths. Once the work is committed and the result preserved, stop that worktree's own servers and remove only its clean checkout with `git worktree remove <path>`. Never use forced removal to clean up an unfamiliar dirty tree. Do not kill processes by port without confirming ownership.
