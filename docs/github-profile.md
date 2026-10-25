# GitHub profile curation

Reviewed October 24, 2026. Scope: public GitHub repositories, public profile settings, the live portfolio, and the owner's published CSS experiments. Account settings and other repositories are recommendations only.

## Profile and engineering documentation

Post-merge check, October 25, 2026: the live GitHub profile selected `.github/README.md` as well as the repository homepage. The original two-README arrangement did not separate the introductions in practice. The engineering guide is now renamed to `.github/PORTFOLIO.md`, leaving the root README as GitHub's selected introduction. Its contents and relative links are preserved because the guide stays in the same directory. The repository keeps its username-matching name.

- [Root README](../README.md): personal introduction for both the GitHub profile and repository homepage.
- [Portfolio engineering guide](../.github/PORTFOLIO.md): existing engineering documentation, accessible from the personal introduction and contributor entrypoints.

[GitHub's README documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) specifies repository precedence as `.github`, root, then `docs`. Its [profile README documentation](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme) requires a nonempty root `README.md` in the public username repository. Explicitly previewing that root file did not establish what the live profile would select; verification must also check GitHub's selected README. Keep the engineering guide under its distinct filename to avoid overriding the personal introduction again.

The existing deployment workflow uploads only the assembled `dist/`; neither the personal README nor engineering guide is copied there. A read-only Pages API check returned `build_type: workflow`, custom domain `warkentien2.com`, and status `built`. No workflow, application, asset, Pages, or DNS setting changes are needed. Contributor entrypoints point to the engineering guide.

## Selection and source checks

The profile links four examples rather than listing employers or every repository:

| Example | Why it earns a place | Evidence and age |
| --- | --- | --- |
| [Desert Racer](https://000699350.deployed.codepen.website/pages/home/home.html#color-1) | Creative CSS input and collision logic | [Implementation notes](https://dev.to/warkentien2/desert-racer-worlds-first-css-only-swipe-aware-game-4j0h) published March 2024; article edited April 2025. The owner reported the deployment repaired on October 25, 2026. The playable URL and adjacent article link are retained. |
| [Curious Geckos](https://codepen.io/warkentien2/pen/jOJJwEp) | A playful use of CSS position awareness | [Author's implementation notes](https://dev.to/warkentien2/curious-geckos-the-most-precise-css-only-position-aware-mini-game-16i2), published March 2024 and edited April 2025, link this exact Pen. Both the Pen's published source and article were inspected. |
| [React gooey menu](https://github.com/warkentien2/react-gooey-fab) | A small component where React, SVG filters, and animation meet | Last pushed June 2019. [FAB.js](https://github.com/warkentien2/react-gooey-fab/blob/master/src/FAB.js) implements the SVG filter and GSAP timelines; the profile links source, not a maintained package. |
| [CSS creatures](https://warkentien2.com/) | Character drawing and motion give the portfolio a distinctive identity | The original 2019 portfolio, preserved inside this actively developed repository. [Tarantula source](../apps/legacy/src/components/Tarantula/index.jsx) and [moth source](../apps/legacy/src/components/Moth/index.jsx) use CSS shapes with React/GSAP animation. The live page rendered in Chromium. |

The `/projects/` archive also contains 27 animated banners. They remain accessible through the portfolio; a second archive link would dilute the primary invitation. No existing banner or creature image was repurposed into decorative profile art. The unfinished `/2026/` foundation is not promoted as a completed redesign.

All 37 public repositories returned by GitHub's public repository search were reviewed for description, homepage, fork status, and last push. Source inspection then narrowed the plausible choices:

- `classic-minesweeper`: React/TypeScript components, Storybook stories, and game configuration; a 2023 prototype worth inspecting, without a verified hosted demo or a claim of completed gameplay.
- `ui-engineering-demo`: a 2023 Angular exercise extended with theming, localization, motion preferences, and responsive components. Its README explicitly records unfinished accessibility and testing work. Attribute the original exercise; do not present it as a production product.
- `pathfinder`: its README describes a breadth-first search visualizer, but the current default-branch `src/App.tsx` only renders “Pathfinder.” Excluded from pins and selected work.
- `memory-game`, `rendering-benchmark`, and `warkentien2-boilerplate`: relevant smaller 2023 experiments, but less distinctive than the chosen work. `css-framework` and `textCircle` are earlier learning projects, not evidence of an actively maintained design system.
- `flow-finder` (2026) and `image-crawler` (2024): practical utilities, but less central to the visual/UI positioning. Recency alone does not earn a pin.
- `emojillate` and `polished` are forks. The current `emojillate` pin can be replaced with original work; the profile makes no authorship claim for either upstream project.
- The remaining public repositories are older coursework, tutorials, small utilities, archived portfolios, or forks. They remain available without being turned into an automatic project catalog.

Last-push dates are context, not a maintenance guarantee. The profile calls the selected work experiments from 2019–2024; only the portfolio repository has verified ongoing work in this task.

## Recommended pins, in order

Four pins are sufficient. The CSS games live on CodePen and are linked directly from the profile; no new repositories are needed.

| Order | Repository | Suggested repository description |
| --- | --- | --- |
| 1 | [warkentien2](https://github.com/warkentien2/warkentien2) | Personal portfolio: CSS creatures, motion experiments, and a React/TypeScript static foundation. |
| 2 | [react-gooey-fab](https://github.com/warkentien2/react-gooey-fab) | A 2019 React menu experiment with SVG gooey filters and GSAP animation. |
| 3 | [ui-engineering-demo](https://github.com/warkentien2/ui-engineering-demo) | A 2023 Angular UI exercise exploring responsive layout, theming, localization, and motion preferences. |
| 4 | [classic-minesweeper](https://github.com/warkentien2/classic-minesweeper) | A 2023 Minesweeper UI prototype in React and TypeScript, with Storybook component stories. |

Current visible pins include the Fire NavBar gist, the `emojillate` fork, `react-gooey-fab`, and this portfolio. Replace them with the four above. This favors inspectable original work and avoids filling all six slots for its own sake.

## Manual profile changes

These cannot be applied by merging README files. No account or repository settings were changed.

1. Open [profile settings](https://github.com/settings/profile). Keep the name **Philip Warkentien II**. Suggested bio: **Frontend/UI Engineer working with React, TypeScript, CSS, motion, and design systems. I make complex interfaces intuitive.** This replaces the current title-heavy bio without claiming a held Staff title.
2. Set **URL** to **https://warkentien2.com**. It currently points to the Brazilian LinkedIn URL; the portfolio is only a social link.
3. Use the social slots for **https://www.linkedin.com/in/warkentien2/**, **https://codepen.io/warkentien2/**, and **https://dev.to/warkentien2**. The LinkedIn destination is already linked from the portfolio. Remove the duplicate portfolio/projects slots; leave the fourth slot empty unless the CodeSandbox profile remains useful. CodeSandbox currently challenges automated access, so it is not a primary README destination.
4. The Company field currently says **PayPal Alumni**. Consider leaving Company blank and keeping professional history on LinkedIn/the portfolio. Do not turn a former employer into a current-employer claim.
5. On [the profile](https://github.com/warkentien2), choose **Customize your pins**, select the four repositories above, and drag them into priority order.
6. On each recommended repository, use the gear beside **About** to apply its suggested description. For this portfolio, also set Website to **https://warkentien2.com** (currently no repository homepage is set). Keep the existing CodeSandbox homepage for `react-gooey-fab` only if it works in a normal signed-in browser; the profile uses its reliable source link.

## Verification

- Full prescribed suite passed using Node 22: `ASDF_NODEJS_VERSION=24.21.0 npx --yes --package=node@22 --call 'npm run check'`. Typecheck and both production builds succeeded; all 15 native Node tests and 30 desktop/mobile Playwright tests passed, including existing axe and navigation coverage. The legacy build still emits its existing Sass `@import` deprecation warnings.
- A preservation comparison confirms that `.github/PORTFOLIO.md` matches the former `.github/README.md` byte for byte. Relative Markdown paths/fragments resolve; `git diff --check` passes.
- GitHub's README API returned `.github/README.md` for `master` and `README.md` for `fix/github-profile-readme-selection`. This checks the selected file rather than an explicit root-file preview. The engineering guide remains accessible as `.github/PORTFOLIO.md`; its permanent link targets `master` and becomes available when the rename merges.
- The live profile remains on the default branch. A branch preview cannot prove a live profile update before merging; recheck `https://github.com/warkentien2` after the fix reaches `master`.
- The generated artifact excludes the personal README, engineering guide, and development documentation. Application sources, dependencies, scripts, and workflow files are unchanged.

Selection-fix evidence captures the repository homepage's rendered README at the same route and viewport on both sides, using source refs `de4a8d6` (BEFORE) and `16ff763` (AFTER). The homepage changes from the engineering guide to the personal introduction; the renamed engineering guide also renders with working relative links.

| View | Before | After |
| --- | --- | --- |
| Desktop, 1280 × 1000 | [Engineering guide selected](review/github-profile-selection/before-desktop.png) | [Personal README selected](review/github-profile-selection/after-desktop.png) |
| Mobile, 375 × 812 | [Engineering guide selected](review/github-profile-selection/before-mobile.png) | [Personal README selected](review/github-profile-selection/after-mobile.png) |

Historical root-file Markdown captures from the initial curation, at 1280 × 1000 and 375 × 812 viewports:

| View | Before | After |
| --- | --- | --- |
| Desktop | [Engineering introduction](review/github-profile/before-desktop.png) | [Personal introduction](review/github-profile/after-desktop.png) |
| Mobile | [Engineering introduction](review/github-profile/before-mobile.png) | [Personal introduction](review/github-profile/after-mobile.png) |

Captures show the rendered Markdown article on the same root-file view, without GitHub's surrounding navigation. BEFORE uses `bb6d75958173dd82c0379a125eb28b0269588371`; AFTER uses `05cb2e34462c4186e2b3b101d59a521fe2497278`. The profile has no horizontal overflow at either viewport. These are Markdown previews, not a claim that the live profile has changed before merging.

### Limits

GitHub rendered Markdown and the live portfolio can be reviewed in Chromium. CodePen and CodeSandbox previously returned anti-bot challenges to the automated browser, so full gameplay and sandbox execution are not reported as passed. The articles and published source verify the project identity and implementation; Curious Geckos has an adjacent article link as a readable alternative. Desert Racer's playable link is retained following the owner's reported repair.

No private repositories were inspected for this audit. No credentials, employer-confidential code, testimonials, or unverifiable metrics were added. Application performance and interaction behavior are unchanged; the repository's existing build, artifact, Playwright, and axe checks remain the application validation.
