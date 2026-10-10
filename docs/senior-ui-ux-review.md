# Senior UI/UX, frontend and QA review

10 October 2026. Reviewed the actual six-page local website in the connected in-app browser, including scrolling through the pages, screenshots, control activation and browser Back/reload. This is a fresh review, not a restatement of the earlier implementation tests. The existing development server was already running; it was preserved. The local production preview was rebuilt and restarted on [port 3003](http://127.0.0.1:3003/).

## Confirmed findings and fixes

| Finding | Change | Verification |
|---|---|---|
| Team subdivision deep links hid their target because every reload initialized General Manager | Category/subdivision state now reads the URL hash on initial load, hash changes and Back/Forward. Category controls write a shareable panel hash. After a subdivision becomes visible, the page scrolls to it. | Opened `/team#team-finance-support`, reloaded, selected Electrical, then used Back: Non-Technical restored and Finance Support visible. Target settled at its 24px scroll margin. |
| Vehicle cutouts looked undersized within their large empty source-image canvas | Added a bounded render viewport with proportional scaling for Mark 6.0 and Mark 5.0. The Mark 4.0 photograph retains its original treatment. | Inspected both renders at tablet width: bodywork, wheels and proportions preserved. Empty canvas is cropped, not the vehicle. Mobile/desktop geometry checks passed. Original assets unchanged. |
| Repeated technical caveats made Research read like an audit report rather than an engineering profile | Shortened each topic to its documented activity and retained a consolidated publication-limit note. Kept the autonomous-research scope qualification. Simplified unavailable vehicle-specification wording. | Rendered text reviewed; no new technical claims, measurements, projects or specifications introduced. Source links retained. |
| Mobile footer used a long single-column route list and a second vertical social list | Route links now use two columns; social links wrap in a compact row. Touch targets remain at least 48px tall. | Inspected mobile footer with contact context; no clipped labels or horizontal overflow. |
| A few editorial headings had avoidable line breaks and numeric comparisons lacked explicit alignment treatment | Added balanced wrapping to selected headings and tabular figures to the vehicle specification values. | Rendered heading/description checks across six widths; one H1 per page. Brand font sizes/colors retained. |

## Page-by-page assessment

- **Home:** authentic cinematic opening, clear identity and useful route previews. The carousel remains an effective photographic feature; Next was exercised and its active result/counter changed correctly. Existing hero direction preserved.
- **Team:** story and organization provide clear context; category hierarchy and leadership/staff separation are understandable. The repaired deep links are the most significant functionality fix. A lone Head occupies a short grid row intentionally to keep hierarchy explicit. The silhouettes remain an approved content placeholder, not a claim that portraits are complete.
- **Vehicles:** official vehicle imagery and published Mark 5.0 specifications support an engineering-led presentation. Enlarged subject framing improves the profiles. Repeated profile structure supports model comparison; Mark 4.0's portrait photo supplies a distinct historical treatment. Unpublished technical data stays unavailable.
- **Achievements:** event/category/year hierarchy and chronological photography are coherent. Featured and archived 2025 imagery repeats deliberately. Result attribution and the disputed PR Award exclusion remain intact. Organizer verification is still a content limitation.
- **Research:** photographs are authentic and dated activity groups are useful. Concise descriptions now reduce repetition. Available photography remains generic preparation/testing context, not proof of a component-specific experiment or a completed autonomous project.
- **Sponsors:** the wall is substantially clearer than feature-card layouts. All 27 selected logos remain present with consistent contain treatment; Contact follows the full wall. Programme acknowledgments and additional site listings retain their evidence qualifications. No current-contract or tier claims were added.

Anargya's black/near-black surfaces, green accent, white/gray type, existing type scale and 6px corners were preserved. No new typeface, decoration, stock photography or Figma changes were introduced.

## Fresh verification

- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm run build` — passed; all six required routes prerendered.
- **36 rendered layout samples**: all six routes at measured CSS widths 390, 440, 768, 1280, 1440 and 1920px. No horizontal document overflow, no clipped visible heading/paragraph/specification text, and one H1 per page. Evidence: [layout-checks.json](senior-review-previews/layout-checks.json).
- Each route was scrolled section by section on mobile. All visible images completed loading, with zero failed or pending images after scrolling. Initial unrequested lazy images were distinguished from broken images rather than treated as defects. Evidence: [image-checks.json](senior-review-previews/image-checks.json).
- Team category clicks, subdivision navigation, direct-link reload and Back state restoration exercised in the actual browser.
- Mobile/tablet menu opened and closed using Escape and X. Body scroll locking verified; after X, body styles unlocked and focus returned to the menu trigger. The five labels remain unnumbered.
- Homepage carousel Next control activated and corresponding result/counter inspected. Existing carousel source was not changed.
- Native accessibility tree reviewed for headings, named controls, tab selection and landmarks. A new automated Axe/Lighthouse audit, a complete manual screen-reader session, physical-device testing and cross-engine testing were **not performed in this session**. Earlier results are not claimed as fresh tests.
- Original roster assertion passed: 64 unique members, 65 assignments, all shared portrait paths. Sponsor inventory, brand assets and factual achievement records unchanged.

The connected browser had an existing zoom setting. Viewport overrides were adjusted using the measured `innerWidth`, and the original zoom setting was preserved. Some wide native screenshots exceed the browser panel's physical capture area; mobile/tablet screenshots were used to confirm the changed compositions in full. Temporary viewport overrides were reset before finishing. One overlong inspection batch timed out and was repeated in bounded batches; the saved 36 samples are from completed passes.

## Modified files

- `src/components/team/team-directory.tsx:13` — hash synchronization and shareable category state.
- `src/app/vehicles/page.tsx:10` — vehicle render container and shorter unavailable-specification note.
- `src/app/editorial.css:17` — render framing, selected heading wrapping and tabular specification figures.
- `src/lib/research-content.ts:5` — concise documented topic descriptions and gallery caption.
- `src/app/research/page.tsx:12` — consolidated publication-limit note.
- `src/app/globals.css:266` — compact mobile/tablet footer navigation.
- This report and `docs/senior-review-previews/` evidence artifacts.

## Remaining limitations

The published directory is eighth generation; ninth-generation/current roles remain unconfirmed. Individual portraits intentionally remain silhouettes. Mark 6.0/4.0 specifications, detailed engineering methods and measured outcomes are unavailable. The archive is team-reported, and current supporter contracts/media agreements and reuse permissions still need confirmation. These are retained as content qualifications rather than filled with invented information.

For a future editorial pass, approved component-specific engineering photographs and real member portraits would improve storytelling more than additional decorative UI. They were not retrieved or substituted in this review.

Reference checklist used: [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The checklist informed semantic controls, focus, image loading, state/deep links and numeric/text treatment; site-specific design requirements took precedence.

## After-change previews

[Vehicle framing](senior-review-previews/vehicle-framing.jpg) · [Compact mobile footer](senior-review-previews/mobile-footer.jpg)

No deployment, Git push, dependency installation, MED commerce or HIGH PWA work was performed. The local site is ready for review.

## Follow-up — consolidated sponsors and dedicated contact (10 October 2026)

- Merged all 27 acknowledged organizations into one sponsor wall, including JNE and Nexa Logistic; removed the separate “Additional official-site listings” heading and section. Kept the July programme and official-wall source links and the existing contract/tier qualification. Sponsor data and logos remain unchanged.
- Removed the Contact section from the shared editorial shell and Home. Sponsors now explicitly owns the single Contact section and “Email the team” CTA. Shared navbar/footer Contact links point to `/sponsors#contact`; compact footer contact details remain available.
- Modified `src/app/sponsors/page.tsx`, `src/app/page.tsx`, `src/components/editorial-shell.tsx`, `src/components/home-sections.tsx`, `src/components/navigation.tsx`.
- Fresh lint, TypeScript and production build passed. Rebuilt local production preview on port 3003.
- Native browser checked all six routes: five have zero Contact sections/email CTAs; Sponsors has exactly one of each. Clicked Team footer Contact link and confirmed destination `/sponsors#contact`.
- Inspected final sponsor rows in the rendered page: JNE and Nexa share the same grid as the other 25; 27 tiles, one wall, no horizontal overflow at measured 785px. Preview: `senior-review-previews/merged-sponsor-wall.jpg`.
