# Team page implementation and verification

Completed 10 October 2026. Scope: the `/team` route, reusable portrait cards, sourced roster, scoped page styles and tests. No Figma changes, deployment, package installation or unrelated source changes.

## Delivered

- Official photographic masthead and two history/engineering editorial compositions, grounded in the existing content and asset inventories.
- Published General Manager, Mechanical, Electrical and Non-Technical categories and all 12 official subdivisions.
- Accessible category tabs with Left/Right, Home/End keyboard controls; General Manager is the default. Subdivision anchors, sticky desktop navigation, and scroll-based active states.
- Management, Heads of Division and Staff shown distinctly. All official names and exact roles remain selectable text, without line clamping.
- Reusable `TeamMemberCard` with identical 320:460 portrait proportions, 6px corners and a shared neutral silhouette. Failed member photos fall back to the shared placeholder; failure of that placeholder falls back to an inline silhouette. Empty paths also use the placeholder.
- Responsive four-column desktop, three-column tablet and two-column mobile card grids; one column at narrow 320px. Leadership groups retain the same card dimensions as Staff.
- Source-qualified eighth-generation roster, separate advisor, contact/email links and route-safe footer links. Team-page navigation links to its own Story, Divisions, Members and Contact anchors; Home remains available through the logo and footer.

## Roster integrity

See [anargya-team-directory.md](anargya-team-directory.md) for all 65 source-card links and transcriptions. There are **64 unique members / 65 placements**, plus the separately identified advisor. Putra Valen Simbolon's two roles share one member identity. No unreadable member names or titles remain. Both officially published Heads in each of two Electrical subdivisions are retained.

The source is explicitly eighth generation. Current ninth-generation membership and differing role labels between the Team and Contact pages are not resolved by extraction; the page does not claim they are current. No new personal phone numbers or inferred biographical details were added.

All temporary member-card images remain outside the repository under `/tmp/anargya-team-portraits/`. None was copied to public assets or used in the finished cards. Existing official group/engineering photographs retain the previously documented permission uncertainties in [anargya-assets.md](anargya-assets.md).

## Files added

- `src/app/team/page.tsx` — server-rendered route, metadata, masthead, story, organization and footer.
- `src/app/team/team.css` and `team-styles.ts` — explicitly prefixed page styles and typed class map.
- `src/components/team/team-directory.tsx` — interactive category and subdivision directory.
- `src/components/team/team-member-card.tsx` — reusable card and image-error fallback.
- `src/data/team-members.json` — 64 canonical identities and 65 source-backed assignments; change `imagePath` here to supply future portraits.
- `src/lib/team-directory.ts` — typed data, derived placements and subdivision helpers.
- `public/images/team/member-placeholder.svg` — the single shared neutral portrait asset.
- `tests/team-directory.cjs` — browser regression harness.
- This report, roster documentation and `docs/team-previews/` screenshots/JSON results.

Existing `src/` files were compared with SHA-256 checksums captured before this task: **none changed**. This checkout contained no prior `/team` route, so it was added without altering the homepage, shared navigation, global styles or other sections. The homepage's existing Team anchor remains unchanged; connecting it to `/team` is outside this isolated change.

## Validation

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; `/team` is statically prerendered.
- Chrome production-browser regression: 1440, 768, 390 and 320px; all four categories and all 65 placements tested at each width.
- Keyboard tab selection, category counts, subdivision anchors, shared-placeholder rendering, full fallback after aborting the placeholder request, loaded grid CSS, no document overflow and no runtime exceptions: passed.
- Card bounds and pairwise overlap checks at 1440, 768 and 390px: passed for every category.
- Axe checks against WCAG 2 A/AA, 2.1 AA and 2.2 AA tags at those three widths and all four category states: zero automated violations. This is not a complete manual accessibility certification.
- Rendered hero, story, organization, directory and contact/footer inspected in Chrome. Desktop/tablet/mobile screenshots saved in `team-previews/`; official photographs and placeholders render. No original member portraits are requested by the page.

Browser command uses the available runtime rather than installing a dependency:

```sh
TEAM_BASE_URL=http://127.0.0.1:3003 \
PLAYWRIGHT_MODULE=/Users/CokordaBagus/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright \
node tests/team-directory.cjs
```

The initial development server served unstyled/unhydrated output. A separate fresh production preview on port 3003 was used for final testing. An actual screenshot caught the project's CSS loader failing to export CSS Module class names; the route now uses prefixed CSS without changing the project loader or global page styles. Initial interaction-only checks were expanded to assert real grid styling.

## Remaining limitations

- Real portraits intentionally pending; every person uses the approved neutral placeholder.
- Ninth-generation/current roster and source role discrepancies require team confirmation. No missing/unreadable transcription records remain.
- No Figma update, deployment or unrelated page redesign performed. Preview is local at `http://127.0.0.1:3003/team`.
- Automated checks do not replace assistive-technology user testing. No supplied redesign screenshot was available for pixel comparison; the official page's hierarchy and card proportions plus Sapu Angin's editorial structure guided this implementation.
