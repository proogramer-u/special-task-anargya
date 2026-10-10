# Targeted UI fixes — 10 October 2026

Completed only the requested sponsor grid, sliding Track Record and hero height fixes in the existing Next.js application. Figma, verified sponsor/achievement data, original assets and unrelated sections were preserved. No deployment or dependency installation.

## Sponsor grid

The blank space was a **CSS grid hole**, not an empty sponsor record or missing asset. On mobile, the explicit `nth-child(26) { grid-column: 1 }` forced JNE into the next row after Pertamina NRE had already occupied column 1. That left column 2 beside Pertamina empty. All 27 data entries have unique nonempty names and all original logos loaded during the final browser check.

Removed the mobile forced placements. Natural two-column auto placement now fills every pair and leaves only the normal final unpaired Nexa Logistic card, aligned left. No filler card is rendered. Existing tablet/desktop arrangements remain. All verified sponsors are kept; only a genuinely empty name would be filtered. Extracted a small client SponsorTile component: an unavailable/failed logo is replaced by its readable sponsor name in the logo well, with the original caption and record retained. Contain sizing, padding, corners and colors are preserved.

## Sliding carousel

Previously the React component replaced the active card's contents and had no moving track. It now renders all three achievements permanently in a horizontal flex track inside an overflow-hidden viewport. One leading boundary clone and two trailing clones preserve the visible next card at wrap boundaries (six mounted cards total; still three unique achievements).

ResizeObserver measures the actual card width plus CSS gap. Transform transitions use `translate3d` with `500ms cubic-bezier(.22,1,.36,1)`. Desktop keeps a prominent full card and the next-card portion; tablet keeps its 544px featured card at 768px with a partial next preview; mobile shows one full card. Content and photographs move with their cards. Tablet outgoing information remains visible during movement rather than disappearing when active state changes. Images are loaded ahead of their entrance to prevent blank-photo transitions.

Transition end resets boundary clones to their visually identical real positions with animation disabled. Rapid requests coalesce to the latest pending intent, which starts after normalization has painted; invalid positions cannot accumulate. A timeout unlocks interrupted transitions without adding autoplay. Resize/motion preference changes cancel movement into a valid canonical position. Keyboard arrows/Home/End, direct indicators and touch/pen swipe are retained. Reduced-motion skips animation. Counters and selected indicators track the logical achievement, including clone wraps.

## Hero height

The old desktop minimum was 960px, allowing About into a taller initial viewport. Desktop now uses `min-height: 100svh` with fluid content padding and normal flex flow. The absolute navbar still overlays the hero and has sufficient clearance. Tablet/mobile subtract the 80px in-flow navigation height from the viewport minimum. The narrow photo can grow into available space. The section remains content-driven and can exceed the minimum; important copy is not clipped to a fixed hero height. The original full-bleed photo uses proportional object-cover and the existing centered focal point.

## Validation

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.
- Production Chrome checks at **1440, 768, 390 and 440px**, each with 1100px viewport height: PASS. About begins at y=1100 in each initial viewport.
- Actual intermediate transform sampling proves horizontal movement: desktop −736 → −942.402 → −1472; tablet −560 → −717.444 → −1120; mobile 390 −364.391 → −417.903 → −728.781; mobile 440 −414.391 → −474.955 → −828.781. Cards remain mounted.
- Next/previous, last-to-first and first-to-last wraps, rapid input, indicators, keyboard, pointer swipes, reduced-motion, all 27 unique logos and natural mobile row pairs: PASS.
- Forced IPG image request failure: PASS; its name fallback appears and the inventory remains 27.
- Existing broader menu/navigation/contact/image/overflow checks at 1440/768/390: PASS, including Chrome trusted touch-event emulation and vertical gesture guard.
- Rendered hero, sponsor wall, moving carousel and fallback screenshots inspected. No observed unintended clipping or horizontal page scrolling; offscreen slides are deliberately clipped by the carousel viewport. No browser runtime exceptions.

Safari, Firefox, physical-device and screen-reader testing remain unverified. No full accessibility certification is claimed. This update supersedes the older disabled-end-button/static-carousel behavior and fixed-height geometry documented in the overnight handoff.

## Files

- `src/components/home-sections.tsx`: sponsor render guard and extracted tile usage.
- `src/components/sponsor-tile.tsx`: new name fallback on missing/failed image.
- `src/components/track-record.tsx`: mounted track, measured movement, clone wrap/queue and interactions.
- `src/app/globals.css`: natural mobile grid, viewport hero and sliding/preview styles.
- `tests/site-check.cjs`: updated expectations for looping and intentionally clipped offscreen slides.
- `tests/ui-fixes.cjs`: new focused motion, viewport, inventory/fallback and interaction checks.
- `docs/ui-fix-previews/`: four-width screenshots and [results](ui-fix-previews/results.json).

The 27-sponsor inventory and three verified achievements were unchanged. Review [mobile sponsor wall](ui-fix-previews/390-sponsors.png), [desktop hero](ui-fix-previews/1440-hero.png), [moving tablet track](ui-fix-previews/768-carousel-moving.png) and [fallback](ui-fix-previews/missing-logo-fallback.png). Refresh the local production preview at [127.0.0.1:3001](http://127.0.0.1:3001).
