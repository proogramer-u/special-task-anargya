# Shop collection refresh

Completed 10 October 2026. The shop now presents a fictional Anargya-inspired merchandise concept with original studio mockups. Orders remain simulated; no payment, fulfilment or official retail availability is claimed.

## Inventory

| Product | Category | IDR price | Initial stock | Proposed specification |
| --- | --- | ---: | ---: | --- |
| Anargya Racing Tee | Apparel | 185,000 | 32 | 240 gsm cotton jersey; regular fit; ribbed crew neck. |
| Paddock Oversized Tee | Apparel | 215,000 | 24 | 260 gsm cotton jersey; oversized fit; dropped shoulder. |
| Circuit Club Cap | Accessories | 125,000 | 30 | Cotton twill; adjustable metal buckle; embroidered graphic. |
| Motorsport Lanyard | Accessories | 45,000 | 60 | 20 mm woven polyester; detachable clasp; metal swivel hook. |
| Racing Team Keychain | Accessories | 55,000 | 45 | Anodised aluminium concept; split ring; 65 × 25 mm tag. |
| Workshop Canvas Tote | Accessories | 115,000 | 28 | 12 oz canvas; 38 × 42 cm; reinforced handles; unlined. |
| Formula EV Poster | Prints | 85,000 | 20 | A3, 297 × 420 mm; 200 gsm matte paper; unframed. |
| Technical Grid Sticker Pack | Prints | 35,000 | 70 | Five vinyl sticker concepts; matte finish; assorted 40–80 mm sizes. |
| Trackside Hoodie | Apparel | 395,000 | 18 | 320 gsm cotton-blend fleece; relaxed fit; kangaroo pocket. |
| Racing Heritage Shirt | Apparel | 285,000 | 16 | Cotton-poly twill; box fit; button front; chest pocket. |

## UI and content

An editorial split hero introduces the collection with a large Racing Tee image. The catalog uses quiet, borderless product cards, square contained imagery, natural names/descriptions and clear price/availability hierarchy. It uses three columns at standard desktop, four at wide desktop, two at tablet/mobile. Search, category and in-stock filters remain accessible native controls; hover brightness and visible focus preserve the black/white/green identity. Reduced motion disables image transitions.

Detail pages show proposed material/fit/dimensions, descriptive images, current simulated stock, quantity and add-to-cart. Intro and checkout retain the requested disclosure. Admin image selection includes all new mockups and legacy files; server validation permits only this explicit allowlist. Static concept specifications are keyed by product ID in `collection.ts`; they are editorial concept data, not a new database field or an admin-editable manufacturing claim.

## Safe database update

`npm run db:seed` runs one transaction under a seed advisory lock. Ten stable new IDs use `ON CONFLICT(id) DO NOTHING`: repeated runs preserve admin edits, active status and stock rather than resetting them. Four known legacy IDs are deactivated, not deleted. Unrelated/admin-created products are untouched. No schema changes or migrations were necessary. Orders, order items and sessions were checksum-compared before and after running the seed twice and were unchanged. Historical item names/prices remain snapshots.

The seed does not synchronise future editorial changes to existing rows; use authenticated admin editing for those. Previously saved carts containing archived IDs show the existing unavailable-item warning and require removal before checkout. Existing browser cart contents were preserved during testing.

## Original imagery and provenance

Ten generated product-mockup WebP files live in `public/images/shop/collection/`, named with the corresponding product IDs. The built-in image-generation tool produced a cohesive 5 × 2 contact sheet; panels were extracted without modifying the designs and encoded as 600 × 600 WebP images. The source was not added to the repository. No stock-photo licence, third-party racing-team asset or sponsor logo was used. These are AI-generated fictional product mockups, not photographs of manufactured merchandise. Minor small-print lettering is illustrative; product specifications are defined in editable page text.

Prompt: premium ten-panel catalog contact sheet, near-black studio backgrounds, softbox lighting, realistic black textile materials, white ANARGYA/ALWAYS ENERGIZED lettering and restrained #29D970 original technical graphics. Top row: regular racing tee, oversized technical tee, cap, coiled lanyard, metal keychain. Bottom row: canvas tote, formula EV technical poster, five technical stickers, hoodie, short-sleeve heritage shirt. Full products visible, no people, unrelated trademarks, sponsors, prices, watermarks or captions. Consistent product proportions and lighting. Built-in image generation was used, not the API/CLI fallback.

## Changed files in this refresh

- `src/lib/commerce/collection.ts`: inventory, specs, legacy IDs and image allowlist.
- `src/lib/commerce/model.ts`: new seed inventory and image validation.
- `scripts/load-commerce.cjs`, `scripts/db-seed.cjs`: collection support and idempotent archive/seed.
- `src/components/commerce/shop-shell.tsx`, `shop-ui.tsx`, `admin-ui.tsx`: hero, presentation, disclosures and image choices.
- `src/app/shop/page.tsx`, `[id]/page.tsx`, `cart/page.tsx`, `checkout/page.tsx`, `confirmation/[reference]/page.tsx`: collection/detail content and clearer headings.
- `src/app/commerce.css`: scoped shop styling; company-profile pages unchanged.
- Ten files in `public/images/shop/collection/`.
- README and this report.

## Verification

| Check | Result |
| --- | --- |
| Supabase seed twice / ten unique active products / four legacy listings inactive | PASS |
| Pre-existing orders, items and sessions unchanged by seed | PASS |
| All ten production detail routes, specifications and image URLs | PASS |
| Production API product CRUD, admin authentication, dashboard order visibility, CSRF/logout | PASS |
| Production API checkout validation, server prices, retry idempotency, stock and cancellation | PASS |
| Racing Tee checkout against Supabase, persisted item snapshot after reconnect, cancellation/restock | PASS |
| Browser search for hoodie / Accessories category (four results) | PASS |
| Browser add two Racing Tees / change to three / total Rp555,000 / remove test cart line | PASS |
| Actual rendered desktop, tablet and mobile: 1440px, 768px, 390px, no horizontal overflow | PASS |
| Wide desktop 1920px four-column grid | PASS |
| ESLint, TypeScript, final production build, whitespace check | PASS |
| PWA offline/cache-exclusion policy test | PASS; architecture unchanged |
| Repeated physical-device PWA installation and offline browser test | NOT RETESTED; prior production-mode audit remains applicable |
| Real payments or fulfilment | Not provided; intentionally simulated |

New fictional QA orders remain cancelled as persistence evidence. Their temporary QA product was deleted; all ten catalog stocks were restored. No pre-existing order was deleted. The actual configured admin credential was never changed. No dependencies installed, deployment or Git push performed.

Desktop and mobile screenshots are saved locally under ignored `.data/shop-preview-desktop.png` and `.data/shop-preview-mobile.png`.
