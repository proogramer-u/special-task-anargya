# Mobile and tablet navigation refinement

Completed 10 October 2026. Latest instruction scopes the refinement to mobile/tablet navigation and preserves desktop navigation and all homepage sections; the attachment's desktop spacing proposal was therefore not applied. No Figma edits or deployment.

## Result

The five links are About, Research, Vehicles, Team and Contact, with no numbers or numerical prefixes. A native modal dialog occupies the viewport with a solid black background, aligned vertical typography (32–48px), 24px link gaps, white default text and #29D970 hover, focus, pressed and selected-link states. The logo and close button occupy the top row. Safe-area padding and a scrollable overlay accommodate small viewport heights. Overscroll is suppressed.

Opening focuses the close button. The native dialog makes the background inert; explicit first/last Tab wrapping keeps focus in the menu. Escape and X restore trigger focus. Link activation unlocks the page before navigating to the target, then focuses the section for a continuous keyboard reading order.

Scroll locking records the current position, fixes the body with negative top/left offsets, preserves its previous inline styles, and compensates for scrollbar width. Closing restores those styles and restores the previous position without smooth scrolling; selecting a link then navigates to its target. Resizing to desktop closes and unlocks the menu. Opacity/translation transitions run for 300ms with native discrete display/overlay transitions where supported; reduced motion disables transitions. Older browsers without discrete transitions may close immediately.

## Verification

- ESLint: passed without warnings.
- TypeScript: passed.
- Production build: passed.
- Chrome rendered checks at 390, 440 and 768px: full viewport coverage, exact unnumbered link labels, common left alignment, visible logo, scroll locking/restoration, focus containment, Escape/X restoration, anchor navigation, reduced motion, desktop resize cleanup and no horizontal overflow passed.
- Existing homepage browser checks at 1440, 768 and 390px: carousel buttons, indicators, loops, keyboard and touch controls passed; all 27 sponsor tiles remain present; no runtime errors or document overflow.
- Captured and inspected actual mobile/tablet previews in `docs/navigation-previews/`.
- Safari, Firefox and physical-device/screen-reader behavior were not tested.

## Files changed for this refinement

- `src/components/navigation.tsx`
- `src/app/globals.css` (navigation rules only)
- `tests/site-check.cjs` (expanded-state assertion now targets the trigger)
- `tests/navigation-check.cjs`
- This report and navigation previews. The broad test also refreshed its existing implementation previews.

Desktop section heights and content remain unchanged. The Track Record carousel, sponsor inventory, colors, official imagery and Figma designs are preserved.
