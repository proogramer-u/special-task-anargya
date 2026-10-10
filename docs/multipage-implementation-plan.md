# Anargya multi-page implementation plan

10 October 2026 · **Planning only; implementation awaits approval.** Use [architecture](multipage-architecture.md) for page content and [art direction](multipage-art-direction.md) for composition. Keep the existing Next.js project, approved functionality and official assets. No deployment, commerce, accounts, CMS, database, payment flow or PWA is required.

## Current implementation and migration boundaries

The existing project uses Next.js 16.4.0 App Router, React 19.3, TypeScript and Tailwind 4. `src/app/page.tsx` currently owns navigation, every homepage section, contact and footer. `layout.tsx` supplies document/font/metadata. `home-sections.tsx` mixes identity, vehicle profiles, research, team, sponsor and footer content. `navigation.tsx` is a client dialog with hash navigation and careful scroll/focus handling. `track-record.tsx` supplies the working manual looping carousel. `ui.tsx` supplies action links, photographs and section headings; `sponsor-tile.tsx` supplies image-failure fallback. Data lives in `site-content.ts` and `sponsors.ts`.

Reuse these contracts rather than replacing the application. Preserve final-audit fixes, source-based data, responsive crops and local Inter. The full-screen menu and looping carousel supersede earlier handoff statements describing a shorter menu or disabled carousel boundaries.

The App Router plan follows the installed Next.js guides under `node_modules/next/dist/docs/01-app/01-getting-started/`: `03-layouts-and-pages.md`, `04-linking-and-navigating.md` and `14-metadata-and-og-images.md`. Read the relevant installed API documentation again when actually implementing; avoid importing assumptions from an older Next version.

## Proposed source structure

```text
src/app/
  layout.tsx                 shared document, navigation, main, contact, footer
  globals.css                existing tokens/base + deliberate page compositions
  page.tsx                   shorter Home
  team/page.tsx
  vehicles/page.tsx
  achievements/page.tsx
  research/page.tsx
  sponsors/page.tsx
  not-found.tsx              useful return paths if needed
  icon.png                   existing identity retained
src/components/
  navigation.tsx             existing dialog adapted to routes
  ui.tsx                     retained primitives, internal-link support
  track-record.tsx           existing Home carousel retained
  sponsor-tile.tsx           existing image fallback retained
  home-sections.tsx          slimmed Home composition during migration
  site-footer.tsx            extracted shared contact/footer
  page-masthead.tsx          configurable native H1/photo/intro
  vehicle-profile.tsx        rendering/specification anatomy
  achievement-entry.tsx      static readable record
  sponsor-wall.tsx           complete inventory and evidence qualification
src/lib/
  site-content.ts            identity/contact/navigation configuration
  sponsors.ts                existing inventory, preserved programme flags
  vehicles.ts                canonical source-qualified vehicle records
  achievements.ts            canonical records shared with Home carousel
  research.ts                dated programme/topic records
  team.ts                    supported history, no invented roster
```

Names are proposed responsibilities, not a requirement to create an abstraction for every paragraph. Keep page-specific editorial sections in their route file unless genuine reuse or complexity warrants extraction. Avoid one universal “three-column page” component. No route groups, dynamic slugs or nested detail pages are needed for six top-level static pages.

Root layout should own exactly one skip link, header, `<main id="main-content">`, shared contact band and footer. Route components supply their own H1 and sections without a second main/header/footer. Put shared `#contact` outside main if it follows the route's main content; do not duplicate it within Home. Preserve existing visual treatment when extracting the contact/footer. Layout persists across route navigation, so menu state must explicitly close when the route changes.

## Data and evidence organization

Use static typed records and local image imports. No runtime scraping of official websites or external content API is necessary. Keep presentation and evidence separate:

| Record | Fields needed | Rules |
|---|---|---|
| Identity/history | Statement, date/period, source URL, checked date, optional image/caption | Team-reported and historical context retained |
| Vehicle | Stable ID, name, programme year/context, render/photo, alt/caption, optional labeled specifications with units/source | Missing specs are absent, never zero or copied from another model |
| Achievement | ID, year/range, ending year for ordering, event, category, placement, source, image/caption | Preserve three approved records; no overall-rank inference |
| Research | ID, programme period, topics, source-based summary, source, image context | No unverified method/performance/publication fields |
| Sponsor | Existing name/image/light/programme plus source URLs/evidence date | Exactly 27 selected acknowledgments; aliases resolved in crosswalk; no invented tier |

Content records should record verification scope such as `team-reported`, `programme-reported` or `official-site-listing`, rather than a blanket current/verified Boolean. Use provenance during review and visible qualifications where material to interpretation; do not print technical data fields in the UI. Home summaries and inner-page details consume the same values. Do not bundle all page photography into a global navbar import.

Public pages omit unavailable roster, publications, tiers and disputed awards. Development drafts can note gaps in documentation; avoid shipping generic placeholder people/cards just to fill a design. Asset rights remain a publication decision documented in the manifest, not a reason to replace official images with stock imagery.

## Server and client boundaries

All route pages, mastheads, history, specification lists, research articles, achievement archive and footer should remain Server Components with static metadata. Keep client code limited to navigation, the existing Home carousel and sponsor image-failure handling. The complete archive and logo inventory must remain present in initial markup; no client-only data loading is required.

Adapt `ActionLink` to use `next/link` for internal routes while preserving ordinary anchors for fragments, email and external destinations. Preserve native modified clicks, external `rel` safety and meaningful link labels. Make `SectionHeading` eyebrow optional and heading semantics explicit rather than forcing repeated labels or H2s into page mastheads. Extend `Photo` only as needed for focal position, sizes and aspect-ratio variants; do not disturb its working contain behavior.

## Navigation migration — critical behavior

1. Replace the five hash-only global items with Team `/team`, Vehicles `/vehicles`, Achievements `/achievements`, Research `/research`, Sponsors `/sponsors`. Logo links `/`.
2. Derive active route from App Router pathname; use exact top-level matching and `aria-current="page"`. Keep fragment state only for genuine in-page indexes, not global selection.
3. Retain native dialog, background inertness, focus loop, solid-black full-screen coverage and scroll-lock cleanup. Preserve X/Escape/cancel restoration on the same page.
4. Separate menu cancellation from navigation. Unlock before route transition; do not reuse current `history.pushState`/`querySelector(href)` logic with `/vehicles`. Ensure no old-scroll restoration undoes new route scrolling. Close on pathname change, including Back/Forward and desktop breakpoint transitions.
5. Verify focus after a transition reaches the new page's main/heading or another deliberate accessible destination. Do not restore focus to a hidden trigger or closed dialog. Avoid duplicate focus/scroll effects fighting Next's route behavior.
6. Test routes reached directly, via desktop links, mobile links, browser history and modified clicks. Preserve same-page contact anchors and keyboard access. Labels remain unnumbered.

Do not replace the accessible dialog with a visually similar uncontrolled overlay. A persistent layout makes route-change cleanup a new regression risk even when the old Home-only menu passed its audit.

## Metadata, SEO and delivery behavior

- Root title template plus unique page title and concise factual description; one H1 per route. Suggested title subjects: Home/Formula EV Research Team, Team, Vehicles, Achievements, Research, Sponsors, followed by Anargya ITS.
- Static `Metadata` exports suffice; no dynamic metadata fetch required. Keep document language English, identify any substantial Indonesian copy when appropriate.
- Use truthful page-specific Open Graph image context and alt text. Do not label historical photos as the current generation. A shared team identity image is acceptable when no distinct suitable image exists.
- Deployment base URL is unconfirmed. Do not assume the new project owns `anargyaits.com` or publish localhost canonicals. Set absolute canonical/Open Graph URLs, `metadataBase`, robots and sitemap after an approved deployment origin is known. Plan a six-route sitemap then; no deployment occurs in this work.
- Keep semantic links, heading order, image alt/captions and content visible without interaction. Avoid unsupported structured claims about rankings, sponsorship contracts or current personnel.
- Continue Next Image optimization, explicit `sizes`, reserved image dimensions and local originals. Preload only the visible priority masthead/hero image; lazy-load below-fold imagery. Avoid loading the 27-logo wall on every page once it moves to Sponsors.
- Preserve existing CSS tokens and responsive conventions. Scope page layout classes to avoid global selector changes breaking Home. No additional UI/animation dependencies are needed.

## Proposed development sequence and review gates

| Step | Work | Acceptance before continuing |
|---|---|---|
| 0 — proposal approval | Review these three documents, content omissions and shorter Home | User approves architecture/art direction/sequence; no implementation before this |
| 1 — same-file Figma extension | Shared route navigation; distinct desktop Vehicles/Team compositions; then Research, Achievements, Sponsors and revised Home; responsive 768/390 variants | Native editable designs reviewed in existing file, foundations preserved; follow AGENTS design-before-code requirement |
| 2 — shared implementation shell | Extract contact/footer, add route-aware navbar and internal-link primitive; keep current Home content initially | All routes under construction have working shell; old menu/carousel regressions tested |
| 3 — Vehicles | Canonical Mark records, contained renders, sourced Mark 5 specs and honest Mark 6 gaps | Readable technical page, model anchors and no crop/spec errors |
| 4 — Team | Identity/history and historical people photography; omit current roster | No eighth-generation material mislabeled as ninth/current |
| 5 — Research | Dated engineering chapters with cross-links to vehicle anchors | All claims/captions source-supported; no fake research records |
| 6 — Achievements | Static chronological archive using same three records as Home | Every record accessible and category/year preserved |
| 7 — Sponsors | Move/reuse full wall, qualify evidence and retain separate contact | All 27 actual logos, no clipping, no tiers/media invention |
| 8 — Home integration | Shorten to approved gateway; point CTAs into canonical pages | Working carousel preserved, no duplicated detail blocks or dead anchors |
| 9 — site-wide validation | Cross-route interaction, responsive, accessibility, metadata and build checks | Confirmed defects fixed; updated handoff/audit/progress report, user review; no deployment |

Build inner-page content before shortening Home so useful material is never temporarily lost. Use incremental focused patches. Existing uncommitted workspace work must be preserved; do not reset or replace the project. Figma and implementation can be reviewed in approved increments, but each page's design must precede its frontend implementation.

## Validation plan

Reuse meaningful existing browser tests and update their assumptions where ownership changes. A test expecting all 27 logos on Home becomes a Sponsors-page assertion; do not reduce the expected inventory. Hash-navigation tests become route-navigation tests while same-page contact/vehicle anchors retain coverage.

| Area | Required checks |
|---|---|
| Routes/links | Direct load/refresh of six routes; all global/footer/CTA destinations; no placeholder `/404` links; Back/Forward and modified clicks |
| Shell/menu | Exactly one main/H1; full-screen mobile/tablet dialog; no numbers; X/Escape/link close; focus containment/restoration/route handoff; background lock and scroll restoration |
| Responsive | Complete six pages at 390, 440, 768, 1280, 1440, 1920; 320px reflow and 200% text; no horizontal document overflow, clipping or artificially stretched sections |
| Images/data | All images decode; deliberate crops and no distortion; 27 contain logos with names/padding; Mark 5 values/units exact; Mark 6 omissions; three achievements consistent across pages |
| Carousel | Home previous/next, last-to-first/first-to-last, fast repeat activation, keyboard, touch/vertical-scroll guard, indicators/status and reduced motion; preserve final-audit fixes |
| Accessibility | Logical headings, alt text, focus visibility, current-route semantics, links/controls accessible names, contrast on final crops, keyboard traversal and route announcement |
| Technical | ESLint, `npm run typecheck`, production build; inspect console/network errors and rendered production routes |
| Performance/SEO | Responsive image sizes, route-appropriate image loading, reserved space, unique metadata; Lighthouse if available, with tool/environment and results recorded |

Compare rendered pages to their newly approved corresponding Figma frames. Automated bounds checks alone do not validate visual quality. Record actual screenshots and inspect full page plus section transitions. Physical touch devices, Safari/Firefox, screen-reader behavior and Lighthouse must be recorded as untested if unavailable; do not carry forward old Home-only audit results as proof of the new site.

## Remaining decisions and limits

Required now: approval of architecture, art direction, shorter Home and the design-before-code sequence. Optional future inputs: confirmed ninth-generation roster/portraits, Mark 6 technical sheet, resolved awards, fuller research evidence and supporter permissions/current relationships. These optional gaps do not prevent the supported six-page baseline. Deployment origin and publication rights remain later decisions. This planning increment does not run app validation commands because it changes no application code; its checks are document consistency, source review and confirmation of unchanged source/assets.
