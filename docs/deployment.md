# Publish and operate

## Publishing source

GitHub Pages must use **GitHub Actions** to publish the assembled `dist/` artifact. `master` contains application source, not a ready-to-serve website. The custom domain is `warkentien2.com`, with HTTPS enabled; GoDaddy manages DNS and does not need to run the application. The old `gh-pages` branch is retained as a rollback source.

## If the domain shows README text and /projects or /2026 return 404

On October 24, 2026, Pages was found configured as **Deploy from a branch → master → /(root)**. GitHub's branch/Jekyll build rendered README.md because the source branch has no root index.html. It also did not run either app build, so neither expected route was published. Adding a CNAME file or redirects cannot fix this build-source mismatch.

1. Open [repository Settings → Pages](https://github.com/warkentien2/warkentien2/settings/pages).
2. Under **Build and deployment → Source**, select **GitHub Actions**. Do not select `master` under **Deploy from a branch**. Keep the custom domain and HTTPS settings.
3. Open [Deploy static portfolio](https://github.com/warkentien2/warkentien2/actions/workflows/deploy.yml), select **Run workflow**, choose **master**, and run it. Changing the Pages source alone does not run this manual workflow.
4. Wait for the **Deploy static portfolio** run's build and deploy jobs to succeed. A green **Validate** check or **pages build and deployment** Jekyll run is not this deployment.
5. Verify `/`, `/projects/`, `/2026/`, and a `/2026/en/work/` refresh on the actual domain. If a browser still shows an old response, use a private window or disable cache before diagnosing another code issue.

The deployment workflow checks that Pages uses the Actions publishing source before building. Only `dist/` is uploaded; never select the repository source root for publication.

For CLI verification, `gh api repos/warkentien2/warkentien2/pages --jq .build_type` must return `workflow`, not `legacy`. An authorized operator can set the source with `gh api --method PUT repos/warkentien2/warkentien2/pages -f build_type=workflow`, then dispatch `gh workflow run deploy.yml --repo warkentien2/warkentien2 --ref master`. These commands change the live publishing configuration and start a deployment; use them when publishing is requested.

## Review locally

Run `npm ci`, `npx playwright install chromium`, `npm run check`, then `npm run preview`. Inspect the original `/` and `/projects/`, the new `/2026/` chooser, both `/2026/{locale}/` home pages and subpages, and unknown URLs. Refresh a modern deep link and confirm its scripts/styles load from `/2026/_next/`. Browser automation includes Chromium desktop/mobile viewport checks and axe scans for new pages, plus archive smoke tests. Manual screen-reader, other-browser, real-device, reduced-motion, zoom, and visual regression reviews are still needed for the finished design.

## Publish the preview without replacing the original routes

The artifact preserves the original `/` and `/projects/`. New UI is temporarily mounted at `/2026/`, including localized pages and Next assets. Publishing this preview does not promote the new design to the root. No `me.warkentien2.com` subdomain or DNS change is needed. Keep this boundary until the owner explicitly requests a route cutover.

## Deployment commands and staging

Pushes to `master` automatically run **Validate**, which builds and tests but does not publish. There is currently no separate staging destination. `/2026/` is a preview path within the production Pages site, not an isolated staging environment.

With [GitHub CLI](https://cli.github.com/) installed and authenticated (`gh auth login`), use:

```sh
npm run deploy:production  # dispatch Deploy static portfolio on remote master
npm run deploy:status      # list the five latest deployment runs on master
```

`npm run deploy` is a convenience alias for `deploy:production`. It uses [`gh workflow run`](https://cli.github.com/manual/gh_workflow_run) with an explicit repository and `--ref master`. It queues the existing workflow, which builds, tests, and uploads only `dist/` before publishing. The command's success means the dispatch was accepted; use the status command or [Actions](https://github.com/warkentien2/warkentien2/actions/workflows/deploy.yml) to confirm the deployment succeeds.

The remote `master` branch supplies the code. The command does not commit, push, merge, publish local files, or change Pages/DNS settings. Unmerged PRs and local edits are not included. This publishes the entire assembled site at `warkentien2.com`, including the original root/projects and the modern `/2026/` routes.

For automatic staging, first configure a separate static hosting project or repository with its own URL. It must serve the assembled artifact at its domain root, retaining `/projects/` and `/2026/`. A master-triggered workflow can then validate and publish `dist/` to that destination while production stays manual. Simply adding a GitHub environment named `staging`, or adding a push trigger to `deploy.yml`, would not create a separate hosted site; the latter would automatically update production.

## Manual publishing: GitHub Actions

1. Review and merge the intended preview changes to `master`, and save the current deployed `gh-pages` SHA as a rollback reference. The modern design may remain unfinished under `/2026/`; keep the original root routes.
2. In repository Settings → Pages, select **GitHub Actions** as the publishing source. Retain custom domain `warkentien2.com` and HTTPS.
3. Run `npm run deploy:production`, or **Deploy static portfolio** from Actions on **master**. It builds and tests before uploading only `dist/` and deploying through the `github-pages` environment. Restrict that environment to `master` if desired. The workflow itself refuses builds from other refs.
4. Verify the original root/projects pages, `/2026/` deep links, and footer links on the custom domain, and check network failures and HTTPS.

The workflow is intentionally `workflow_dispatch` only. PR validation and merges do not publish. Once ready for continuous delivery, add a push-to-master trigger in a reviewed change. The deployment permissions use the built-in GitHub token/OIDC; no hosting credential or domain secret belongs in application code.

## Keep branch publishing instead

Build and validate locally or in CI, then publish **the contents of `dist/`** to the root of `gh-pages` using your chosen artifact-publishing tool. Keep CNAME and `.nojekyll`. Never publish the repository root. `npm run deploy` triggers the Actions workflow; it does not push a `gh-pages` branch. Do not mix branch publication with Actions deployment without choosing the Pages source first.

## GoDaddy DNS

Existing DNS can remain if it already resolves correctly. For a new setup, configure/verify the custom domain in GitHub first, then configure the authoritative DNS at GoDaddy. Use the current addresses from [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), rather than copying a potentially stale address list from this repo. Point `www` by CNAME to `warkentien2.github.io`; use GitHub's documented apex A/AAAA records for `@`. Preserve mail and other unrelated records. Enable HTTPS after certificate issuance.

The artifact includes `CNAME` for branch-hosting compatibility. With Actions publishing, the Pages custom-domain setting is authoritative; the artifact's CNAME does not configure DNS or the domain setting. See [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Other static hosts and rollback

Upload `dist/` to any static web host, enable directory index serving, and configure `404.html` as the error document. No Node process or SPA rewrite is needed. On GoDaddy hosting, confirm those capabilities for the specific hosting product before selecting it.

For Actions rollback, revert the relevant source change on `master`, review it, and dispatch a fresh deployment. To return immediately to the old site, switch Pages back to the untouched `gh-pages` branch. If that branch has subsequently been overwritten, restore the saved deployment commit through a reviewed rollback. DNS need not change when rolling back within GitHub Pages.
