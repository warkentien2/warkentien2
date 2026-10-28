# Motion study preview compatibility

The original gallery asked visitors to disable their ad blocker. Inspection found no `ad.size` or equivalent advertising metadata. The actual false positives are a network path and element IDs in [EasyList](https://easylist.to/easylist/easylist.txt), version `202610281720`, commit `661e43cfab8e83d0db83150e56a77b7f5ab20584`:

- `/300x250_` matches every original iframe and its relative assets.
- `###content-ad`, `###content_ad`, and `###container_ad` hide artwork containers.

[Adblock Plus's filter documentation](https://help.adblockplus.org/adblock-plus-help-center/how-to-write-filters) explains the distinction between network blocking and element hiding. Removing ordinary charset, viewport, or compatibility metadata would not address these matches.

The gallery uses `/projects/studies/{number}/` and neutral container IDs, with CSS/JavaScript references changed together. Vite produces static copies of the existing asset directories and maps the same routes internally during development; old URLs remain available. The warning is removed. Replay overlays are labeled native buttons with visible keyboard focus. A previously undefined `banner_container` reference in study 18 now uses its existing container variable, allowing that animation to run without a page error.

## Validation

- `npm run check`: TypeScript, both static builds, **18 Node tests**, and **58 desktop/mobile browser tests** passed. Existing tests and modern axe coverage remain intact.
- The new browser journey applies the identified network/cosmetic rules, proves that they still block a probe request and hide a probe element, then checks all 27 previews, artwork loading, keyboard replay, direct navigation, refresh, and absence of page errors.
- All 27 neutral development routes and their first image assets returned HTTP 200 with no redirect to a filtered path.
- Historical project URLs still respond. Artifact tests compare every copied file with its source. The 234 tracked non-HTML/CSS/JS archive assets are unchanged from the base branch.
- No package, runtime library, deployment setting, modern UI, or original root portfolio change.

## Visual evidence

Same route `/projects/`, same gallery state and viewports. JavaScript animation frames can differ; these are human comparisons, not pixel-diff assertions.

| Viewport | Before | After |
| --- | --- | --- |
| Desktop, 1440 × 900 | [Before](before-desktop.png) | [After](after-desktop.png) |
| Mobile, 375 × 812 | [Before](before-mobile.png) | [After](after-mobile.png) |

Filtering-active keyboard replay: [desktop](filtered-replay-desktop.png) · [mobile](filtered-replay-mobile.png). Both recorded browser journeys passed.

Raw paired reports are in ignored `artifacts/evidence/preview-adblock/`; the recorded desktop/mobile story uses `artifacts/evidence/preview-adblock-story/`. The PR links reviewer-accessible images and CI artifacts containing videos, state screenshots, and traces.

## Scope and limits

This tests the identified EasyList rules, not every extension or custom filter list. Existing external archive font, icon, and GSAP dependencies remain. There is no blocker detection or attempt to disable visitor filtering. Original Google placeholder click destinations remain historical source; no advertising SDK or tracking request was found in these previews.

Preserving historical URLs adds approximately 4.9 MB of duplicate static files to the deployment artifact. A gallery visit requests only the neutral URLs, so it does not download both copies. Publishing remains manual; this PR does not merge or deploy.
