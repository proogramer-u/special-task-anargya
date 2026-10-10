# Final submission audit — Anargya LOW special task

Audited 10 October 2026 against the local **production build** at http://127.0.0.1:3001/ using installed Chrome and Playwright. Existing Next.js application, branding, official assets and approved composition preserved. No Figma changes, deployment, MED/HIGH features or dependency installations.

## Outcome

The requested six responsive widths passed the completed layout and functionality checks after the fixes below. An additional 320px reflow check passed. Automated axe-core 4.10.3 WCAG A/AA checks reported **zero violations** on each homepage and the open mobile/tablet menu. Gradient/image backgrounds still require manual review; this is not a full WCAG certification.

## Issues discovered and fixes applied

| Location | Evidence before fixing | Resolution |
|---|---|---|
| `src/app/globals.css` — Research feature | At 1440px with every text role doubled from its computed size, Research content extended 498px past its fixed photograph container into subsequent content | Replace fixed 600px height with 600px minimum and 96px vertical padding. Default feature remains 600px; enlarged-text feature grows to 1194px and contains the content |
| `src/app/globals.css` — hero shade | Background sampling found small green/white bottom labels below normal-text contrast at 1280/1440px (lowest initial green sample 3.14:1) | Increase the bottom black gradient opacity from 18% to 65%, preserving the vehicle composition and existing typography |
| `src/app/globals.css` — achievement photo shade | The third slide’s small white caption sampled at 3.74:1 on 390px mobile | Extend the existing lower gradient to start at 55% instead of 70%, preserving photography and text layout |
| `src/components/track-record.tsx` — indicators | axe flagged `aria-label` on a generic div for manual review | Add `role="group"` to the named indicator controls; the semantic warning is resolved |
| `src/components/navigation.tsx` — link handling | Ctrl-click was always prevented by the custom anchor handler | Preserve native modified-click behavior; intercept only ordinary primary-button navigation |
| `src/components/navigation.tsx` — selected link | After choosing Vehicles and using browser Back, URL hash was empty while Vehicles retained `aria-current` | Subscribe to URL hash/history state rather than retaining the last clicked label. Back and deep links now update the selected state |
| `src/components/home-sections.tsx` — sponsor description | The description could imply that all 27 listings belonged to the 2026 programme, although JNE/Nexa are additional official-site listings | Clarify the description: “Reported 2026 programme supporters and additional official-site listings.” Preserve all names, logos and ordering |

## Responsive and visual review

Inspected actual full-page screenshots at **390, 440, 768, 1280, 1440 and 1920px**, with a 1100px viewport height. Section screenshots at 390/1440px and comparative overview sheets are in [final-audit-previews](final-audit-previews/).

- Initial viewport contains the hero and navigation; About begins at y=1100. Tablet/mobile image and content can grow rather than clipping in shorter viewports.
- Vehicle images use contain and retain the complete vehicle; specifications remain native, readable text. Research and team crops preserve the engineering/team subjects at the reviewed sizes.
- Editorial sections retain their existing spacing and hierarchy. At 1440px: About **605px**, Research **824px** (600px feature plus topics), Vehicles **1477px**, Track Record **928px**, Team **697px**, Sponsors **1296px**, Contact **387px**, Footer **396px**. Normal-text heights did not need enlargement as part of this audit.
- About deliberately retains its approved left text column and open right side. It is quieter and less photographically balanced than the later sections. Changing that composition would be a redesign and is outside this task.
- All 27 sponsor logos load, have names, preserve proportions, fit inside their tiles and remain represented: two columns on mobile, three on tablet, five on desktop. The last odd mobile tile is a real listing, not an empty filler. Contact and footer follow the completed grid without overlap.
- No unintended horizontal overflow, visible text clipping or adjacent-section overlap was detected at the reviewed default sizes or 320px. Intentionally masked carousel content and screen-reader-only status text are excluded from clipping diagnostics.

## Interaction and functionality

**Navigation:** viewport-sized black modal, plain five page names, logo/X placement, fixed-body background lock, saved-position restoration, Escape/X/link closure, close-button initial focus, Tab/Shift+Tab containment and trigger restoration passed at 390/440/768px. Link activation unlocks before scrolling and focuses the destination section. Resize to desktop unlocks/closes the modal. Reduced motion disables transitions. Browser Back clears obsolete selection.

**Carousel:** measured horizontal movement during the 500ms transition, mounted cards, previous/next, both wrap directions, rapid repeated input, Home/End/arrow keys, pointer swipes, trusted Chrome touch input and vertical-swipe guard passed. Reduced motion changes slides without animation. Active indicators and counters match the three records. Team position remains unchanged during slide changes at all six widths. Captured transition frames show loaded imagery; no content replacement flash or section shift was observed in these runs.

**Links/assets:** every internal anchor has a target; controls have accessible names; all 47 rendered image elements load (including intentional responsive duplicates/clones). Mail links use `mailto:anargya@its.ac.id`. Official About/Team and Instagram/Facebook/YouTube URLs returned HTTP 200 during this audit. HTTP reachability does not certify social account content, authenticated behavior or email delivery; no messages were sent.

## Accessibility and performance

- One page H1; logical H2/H3/H4 content hierarchy; skip link navigates to main content. Native links/buttons, meaningful alt text, decorative-image alternatives, visible focus outlines and polite carousel status are present.
- Token contrast on black / #121212 respectively: white **21.00 / 18.73**, secondary gray **10.02 / 8.93**, green **11.25 / 10.04**. Solid-background normal text passes 4.5:1.
- Image-background sampling: hide foreground text without changing layout, disable color transitions, sample the actual rendered backgrounds across the text ranges, then calculate contrast using the computed foreground color. All **58 sampled ranges** at the six requested widths pass; lowest sampled ratio **4.76:1**. Results are in `photo-contrast.json`. All three achievement-caption states are also sampled at every requested width in `slide-caption-contrast.json`; all 18 pass, with a minimum of 5.98:1. These sampled crops do not prove every possible viewport/image composition.
- Text enlargement to 200% at 768/1280/1440/1920px passed the Research containment and page-overflow regressions. Text-spacing overrides (1.5 line height, .12em letter spacing, .16em word spacing, 2em paragraph spacing) passed Research containment and page-overflow checks at 320/390/768/1440px.
- 43 of 47 rendered image elements use Next.js optimization and responsive sources; the other four are small SVG controls. Below-fold imagery is lazy by default, except the three carousel photos and their boundary clones, intentionally eager to avoid blank transitions. Local font uses swap; image containers reserve space. No extra runtime libraries were added.
- Lighthouse CLI was unavailable, so **no Lighthouse score is claimed**. Browser PerformanceObserver recorded these local, unthrottled navigation observations:

| Width | Observed LCP | Observed CLS | axe violations |
|---|---:|---:|---:|
| 390px | 612 ms | 0.000000 | 0 |
| 440px | 192 ms | 0.000000 | 0 |
| 768px | 304 ms | 0.000000 | 0 |
| 1280px | 136 ms | 0.000000 | 0 |
| 1440px | 140 ms | 0.000000 | 0 |
| 1920px | 212 ms | 0.000016 | 0 |

These localhost figures include cache/machine-load effects and are not field Core Web Vitals, a throttled mobile benchmark or an INP assessment. Initial resource transfers were approximately 0.7–1.0MB in the recorded runs. Raw navigation/resource data is retained in `results.json`.

## Technical validation and evidence

- `npm run lint`: passed without warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; homepage statically prerendered.
- `git diff --check`: passed.
- `tests/navigation-check.cjs`: mobile/tablet menu and history checks passed.
- `tests/site-check.cjs`: broad homepage, anchors, carousel keyboard/trusted touch and sponsor checks passed at 1440/768/390px.
- `tests/ui-fixes.cjs`: measured transitions, loops, rapid input, reduced motion and forced sponsor-image failure fallback passed at 1440/768/390/440px.
- `tests/final-audit.cjs`: six requested widths plus 320px, rendered inventory and axe scans passed the recorded checks.
- `tests/audit-regressions.cjs`: semantic grouping, modified clicks, slide counters, stable Team position, skip link and enlarged-text checks passed.

Harnesses use the host-provided Playwright package via `PLAYWRIGHT_MODULE`. The final audit also requires `AXE_PATH` (default `/tmp/anargya-axe.min.js`), downloaded temporarily from [axe-core 4.10.3](https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.3/axe.min.js). Neither tool was installed into the application. Review also used the [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) and existing project design/content documents.

## Files modified by this audit

Application: `src/app/globals.css`, `src/components/navigation.tsx`, `src/components/track-record.tsx`, `src/components/home-sections.tsx`.

Audit tools: new `tests/final-audit.cjs`, new `tests/audit-regressions.cjs`, updated `tests/navigation-check.cjs` (Back-selection regression).

Documentation: this report and `docs/final-audit-previews/`. Running the existing checks refreshed their navigation, implementation and UI-fix preview outputs. Earlier user changes and implementation files remain in the working tree; no commits or pushes were made.

## Tests not completed and remaining limitations

- No Safari/Firefox, physical iOS/Android device, screen-reader session, device notch/orientation or OS-level mail-client test. Browser touch simulation is not a physical-device certification.
- No Lighthouse score, production hosting/network measurement, field INP, exhaustive WCAG assessment or every possible intermediate-width/text-override combination.
- External pages returned HTTP 200; their complete authenticated flows and social-account visibility were not tested.
- Asset licensing/logo-use permission remains as documented in `anargya-assets.md`. The source inventory supports reported acknowledgments, not independently confirmed current sponsor contracts. Achievements remain explicitly team-reported; historical team photography is preserved.
- No unresolved functional defect remains from the completed checks. The approved About composition and the coverage limits above remain review considerations.

Stop here for submission review. Nothing deployed; Figma unchanged.
