# Anargya multi-page art direction

10 October 2026 · **Proposed direction, awaiting approval.** Complements [architecture](multipage-architecture.md) and [implementation plan](multipage-implementation-plan.md). Existing approved foundations and homepage remain the starting point; no Figma or application edits have been made.

## Reference observations and adaptation

The existing [design analysis](design-analysis.md) supplies detailed earlier observations. Fresh desktop opening screenshots and rendered content on 10 October confirmed these broad patterns; full inner-page responsive/interaction QA was not repeated.

| Live reference | Observed composition | Anargya adaptation | Excluded |
|---|---|---|---|
| [Home](https://www.itsteamsapuangin.com/) | Photographic introduction, changes in scale, vehicle/people previews and clear page navigation | Preserve photographic gateway and editorial rhythm; shorten detailed content into route previews | Their brand artwork, claims, recruitment and unsupported destinations |
| [Team](https://www.itsteamsapuangin.com/team) | Photo masthead, history chapters, divisions and grouped people profiles | Historical team narrative, documentary photographs and supported organization information | Their culture/divisions/people; an invented Anargya roster |
| [Cars](https://www.itsteamsapuangin.com/cars) | Photo masthead, category entry points, deep vehicle profiles and specifications | Mark-specific anchors and broad vehicle images with native specification lists | Their category taxonomy, specifications and vehicle imagery |
| [Achievements](https://www.itsteamsapuangin.com/achievements) | Celebration masthead and dense dark award-art archive | Image-led chronological records with readable event/year/category/result text | Their laurels, trophy counts and image-only factual text |
| [Sponsors](https://www.itsteamsapuangin.com/sponsors) | Centered thanks, grouped logo wall, partnership proposition and contacts | Institutional acknowledgment, complete uniform wall and separate collaboration contact | Unverified tiers/media partners and promised exposure/benefits |

Sapu Angin's opening mastheads share grayscale photography and red title blocks; much of its editorial content uses white surfaces. Anargya should borrow composition and subject-specific depth while retaining its own dark palette and original color photography. Repeating a red-block substitute on every page would weaken differentiation.

## Foundation contract

**Official tokens:** black `#000000`, muted surface `#121212`, green `#29D970`, white `#FFFFFF`, tertiary gray `#B3B3B3`, border `#E5E5E5`; type sizes 12/14/16/18/20/24/28/32px; base body 16px/24px/400; spacing 4/8/12/16/20.8/32/40/48px; rectangular radius 6px; pill 9999px; motion 150/300/500ms. See [anargya-design.md](anargya-design.md).

**Existing project decisions:** Inter is the recorded Figma/system-sans approximation and current local implementation font. Keep it rather than introducing DM Sans. Preserve the 1280px content maximum, desktop/tablet/mobile alignment conventions, approved button treatments and 48px project control target. Use existing implemented gutters: 80px at roomy desktop, 40px at intermediate desktop, 32px tablet and 20.8px mobile, with fluid container constraints. Section padding generally 96px desktop (2 × 48), 48px narrow; content may grow. These are project extensions, not official extracted brand tokens.

Retain 32px primary titles, 28px secondary titles, 24px subheadings and responsive role reductions from approved designs. Hierarchy comes from photographic scale, spacing, weight and position. No larger display scale is assumed. A later request for 48–64px titles requires a documented, consistently applied extension and approval. Avoid repeating tiny green labels above every paragraph: eyebrows are optional and should identify a real context; a page title needs no duplicate label.

Use green for navigation/controls and meaningful emphasis. Filled green controls use black text, since white on green is insufficiently contrasted. Black and muted surfaces provide rhythm without gratuitous gradients. Existing photo shading is retained where needed for readability; inspect contrast on each final crop. No new ornamental glow, shadow, colored page taxonomy or decorative section numbering is proposed.

## Page compositions

### Home: cinematic invitation

Keep the night-testing hero as the initial full-viewport desktop introduction and approved narrow image/text recomposition. The next identity passage should be concise, followed by a dominant Mark 6.0 image with a route CTA. A short research photo feature provides a different scale before the retained Track Record carousel. Finish with a people photograph, an understated supporter acknowledgment link and shared contact/footer.

The shorter sequence should not become a grid of six equal promotional cards. Alternate broad imagery, narrow reading passages and the existing carousel; limit repeated introductory copy. Full specifications and logo inventory belong on their dedicated pages. Home hero actions become internal Vehicles and Team routes.

### Team: documentary narrative

Use a wide historical team photograph with a plainly positioned native title and truthful photo caption. Below it, place a compact identity statement with founding date/ITS affiliation, then chronological chapters with dates in a left rail and photographs at different scales. A later full-width people-at-work image connects history to engineering activity.

End with restrained source-qualified organization information, not a fabricated portrait roster. If current roster material later arrives, introduce grouped portraits using the approved person component; do not prebuild dozens of empty cards. Tablet compresses the date rail; mobile presents date → title → text → photograph. Do not alternate reading order merely to reproduce desktop asymmetry.

### Vehicles: technical portfolio

Make the vehicle the dominant subject: broad Mark 6.0 photograph or approved render above a clear model title. Provide simple local model links rather than large category cards. Mark 6.0 receives a large contain render and concise programme context; unknown specifications are addressed once in prose.

Mark 5.0 uses a contrasting composition: expansive render followed by a divided native technical list with units and source qualification. A short historical Mark 4.0 chapter can close the portfolio; it need not match the scale of the latest profile. Keep natural space around cutouts and avoid cropping wheels/wings. On narrow screens, image → model context → specifications is the reading order; no fixed two-column specification cells at 390px.

### Achievements: competition chronology

Open with an official presentation/event photograph rather than a copied trophy graphic. Use the page title “Track Record” with navigation label “Achievements.” Below, show selected records as full readable articles: date/range and placement aligned in a narrow rail, event/category text and one contextual photograph in the main area. A thin divider connects the chronology; do not imply annual completeness.

Keep the 2022–2024 interval as one documented record; position by its ending year while visibly preserving the range. Result prominence does not imply an overall vehicle/competition ranking. Every record is available without interaction. The approved carousel remains a Home component, avoiding two equivalent carousels on different pages. Mobile stacks the placement/year, photo, event and category without clipping.

### Research: engineering notebook

Use a preparation/testing photograph with a compact introduction, then dated development chapters. Start each chapter with an engineering topic and a short source-grounded explanation; let photography sit below or across the column rather than repeating a text-left/image-right row every time. Use simple topic lists and dividers for related areas within a programme.

Photography documents people and vehicles; it does not establish experimental methods. Avoid schematic decorations that look like actual research evidence, invented process stages and publication cards. The page should feel useful even with concise content: three dated chapters and relevant vehicle links are preferable to many vague cards. At tablet/mobile, use one reading column with appropriately cropped photographs and no lateral scrolling.

### Sponsors: institutional acknowledgment

Use a restrained dark title/thanks introduction instead of another tall photographic masthead. Preserve the polished existing sponsor tile system and all 27 originals. The logo wall is the page's primary visual content: equal compact tiles, contain image wells, editable labels, subtle borders and 6px corners.

Keep a uniform wall initially, with readable source/season qualification identifying the 25 programme acknowledgments and two additional site listings. Optional visible evidence-based groups require approval and never imply tiers. Desktop five columns/16px gaps is the starting contract; tablet three, mobile two. Tile height is a minimum, not a fixed text-clipping constraint. Light wells remain limited to logos that require them; marks retain original colors. Contact follows the entire wall, and optional dated article links are subordinate.

## Asset selection and factual safeguards

All local names below resolve under `public/images/anargya/`; original URLs and R1/R2/R3 usage qualifications remain in [the manifest](anargya-assets.md). Candidate selections require visible crop review during design; availability is not proof of reuse permission.

| Use | Reuse or candidate | Treatment / safeguard |
|---|---|---|
| Global identity | `logo-polos.png`, `logo-anargya-inline.png` | Contain, natural proportions; small raster wordmark must not be enlarged as a giant heading |
| Home hero | `anr-testing.png` | Approved night scene; retain vehicle focal point; generic testing caption, no new model/year claim |
| Team masthead/history | `fsae-j-2.png`, `contact-jumbotron.jpg`; candidate `about-us-team.webp` | Historical context, faces preserved. WEBP previously failed Figma rendering; use the approved compatible JPG if it fails again |
| Vehicles | `mk6-side-left.png`, `mark5.png`, candidate `gl-mk-6-car.png` / mobile counterpart | Renders contain; photo cover only after subject review; distinguish visualization from photograph |
| Historical project | `mark-4-car.png` | Mark 4.0 only; no new specification claims |
| Research | `fsae-j-4.jpg`, candidate `testing-mk-6.png` | Preparation/testing context only; verify caption before associating with an exact activity |
| Achievement records | `timeline-2025-3.jpg`, `timeline-2024-1.jpg`, `timeline-2023-3.jpg` | Preserve current source-based captions and event/year distinctions; confirm MPO/JPEG decoding |
| Supporters | Existing 27 assets referenced in `src/lib/sponsors.ts` | Contain, no recoloring, preserve aliases and provenance; no commercial tiers |

Do not use `bg-team.png` as a ninth-generation roster; it embeds eighth-generation graphics. Do not publish the disputed PR-award wording in `achievements-anargya-2025.png`. Precomposed campaign hero images must not replace native text. News artwork such as scooter riders or a dealership sign is not engineering photography. Public portraits require role/date and use review. Additional uncatalogued images are unnecessary for the baseline plan.

## Shared responsive and state rules

- Compose for 1440, 768 and 390px; also test 440, 1280, 1920 and 320px reflow. Frame widths are review targets, not breakpoint definitions. No fixed section heights that clip enlarged text.
- Keep one H1 per page, logical H2/H3 hierarchy, body 16px/24px minimum baseline and sensible line lengths. Avoid desktop-only forced line breaks on mobile.
- Images reserve layout space and use explicit focal positions. Vehicle renders/logos contain; photographs cover only when the crop preserves meaning. Captions wrap outside image bounds.
- Menu remains a solid-black full-screen dialog with unnumbered vertical links. Route current state adds underline and `aria-current`; all controls keep visible focus and touch size.
- Links use underline/green emphasis; buttons retain approved accent/outline/quiet variants. Default/hover/focus/active must remain distinct without layout movement. Disabled/loading/error states are defined only where relevant; static content marks them N/A.
- Missing images show an accessible labeled fallback rather than an empty tile. Unknown facts are omitted or clearly source-qualified, never filled with plausible values.
- Preserve manual carousel motion and reduced-motion behavior. No new autoplay, parallax or scroll-reveal dependency. Content remains readable before client hydration.

## Future Figma review gate

After this proposal is approved, extend the **same** Figma file with six-page compositions and responsive variants, retaining existing foundations/library. Begin with shared shell and representative Vehicles/Team designs to establish distinct page rhythms; then complete remaining pages. Use native editable text, actual image fills and Auto Layout. Review full-page flow, crop/context, navigation states, all 27 logos and adjacent section boundaries before frontend work. The current planning inspection is not a new rendered-layout QA pass or approval of uncreated inner-page designs.
