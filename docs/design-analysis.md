# Anargya website — Phase 1 design analysis

Research date: 8 October 2026 (Asia/Jakarta). Status: **proposal awaiting approval; no Figma design or application implementation performed**.

## 1. Context, intent, and source authority

Adapt Sapu Angin's distinctive, image-led engineering-team presentation into an editable Anargya website design, using Anargya's supplied tokens and only verified Anargya content.

The project instructions in [AGENTS.md](../AGENTS.md) require analysis, this saved document, and approval before Figma creation. Frontend work requires a separate explicit request. This document covers the user's requested research, token extraction, comparison, component inventory, and proposed architecture; it does not advance to design creation.

Source priority:

1. [Anargya design system](anargya-design.md): authoritative supplied brand and visual specifications.
2. Anargya content and special-task requirements: no content pack was provided with these references.
3. [Sapu Angin design system](sapu-angin-design.md): reference tokens and general component requirements.
4. [Live Sapu Angin website](https://www.itsteamsapuangin.com/): observed composition and behavior.
5. Accessibility and UX recommendations, including [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/).

[Figma instructions](figma-instructions.md) define the workflow and future target frames: 1440px desktop, 768px tablet, 390px mobile. Their website URL placeholder is superseded by the actual URL supplied by the user and AGENTS.md.

Evidence labels used below:

- **A**: explicitly specified in the Anargya file.
- **S**: explicitly specified in the Sapu Angin file.
- **L**: live screenshot, rendered DOM, or computed-style observation.
- **P**: proposed project rule, mapping, or extension; not an official brand specification.
- **U**: unavailable or not verified.

Both design-system files acknowledge low-confidence audience/surface inference. Sapu Angin's description as an authenticated dashboard does not match the public team website inspected. Anargya's inferred audience of readers/knowledge seekers is not a confirmed audience brief. Prospective members and partners are plausible audiences for the proposal, not supplied facts. Extracted component counts are diagnostics, not required quantities.

## 2. Inspection coverage and limitations

The homepage and all five main navigation destinations were accessible:

| Source | Inspection performed | Principal evidence |
|---|---|---|
| [Homepage](https://www.itsteamsapuangin.com/) | Desktop screenshots across the page; rendered DOM and computed geometry; narrow mobile and tablet-sized states | Hero, About, metrics, full-width feature, editorial rows, rotating competition banners, testimonials, recruitment teaser, sponsor wall, footer |
| [Team](https://www.itsteamsapuangin.com/team) | Desktop hero, history, division and portrait areas; rendered content and card measurements | History rows, division cards, categorized personnel groups |
| [Cars](https://www.itsteamsapuangin.com/cars) | Desktop opening composition and complete rendered content inventory | Category anchor cards, vehicle profiles, specification items, achievement imagery |
| [Achievements](https://www.itsteamsapuangin.com/achievements) | Desktop opening and scrolled award grid; rendered content inventory | Image-heavy award archive on black |
| [Recruitment](https://www.itsteamsapuangin.com/recruitment) | Desktop opening, complete content inventory, FAQ click | Local navigation, requirements, timeline, divisions, documents, application link, multi-expand FAQ |
| [Sponsors](https://www.itsteamsapuangin.com/sponsors) | Desktop opening and rendered content inventory | Introductory section and grouped sponsor tiers |

Viewport controls requested 1440×1000, 768×1024, and 390×844. The browser reported effective CSS viewports of approximately **1309×909, 698×931, and 354×767**, respectively. Measurements below are computed CSS values at those effective widths, not certified measurements at the exact future Figma frame sizes. Temporary viewport overrides were reset after inspection.

Limitations: inner pages were not fully checked at every responsive width; no complete keyboard/accessibility audit, touch-device session, hover sweep, or reduced-motion test was performed. Precise breakpoint thresholds, autoplay timing, easing, scroll-reveal choreography, and all loading/failure states remain unverified. Some images were initially blank during loading; loaded team history imagery was subsequently confirmed, while some personnel images visibly used placeholder silhouettes. Sponsor asset loading was not comprehensively audited. No external application forms, sponsor sites, social accounts, or downloads were opened. No factual Sapu Angin claims are adopted as Anargya content.

## 3. Actual Sapu Angin structure and visual composition

### 3.1 Global navigation and page shell (L)

- A fixed full-width navigation bar places the team logo left and five text links right: Team, Cars, Achievements, Recruitment, Sponsors. No desktop dropdown was observed.
- At the hero it overlays the photograph with a light logo and links; after scrolling it becomes a white bar with darker content. The active inner-page link uses red text and an underline.
- Computed desktop navbar height was approximately 72px; narrow-screen height approximately 64px. Desktop link type was 16px, weight 500.
- Narrow and tablet-sized views replace the horizontal links with a menu toggle. Clicking opens a white vertical link panel below the logo row, over the hero. Closing was verified. Escape behavior, focus restoration, and expanded-state announcements were not verified.
- The footer is black: institutional identity/address left, two navigation groups and social links right, then copyright and team-specific decoration. A floating circular red back-to-top control appears after scrolling; its activation was not tested.
- Footer Competition, Gallery, News, and Contact Us links target `/404` in the rendered DOM. These are not working content-page patterns to reproduce.

### 3.2 Homepage sequence and geometry (L)

| Order | Composition | Measured or observed reference geometry | Adaptation value |
|---|---|---|---|
| 1. Hero | Full-bleed celebration photograph, darkening toward bottom; centered uppercase headline on a red rectangular strip; supporting paragraph beneath | Approximately one viewport tall, 909px desktop / 767px narrow; desktop H1 36px/45px, weight 700, letter spacing −1.2px; headline strip padding 8px 24px | Image establishes identity before details; retain focal subject and lower text zone using Anargya assets |
| 2. About | Large isolated vehicle image left; eyebrow, heading, paragraph, outlined CTA right | 1280px outer container at inspected desktop width; total section ≈534px; heading 42px/52.5px; right heading width ≈432px | Asymmetric introduction with more room for the vehicle than text; image-first centered stack on narrow screens |
| 3. Metrics | Three centered numeric blocks with smaller labels | ≈376px section height with 96px vertical padding; outer container 1280px with 96px horizontal inner padding; one value uses 128px/128px type | A deliberate large-scale visual pause; narrow view stacks metrics, with 40px section padding |
| 4. Achievement feature | Full-width grayscale photograph and large branded award artwork, outlined CTA | 560px desktop height / 300px narrow | Wide editorial interruption; artwork and achievement claims are team-specific and must not be transferred |
| 5. Editorial sequence | Three alternating text/image rows: achievement story, vehicles, people | Section padding 80px vertically; 1280px outer container with 96px inner side padding; row grid gap 96px; text width ≈397px and image width ≈595px; images 360px high, clipping radius 12px | Approximate **40:60 text-to-image balance**, alternating sides, generous separation; image ratio ≈1.65:1 at inspected width, not a universal ratio |
| 6. Competition banners | Full-width darkened photographs with heading/body lower-left and competition logos alongside | ≈960px section; large heading 56px/70px; active Formula Student / Shell Eco-marathon panel changes across observations | Immersive research/competition feature; autonomous motion should not be copied without accessible controls |
| 7. Testimonials | Centered section title over four portrait panels | ≈759px section with 80px vertical padding; heading 56px/70px; desktop shows four portraits across | Conditional credibility component; supplied quotes/names/permission are required |
| 8. Recruitment teaser | Large image-led split/overlay banner with copy and outlined CTA | ≈763px section; heading 42px/52.5px | Conditional action section; current live teaser repeats vehicle-oriented copy rather than a distinct recruitment explanation |
| 9. Sponsors | Centered eyebrow/title, dense wall of framed logo tiles in differently sized rows | 80px section padding; nested grids range from one to five columns, with a measured 20px gap; logo images use contain | Tier-sensitive logo presentation; do not infer Anargya tiers or sponsors |
| 10. Footer | Black identity/contact area with link groups and social icons | ≈545px desktop height, content-driven | Strong closing band; use actual Anargya destinations and contact details |

The homepage is mostly **white with black headings and gray body copy**, punctuated by photographic dark sections and red accents. Its sophistication comes from shifts in scale, asymmetric editorial proportions, alternation between contained content and full-width imagery, and ample whitespace—not from a uniform card grid.

### 3.3 Inner-page patterns (L)

**Team:** a wide grayscale photo masthead with a red title tab near its lower edge; centered history title; alternating history text/photo rows; a team-specific cultural banner; icon-led division cards; colored section strips and grouped advisor/manager/member portraits. Division cards appear four across with the remaining row centered. A measured advisor portrait container was 280×270px with 12px radius; the surrounding flex layout had 16px gap. Names and roles sit below portraits. Some portraits use placeholder silhouettes. History heading measured 48px, group headings 39px—both absent from the supplied scale.

**Cars:** grayscale vehicle masthead and red lower-edge page label; broad centered introduction; two side-by-side category anchor cards; subsequent vehicle profiles combine image, descriptive copy, prominent metric, divider, icon/label/value specifications, and achievement assets. The transferable pattern is a category overview followed by deeper profiles, not the particular vehicle names, engine specifications, category colors, or fuel records.

**Achievements:** masthead label followed by a dark archive dominated by gold laurel image assets in a multi-column grid. Many award words are embedded in images. For Anargya, achievement titles, dates, and results should be native editable text backed by verified records; award graphics should not carry the only readable information.

**Recruitment:** masthead, centered introduction, six-link local section navigation, numbered eligibility list, timeline articles, technical/nontechnical division cards with skill chips, required-document links, application CTA, contact details, and FAQ. Clicking a second FAQ item exposes its expanded state while the first remains expanded: observed multi-expand behavior. Requirements, dates, division taxonomy, contacts, and application destinations are Sapu Angin facts and are not transferable.

**Sponsors:** masthead plus centered acknowledgment copy and logo groups organized by institutional/media/sponsorship categories. The public sponsor wall supports different visual prominence by group. Anargya must supply its actual grouping and approved logo treatments.

### 3.4 Typography, images, and interactions (S + L)

- Live computed font family matches the supplied generated DM Sans family names. These are build-generated names, not a font to import into Anargya.
- Desktop hierarchy observed: navigation 16px/500; About heading 42px/700; story heading 36px/700; feature/section heading 56px/700; body copy often 18px, with a measured gray paragraph line height of 29.25px. Source base remains 16px/24px.
- Narrow homepage H1 becomes 18px; About/story/testimonial headings become 24px/30px; competition headings become 30px/37.5px. The hierarchy is re-composed, not proportionally shrunk.
- H1 and eyebrows use uppercase selectively; story headings use purposeful line breaks. Native editable text should reflow rather than inherit desktop-only forced breaks.
- Photos use contextual action/team scenes; vehicles can be isolated cutouts; banners use cover crops and dark overlays; sponsor logos use contain. Image containers should reserve space, preserve focal points, and avoid stretching.
- Reference outlined CTAs measured 18px text, 8px 16px padding, 6px radius, about 46px height, and a thin red or white border. Computed color transitions use 300ms. Hover appearance itself was not verified.
- Automatic competition-panel changes and header changes on scroll were observed. Testimonial toggle inputs exist in the narrow DOM, but their visual transition was not tested. Scroll-reveal animation, card lift/zoom, and detailed hover timing cannot be claimed from this inspection.

## 4. Extracted design tokens and rules

### 4.1 Token comparison (A and S only)

| Token family | Anargya — authoritative supplied values | Sapu Angin — supplied reference values |
|---|---|---|
| Font family | `font.family.primary=ui-sans-serif`; stack: `ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji` | `__DM_Sans_e64f39`; fallback `__DM_Sans_Fallback_e64f39` |
| Base text | 16px, weight 400, line height 24px | 16px, weight 400, line height 24px |
| Size scale xs → 4xl | 12, 14, 16, 18, 20, 24, 28, 32px | 14, 16, 18, 20, 32, 36, 42, 56px |
| Primary text | `color.text.primary=#ffffff` | No explicit primary text token |
| Secondary text | `color.text.secondary=#29d970` | `color.text.secondary=#ffffff` |
| Tertiary text | `color.text.tertiary=#b3b3b3` | `color.text.tertiary=#5d5d5d` |
| Base surface | `color.surface.base=#000000` | `color.surface.base=#000000` |
| Additional surface | `color.surface.muted=#121212` | `color.surface.raised=#e50808` |
| Other text | No inverse token | `color.text.inverse=oklab(0.999994 0.0000455677 0.0000200868 / 0.8)` |
| Border | `color.border.default=#e5e5e5` | Not explicitly defined |
| Spacing 1 → 8 | 4, 8, 12, 16, **20.8**, 32, 40, 48px | 2, 8, 12, 16, 24, 32, 56, 80px |
| Radius | `radius.xs=6px`; `radius.sm=9999px` | `radius.xs=6px`; `radius.sm=33554400px` |
| Shadow | No supplied token | `shadow.1`: four transparent zero shadows, then `0 10px 15px -3px rgba(0,0,0,.1)` and `0 4px 6px -4px rgba(0,0,0,.1)` |
| Motion | instant 150ms, fast 300ms, normal 500ms | Same three durations |
| Accessibility | WCAG 2.2 AA; keyboard-first; visible focus; contrast constraints | Same requirements |
| Component contract | Default, hover, focus-visible, active, disabled, loading, error; responsive/edge cases; keyboard/pointer/touch | Same requirements |
| Extraction density | 24 links, 8 buttons, 2 lists, 1 navigation | 73 links, 4 inputs, 2 buttons, 2 lists, 1 navigation |

Important interpretation:

- Green is explicitly a **secondary text token**, not an officially named primary-button fill. Reusing its value through an action alias is a proposal.
- Anargya defines no named primary/secondary/accent brand palette beyond the listed semantic roles; no success/warning/error colors; no icon set; no shadow; no heading weights or non-base line heights; no official button/card/nav styling; no grid/container/breakpoint values. These must not be presented as existing official specifications.
- The tiny type scales and unusual spacing/radius values must be preserved as supplied. `radius.sm` means a pill-shaped result in practice; it is not a useful literal card corner. The Sapu Angin huge radius appears extraction-like and is not transferred.
- Live white Sapu Angin surfaces, black headings, 12px card/image corners, 48/39px team headings, and 128px metrics are missing from its source tokens. The token file is not a complete description of the live UI.
- The shared component-state contract is a requirement for future guidance, not evidence that either live site already implements every state.

### 4.2 Proposed Anargya roles using existing tokens (P)

| Role | Proposed mapping | Rationale |
|---|---|---|
| Page background / inset panel | `color.surface.base` / `color.surface.muted` | Black narrative canvas; muted surfaces distinguish supporting content |
| Heading / body | `color.text.primary` / `color.text.tertiary` | Preserve readable hierarchy without introducing colors |
| Eyebrow / active link / emphasized role | `color.text.secondary` | Green accents at informative and interactive points |
| Accent action fill | Alias `color.action.accent → color.text.secondary` | Proposed semantic reuse; does not rename the official token |
| Text on accent fill | Alias `color.action.onAccent → color.surface.base` | Black-on-green is readable; white-on-green is not suitable for body/button text |
| Control outline | `color.border.default` or `color.text.secondary`, according to variant | Borders must remain legible without making every decorative divider high contrast |

Calculated sRGB contrast ratios, rounded: white/black **21.00:1**; tertiary gray/black **10.02:1**; green/black **11.25:1**; white/muted **18.73:1**; gray/muted **8.93:1**; green/muted **10.04:1**; white/green **1.87:1**. Photo overlays still require checking against each final crop. No error color is invented: use an explicit text message and icon until a semantic status extension is approved.

### 4.3 Proposed geometry and type rules (P, approval required)

Use the existing Anargya scale first. This reconciles the reference's spacious layout with the prohibition on one-off exceptions.

- Container: proposed maximum **1280px**, borrowing the live reference shell; fluid below that width. At 1440px this yields 80px outer margins. Those margins are derived geometry, not a new spacing token.
- Layout grid: proposed 12 columns desktop, 8 tablet, 4 mobile; gutter `space.4` (16px). Grid counts and max-width are structural proposals because Anargya has none.
- Contained-section inset: `space.4` mobile, `space.6` tablet, `space.8` desktop. Avoid copying the reference's 96px internal padding literally everywhere.
- Vertical section padding: `space.8` mobile/tablet; desktop spacious sections may use two `space.8` units (96px) as a documented composition. This is a proposed reusable section rule, not an official `space.9` token.
- Editorial row: approximate reference 40:60 text/image proportions on desktop with `space.8` gap; stack at tablet/mobile when copy or focal subject becomes cramped. Preserve narrative order rather than alternating mobile reading order.
- Responsive behavior: design the required 1440/768/390 frames; propose stacked content and collapsed navigation for the tablet/mobile frames. Exact production breakpoint thresholds remain to be chosen from content-fit tests; frame widths are not breakpoints.
- Typography: propose H1 32px (`4xl`), H2 28px (`3xl`), H3 24px (`2xl`) on desktop; H1 28px, H2 24px, H3 20px (`xl`) on narrow screens. Body must start from official 16px/24px/400; captions should use 14px (`sm`), utility labels 12px (`xs`) sparingly.
- Proposed heading weight 700 and navigation/action weight 500; proposed heading line height 1.25, secondary non-base text line height 1.5. These are consistent role rules for approval, not official weights/line heights. Letter spacing should stay normal initially rather than copying Sapu Angin's −1.2px exception.
- Metrics should emphasize hierarchy with 32px values, 14px labels, green emphasis, and whitespace. Do not silently import the reference's 128px values or add a display scale. A larger display scale would require a later explicit decision.
- Rectangular controls/cards/image clips should use `radius.xs`; tags may use `radius.sm`. No new 12px corner or shadow is proposed by default.
- Hero should retain a full-width image and lower text zone, with content-driven minimum height around one viewport; copy must never be clipped to preserve a fixed height. Headline-strip fill is the proposed green action/accent alias with black text. A neutral black panel with green eyebrow is the fallback if the supplied photograph makes a strip visually unsuitable.

## 5. Design-system mapping and adaptation decisions

Every P item below remains a proposed decision until approval. Official A values always override reference styling.

| Element | Sapu Angin reference and provenance | Anargya specification | Final proposed decision and reason |
|---|---|---|---|
| Brand assets | Team logos, DOAIBU art, championship laurels (L) | No approved assets supplied (U) | Use only supplied Anargya logo/art; neutral labeled placeholders until available |
| Main surfaces | White editorial areas, dark photo bands (L); base black (S) | Base black; muted near-black (A) | Keep full-width/contained rhythm using base/muted surfaces; white content panels are not imported |
| Accent | Red raised surface (S/L) | Green secondary text (A) | Green emphasis; filled-action alias is P; no reference red |
| Body/heading colors | Black heading, gray prose on white (L) | White primary, gray tertiary (A) | White headings and tertiary prose on dark surfaces |
| Font | DM Sans generated families (S/L) | System sans stack (A) | Use system sans; later choose an available Figma font representing the stack, verify metrics, document the substitute |
| Type hierarchy | 36/42/56px headings, 128px metric (L) | Scale stops at 32px (A) | Role hierarchy uses 32/28/24px proposal; use placement and spacing for emphasis |
| Line height/weight | Bold headings, variable line heights (L) | Base 400, 16px/24px only (A) | 700 headings / 500 actions and role-based line heights are P, not extracted Anargya facts |
| Spacing | 80/96px sections and row gaps (L); 80px top token (S) | 4–48px scale with 20.8px step (A) | Use Anargya tokens; compose 96px only through documented two-unit section rule |
| Container | 1280px shell with contextual inner insets (L) | Undefined (U) | Proposed 1280px fluid shell; preserve reference visual alignment without copying every inset |
| Grid | Editorial asymmetric grid; varying sponsor rows (L) | Undefined (U) | Proposed 12/8/4 foundation; local 40:60 narrative composition and content-dependent card columns |
| Navbar | Fixed logo-left/link-right; overlay → solid on scroll (L) | No component styling (U); palette/type/states (A) | Same structure, solid dark scrolled state, green active underline; verify logo contrast |
| Mobile menu | Vertical overlay panel, hamburger toggle (L) | Keyboard/touch/focus required (A) | Dark vertical panel; explicitly define expanded semantics, Escape, and focus restoration |
| Hero | Viewport-height photo, lower centered strip/copy (L) | Palette and type scale (A) | Preserve image-led hierarchy; verified Anargya headline and image; green/black proposed strip |
| Inner masthead | Grayscale photo with lower-edge title tab (L) | No hero rule (U) | Reusable dark image masthead with native title; avoid mandatory grayscale if asset clarity suffers |
| About | Vehicle-heavy left image and narrower right copy (L) | Tokens (A) | Preserve asymmetry; stack and center where needed; approved EV image only |
| Metrics | Three large values then labels (L) | Max size 32px (A) | Optional three-block arrangement; native text, verified values/units; no invented counters |
| Wide feature | Branded championship banner (L) | No achievement artwork supplied (U) | Reserve composition for an approved research/vehicle story; achievements only with records |
| Editorial rows | Alternating sides, ~40:60 ratio (L) | Spacing, colors, radius (A) | Reusable image/copy/CTA component; stable mobile narrative order |
| CTA buttons | Outlined red/white, 6px radius, ~46px height (L) | 6px radius, tokens; styles unspecified (A/U) | Proposed accent/outlined/quiet variants; token padding, 48px minimum project target height |
| Project cards | Category anchors and deep vehicle profiles (L) | No project-card specification (U) | Summary cards with approved title/image/description; deeper native specification panel only if content exists |
| Team cards | Portrait, name, role grouped by division; 12px corners (L) | 6px rectangular radius (A) | Preserve anatomy/grouping, use 6px; actual roster and authorized portraits required |
| Research/division cards | Icon/title/divider/copy, skill tags on recruitment (L) | No division taxonomy or icon system (U) | Reusable anatomy; only verified Anargya research areas and divisions |
| Image containers | Cover photos, contain logos, isolated vehicles (L) | Radius tokens (A) | Reusable cover/contain variants; focal crop metadata; no asset stretching |
| Tags/badges | Skill chips (L), oversized pill radius (S) | Pill radius 9999px (A) | Use Anargya pill radius and 12/14px type; labels wrap without truncating key meaning |
| Sponsors | Mixed-size rows and tiers (L) | No sponsor list/tier rules (U) | Contain logos; group/size only by approved relationships; no fabricated partners |
| Testimonials | Four portraits and toggle controls (L) | No testimonials supplied (U) | Defer unless authorized quotes exist; do not copy public endorsements |
| Recruitment | Local anchors, timeline, cards, documents, FAQ (L) | No recruitment brief (U) | Conditional future page; do not imply active recruitment or invent eligibility/dates |
| Footer | Identity left, link groups/socials right, dark band (L) | Dark palette (A); contacts unavailable (U) | Same broad organization; omit unapproved destinations and `/404` placeholders |
| Dividers/borders | Light outlines and separators (L) | Light border token (A) | Use sparingly on dark canvas; avoid outlining every section |
| Shadows | Subtle extracted drop shadow (S); card outlines (L) | No token (U) | Default no shadow; distinguish with muted surface/border |
| Motion | Auto-changing banners; 300ms CTA color transitions (L) | 150/300/500ms durations (A) | 150ms press feedback, 300ms color/menu transition proposal; no autoplay by default |
| Icons | Division and social image icons (L) | No official library (U) | Proposed consistent simple editable vectors; icons need visible or accessible labels |
| Responsive | Desktop columns → centered/stacked narrow content (L) | Frame sizes from workflow; behavior unspecified (U) | Re-compose at all three frames; no desktop layout shrink-to-fit |
| Accessibility | Some controls observed, compliance untested (L) | WCAG AA and complete state rules (A) | Testable acceptance criteria; visual similarity never overrides access needs |

## 6. Reusable component inventory and proposed rules

Components should be native editable Figma elements with Auto Layout, variables/styles, and instances when creation is approved. Data-dependent components must be separable from their factual content.

### 6.1 Anatomy, tokens, layout, and edge cases (P)

| Component | Anatomy and proposed specifications | Responsive/content handling |
|---|---|---|
| `Navigation/Desktop`, `Navigation/Mobile` | Logo home link; primary links; active underline; mobile toggle/panel. Proposed minimum row height 80px desktop / 64px narrow, composed from existing spaces; horizontal inset follows section rules | Collapse before links overflow; long labels wrap in menu; no clipped logos; do not expose nonexistent pages |
| `Link/Navigation`, `Link/Text` | 16px navigation, weight 500 P; white default, green emphasis; text links identify destination | Active indication includes underline; inline links wrap; no icon-only ambiguous link |
| `Button/Accent`, `Button/Outline`, `Button/Quiet` | Label plus optional icon; 16px type; padding `space.3` vertical / `space.4` horizontal; `radius.xs`; ≥48px height P. Accent uses proposed green fill/black label; outline green or default border | Allow labels to wrap and controls to grow; stack CTA groups on narrow screens with `space.2`+ separation |
| `Button/Icon` | Icon with accessible name; proposed 48×48px target, focus outline; menu/close/back-to-top variants | Actual target size must persist on mobile; toggle icon visibly changes and retains contrast |
| `Section/Heading` | Optional eyebrow, H2, supporting copy; `space.2`/`space.4` gaps; official size tokens with proposed role mapping | Native text wraps; optional fields collapse cleanly; avoid forced breaks carried from desktop |
| `Section/Hero`, `Section/Masthead` | Approved image, overlay, native heading, summary; optional verified CTA | Cover with explicit focal position; text-driven height; narrow crop must preserve vehicle/person subject |
| `Section/Editorial` | Image plus heading/body/action; desktop ~40:60, `space.8` gap; body 16px/24px | One column at constrained widths; no absolute positioning for prose; long copy increases row height |
| `Statistic/Block` | Value, unit, label, optional source/date; value 32px, label 14px | Group three across if verified content allows; stack narrow; distinguish unknown from zero; no empty invented metric |
| `Card/Project` | Approved image, title, brief summary, destination label; muted surface, 6px corner, `space.4` padding, `space.3` internal gap | Proposed 3/2/1 columns desktop/tablet/mobile where content fits; card height grows; no nested interactive controls inside whole-card links |
| `Panel/Specification` | Section heading and repeated label/value/unit items; optional generic vector icon | Proposed 3/2/1 item columns; long labels/values wrap; preserve units; absent facts omitted rather than fabricated |
| `Card/Team` | Portrait, name, role, optional verified division; name 18px, role 14px; `space.2` gap | Proposed 4/2/1 columns subject to fit; no truncation of names; neutral missing-portrait placeholder explicitly labeled in draft |
| `Card/Research` | Icon, title, concise scope, optional tags; muted surface, 6px radius, `space.4` padding | Proposed 3/2/1 columns; no invented division names; static unless a real destination exists |
| `Tag/Topic`, `Badge/Status` | Label, optional icon; 12/14px; `space.1`/`space.2` padding; pill radius | Wrap multiword labels; error/status meaning cannot rely on color; no unexplained abbreviations |
| `Media/Image` | Cover/contain/cutout variants, caption/source metadata, 6px clip where appropriate | Proposed editorial ratio 5:3 and portrait ratio 1:1 are starting points, not brand facts; preserve natural ratio if crop loses meaning |
| `Logo/Partner`, `Section/Partners` | Approved logo and destination, contain fit, `space.4` inset, consistent visual alignment | No forced equal intrinsic aspect ratio; tier sizes only when approved; use approved dark-compatible logo asset |
| `Footer/Desktop`, `Footer/Stacked`, `Link/Social` | Identity/contact block, approved links, labeled social controls, copyright | Stack groups in reading order; omit unavailable details; never invent an address or social handle |
| Conditional `FAQ/Item`, `Timeline/Item`, `Card/Testimonial` | Native question/answer, stage/date, or authorized quote/attribution | Build only for approved page scope and supplied content; accordion content grows without clipping |

No dropdown, search field, authentication interface, or generic dashboard controls are required by observed primary navigation or supplied Anargya requirements.

### 6.2 Shared state contract (A requirement; P realization)

Every component must document all seven required states. Static items must explicitly mark inapplicable states **N/A**, rather than inventing interaction or errors.

| State | Proposed interactive realization | Static/data component realization |
|---|---|---|
| Default | Readable token colors, explicit label, clear destination/action | Visible supplied content and stable media bounds |
| Hover | Underline for links; outlined CTA may fill green with black label; no layout movement; `motion.duration.fast` | N/A unless genuinely interactive; do not suggest clickability |
| Focus-visible | Proposed 2px visible outline with 4px offset; white against green or green against dark; must not be removed | N/A for nonfocusable content; child links follow interactive contract |
| Active | Retain contrast, use instant-duration feedback; current-page links also keep underline | Selected data variant only if relevant; otherwise N/A |
| Disabled | No activation; explicit unavailable label where needed; retain legibility rather than relying solely on reduced opacity | N/A except unavailable control descendants |
| Loading | Keep dimensions, clear loading label, prevent duplicate submission where applicable; announce status in implementation | Reserved image bounds or labeled loading block; no fake factual skeleton text |
| Error | Clear message and icon using existing readable tokens; recovery action when available; no fabricated red semantic token | Missing-image fallback; unavailable-data message in draft; do not replace unknown facts with plausible values |

Buttons activate by pointer/touch and keyboard Enter/Space; destination links use Enter. Hover must never be the sole access path to content. Mobile-menu toggle must announce open/closed state, permit Escape closure, and restore focus to its trigger; normal link order must be predictable. If a later design uses a modal drawer instead of the proposed nonmodal panel, it must separately specify focus containment and background interaction. Accordion buttons must expose expanded state and support Enter/Space; multiple expansion follows the observed pattern if that component is selected.

Figma can represent visual state variants, menu opening/closing, page links, and simple transitions. Real keyboard semantics, focus management, responsive reflow, reduced-motion preferences, loading/error announcements, and any scroll-linked motion require later code verification. No prototype can certify WCAG compliance by itself.

## 7. Proposed Anargya information architecture

### 7.1 Approach comparison

| Approach | Benefit | Trade-off |
|---|---|---|
| **Recommended: dark image-led editorial adaptation** | Preserves hero, asymmetric vehicle intro, alternating stories, full-width feature, and clear footer while using supplied Anargya tokens | Reference scale contrast is reduced by Anargya's 32px maximum; compensate with imagery and spacing |
| Compact component-led overview | Faster to populate with limited content and easy to keep consistent | Loses the reference's distinctive photographic narrative and alternating composition |
| Expanded display-type adaptation | Closest to the reference's oversized typography/metrics | Requires a new approved type scale; not justified as an existing Anargya brand rule |

Recommend the first approach. Do not create a new display scale in this phase.

### 7.2 Homepage proposal and content gates

This is proposed architecture, not a claim that all sections have available content or that the final scope is approved.

| Order | Proposed section | Reference pattern | Content prerequisite |
|---|---|---|---|
| 1 | Navigation | Logo-left, concise links-right; mobile panel | Approved logo and actual destinations; provisional labels About, Research, Vehicles, Team, Contact |
| 2 | Hero | Full-bleed image, lower headline/summary | `[Official Anargya headline]`, `[Approved summary]`, `[Anargya hero image]`; no invented slogan |
| 3 | About Anargya | Vehicle-heavy split intro | `[Approved team overview]`, `[Approved vehicle image]` |
| 4 | Research and Development | Wide feature plus alternating editorial row(s) | `[Verified research focus]`, `[Approved activity imagery]`; no implied publications or division structure |
| 5 | Projects / Vehicle Showcase | Category summaries and image/copy profiles | Actual project/vehicle names, authorized media, descriptions, and any published specifications |
| 6 | Verified highlights / Achievements | Metric trio and/or editorial achievement story | Documentary evidence of each figure/result and date; omit if unavailable, do not use Sapu Angin's records |
| 7 | People / Team | People teaser followed by grouped portrait cards if needed | Approved roster, roles, grouping, portraits; avoid unverified academic details |
| 8 | Sponsors and Partners (conditional) | Grouped contain-logo wall | Confirmed relationships, approved assets, display/tier rules |
| 9 | Contact and footer | Closing dark identity band, grouped links | Actual public contact route, approved social links; no implied form/backend |

The research section is placed ahead of highlights to fit the user's Anargya research-team project, rather than assuming Sapu Angin's championship narrative applies. A feature can focus on verified engineering work instead of a trophy banner.

News, gallery, competition pages, recruitment, and testimonials remain **optional future scope**. They must not appear as working navigation destinations until content and purpose are approved. Recruitment must not imply an open application cycle without current official information. A draft may show explicitly labeled placeholder sections for review, but unavailable material should be omitted from a publishable version.

### 7.3 Proposed page organization

Begin with a homepage narrative and section anchors. If the content inventory justifies deeper pages, propose:

- **About / Team:** history and people patterns, using only approved Anargya facts.
- **Research:** research-area summaries and individual work stories; no implied project count.
- **Vehicles / Projects:** summary categories followed by technical profile content.
- **Achievements:** only when records exist; text-driven archive rather than laurel images carrying all meaning.
- **Partners:** only if partner content exceeds the homepage wall.

Separate pages are not yet a requirement. A single coherent homepage is preferable to empty duplicated routes. The header must include only the final approved destinations. Contact can remain a footer/section destination if no separate page is justified.

## 8. Accessibility acceptance criteria for later design and implementation

These are prospective checks, not a pass claim for either live website. Criteria derive from Anargya's AA requirement and [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/); the 48px target is a stricter project proposal.

| Check | Pass condition |
|---|---|
| Contrast | Normal text ≥4.5:1; large text ≥3:1; necessary control boundaries/state indicators ≥3:1 against adjacent colors; every image-text crop checked |
| Keyboard | Every actionable item reachable and operable; logical order; visible focus; no keyboard trap; menu/accordion state correctly exposed |
| Persistent header | Focused controls are not entirely obscured (AA); proposed stronger practice is full visibility with header-aware anchor offsets |
| Target size | Meet AA 24×24px minimum or permitted exceptions; proposed primary controls/icon buttons ≥48×48px and adjacent controls separated by at least `space.2` |
| Reflow | No content loss or horizontal page scrolling at 320 CSS px; text resizes to 200% without clipping; long labels and changed text spacing remain usable |
| Images/text | Meaningful alternatives; decorative assets ignored by assistive technology; achievement/specification information remains native text |
| Motion | Any qualifying automatically moving content lasting over five seconds has pause/stop/hide; proposed default is static feature content; reduced-motion handling documented |
| Content semantics | One page H1, coherent headings, actual destination links, meaningful action names and units; no state conveyed solely through color |
| Feedback | Loading/error status understandable and announced where needed; unknown content distinguished from zero or a real published fact |

## 9. Content, unresolved inputs, and anti-patterns

Copy should be concise, confident, and descriptive as required by Anargya. Example proposed interface labels are “Explore research,” “View vehicle,” and “Meet the team”; these are action-copy proposals, not team claims. Avoid unsupported superlatives such as “world-leading” or invented achievement captions.

Content required before high-fidelity factual assembly:

1. Approved logo files and usage rules, hero/vehicle/activity images and rights to use them.
2. Approved team overview, research areas, project/vehicle inventory and specifications.
3. Any metrics, achievements, dates, competitions, roster/roles, sponsor relationships, and public contact/social destinations.
4. Audience and intended primary action confirmation; the extraction files do not supply a reliable audience brief.
5. Approval or correction of proposed typography roles, action aliases, component variants, container/grid rules, spacing compositions, and page scope.

The system font stack requires a practical Figma font selection later because `ui-sans-serif` is a CSS generic, not a single portable font asset. The selection must be documented as a platform approximation and checked for wrapping; it must not be represented as a newly discovered official Anargya font.

Prohibited adaptations:

- The design must not reuse Sapu Angin logos, photographs, sponsor identities, names, records, vehicle specifications, cultural art, or proprietary championship graphics as Anargya assets.
- It must not copy the reference's red, gold, DM Sans family, 12px radius, 128px metric typography, or white surface treatment as official Anargya tokens.
- It must not silently normalize Anargya's 20.8px spacing step or add one-off type sizes.
- It must not reproduce `/404` navigation, clipped responsive text, low-contrast white-on-green actions, or hover-only disclosures.
- It must not flatten a page or factual copy into a screenshot; photos remain media but text/layout/components remain editable.
- It must not imply that untested live interactions, responsive pages, or accessibility states were verified.

## 10. Review checklist and next-phase boundary

- [x] Read AGENTS.md and all three required references completely.
- [x] Inspect accessible reference homepage and five main navigation pages.
- [x] Record actual live patterns, responsive samples, geometry, interactions, and inspection limits.
- [x] Extract both supplied token sets without merging their visual identities.
- [x] Separate official Anargya rules, reference observations, proposed extensions, and missing content.
- [x] Document mapping, reusable components, state contract, and content-gated architecture.
- [x] Define future testable accessibility criteria and prohibited adaptations.
- [ ] User reviews and approves/corrects this analysis.
- [ ] Approved next phase: create native Figma foundations and reusable components incrementally, then assemble agreed pages.

**Stop here for approval.** No Figma file/design creation, app-code change, dependency installation, or implementation is part of this phase. Reuse this document for later work and update specific decisions when approved; do not repeat the reference research without a material change.
