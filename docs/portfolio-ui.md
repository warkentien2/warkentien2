# Editing the modern portfolio

Everything shipped under `/2026/` is ordinary Next.js, React, TypeScript, and CSS. The design export is a reference only. It is not imported, read during builds, or needed at runtime. The archive at `/` and `/projects/` remains isolated.

## Tokens and palettes

`apps/web/src/app/tokens.css` owns colors, font families, spacing, borders, geometry, hard shadows, motion, page width, and grid gaps. Fonts are self-hosted in `apps/web/public/fonts/`; `licenses.txt` contains their SIL Open Font Licenses.

Keep layout and typography tokens on `:root`, separate from palette selectors. Responsive overrides in `styles/responsive.css` then apply to every palette without being shadowed by a palette wrapper.

Four palettes (`swiss`, `paper`, `cobalt`, `night`) set the same semantic color variables. The default is Kinetic Swiss. To add another, add its ID to `palettes` in `content/portfolio.ts`, its localized label to `content/interface.ts`, and its token overrides in `tokens.css`. Each background needs its paired foreground. `--link` is separate from the cobalt surface color so text remains legible on dark themes.

`components/Preferences.tsx` controls the palette on `.portfolio-app[data-palette]`. Selection persists in localStorage when available; storage is optional. No theme changes the card layout or order.

## Cards and content

`apps/web/src/content/portfolio.ts` contains the typed `tiles` registry. Edit `order` to reorder, `visible` to hide, and `id` to connect an entry to its English and Portuguese `tileCopy`. Presentation is explicit:

```ts
{
  id: 'systems', order: 2, visible: true,
  variant: 'featured', tone: 'paper', category: 'case-study',
  image: 'systems', caseStudy: 'design-systems',
  colors: { background: '#fbf8f2', foreground: '#17171c', accent: '#123ae4' },
}
```

`colors` is optional; omitting it lets the palette assign the tile's colors. Overrides use inline CSS custom properties and apply independently of position and variant. Check contrast when changing color pairs. Available variants are `typography`, `illustration`, `metric`, `interactive`, and `featured`. `components/Gallery.tsx` renders the registry, filters entries, and progressively enhances ordinary links with native dialogs. Full case studies remain directly linkable without JavaScript.

Case-study copy lives in `content/cases.ts`; career copy in `content/career.ts`; interface labels in `content/interface.ts`. Keep both locales accurate. Add a case slug to `caseSlugs` and both locale records to export its route. `content/metadata.ts` provides per-locale canonical/alternate links. New sections use the existing `[locale]` App Router layout.

## Images, illustration, and motion

`content/assets.ts` maps image IDs to local files and dimensions. `components/Artwork.tsx` supplies responsive 256/512 WebP variants, intrinsic dimensions, and lazy loading; case-study lead images load eagerly. The six conceptual illustrations are adapted from the owner-supplied design export and are explicitly labeled, not presented as employer screenshots. They are illustrations, not evidence of product architecture or measured results.

The tarantula image is a still rendered from the repository's original CSS creature. Its live animation stays in the original portfolio; no legacy React/GSAP runtime is imported into the modern app. `RaceArtwork` is an original decorative CSS illustration, not a replacement implementation of Desert Racer. The actual experiments are linked from the creative case study.

`styles.css` composes focused ordinary stylesheets in `app/styles/`. `gallery.css` owns tile variants and the racetrack; `workbench.css` owns the controls and component preview; `expanded-card.css` owns the dialog; `case-study.css` owns case-study sections and SVG transitions. `pages.css`, `base.css`, and `language.css` own page composition, shared typography, and the language chooser. Motion stops under `prefers-reduced-motion`; the decorative road animation ends before five seconds. `GaugeDemo.tsx` uses illustrative local data with accessible SVG titles, a keyboard-operable range, and a table. `Workbench.tsx` independently controls density, button treatment, focus guidance, and component state. Both are original public demonstrations, not internal employer tooling or production telemetry.

## Responsive layout and validation

The grid in `app/styles/gallery.css` is three columns above 1040px, two columns from 641–1040px, and one below, with breakpoint adjustments in `responsive.css`. Page margins and gaps come from tokens; narrow layouts adjust image proportions and type sizes. The identity tile's explicit container-relative type rule keeps its long title within the card. Image-led descriptions are two-line excerpts; full copy is accessible in the expanded view or dedicated page.

Run `npm run check`. Existing tests remain intact; `tests/browser/portfolio.spec.ts` adds direct-load/refresh, dialog focus/Escape, image, palette, workbench, SVG, reduced-motion, and 320px checks. `tests/portfolio.test.mjs` checks new exports and the production boundary. Use the existing commands in [evidence.md](evidence.md) for screenshots and recorded journeys.

Only assembled `dist/` is published. Do not place ZIPs, exported HTML, screenshots of the design reference, contributor instructions, or unused assets in `public/`. Deleting `docs/design/stitch-2026/` must not affect the build. Deployment remains manual and is outside an ordinary PR.

## Content boundaries

The owner's task supplies the professional claims. Keep Pipefy's 80% outcome explicitly **reported** and tied to custom component implementations; keep the Anywhere LCP change **approximately 0.8 seconds** and the **124 MB → approximately 1 MB** image example scoped as one example. Do not infer employer implementation details from illustrative artwork. No fictional awards, traffic, saved-hour metrics, WebGL telemetry architecture, or accessibility certification is included.
