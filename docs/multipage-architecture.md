# Anargya multi-page architecture

10 October 2026 · **Proposal awaiting approval.** Planning for the LOW company-profile task only. No routes, application changes, Figma changes, deployment, commerce or PWA work are included in this increment.

## Basis and evidence

Read alongside [art direction](multipage-art-direction.md) and [implementation plan](multipage-implementation-plan.md). Authority remains [AGENTS.md](../AGENTS.md), [Figma instructions](figma-instructions.md), [Anargya tokens](anargya-design.md), [existing analysis](design-analysis.md), [content inventory](anargya-content.md), [asset inventory](anargya-assets.md), and the corrected [supporter crosswalk](anargya-sponsors-2026.md). `docs/art-direction-review.md` was not present. Historical progress statements in earlier documents are superseded by their later entries and [final-audit.md](final-audit.md).

Inspection included current source files, the existing Figma desktop screenshot and desktop/tablet/mobile frame metadata, live Sapu Angin page text and desktop opening screenshots, and a browser-rendered Anargya homepage. The official Anargya page still publishes Mark 5.0 specifications and leaves Mark 6.0 values unpublished. Existing inventories supply deeper page evidence; this proposal does not claim a fresh exhaustive verification of every article, portrait or relationship. Reference responsive behavior comes from the existing analysis, not a new full breakpoint audit. Figma metadata cannot certify constraints, accessibility or prototype behavior.

Existing Figma: [Anargya ITS — Website Design](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h). Approved homepage frames: desktop `20:3`, tablet `68:181`, mobile `68:180`. Foundations and component library remain reusable. There are no approved multi-page designs yet. The implemented full-screen menu, viewport-sized desktop hero and looping carousel incorporate later requested changes beyond older Figma interaction states; those fixes must not be reverted.

## Recommended information architecture

Use six public destinations with shared navigation and contact/footer. Give each subject a canonical page; retain only previews on Home. Keep contact in a globally available `#contact` band and footer because verified material currently consists of email, address and social links. A separate contact page would add little useful content. Reconsider only if a verified enquiry process, location guidance or other substantial content is supplied.

| Route | Navigation label | Primary question answered | Content owner |
|---|---|---|---|
| `/` | Logo links Home | Who is Anargya, and where should I explore? | Identity introduction and selected previews |
| `/team` | Team | Who is behind the work, and how did the team develop? | Identity, foundation, history and supported people information |
| `/vehicles` | Vehicles | What vehicles have been developed? | Vehicle profiles, published specifications and programme context |
| `/achievements` | Achievements | What results are documented? | Event/category/year-specific record archive |
| `/research` | Research | What engineering work is publicly described? | Dated development topics and research scope |
| `/sponsors` | Sponsors | Who is acknowledged, and on what evidence? | Complete supporter inventory and relationship qualifications |
| Every page `#contact` | Footer Contact link | How can I reach the team? | Shared public email/address/social links |

Alternative: retaining the complete homepage and merely duplicating its sections on new routes is quick but creates redundancy and weak inner pages. A news-heavy magazine with individual vehicle/research/member routes offers more depth, but available verified material cannot sustain that scope. Six curated pages are the recommended balance.

### Home — introduction and exploration

- **Audience/purpose:** first-time visitors, evaluators, prospective members and partners; establish identity and offer clear paths into the site. These audiences are planning assumptions, not official audience research.
- **Hierarchy:** existing photographic hero → concise identity/founding introduction → Mark 6.0 vehicle feature linking Vehicles → short engineering preview linking Research → existing three-record Track Record carousel plus archive link → historical team photograph and Team link → brief supporter acknowledgment linking Sponsors → shared contact/footer.
- **Reuse/assets:** approved hero `anr-testing.png`, logos, Mark 6.0 visualization, existing research/team photos and three carousel images. Keep the night photograph generically captioned as Formula EV testing; do not relabel it Mark 6.0.
- **Interactions:** route CTAs, existing carousel controls/swipe/keyboard/indicators, shared menu and email. No new autoplay or homepage tabs.
- **Responsive:** retain the approved narrow hero recomposition and contained carousel preview; stack teasers without copying every inner-page paragraph.
- **Missing information:** no new statistics required. Do not introduce an unsupported ninth-generation headcount or 2026 competition result.
- **Move out:** full Mark 5.0 specification panel, detailed development topics/history and complete sponsor wall. Homepage acknowledgment must not select a few logos in a way that implies commercial priority; use a text acknowledgment and clear link to all supporters. This relocation is proposed, not yet applied.

### Team — identity, history and people

- **Audience/purpose:** prospective members, institutional visitors and partners; explain Anargya's student-led identity and continuity.
- **Hierarchy:** photographic team masthead → ITS identity, September 2018 foundation and published research focus → dated development/history chapters → people-at-work photo feature → source-qualified organization information → contact/related Research and Vehicles links.
- **Reuse/assets:** identity facts and existing Team copy; `fsae-j-2.png`, approved `contact-jumbotron.jpg`, timeline images. Select historical photographs with event/year captions where supported. A portrait is optional only after role and reuse confirmation.
- **Interactions:** history anchors if the page becomes long; route links. No invented clickable member profiles or active recruitment CTA.
- **Responsive:** masthead preserves faces; history date/copy sits above its photograph on mobile. Organization headings become a simple vertical list, not empty member cards.
- **Missing information:** ninth-generation roster, roles, approved portraits and current advisor appointment are unavailable. Official Team material is eighth-generation context. Do not present it as the current ninth-generation team. General Manager, Mechanical, Electrical and Non-Technical headings may appear only with historical source qualification; they do not establish current departments or membership. Omit an unverified roster entirely from the public page.

### Vehicles — engineering-led vehicle profiles

- **Audience/purpose:** engineering readers, competition followers and partners; expose real project context and specifications.
- **Hierarchy:** vehicle-led masthead and short introduction → local links to Mark 6.0 and Mark 5.0 → large Mark 6.0 profile with 2026 programme context → Mark 5.0 profile with published specification list → concise Mark 4.0 development context → related Research/Achievements links. Go-Kart EV may be mentioned as a source-qualified 2025 project, without a fabricated photo/specification profile.
- **Reuse/assets:** `mk6-side-left.png`, `mark5.png`; optional `gl-mk-6-car.png` after crop review; `mark-4-car.png` for historical context. Reuse native specification anatomy and contain vehicle renders.
- **Interactions:** in-page vehicle anchors and contextual routes. No configurator, purchasing, downloads without actual documents, or detail links to unfinished pages.
- **Responsive:** renders occupy wide natural-aspect slots, specifications become two columns on tablet and one on narrow screens when labels require it. Profile content grows naturally.
- **Missing information:** Mark 6.0 weight/power/battery/top speed and complete technical sheets. Show one concise “Specifications have not been published” note rather than four empty data boxes. Mark 5.0 values remain explicitly team-published: 220 kg, 80 kW, 6.9 kWh and 120 km/h. Do not transfer them to another vehicle or imply independently measured performance.

### Achievements — readable competition record

- **Audience/purpose:** evaluators, followers and prospective supporters; make evidence and competition categories easy to assess.
- **Hierarchy:** competition photograph/title → short evidence statement → three existing verified record entries, organized chronologically with interval labels preserved → related vehicle/research routes. Distinguish event, category, year/range and placement in each entry.
- **Reuse/assets:** current achievement data and `timeline-2025-3.jpg`, `timeline-2024-1.jpg`, `timeline-2023-3.jpg`; use the same captions/qualifications as the approved carousel.
- **Interactions:** all entries visible without carousel controls; optional jump links, no filters/search for only three records. Home retains the interactive presentation of selected records.
- **Responsive:** date/placement rail and photograph/text become a linear article on mobile. Results remain native text, never embedded solely in award artwork.
- **Missing information:** comprehensive results archive, precise supporting event documents and confirmed 2026 outcomes. Public title/copy should say selected team-reported results, not complete all-time history. The PR award year conflicts between graphic and timeline and stays excluded. The separate 2024 presentation entry may be added only after its exact event/category evidence is rechecked; do not silently expand approved data.

### Research — publicly described development work

- **Audience/purpose:** engineering readers and academic/industrial partners; clarify what the team has publicly described without claiming a scientific publication portfolio.
- **Hierarchy:** preparation/testing masthead → electric formula and autonomous-vehicle research scope → dated 2023 battery/chassis chapter → 2024 aerodynamics/telemetry/dynamics chapter → development toward the 2026 programme as described in the 2025 timeline → vehicle links and research enquiry email.
- **Reuse/assets:** current research topic copy, `fsae-j-4.jpg`, timeline photographs; `testing-mk-6.png` is a candidate after visible-content/caption review.
- **Interactions:** chapter anchors and Vehicles links; no fake papers, laboratory downloads, interactive technical diagrams or fabricated experiment results.
- **Responsive:** concise chapter introductions followed by photographs and topic lists; do not make horizontally scrolling topic panels. Long technical labels wrap.
- **Missing information:** methods, testing protocols, datasets, publications, named laboratories, performance deltas and autonomous-system results. Keep scope descriptive and dated. Do not turn a generic preparation photograph into proof of a particular experiment.

### Sponsors — complete, qualified acknowledgments

- **Audience/purpose:** existing/prospective supporters and institutional visitors; acknowledge support accurately and provide a collaboration contact.
- **Hierarchy:** restrained centered introduction → complete 27-logo wall → concise source/season qualification → optional three dated official collaboration-story links → separate contact band/footer.
- **Reuse/assets:** existing `sponsors.ts`, `SponsorTile`, all 27 original logos and light/dark logo-well treatments. No missing logos in this selected inventory.
- **Interactions:** real verified article links for Grab, Honda Surabaya Center and 507 Power; email contact. Do not infer outbound corporate URLs from names or make every tile appear interactive without a verified destination.
- **Responsive:** five columns at roomy desktop widths, approximately three at tablet and two on mobile; names wrap; parent/grid height grows. Preserve every logo, contain fit and inner padding. Contact always follows the final row.
- **Evidence:** 25 July-reported 2026 programme supporters plus JNE and Nexa Logistic as additional official-site listings. Preserve the current uniform wall and annotate the two extra listings accessibly; a visible two-group split is an optional future approval choice, not a sponsorship tier. “Gold/silver” filenames do not establish tiers. Current contracts and asset licenses are unconfirmed. The 15 report-only media names stay excluded.

## Content ownership and cross-links

Use one underlying data record per vehicle, achievement and supporter. Home references summaries; inner pages display details. Avoid separate copies of specification values or achievement wording. Vehicles links to relevant research chapters; Research links back to vehicle anchors. Team links to Research and Vehicles; Home carousel links to Achievements. Sponsors offers contact and dated partnership sources. Cross-links should relate subjects, not add identical six-card grids to every page.

Keep useful existing Home fragment IDs on their corresponding previews (`#about`, `#research`, `#vehicles`, `#track-record`, `#team`, `#sponsors`) where practical, so older links retain meaningful destinations. Global navigation changes to paths. Do not use fragment links as a substitute for the six routes. `#contact` should exist once on each page in the shared contact band.

## Shared navigation contract

Logo → `/`. Link order: Team, Vehicles, Achievements, Research, Sponsors. Desktop active route must use green plus underline and `aria-current="page"`; Home has no falsely selected subject link. Paths and active matching come from one route map. Contact stays in the footer/band.

Reuse the solid-black full-screen dialog on tablet/mobile: logo top-left, X top-right, vertically aligned white labels, green hover/focus/current state, no decorative numbers. Preserve accessible names, visible focus, touch targets, Escape, focus containment, background inertness and scroll locking. Close on successful route changes and breakpoint changes. Cancel/X/Escape restore the original scroll and trigger focus; route navigation must release locking before moving to the new page and must not restore the previous page's scroll afterward. Back/Forward and modified/new-tab clicks retain native behavior. Route changes must be announced through an appropriate focus handoff to the new main/heading; do not leave focus inside a closed dialog.

Test whether the five new labels fit at the existing 1024px desktop breakpoint before changing it. The existing collapse rule is the starting point; a breakpoint change needs demonstrated content-fit justification.

## Approval and unresolved content

Approve the six-page hierarchy, shorter Home, page compositions and development sequence before design/implementation begins. Content gaps should not block the verified baseline pages: omit unavailable rosters, results, papers, tiers and figures. Additional content requires a traceable source and image/use review. Confirm public reuse rights before external publication; no deployment is requested here.
