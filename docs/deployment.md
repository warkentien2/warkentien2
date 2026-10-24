# Publish and operate

## Existing setup (inspected October 23, 2026)

GitHub Pages serves the `gh-pages` branch at its root. The custom domain is `warkentien2.com`, and HTTPS is enforced. `master` is the source branch. GoDaddy is the domain registrar/DNS provider; it does not need to run the application. This cleanup does not change Pages settings, DNS, the published branch, or the live site.

## Review locally

Run `npm ci`, `npx playwright install chromium`, `npm run check`, then `npm run preview`. Inspect `/`, both locale home pages and subpages, `/legacy/`, `/legacy/projects/`, `/projects/`, and an unknown URL. Browser automation includes Chromium desktop/mobile viewport checks and axe scans for new pages, plus archive smoke tests. Manual screen-reader, other-browser, real-device, reduced-motion, zoom, and visual regression reviews are still needed for the finished design.

## Recommended launch: GitHub Actions

1. Finish the design and content, merge the reviewed PRs to `master`, and save the current deployed `gh-pages` SHA as a rollback reference.
2. In repository Settings → Pages, select **GitHub Actions** as the publishing source. Retain custom domain `warkentien2.com` and HTTPS.
3. Run **Deploy static portfolio** from Actions on **master**. It builds and tests before uploading only `dist/` and deploying through the `github-pages` environment. Restrict that environment to `master` if desired. The workflow itself refuses builds from other refs.
4. Verify direct deep links and archive links on the custom domain, and check network failures and HTTPS.

The workflow is intentionally `workflow_dispatch` only. PR validation and merges do not publish. Once ready for continuous delivery, add a push-to-master trigger in a reviewed change. The deployment permissions use the built-in GitHub token/OIDC; no hosting credential or domain secret belongs in application code.

## Keep branch publishing instead

Build and validate locally or in CI, then publish **the contents of `dist/`** to the root of `gh-pages` using your chosen artifact-publishing tool. Keep CNAME and `.nojekyll`. Never publish the repository root. The former `npm run deploy` command is intentionally replaced by an explicit workflow. Do not mix branch publication with Actions deployment without choosing the Pages source first.

## GoDaddy DNS

Existing DNS can remain if it already resolves correctly. For a new setup, configure/verify the custom domain in GitHub first, then configure the authoritative DNS at GoDaddy. Use the current addresses from [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), rather than copying a potentially stale address list from this repo. Point `www` by CNAME to `warkentien2.github.io`; use GitHub's documented apex A/AAAA records for `@`. Preserve mail and other unrelated records. Enable HTTPS after certificate issuance.

The artifact includes `CNAME` for branch-hosting compatibility. With Actions publishing, the Pages custom-domain setting is authoritative; the artifact's CNAME does not configure DNS or the domain setting. See [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Other static hosts and rollback

Upload `dist/` to any static web host, enable directory index serving, and configure `404.html` as the error document. No Node process or SPA rewrite is needed. On GoDaddy hosting, confirm those capabilities for the specific hosting product before selecting it.

For Actions rollback, revert the relevant source change on `master`, review it, and dispatch a fresh deployment. To return immediately to the old site, switch Pages back to the untouched `gh-pages` branch. If that branch has subsequently been overwritten, restore the saved deployment commit through a reviewed rollback. DNS need not change when rolling back within GitHub Pages.
