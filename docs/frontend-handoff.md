# Anargya LOW website — frontend handoff

Implementation authorized autonomously on 10 October 2026. Scope: responsive company profile in the existing Next.js 16.4 / React 19.3 / TypeScript / Tailwind 4 App Router project. No MED commerce, HIGH PWA, deployment or Git push. Existing research and approved designs supply the requirements; no new branding concept is introduced.

## Figma audit and authority

Existing file: [Anargya ITS — Website Design](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h). Full high-fidelity design context and reference renders obtained for Desktop `20:3`, Tablet `68:181`, Mobile `68:180`, and open mobile menu `71:652`. No Code Connect implementation mappings appeared. The project contains starter files, with no existing section components to reuse.

Read AGENTS.md and all project reference documents. Current recursive Figma inspection found zero visible descendant containment faults and zero missing fonts across the three homepages. All 27 sponsor logos use FIT and fit within their logo wells. Current full-frame renders and individual carousel renders were visually inspected. No confirmed defect required a Figma mutation; approved designs and foundations were preserved.

| Layout | Width / height | Grid / spacing | Implementation behavior |
|---|---|---|---|
| Desktop | 1440 / 7606.85 | 1280 content, 80 margins, 96 section padding, 48 editorial gap | Full-bleed 960px hero, photographic 600px Research feature, alternating vehicle/team rows, two achievement cards, five sponsor columns |
| Tablet | 768 / 9671.47 | 704 content, 32 margins, 48 section padding | 80px menu header, introduction above 480px hero photo, stacked editorial content, full 544px achievement plus 144px next-image preview, three sponsor columns |
| Mobile | 390 / 10287.43 | 348.4 content, 20.8 margins, 48 section padding | Introduction above 420px hero photo, stacked actions and sections, one achievement card, two sponsor columns |

Use fluid interpolation between these widths. Proposed implementation thresholds: mobile below 640px, tablet 640–1023px, desktop at 1024px and above. These are frontend extensions, not claimed original Figma breakpoints. Let content grow; do not reproduce fixed heights that clip copy at intermediate widths or text zoom. Preserve the desktop About section's intentionally open right side; do not add the orphan canvas photo or invent missing About imagery.

Implementation refinement: disable Inter optical sizing to preserve Figma line breaks and use grayscale font smoothing. Sponsor borders retain the inspected 22% opacity of the existing border token. Original font/license sources: `https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf` and the adjacent `OFL.txt`.

## Tokens and reusable components

Black #000, muted #121212, green #29D970, primary white, secondary #B3B3B3, border #E5E5E5; 6px corners. Existing size scale 12/14/16/18/20/24/28/32. Base 16/24; headings 28/35, display 32/40. Inter is the approved Figma approximation of the official system-sans stack; self-host its licensed original variable font to match Figma without build-time font fetches. Preserve OFL license.

Components: SectionHeading, ActionLink, Photo, Navigation (client), ResearchTopics, VehicleProfile/Specifications, AchievementCard and TrackRecord (client), SponsorWall/LogoTile, Contact, Footer. Keep the page and static content as Server Components. Only the navigation panel and carousel need client state. Tailwind utilities and centralized semantic CSS tokens express the layouts; no new design or animation dependency.

## Exact asset mapping

Every photographic/logo Figma hash matched the SHA-1 of an existing original asset. Use files under `/images/anargya/`, not exported full-page screenshots or ephemeral Figma URLs.

| Slot | Exact existing file | Fit |
|---|---|---|
| Header identity | logo-polos.png | contain |
| Hero, all widths | anr-testing.png | cover; centered proportional crop |
| Research photo | fsae-j-4.jpg | cover |
| Mark 6.0 | mk6-side-left.png | contain |
| Mark 5.0 | mark5.png | contain |
| Team | fsae-j-2.png | cover |
| 2025 achievement | timeline-2025-3.jpg | cover |
| 2022–2024 achievement | timeline-2024-1.jpg | cover; contextual timeline photograph |
| 2023 achievement | timeline-2023-3.jpg | cover |
| Footer identity | logo-anargya-inline.png | contain |
| 27 supporter marks | anargya-sponsors-2026.md crosswalk | contain, original colors |

Use Next Image with responsive sizes and intrinsic dimensions. Original files remain unchanged; Next handles serving optimizations. Figma's four generic interface icon SVGs are downloaded locally to `public/icons`, preserving their 24×24 roots. Font: Google Fonts Inter original variable TTF and accompanying SIL OFL file under `public/fonts`.

## Content and destinations

Copy comes from the approved native text and `anargya-content.md`. Three team-reported achievements retain exact category/year labels; omit disputed PR Award and ambiguous overall rankings. Mark 5.0: 220kg, 80kW, 6.9kWh, 120km/h. Mark 6.0 specifications unavailable. Founding September 2018; autonomous technology is a research focus, not a claimed completed autonomous system. Team photograph is historical, not a new ninth-generation roster assertion.

Preserve all 25 July 2026 programme supporter acknowledgments and the separate provenance of JNE/Nexa Logistic as additional official-site listings. The current approved layouts visually combine them in one wall: the final pair is centered on desktop, occupies the final two cells of the last tablet row, and has its own final mobile row. The data's programme flag, accessible list name and additional-listing tooltip preserve the distinction without adding an unapproved visible tier heading. No invented tiers/current contract claims. Do not add the unconfirmed media-partner inventory. Original logo colors remain; selected dark lettering gets the exact light backing from Figma. Rights and current relationship uncertainties are documented in existing manifests and remain publication review items, not reasons to stop local implementation.

Internal navigation and vehicle/research CTAs target real section IDs. Learn our history and Meet the team link to the corresponding official public pages. Email links use mailto:anargya@its.ac.id. Instagram, Facebook and YouTube use published destinations; omit the conflicting LinkedIn destination. No contact submission backend is promised.

## Interaction acceptance criteria

Menu: nonmodal dropdown as approved; native toggle with expanded/controls semantics, Escape closes and restores focus, clicking a link closes, links stay keyboard accessible, panel hidden outside its open state. Close on desktop resize and outside activation without interfering with internal clicks.

Carousel: three manual slide positions, no autoplay. First Previous/last Next disabled. Native buttons and indicators with descriptive labels and accurate active state; ArrowLeft/Right, Home/End while carousel has focus; touch/pointer horizontal swipe with vertical-scroll guard. Announce selected competition/year/result through a polite live status. Preserve desktop's two-card composition (final position previews the first record), tablet bounded next-image preview and mobile single card. No horizontal page scrolling or inaccessible offscreen card controls. Reduced-motion disables cosmetic transitions.

## Validation plan

Run ESLint, TypeScript and production build. Use the existing bundled browser automation package with installed Chrome, without adding a project dependency. Inspect full rendered production homepage at 1440, 768, 390; compare section crops against Figma. Test menu focus/Escape/links, carousel buttons/indicators/keyboard/swipe/boundaries, 27 sponsor images and contain sizing, mail/social destinations, document width and image loading. Also inspect intermediate widths and narrow/zoom reflow. Record actual results and limitations in `overnight-progress.md`.
