# Anargya Figma progress

## Multi-page design proposal — 10 October 2026

The user approved the multi-page proposal with “go.” The design-before-code increment is now complete for review in the **same existing file**, without replacing approved homepage frames, foundations or component-library definitions.

New pages: `Multipage — Desktop` (`116:1025`), `Multipage — Tablet` (`116:1026`), `Multipage — Mobile` (`116:1027`). Each contains Home, Team, Vehicles, Achievements, Research and Sponsors at its breakpoint. No numerical prefixes were introduced into visible navigation.

| Page | Desktop 1440 | Tablet 768 | Mobile 390 |
|---|---|---|---|
| Home | `117:5278` | `117:6144` | `117:4500` |
| Team | `117:5486` | `117:6313` | `117:4665` |
| Vehicles | `117:5580` | `117:6397` | `117:4749` |
| Achievements | `117:5686` | `117:6493` | `117:4845` |
| Research | `117:5785` | `117:6582` | `117:4934` |
| Sponsors | `117:5884` | `117:6671` | `117:5023` |

Open full-screen menu states: tablet `117:6846` (768×1024), mobile `117:5202` (390×844), with official logo, unnumbered native text and a 48px close target. Menu opening/Back closure and route navigation are linked in the prototype. Route links and page-specific active styles reuse existing navigation/button variants. Browser focus, Escape, scroll locking and accessibility require the later implementation; they are not certified by a Figma prototype.

All 18 page frames use editable text, actual image fills, Auto Layout containers and the existing Anargya variables/styles. Body and display text use the recorded Inter approximation. Existing buttons, navigation states, carousel and selected editorial components remain linked instances. Newly composed photo instances exposed inherited aspect constraints; those defective instances were detached into native Auto Layout photo frames with their image fills and styled caption layers preserved. Main library components were not changed.

Content follows the approved plan: shorter Home gateway; historical Team narrative without a fabricated ninth-generation roster; Mark 6.0 programme context without invented specifications; team-published Mark 5.0 values; three readable achievement records; dated research development; all 27 supporter logos without new tiers/media claims. Shared contact content is reused across every page. Optional partnership article cards and unverified personnel material are omitted.

Rendered-preview inspection exposed fixed-height text and horizontal-row growth defects. Those were corrected before the final exports. Final structural checks found no horizontal containment errors, collapsed text boxes or missing fonts in the 18 frames and two menu states. Each Sponsors frame has exactly 27 image-filled logo nodes, all FIT/contain and inside their immediate image-well bounds. Full-page final exports were inspected in breakpoint overview sheets; this is design review evidence, not a new browser/WCAG audit.

Review: [Desktop overview](multipage-previews/desktop-overview.png), [Tablet overview](multipage-previews/tablet-overview.png), [Mobile overview](multipage-previews/mobile-overview.png). Full-size per-page exports are in `docs/multipage-previews/`; [audit](multipage-previews/structure-audit.json) records final IDs, dimensions and checks.

**Status: multi-page Figma proposal ready for review; no new Next.js routes implemented.** The approved implementation plan places a review checkpoint after same-file design extension and before shared-shell/frontend implementation. Application source and official asset bytes remain unchanged. No deployment occurred.

Updated: 10 October 2026 (Asia/Jakarta).

File: [Anargya ITS — Website Design](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h).
File key: `rOfocrKCEhJwAyOTxRF82h`.

## Completed increment

- `01 — Reference Analysis` (page `0:1`): editable structural mapping, source-grounded content notes, and three official-image candidates. Review board `4:2`.
- `02 — Design Foundations` (page `2:2`): official color/type/spacing/radius/motion variables, documented project aliases, type specimens, and layout guidance. Review board `3:2`.
- `03 — Component Library` (page `2:3`): reusable Auto Layout components and review instances. Control board `5:133`; content board `6:172`.

Foundations contain **65 variables** (31 primitives and 34 semantic tokens/aliases), **10 shared token-bound text styles**, and **3 native grid styles**. Only the supplied dark theme was created. CSS syntax is proposed handoff naming; no application variables or code were written.

Control sets: `Button` (`5:32`, 21 variants), `Link/Navigation` (`5:103`, seven variants), `Button/Icon` (`5:118`, seven variants), and `Navigation/Mobile` (`6:111`, Closed/Open variants). Editable properties support labels, optional icons, and icon swaps. Generic Arrow/Menu/Close icons are project UI vectors, not claimed official brand assets.

Content components include desktop/mobile navigation, section heading, project/research/team cards, statistic block, topic tag, image container, partner-logo container, specification panel, social link, and desktop/stacked footers. Stacked-footer main component: `12:248`. Static-component interaction-only states are documented as N/A; control variants provide visual states, not implemented keyboard behavior.

Official raster assets are actual image fills. Selected material includes team logos, Mark 6.0 photography, vehicle preparation, advisor portrait, Grab artwork, and an official team-event photo. The initially uploaded `about-us-team.webp` rendered blank in the Figma screenshot service; the visible reference image uses the compatible official `contact-jumbotron.jpg` instead. The acquisition original was preserved unchanged.

## Validation and limits

- Inspected all four review-board screenshots and repaired horizontal Auto Layout sizing, label overrides, icon targets, and mobile navigation layout.
- Confirmed shared styles on all 180 component-page text nodes, no missing fonts, no horizontal overflow in the content review containers, image fills on native rectangles, scoped variables, aliases, and editable component properties.
- Icon controls are 48×48px; icon hover/active states use dark surfaces and green outlines for reliable contrast. Desktop navigation/footer widths are 1280px.
- Inter is a documented Figma approximation of the official CSS system-sans stack. The stack remains the implementation specification.
- Grid counts, heading weights/line heights, and action aliases are the approved analysis extensions, not newly discovered official brand rules.
- Disputed award dates, inferred roster names, sponsor tiers, and unpublished Mark 6.0 specifications are excluded. Asset reuse permissions remain a publication-review item.

Review images: [Foundations](figma-previews/foundations.png), [Controls](figma-previews/controls.png), [Content components](figma-previews/components.png), [Reference](figma-previews/reference.png). These are review exports; the Figma file is the editable deliverable.

## Desktop homepage — complete, awaiting review

The complete homepage is on **`04 — Desktop`** (page `20:2`) in the same existing file. Frame: **`Homepage / Desktop 1440`** (`20:3`), **1440 × approximately 7369px** (current desktop review). [Open the homepage](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=20-3).

| Region | Frame ID | Composition |
|---|---|---|
| Hero and navigation | `21:2` | 1440×960 full-bleed night-testing photograph; reused navigation, green headline strip, two actions, and photo context |
| About Anargya | `21:47` | Left-aligned introduction and founding/institution facts; retained existing open composition |
| Research and Development | `21:71` | 600px full-width preparation photograph, native black contrast gradient, and three research-topic instances |
| Vehicles and Projects | `22:52` | Alternating Mark 6.0 photograph and Mark 5.0 visualization; published Mark 5.0 specification panel |
| Verified Highlights | `22:96` | Three dated, category-specific results using statistic instances; disputed PR Award year excluded |
| Team introduction | `23:88` | Narrow copy left, large Formula SAE Japan group photograph right; no claim of a complete current roster |
| Sponsors and Partners | `23:104` | 25 reported 2026 supporters in a five-column wall, plus two separately labeled official-site acknowledgments |
| Contact | `23:122` | Sponsorship/collaboration introduction, general team email, and email action |
| Footer | `23:137` | Reused desktop footer, official address/identity, copyright, and published Instagram/Facebook/YouTube labels |

### Desktop decisions

- Preserve Sapu Angin's full-bleed photography, image-heavy introduction, alternating editorial rows, whitespace, and clear footer organization. Use Anargya's black/near-black surfaces, green accents, and approved 12–32px typography.
- Hero copy is left aligned in the dark upper area of the portrait-origin testing photograph so the driver and vehicle remain prominent. The photo is labeled generally as Formula EV testing; it is not claimed to depict Mark 6.0.
- Use 80px outer margins around the approved 1280px container, 48px editorial gaps, and 96px section padding as the approved two-unit spacing composition. The 960px hero is the desktop viewport composition chosen for this screen.
- Keep all new headings and descriptions as native editable text. Preserve photographic image proportions with image fills; use contain sizing for visualizations and partner marks. Partner logos retain their original colors and artwork, including 507 Power's original background.
- Limit partner display to relationships grounded in the opened detail articles; do not infer sponsorship tiers or correct ambiguous sponsor-wall labels. Keep unpublished Mark 6.0 values unavailable rather than borrowing Mark 5.0 values.
- The general team email is used instead of potentially changing personal contact assignments. LinkedIn is omitted because its published destinations conflict.
- Text and image children in seven existing component families were made flexible where needed: Section/Heading, Statistic/Block, Card/Research, Media/Image, Logo/Partner, Panel/Specification, and Link/Social. Default library dimensions, visual tokens, styles, and property names remain unchanged; this targeted sizing repair enables linked desktop instances to reflow. Image slots retain a locked aspect ratio.

### Desktop QA evidence

- Final structural audit: **202 descendants**, including **102 native text layers**, **41 linked component instances**, **43 frames**, and **16 rectangles**. Eleven rectangles contain actual official-image fills; none is a flattened website capture.
- Confirmed 1440px frame width, all nine named regions, no horizontal overflow in both frame and instance containers, shared text styles throughout, approved Inter font approximation, type sizes within 12–32px, and no missing fonts.
- Reviewed the complete page and close-up sections. Repaired retained instance widths, image-slot sizing, statistic wrapping, footer text alignment, and photographic text contrast. The research gradient retains at least 88% black opacity beneath the copy area while exposing the engineering scene to the right.
- Temporary asset-transfer nodes were removed. The Desktop page contains only the homepage frame. No second Figma file, tablet/mobile screen, or Next.js code was created.

Review exports: [Complete desktop homepage](figma-previews/homepage-desktop-1440.png) and [Hero detail](figma-previews/homepage-desktop-hero.png). The Figma frame is the editable deliverable; exports are review images only.

### Content and asset limitations

No selected image is missing. Image-reuse permissions remain unconfirmed for publication. Mark 6.0 technical specifications are unpublished; the PR Award year, full current roster, wider sponsor identity/tier details, and preferred LinkedIn destination remain unresolved and are not asserted in the homepage. Results are attributed to the official Anargya timeline, not independently certified organizer records. Native prototype interactions and keyboard behavior are not implemented or certified in this desktop-layout phase.

## Sponsor-wall revision — 9 October 2026

Revised only the existing Sponsors & Partners section (`23:104`) on the existing desktop homepage. Its centered introduction now reads “Thank you for supporting us” with a short supporting sentence. The existing logo instances remain linked, with their original image assets retained.

- Replaced the oversized presentation with a native three-column grid (`23:109`): 240×112px tiles, 16px token-bound gaps, 6px corners, muted-dark fills, and thin framed borders.
- Removed the outer feature-card wrappers and separate name captions. Partner identities remain in the layer names: Grab Indonesia, Honda Surabaya Center, and 507 Power.
- All logo fills use contain (`FIT`) sizing. The existing artwork, colors, and 507 Power background are preserved; no logos were cropped or recolored.
- Kept the wall untiered: the verified content supports these three partners, but no sponsorship categories or tiers. No additional sponsor claims were introduced.
- Reduced the sponsor section from approximately 571px to 336px high, with 48px top/bottom spacing and a 32px introduction-to-wall gap.
- Confirmed the existing contact CTA (`23:122`) remains a separate sibling immediately below, with its own muted background. Other homepage sections and the shared library were not redesigned.

Inspected the revised section export and verified tile bounds, three native grid columns, consistent spacing, image modes, corner radii, and contact separation. [Revised sponsor-wall preview](figma-previews/sponsors-desktop-revised.png). The complete desktop export was refreshed from the current Figma homepage. Await user review; do not proceed to responsive layouts.

## Remaining phases

### Complete sponsor-wall rebuild — 9 October 2026

This supersedes the earlier three-logo revision. Only the contents of the existing sponsor section (`23:104`) were replaced; the file, Desktop page, and homepage remain the same.

- Full crosswalk: [anargya-sponsors-2026.md](anargya-sponsors-2026.md). **27 distinct supporter entries and 27 actual logo assets**: the 25 July 2026 report names, plus JNE and Nexa Logistic from the official team listing in a separately labeled group. No sponsorship tiers or ongoing contracts are inferred. **Zero missing selected logos** and no logo placeholders or invented wordmarks.
- Twenty-five local originals reused; IKOMA and a tighter original Pertamina NRE header image retrieved from their official websites. Media investigation records 15 report-only names; no media wall is asserted without team-side season confirmation.
- Deleted the prior native GRID/instance subtree. Built a vertical, content-hugging section with plain horizontal Auto Layout rows: five columns, 243.2×144px native tiles, 16px gaps, 16px tile padding, 6px corners, and an 80px logo well with an additional 8px inset. Every image uses FIT/contain. Light backing is used where original dark logo lettering needs contrast; artwork is unchanged.
- Section grows to **1402px**. No absolute positioning is used for sponsor tiles. Contact begins at **6585.85px**, exactly after the sponsor section; footer ends at **7368.85px**, matching the expanded homepage height.
- Verified all 27 individual tile bounds, image-slot padding, FIT fills, row spacing, hugging parent heights, and Contact/footer positions. Inspected a 1440×1402 native-pixel render and each row at 100% scale; corrected crowded asset edges, Blink contrast, and the padded NRE source. Checked the rendered Contact transition. **Overlap/overflow/clipping checks passed.**
- Compact signatures for all eight protected regions match the pre-edit baseline, excluding only permitted root vertical placement. Hero, About, Research, Vehicles, Achievements, Team, Contact content, and Footer design remain unchanged. No shared-library or Next.js code change.

Final previews: [Complete sponsor wall](figma-previews/sponsor-wall-complete.png), [Sponsor-to-Contact transition](figma-previews/sponsor-wall-contact-transition.png), and refreshed [complete homepage](figma-previews/homepage-desktop-1440.png). The earlier three-logo preview is historical. Stop for review after this correction.

**Stop for user review of the complete desktop homepage.** Do not create tablet/mobile layouts yet. After the desktop is approved, the remaining scope is tablet/mobile re-composition, prototype interactions, and final screen-level handoff/QA.

Reuse this file and its existing components. Do not recreate foundations or repeat completed source research. Foundation/library IDs are recorded in `/tmp/anargya-figma/state-final.json`; desktop IDs, the final audit, and intended action destinations are in `/tmp/anargya-figma/desktop-state.json`. Inspect Figma directly if those temporary ledgers are unavailable. No Next.js application code changed.


## Final desktop review — LOW scope only, 9 October 2026

**Status: desktop layout ready for user review; responsive layouts await approval.** The authorized scope is a responsive company profile showing identity, projects, achievements and relevant team information. MED e-commerce and HIGH PWA capabilities are excluded. No Next.js source changes, tablet/mobile layouts or new Figma file were made.

### Targeted sponsor repair

Fresh inspection found the sponsor parent at a fixed 1365px height with SPACE_BETWEEN distribution and the additional official-site heading absent. The individual logo tiles were still contained. Restored content-driven vertical AUTO/HUG sizing, MIN/start distribution with a token-bound 48px gap between introduction and groups, and subtle borders at 22% opacity. Restored a native editable heading, “ALSO LISTED ON ANARGYA’S OFFICIAL WEBSITE”, above JNE and Nexa Logistic so they are not presented as part of July’s 25-name report. New text node: `60:113`. All repairs were inside the existing sponsor section.

The Sapu Angin-inspired structure remains a centered introduction and compact, uniform five-column framed logo wall. All **27 entries have real image assets**; no selected logo is missing. Tiles remain 243.2×144px with 16px padding/gaps, 6px corners, and inset contain/FIT image wells. The sponsor parent is now 1402px high with 96px top/bottom padding and grows with its contents. No absolutely positioned sponsor tiles or GRID tracks are used.

### Desktop visual and content review

- Inspected the actual rendered complete homepage, top/identity/research area, project/achievement/team area, full sponsor wall at native 1440px resolution, and the Contact/footer transition. No overlapping logos, clipped section boundaries, cropped logo fills, missing images or visibly clipped text were found. About’s existing open right-hand area was preserved; no unrelated composition was redesigned.
- Verified the black/near-black surfaces, green accents, 12–32px typography, shared alignment, photographic sections, alternating project rows and consistent framed logo presentation. Original sponsor colors remain within their artwork; light logo wells support dark lettering.
- Identity/founding/research descriptions match `anargya-content.md`. Mark 5.0 specifications remain 220kg, 80kW, 6.9kWh and 120km/h, explicitly attributed to Anargya. Mark 6.0 specifications remain unpublished. Research topics retain their 2023/2024 programme context.
- Achievements retain exact competition categories and dates: Presentation third place (2023), three consecutive Pi-EV Triple Overall titles (2022–2024), and Presentation EV second place (2025). The section explicitly attributes these to the official team timeline; this is not independent organizer certification. Disputed PR Award dating and undefined regional-ranking claims remain excluded.
- Sponsor evidence follows `anargya-sponsors-2026.md`: 25 July-reported programme supporters, plus separately identified JNE/Nexa official-site listings. Current contract status and tiers remain unconfirmed and are not asserted. Report-only media partners are omitted. Image publication permissions remain unresolved in the asset manifest.
- No ninth-generation roster assertion is introduced from the older team-page material. Public general team email/address and established social labels remain. LinkedIn remains excluded because the published destinations conflict.

### Final verification evidence

Final Figma audit: 1440×7368.85px homepage; 127 native editable text layers and 36 linked instances. All 27 sponsor assets have valid image hashes and FIT fills. Every sponsor descendant fits its parent; no absolute sponsor positioning, missing fonts or horizontal text overflow. Content outside Sponsors retained its text, font sizes, horizontal positions and dimensions; only Contact/footer vertical placement changed. Foundations and Component Library were not modified.

Sponsor bottom **6585.85px** equals Contact top; Contact bottom **6972.85px** equals Footer top; Footer bottom **7368.85px** equals homepage height. Parent sizing is AUTO/HUG, distribution MIN, section gap48px. Rendered checks and geometry checks both passed.

Current review artifacts: [Full desktop](figma-previews/homepage-desktop-1440.png), [Sponsor wall](figma-previews/sponsor-wall-complete.png), [Contact/footer transition](figma-previews/sponsor-wall-contact-transition.png), [Audit](figma-previews/desktop-review-audit.json). Earlier audit counts describe historical revisions and are superseded by this final review. Stop for desktop approval before tablet/mobile creation. Prototype interactions, responsive QA and implementation remain future LOW-scope work.


## Responsive company-profile designs — 10 October 2026

**Current status: desktop approved for responsive adaptation; complete Tablet and Mobile designs ready for review. Stop before implementation.** This supersedes earlier notes saying responsive layouts had not started. Scope remains the LOW company-profile task; MED e-commerce and HIGH PWA features are excluded.

Created only two pages in the existing **Anargya ITS — Website Design** file:

| Deliverable | Page | Frame | Final geometry | Review link |
|---|---|---|---|---|
| Tablet homepage | `05 — Tablet` (`67:4`) | `Homepage / Tablet 768` (`68:181`) | 768×9682.67px | [Tablet](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=68-181) |
| Mobile homepage | `06 — Mobile` (`67:5`) | `Homepage / Mobile 390` (`68:180`) | 390×10449.03px | [Mobile](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=68-180) |
| Tablet open menu | Tablet page | `71:312` | 768×400px | [Open menu](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=71-312) |
| Mobile open menu | Mobile page | `71:652` | 390×400px | [Open menu](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=71-652) |

### Responsive composition

- Adapted the approved desktop content and existing image hashes; no repeated source research, new facts, stock imagery or flattened screen import. Both homepages contain navigation plus all nine editorial sections through Footer. Desktop, Foundations and Component Library were not edited.
- Use token-based 32px tablet insets and 20.8px mobile insets; section padding48px and section content gaps32px. Body text remains16px with24px line height. Existing Inter styles remain the documented Figma approximation of the official CSS system-sans stack.
- Reuse the existing Navigation/Mobile Closed and Open component variants, with the original Anargya logo and48×48px hamburger/close controls. Open menu links are48px high, ordered About, Research, Vehicles, Team, Contact. Their widths expand to the available content width rather than retaining a390px source width.
- Recompose the hero as editable identity/copy/actions above a full-width photograph. Mobile actions stack at full content width; tablet actions stay side by side. This protects readable copy and the vehicle’s prominent image area on narrow screens.
- Stack research and team photography with copy in a logical reading order. Preserve research-topic card instances and source-year labels. Project images use contain/FIT and intrinsic proportions; Mark6.0 specifications remain explicitly unpublished. The native specification table keeps its four published Mark5.0 values.
- Tablet achievement statistics use two columns plus a final second-row statistic; mobile uses three stacked statistic instances. This avoids narrow-column word fragmentation. Founding/institution statistics remain a compact two-column pair.
- Contact and Footer stack with readable native email/address text,48px contact action, reusable navigation/social links, and original inline identity artwork. General email and source-qualified content are retained; no uncertain LinkedIn destination or ninth-generation roster assertion is introduced.

### Complete responsive sponsor inventory

Both frames retain **27 distinct sponsor/supporter entries and27 actual logo image fills** matching the desktop crosswalk. The first25 are labeled2026 programme supporters; JNE and Nexa Logistic remain separately labeled as additional official-website acknowledgments. No tiers or continuing contracts are inferred. Report-only media names remain excluded.

- Tablet: three224px columns; mobile: two166.2px columns;16px horizontal and vertical gaps,12px tile padding and additional8px logo-well inset, 6px corners, subtle borders. Caption text remains12px and can wrap. Each tile has a144px minimum height and grows naturally; PT RAN’s mobile tile reaches154px without clipping.
- Every logo uses contain/FIT, with original colors and light wells where required for dark lettering. Parent sections/groups hug vertically; rows size to the tallest tile. No absolute sponsor tile positioning or fixed-height sponsor section is used. Incomplete rows are centered, preserving every supporter.
- Tablet sponsor bottom8330.67px equals Contact top; mobile sponsor bottom8993.03px equals Contact top. Footer bottoms match their complete homepage heights exactly.

### Validation and corrections

Inspected both complete final renders in native-pixel strips, including every sponsor row, vehicle illustrations, typography, research/team photography, Contact/Footer transitions, and both open-menu renders. Fixed native text layers retaining fixed heights after wrapping, direct section text widths ignoring section insets, tablet achievement word fragmentation, and border clipping. Final structural audit reports **zero horizontal overflow, zero parent-containment failures, zero Auto Layout sibling overlaps, no missing fonts and no empty image fills** on both frames.

Each homepage has **122 native editable text layers**, **32 linked component instances**, and **34 actual image fills**, including all27 sponsor logos. The UI is composed of native Auto Layout frames/text/components, not a screenshot. No image is missing. Current sponsorship-contract status, organizer-independent awards verification and publication permissions retain the limitations in the existing content/asset inventories.

### Navigation and interaction handoff

Hamburger actions are wired to the corresponding open-menu overlay; close actions close it. Menu links close the overlay and target the corresponding section via SCROLL_TO. Footer navigation and relevant hero/project actions target the corresponding sections. History/team actions point to the verified official public pages; email/social actions use the published destinations.

Reaction targets, control sizes, menu geometry and visual states were inspected. Runtime presentation clicks were not tested in this pass; these connections do not certify keyboard or browser behavior. Implementation must provide explicit Open/Close menu accessible names, aria-expanded/aria-controls, predictable keyboard order, Escape closure and focus restoration. If implemented as a modal overlay, it must also contain focus, make the background inert and respect reduced motion. Existing focus-visible control variants remain available. These are later implementation checks, not claims of completed WCAG certification.

Current review exports: [Full tablet](figma-previews/homepage-tablet-768.png), [Full mobile](figma-previews/homepage-mobile-390.png), [Tablet hero](figma-previews/homepage-tablet-hero.png), [Mobile hero](figma-previews/homepage-mobile-hero.png), [Tablet open menu](figma-previews/menu-tablet-open.png), [Mobile open menu](figma-previews/menu-mobile-open.png), [Responsive audit](figma-previews/responsive-review-audit.json).

No Next.js application source, dependencies or configuration were modified. No new Figma file was created. **Await user review of Tablet/Mobile before implementation.**


### Section-label refinement — 10 October 2026

Removed numeric prefixes (01 /, 02 /, etc.) from visible section eyebrows across Desktop, Tablet and Mobile. Labels now read ABOUT ANARGYA, RESEARCH & DEVELOPMENT, VEHICLES & PROJECTS, TRACK RECORD, THE TEAM and CONTACT ANARGYA. Text remains editable; component instances use text-property overrides. Internal page/layer numbering, factual dates, layouts, foundations and component definitions remain unchanged. No Next.js code modified.


## Desktop Track Record carousel — 10 October 2026

**Status: redesigned desktop section ready for review; stop before further changes.** Only the existing `05 / Verified Highlights` section (`22:96`) was redesigned. Tablet/Mobile pages, existing Foundations and Component Library were untouched. All eight other homepage-region signatures match the before-edit baseline, allowing only their root vertical placement to flow downward. No Next.js code modified.

### Composition and editable assets

Replaced the plain statistics with a 1440×928px photographic carousel, aligned to the 1280px container and 80px margins. It uses the requested “05 / TRACK RECORD” eyebrow, “Driven by achievements.” heading, team-reported-result attribution and manual arrow controls. Each state shows two fully visible cards: a 704px featured card and 544px secondary card, separated by 32px. Cards have 507px content-driven height, 300px cover/FILL photography, restrained caption contrast overlays, 32px internal padding, 6px corners and existing shared typography/color tokens. No title or caption is clipped, and source images retain proportions.

Created native reusable `Card/Achievement` (`86:143`) with three achievement variants (`86:113`, `86:123`, `86:133`), and `Carousel/TrackRecord` (`86:289`) with three active-position variants (`86:146`, `86:195`, `86:242`). Main components are organized in the Desktop construction area outside the homepage and review frames. Existing icon-button variants are reused; a left-arrow derivative accompanies the existing right-arrow icon. No existing library definition was changed. Cards and all titles/categories/captions remain editable native layers; photographs are actual image fills.

The section instance is `86:290`. Its height grew from 621px to 928px. Team starts at 4794.24px, exactly at the section bottom; the expanded homepage is 7606.85px high. Contact/footer and other lower sections move through homepage Auto Layout without changes to their content or design.

### Three verified achievement entries

| Position | Result | Official image used | Content/image qualification |
|---|---|---|---|
| 01 | Formula SAE Japan, 2025: second place, Presentation EV | `timeline-2025-3.jpg` | Original 2025 timeline presentation/activity image; caption explicitly identifies official timeline context, not a proven award ceremony |
| 02 | Formula Bharat Pi-EV, 2022–2024: three consecutive Triple Overall titles | `timeline-2024-1.jpg` | Original 2024 timeline team image; contextual team photography, not independently asserted to depict the Pi-EV competition |
| 03 | Formula SAE Japan, 2023: third place, Presentation | `timeline-2023-3.jpg` | Official2023 timeline image with the Formula SAE Japan 2023 event backdrop |

Facts remain grounded in [the official About timeline](https://www.anargyaits.com/about-us) and `anargya-content.md`; source URLs and rights limitations remain in `anargya-assets.md`. The third-consecutive-title statement and event/category/year labels are team-reported, not organizer-independent certification. PR Award dating and unspecified overall-ranking claims remain excluded. All three original files were imported successfully, including the 2025 JPEG/MPO original; original bytes were not altered. Publication reuse permissions remain unresolved.

### Manual prototype and tested behavior

The integration rejected in-place CHANGE_TO links, so the requested fallback uses three separate editable 1440×928px prototype frames: `86:335` (01), `87:257` (02), `87:303` (03). Frame-level 48×48px click targets are aligned exactly over arrows/position indicators. They use manual NAVIGATE connections with a restrained 150ms dissolve and no automatic sliding. First Previous and last Next are disabled; inactive position indicators link to their corresponding frames. The homepage’s controls enter this isolated carousel demonstration, rather than duplicating the whole homepage for each state.

Live playback was tested in the authenticated Figma desktop app after browser playback was blocked by authentication. Observed Next 01→02 and 02→03, Previous 03→02, and disabled Next remaining at 03. Counters 01/03,02/03,03/03 and corresponding active bars appeared correctly; cards stayed aligned. Direct indicator-click testing was interrupted by desktop UI activity; its destinations are structurally verified, but that interaction is not claimed runtime-tested. Keyboard/focus/reduced-motion behavior remains a future implementation check.

### Rendered and structural QA

Inspected all three 1440×928px state exports at native scale and the rendered transition into Team. All three states have 15 editable text layers, two actual photographic image fills and two linked achievement-card instances. Card bounds are contained, cards do not overlap, text is fully visible, and imported photos render correctly. The section and homepage hug vertically; Team begins after the carousel. Temporary upload rectangles were removed. The absolute layers added for prototyping are only control hit areas; card arrangement remains horizontal Auto Layout.

Review: [Revised carousel](figma-previews/track-record-carousel.png), [State02](figma-previews/track-record-state-02.png), [State03](figma-previews/track-record-state-03.png), [Team transition](figma-previews/track-record-team-transition.png), [Audit and component IDs](figma-previews/track-record-carousel-audit.json). [Open existing section](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=22-96). [Prototype starting frame](https://www.figma.com/proto/rOfocrKCEhJwAyOTxRF82h?node-id=86-335&starting-point-node-id=86%3A335&scaling=scale-down).

Future responsive proposal only: one fully visible card on mobile and approximately 1.5 on tablet, with card contents hugging after wrap and meaningful focus/selection semantics. No responsive page was modified for this task. **Await user approval.**

## 2026-10-10 — Approved Track Record adapted to tablet and mobile

Desktop carousel approved by the user. Replaced only the older Verified Highlights contents within existing tablet section `71:110` and mobile section `71:446`. Existing pages, homepage frames, desktop carousel, foundations and Component Library were preserved. All nine other homepage sections at each breakpoint matched their pre-edit recursive signatures, excluding their necessary vertical displacement. No Next.js source was modified.

### Responsive composition

- **05 — Tablet:** 768px section, 32px side margins and 704px content width. A complete 544px achievement card sits beside a 144px next-image preview with a 16px gap. The preview is an intentional bounded photo crop with a fully visible year label, rather than clipped card typography. Image height is 280px; card height is 482px. Section height is 894.8px, with 48px top/bottom padding. Heading and placement typography use the existing 28px size; body copy remains 16/24.
- **06 — Mobile:** 390px section, 20.8px side margins and 348.4px card width. One complete card is visible, with a 220px photograph and native editable information beneath it. Card height is 399.6px. The heading uses 24/30 and placement uses 28/35; category, competition and image captions remain readable. The 860.4px section hugs its contents, including a stacked 77px progress/attribution area.
- Both preserve the approved eyebrow, heading, supporting copy, dark surfaces, green accents, subtle gray text, 6px corners, photographic caption treatment and existing icon-button instances. A 20.8px introduction-to-controls gap and 32px controls-to-card gap keep narrow layouts deliberate. Controls and indicators have 48×48px hit targets.
- Reused the approved card construction as breakpoint-specific reusable main components, preserving its styles, color-variable bindings, native text and real photographic image fills. Card components: tablet `95:859`, `95:869`, `95:879`; mobile `95:1334`, `95:1344`, `95:1354`. No existing main component was changed.

### Content and imagery

The exact same three desktop records remain: 2025 Formula SAE Japan 2nd place / Presentation EV; 2022–2024 Formula Bharat Pi-EV three consecutive Triple Overall titles; 2023 Formula SAE Japan 3rd place / Presentation. These remain explicitly team-reported results from the official About timeline. No new achievement or organizer certification claim was added.

Reused the existing image hashes for `timeline-2025-3.jpg`, `timeline-2024-1.jpg` and `timeline-2023-3.jpg`; no stock imagery or new downloads. Images use proportional FILL cropping within their photo bounds. Contextual timeline captions retain the desktop distinction between an official activity photograph and an independently verified award moment. Existing publication-permission uncertainties still apply.

### States and prototype connections

Three responsive native carousel components per breakpoint: tablet `95:889`, `95:947`, `95:1005`; mobile `95:1364`, `95:1418`, `95:1472`. Linked top-level prototype states are tablet `95:1063`, `95:1103`, `95:1143`, and mobile `95:1526`, `95:1562`, `95:1598`. Manual next/previous buttons and indicators connect these frames with 150ms dissolve transitions using the same fallback structure as desktop. First Previous and last Next remain disabled. Homepage controls enter the corresponding isolated carousel states; these are section prototypes, not duplicated full homepages. No autoplay or horizontal scrolling is enabled.

Reaction destinations and 48px hit targets were inspected in the API. Responsive prototype playback was **not runtime-tested** in this update; wiring is verified, not claimed as a live click test. Keyboard focus and screen-reader semantics remain implementation work.

### Rendered QA and layout integrity

Inspected all six rendered slide states and full-resolution crops of each homepage's transition into Team. Fixed inherited header distribution that eliminated the introduction-to-arrow gap, and corrected the mobile progress frame to hug both rows. Final structural audit reports **zero containment faults, zero Auto Layout child overlaps and zero missing fonts across all six states**. Every official image hash remains present, typography is visible, and photos preserve their aspect ratio through proportional cropping. The bounded tablet preview never extends beyond the content width.

Tablet Track Record ends at y=5686.1333 and Team begins at y=5686.1333; mobile ends at y=5483.1666 and Team begins at y=5483.1665 (subpixel rounding only). Homepage heights expand/reflow naturally to 9671.4668px tablet and 10287.4336px mobile. No clipping or overlap is visible at either section boundary. Cards and text remain native/editable.

Review exports: [Tablet](figma-previews/track-record-tablet.png), [Mobile](figma-previews/track-record-mobile.png), [All six states](figma-previews/track-record-responsive-review.png), [Tablet Team transition](figma-previews/track-record-tablet-team-transition.png), [Mobile Team transition](figma-previews/track-record-mobile-team-transition.png), [Structural audit](figma-previews/track-record-responsive-audit.json). Updated full-homepage previews also remain in `figma-previews`.

Existing Figma sections: [Tablet](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=71-110), [Mobile](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h?node-id=71-446). **Complete; stopped for user review before implementation.**


## 2026-10-10 — LOW frontend implementation completed

User authorized autonomous implementation in the existing Next.js application. Desktop, Tablet and Mobile were audited for bounds, typography, assets and sponsor fit; no confirmed defect required a Figma edit. Approved canvases, foundations and components remain unchanged. The LOW company-profile homepage is now implemented using reusable App Router/TypeScript/Tailwind components and the exact official assets. All 27 sponsor logos remain represented with contain sizing. The approved carousel now has working React state, buttons, indicators, keyboard and touch controls; the responsive menu, section links, email and public destinations are functional.

ESLint, TypeScript, production build and final Chrome production browser checks at 1440/768/390 passed. Actual rendered screenshots were inspected against Figma; section geometry matches within browser rounding, with no observed overflow/clipping. Responsive typography, photo crop, sponsor border opacity and final-row positioning were reconciled against the source. No commerce/PWA, deployment or push was performed.

[Frontend handoff](frontend-handoff.md), [Final implementation report](overnight-progress.md), [Actual responsive preview](implementation-previews/responsive-overview.png), [Browser evidence](implementation-previews/browser-checks.json). Existing image-publication and sponsorship-currentness uncertainties remain documented. Implementation complete; stopped for review.
