# Kinetic portfolio review

The application is implemented in the existing Next.js app, under `/2026/`. The language chooser remains at `/2026/`; the editorial homepage is at `/2026/en/` and `/2026/pt-BR/`. Original `/` and `/projects/` content is preserved.

## Visual evidence

| State | Desktop | Mobile |
| --- | --- | --- |
| Original foundation | [Before](before-desktop.png) | [Before](before-mobile.png) |
| Editorial homepage | [After](after-desktop.png) | [After](after-mobile.png) |
| Design Systems expansion | [View](systems-desktop.png) | [View](systems-mobile.png) |
| Frontend Performance expansion | [View](performance-desktop.png) | [View](performance-mobile.png) |
| Data Visualization expansion | [View](data-desktop.png) | [View](data-mobile.png) |
| Creative Engineering expansion | [View](creative-desktop.png) | [View](creative-mobile.png) |
| SVG value changed by keyboard | [View](svg-desktop.png) | [View](svg-mobile.png) |
| Night palette / spacious workbench | [View](workbench-desktop.png) | [View](workbench-mobile.png) |

The paired homepage captures use the same route, state, and viewports (1440 × 900 and 375 × 812). The original baseline was captured before implementation at base commit `f2ade15`; the final UI and journey captures render implementation commit `22ce9ea`. Manifests retain the actual dirty-tree flag and source commit. Local raw reports, recordings, and traces are in ignored `artifacts/evidence/kinetic-portfolio-delivery/` and `kinetic-portfolio-delivery-story/`. The PR links reviewer-accessible CI artifacts for the final journeys.

## Comparison with the design reference

The supplied reference screens are preserved here for review only. Their fictional text and measurements are **not evidence of professional accomplishments**.

| Reference | Implementation treatment |
| --- | --- |
| [Editorial homepage](reference-home.png) | Syne headlines, Hanken Grotesk body, JetBrains Mono labels, three-column editorial grid, square cards, cobalt/orange/black/violet blocks, structural lines, large illustration panels, and a live workbench. The contact section uses working links rather than a nonfunctional form. |
| [Design Systems](reference-systems.png) | Expanded overlay and a dedicated static route. Content is attributed to Pipefy; reported 80% reduction and the initial prototype within 45 days replace fictional brands, compiler architecture, and saved-hours figures. |
| [Frontend Performance](reference-performance.png) | Large editorial title, scoped metric blocks, and explanatory sections. Approximately 0.8-second LCP improvement and the single 124 MB → approximately 1 MB image example replace fictional traffic and hydration telemetry. |
| [Data Visualization](reference-data.png) | Illustrated case treatment plus an original interactive SVG gauge/chart with readable values and a table. No invented WebGL engine, million-point workload, or FPS benchmark. |
| [Creative Engineering](reference-creative.png) | Actual CSS-only experiments, technical articles, and original tarantula artwork replace the fictional falcon and awards. The tarantula still links to the existing animated portfolio. |

Six illustrations from the owner-supplied export are optimized and self-hosted as conceptual art, with visible labels. A seventh asset is a still of the repository's original CSS tarantula. The artwork's source resolution is 512px for the conceptual illustrations; no internal employer screenshots are reconstructed. The racetrack illustration and SVG/workbench demonstrations are ordinary local CSS/React components.

## Validation

- `npm run check`: typecheck, both production builds, **17 Node tests**, and **56 Playwright tests** pass. Existing tests were preserved.
- The full Node 22 check also passed with `docs/design/stitch-2026/` temporarily outside the repository. A shell exit trap restored the original directory and ZIP. No production source reads the export or reference directory.
- All four palettes pass the existing WCAG A/AA axe rules at desktop and mobile sizes. Keyboard dialogs restore focus after Escape; direct case-study routes refresh; SVG controls work with the keyboard; density/treatment/focus workbench controls update actual components; 320px and reduced-motion flows pass.
- Existing archive byte-preservation and publishing-boundary checks pass. Production modern files contain no design-service URLs, font CDNs, Tailwind runtime, reference ZIP, or reference HTML. No dependencies or deployment settings changed.
- Paired screenshot capture passes (2 projects). Final interaction evidence passes (4 recorded stories), including all four expanded cases, the SVG update, and palette/workbench changes. The existing capture test now scrolls visible lazy images into view before full-page screenshots so artwork is complete.
- `git diff --check` passes. Font license text is included with the self-hosted fonts; only inconsequential trailing whitespace was normalized.

All seven image pairs total approximately 425 KB on disk, including both responsive sizes; the three WOFF2 files total approximately 101 KB. Pages select a responsive variant and lazy-load gallery artwork. No new runtime library is added. No Lighthouse score or production performance benchmark is claimed.

## Limits and publishing

Professional facts and reported outcomes follow the owner's supplied boundaries. Demonstration values and conceptual illustrations are labeled; they are not employer telemetry or screenshots. Automated checks do not replace real-device, other-browser, or assistive-technology review. Existing legacy Sass `@import` warnings remain.

The PR does not merge or deploy. Publishing still requires the existing manual `dist/` workflow after review. The live website is not evidence of this branch until that happens. See [customization guide](../../portfolio-ui.md) for future editing without the design tool or reference files.
