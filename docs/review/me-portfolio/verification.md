# Compact portfolio: design comparison and verification

## Inspected reference

The sole input was `docs/design/stitch-me-2026/stitch_staff_ui_engineer_portfolio.zip` (SHA-256 `08097e7c18456209fba6574583334b5bc9e2989e5ff94abeffe2a53438dcfde5`). All three files were inspected completely: `code.html`, `screen.png`, and `DESIGN.md`. There is no PDF in the supplied folder or archive. No other design artifacts were used.

The supplied screenshot is a downscaled 357 × 1600 desktop composition, not a separate mobile mockup. The approved HTML was rendered in Chromium at 1440 × 900 and 390 × 844, with its original fonts, Tailwind reference runtime, and inline SVGs. The final site uses the same viewports for comparison, with local fonts and no Tailwind or Stitch runtime.

## Visual comparison

| View | Reference HTML render | Implemented `/me/` |
| --- | --- | --- |
| Desktop, 1440 × 900 | [Reference](reference-desktop.png) | [Final](final-desktop.png) |
| Mobile, 390 × 844 | [Reference extrapolation](reference-mobile.png) | [Final](final-mobile.png) |

[Supplied overview screenshot](approved-screen.png) · [Mobile navigation](mobile-menu.png) · [Desktop scrolling demo](interaction-desktop.png) · [Mobile scrolling demo](interaction-mobile.png).

The reference images contain fictional export copy and metrics; they are visual references only, not evidence of professional accomplishments.

The rendered output was visually inspected, including the hero, philosophy comparison, engineering examples, creative/teaching cards, two experiments, contact panel, directory, and footer. This is a reference-versus-implementation comparison for a new route; there was no earlier `/me/` site baseline. No pixel-perfect claim is made for mobile, which is extrapolated from the desktop composition and explicit mobile tokens.

Preserved: section order and alternating surfaces; Space Grotesk, Inter, and JetBrains Mono; structured token colors and typography; desktop column proportions, outer margins, gutters, large editorial hierarchy, diagram-led cards, SVG topology/gauge/experiment motifs, and the four-column contact directory. All production assets are local.

Intentional differences:

- Structured token colors/type take precedence over inconsistent prose. The explicit sharp-corner specification takes precedence over the export's rounded utility classes. No blurred card shadows are carried over.
- Required collaborative Pareto copy and the original Awwwards illustration replace the export's disparaging comparison and invented UI metrics. This changes the philosophy panel's imagery and height while retaining its narrative/comparison columns.
- SF location, fake latency/frame-rate claims, invented performance scores/payload reductions, WebGL/500,000-point claims, 85-module claims, and the fake GPG key are removed. The page uses only owner-supplied professional facts and accurately scopes the approximately 0.8-second LCP outcome.
- The Apple panel illustrates synchronized chart/table scrolling with original sample values, visibly labeled as a public demonstration. It is not an employer screenshot or confidential dataset.
- Curious Geckos copy no longer claims checkbox state machines. Both experiment diagrams are identified as conceptual, and both article links point to the actual technical breakdowns.
- Native mobile navigation and the specified 44px mobile hero type replace the export's hidden navigation and desktop-sized clipped headline. Tablet and narrow layouts stack without page overflow.
- Placeholder links, dates, availability quarter, and unsupported resume/reel destinations are replaced with actual contact/work links. The contact panel retains the approved composition.

## Architecture and independence

Ordinary HTML, scoped CSS, and a small module live in `apps/legacy/public/me/`. The existing Vite public copy and assembler already generate `dist/me/index.html`, so no application, framework, dependency, bundler, base-path, assembler, or deployment-workflow change is needed. `/`, `/projects/`, and `/2026/` keep their existing content and boundaries. Reference ZIP/HTML/specification files are not application inputs or published site assets.

See [editing `/me/`](../../me-portfolio.md) for source organization, tokens, responsive rules, assets, and interaction behavior.

## Validation

- `npm run check` passed: TypeScript, both static builds, **20 Node tests**, and **72 desktop/mobile Playwright tests**. Existing tests remain intact.
- `/me/` loads directly and refreshes with HTTP 200; metadata, canonical URL, sharing image, local assets, and anchor targets resolve. Static artifact tests exclude reference files and external design/font runtimes.
- Responsive and axe WCAG A/AA checks pass at **320, 390, 768, 1440, and 1920px**, without unwanted page overflow, missing assets, or browser page errors.
- The initial Linux CI run caught the hero grid's intrinsic minimum width at 320px. Its children now explicitly permit shrinking within the column; an additional assertion verifies they fit inside the grid. The fix retains the specified mobile type size and leaves 390px/desktop composition unchanged.
- Both recorded stories passed using the existing evidence infrastructure: skip link, keyboard disclosure navigation, Escape/focus restoration, section anchors, and bidirectional keyboard-driven chart/table scroll synchronization. Reduced-motion state is exercised; content/native links remain usable with JavaScript disabled.
- Raw final recordings, state images, reports, and traces are in ignored `artifacts/evidence/me-portfolio-grid-fix/`. The PR links reviewer-accessible CI artifacts; curated states above remain in nonpublished documentation.
- External articles, GitHub, DeviantArt, the animation archive, CSS Day slides, Pablo Stanley's talk, and LinkedIn (GET) responded successfully. CodePen rejects automated requests with HTTP 403; its owner-supplied profile URL is retained. The production canonical `/me/` URL is not live until merge and manual deployment.
- Existing legacy Sass `@import` deprecation warnings remain. `git diff --check` passes.

## Accessibility and performance

Native landmarks/headings, meaningful image text, visible focus, reduced-motion rules, accessible table values, and no-JavaScript content are included. Automated Chromium/axe checks do not replace real-device, other-browser, or assistive-technology review.

The three WOFF2 fonts total **102,092 bytes**. The optimized WebP and sharing PNG total approximately **98 KB** on disk; the sharing PNG is not fetched during a normal page visit. The interaction module is **807 bytes**, with no React/framework payload or external runtime. The Awwwards image lazy-loads with reserved intrinsic dimensions. No production performance score or benchmark is claimed.

This PR does not merge or deploy. The manual publishing workflow is unchanged.
