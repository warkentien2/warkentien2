# Content and UI contributions

## Localized pages

`apps/web/src/content/site.ts` owns the supported locale list, its type guard, and typed dictionaries. Initial locales are English and Brazilian Portuguese, inferred from the existing portfolio's USA/Brazil background; change this list if the intended audience differs. The generated `/{locale}/` pages set the document language in their HTML. No runtime locale negotiation, cookies, or server redirects are needed. `/` is an explicit language chooser.

New sections belong under `apps/web/src/app/[locale]/`. Keep semantic heading levels, descriptive route titles, and translated controls. Add each locale's strings together. For new pages add route-level canonical/alternate metadata using the actual translated URLs. The initial language switcher returns to each locale home; preserve equivalent subpage paths when extending it for real content. Ensure localized changes fit narrow and zoomed viewports.

## Articles and projects

The journal is intentionally empty. Start with hand-authored localized TSX pages under `[locale]/journal/<slug>/page.tsx`, add links to the journal index, and author translated titles/descriptions. This keeps all content in Git without a CMS. Extract a typed local article catalog when there are multiple entries. If slugs become data-driven, enumerate every route with `generateStaticParams` and keep `dynamicParams = false`; include each emitted route in artifact/browser checks. Add MDX only when its authoring benefits justify the dependency.

Use actual project details and permissions-cleared imagery. Files in `public/` are directly published; imported assets are compiled. Put developer notes in `docs/`, never beside public images.

## Accessibility, responsiveness, motion

The foundation provides a skip link, visible keyboard focus, landmarks, correct locale language, wrapping navigation, and reduced-motion overrides. New interactive components need keyboard operation, appropriate accessible names, predictable focus behavior, and non-motion ways to access the same content. Keep content usable before JavaScript hydrates. Prefer native elements to ARIA replacements.

Use client components only for interactive islands. Implement reduced-motion behavior in JavaScript animation libraries as well as CSS. Pause expensive offscreen work and clean up observers, timers, and animation contexts. Avoid adding global animation dependencies before a concrete design calls for them.

Before launch, review at 320px and up, 200–400% zoom, touch and keyboard input, reduced motion, high contrast, and screen readers. Automated axe checks are useful but do not prove accessibility compliance. Archive accessibility is tracked separately; don't let known historical violations weaken the modern page checks.

## Checks

`npm run check` runs TypeScript, production builds, byte-preservation and delivery-boundary tests, then browser tests against the assembled static output. Browser tests cover localized direct loads, overflow, WCAG A/AA axe rules, language navigation, skip-link focus, archive rendering/assets, all 27 banner entry points, and missing-route status. Add behavior tests for new interactions rather than mirroring component implementation. CI runs on PRs into `master` and pushes to `master`.
