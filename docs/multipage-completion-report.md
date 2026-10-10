# Anargya multi-page completion report

10 October 2026 · LOW company-profile scope · Local preview: [http://127.0.0.1:3003/](http://127.0.0.1:3003/).

## Completed routes

| Route | Delivered features |
|---|---|
| `/` | Established cinematic hero and identity introduction; concise vehicle, research, team and supporter previews; links to every dedicated page; original interactive Track Record carousel; shared contact/footer. Detailed specifications and the full sponsor wall now live on their own pages. |
| `/team` | Existing editorial story and organization retained. 64 verified unique members / 65 role placements, plus the advisor; explicitly eighth generation. Four categories, 12 subdivisions, management/Heads/Staff grouping, keyboard tabs, subdivision anchors and active scroll states. Shared silhouette portraits and image-error fallback remain intact. Only its header/footer integration changed. |
| `/vehicles` | Clear official Mark 6.0 photographic masthead; generation anchors; Mark 6.0, 5.0 and 4.0 profiles with contained official imagery; Mark 5.0 specification list; dated development context; source links and related pages. Go-Kart EV is acknowledged without fabricated imagery/specifications. |
| `/achievements` | Featured 2025 Presentation EV result; existing three-title Pi-EV sequence; dated 2025/2024/2023 result archive with official photos, category labels and sources; qualified 2022 event listings. No disputed PR Award year or inferred 2026 result. |
| `/research` | Engineering photography and dated chapters covering battery-pack architecture, lightweight chassis, aerodynamics, vehicle dynamics/telemetry and powertrain work. Autonomous technology is explicitly a published research focus, not an invented completed project. |
| `/sponsors` | All 27 original supporter logos: 25 reported 2026 programme acknowledgments and two additional official-site listings. Five desktop / three tablet / two mobile columns; contain image wells and readable fallback labels; three dated official partnership reports; separate collaboration CTA. No inferred tiers or current-contract claims. |

The Root Layout now owns one shared navbar and skip link across all routes. Logo links Home; Team, Vehicles, Achievements, Research and Sponsors link to actual routes with active-page states. Contact remains globally available as a band/footer. The full-screen solid-black menu preserves scroll locking, keyboard trapping, Escape/X closure, scroll/focus restoration, unnumbered labels and route navigation. Client navigation focuses the destination heading. Each inner page has title/description metadata and is statically prerendered. Static editorial sections remain Server Components; existing interactive directory, menu, carousel and image fallbacks retain client state.

## Content integrity and missing information

Primary factual sources remain [the content inventory](anargya-content.md), [asset manifest](anargya-assets.md), [verified roster](anargya-team-directory.md), and [supporter crosswalk](anargya-sponsors-2026.md). Native page content links to official source pages and dated reports.

- Team: all names and roles remain verified against the 65 official card references. Putra Valen Simbolon's two assignments retain one identity. The published paired Heads in two Electrical subdivisions remain unchanged. **The source is eighth generation; a current ninth-generation roster is unconfirmed.** No new portraits were scraped or published.
- Vehicles: only Mark 5.0 has published quantitative specifications: 220 kg, 80 kW, 6.9 kWh, 120 km/h. Mark 6.0 and Mark 4.0 specifications are explicitly unavailable. No motor model, cell chemistry, performance improvement or engineering measurement was inferred.
- Achievements: team-reported event/category/year results, not independently audited organizer results. The PR Award year conflict and regional-ranking ambiguity are excluded. 2022 track-record event labels do not imply prizes or a Formula E racing entry. No 2026 result is claimed.
- Research: no unsupported publication list, named autonomous system, experimental protocol or quantified engineering outcomes. Generic preparation photos do not purport to show a battery test or a specific research experiment.
- Sponsors: all 27 selected assets are available and loaded. Programme reporting and official-site acknowledgment do not prove active contracts or tiers. The report-only 15-name media roster remains excluded pending team-side season confirmation. Dated official articles describe support without promising ongoing relationships.
- Existing photo and logo reuse permissions remain unresolved as documented in the asset manifest. No stock images, unrelated logos, synthetic wordmarks or new personal information were introduced.

Structural reference: [Sapu Angin Cars](https://www.itsteamsapuangin.com/cars), [Achievements](https://www.itsteamsapuangin.com/achievements), [Sponsors](https://www.itsteamsapuangin.com/sponsors), and the existing Team/reference analysis. Adapted patterns are generation-based profiles and native technical lists, image-led competition chronology, documentary engineering chapters and an institutional sponsor wall. Its branding, images and source code were not imported. Anargya’s black/near-black, #29D970 accent, existing typography, token spacing and 6px corners remain the visual basis. Larger section gaps compose the existing 32px/48px tokens; no artificial fixed section heights were added.

## Verification and fixes

Pages were completed and checked in sequence: Team regression → Vehicles desktop/mobile → Achievements desktop/mobile → Research desktop/mobile → Sponsors desktop/mobile → Home/global navigation → site-wide audit. An actual desktop screenshot caught the homepage's absolute-navbar rule overlapping an inner-page heading. Inner-page navigation is now in normal flow; Home retains its hero overlay. Assertions now check header/title separation. The Vehicles masthead was refined from a motion-blurred testing image to the clear official `gl-mk-6-car.png`; the updated page received a further six-width audit.

| Check | Result |
|---|---|
| ESLint | Passed, zero errors |
| TypeScript (`npm run typecheck`) | Passed |
| Production build (`npm run build`) | Passed; all six required pages statically prerendered |
| Six routes × six widths | 36 passed route/viewport checks at 390, 440, 768, 1280, 1440 and 1920px |
| Menu | Full viewport, exact five unnumbered labels, body scroll lock, Escape/X/link closure, restored scroll/focus, route navigation; passed on mobile/tablet for all routes |
| Layout/images | No document overflow or clipped visible text; header/title separation; visible photographs decode; vehicle generation anchors exist; all 27 sponsor logos load and contain inside their tiles |
| Accessibility | Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA tags: zero automated violations across all 36 route/viewport states; updated Vehicles checked again at six widths |
| Homepage carousel | Existing six-width browser regression passed: previous/next, indicators, Home/End/arrows, simulated pointer and actual CDP touch swipe, vertical-gesture guard, loop positions; zero runtime errors |
| Carousel motion | 12 checks passed: last-to-first navigation and counters at all six widths with normal and reduced motion; reduced-motion transition duration is zero |
| Team directory | Repeated after shell integration: four widths (1440/768/390/320), all categories, 65 placements, shared portraits, keyboard tabs, subdivision anchors, broken-placeholder inline fallback; passed |
| Navigation focus/local links | Keyboard Tab/Shift+Tab trap, destination/Home heading focus and all collected local route/fragment links: passed |
| Protected implementation | SHA-256 comparison confirms `track-record.tsx` and the sponsor inventory source unchanged; roster asserts 64 identities / 65 placements and every portrait path still uses the shared placeholder |
| Visual inspection | Actual Chrome desktop/mobile openings and complete page previews reviewed; all routes photographed at 390/768/1440px, including sponsor/contact transition and editorial imagery |

Evidence: [36-state audit](completion-previews/audit-all.json), [updated Vehicles audit](completion-previews/audit-vehicles.json), [carousel motion](completion-previews/carousel-motion.json), [navigation/local links](completion-previews/navigation-links.json), [homepage/menu/carousel/sponsor regression](implementation-previews/browser-checks.json), [Team regression](team-previews/browser-checks.json). Automated accessibility results are not a complete manual assistive-technology certification. Physical iOS/Android devices, other browser engines and Lighthouse were not tested in this session. No deployment validation is claimed.

Browser tests use the already-available host Playwright/Chrome and temporary Axe script; **no dependencies were added**. Reproduce the main audit with:

```sh
BASE_URL=http://127.0.0.1:3003 \
PLAYWRIGHT_MODULE=/Users/CokordaBagus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
AXE_SCRIPT=/tmp/anargya-axe.min.js \
node tests/multipage-audit.cjs
```

Without `AXE_SCRIPT`, layout and functionality checks still run; automated accessibility checks are skipped. The local production preview remains on port 3003; pre-existing servers were not stopped.

## Files added or modified in this session

**Routes/layout/styles:**

- Modified `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/team/page.tsx`.
- Added `src/app/vehicles/page.tsx`, `src/app/achievements/page.tsx`, `src/app/research/page.tsx`, `src/app/sponsors/page.tsx`, `src/app/editorial.css`.

**Components and content:**

- Modified `src/components/navigation.tsx`, `src/components/home-sections.tsx`, `src/lib/site-content.ts`.
- Added `src/components/editorial-shell.tsx`, `src/components/home-gateway.tsx`.
- Added `src/lib/vehicle-content.ts`, `src/lib/achievement-content.ts`, `src/lib/research-content.ts`, `src/lib/partner-content.ts`.
- Existing Team card/directory components, canonical roster JSON, shared SVG placeholder, sponsor inventory/tile and carousel implementation remain preserved.

**Checks and documentation:**

- Added `tests/multipage-audit.cjs`; updated `tests/site-check.cjs` for route navigation and sponsor-wall relocation while retaining carousel checks.
- Added `docs/multipage-session-plan.md`, this report and `docs/completion-previews/` screenshots/JSON results; updated the existing multipage progress record and refreshed browser-generated implementation/Team preview artifacts.
- No package/config changes, new image downloads, Figma edits, deployment, Git push, e-commerce or PWA changes were made in this session. Earlier uncommitted work remains intact.

## Preview index

| Page | Desktop | Mobile |
|---|---|---|
| Home | [Preview](completion-previews/home-1440-opening.png) | [Preview](completion-previews/home-390-opening.png) |
| Team | [Preview](completion-previews/team-1440-opening.png) | [Preview](completion-previews/team-390-opening.png) |
| Vehicles | [Preview](completion-previews/vehicles-1440-opening.png) | [Preview](completion-previews/vehicles-390-opening.png) |
| Achievements | [Preview](completion-previews/achievements-1440-opening.png) | [Preview](completion-previews/achievements-390-opening.png) |
| Research | [Preview](completion-previews/research-1440-opening.png) | [Preview](completion-previews/research-390-opening.png) |
| Sponsors | [Preview](completion-previews/sponsors-1440-opening.png) | [Preview](completion-previews/sponsors-390-opening.png) |

Complete page screenshots and tablet previews are alongside these opening previews. The website is ready for local review; current roster confirmation, unpublished specifications, source conflicts and asset permissions remain content decisions, not fabricated fill-ins. No known blocking layout or functionality defect remains in the tested Chrome configurations.
