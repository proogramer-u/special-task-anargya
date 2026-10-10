# Backend and PWA deployment audit

Audit date: 10 October 2026. Scope: read-only review of the existing MEDIUM/HIGH implementation. Only this document was created; application code, configuration, database contents, GitHub and hosting were not changed.

## Verdict

The implementation demonstrates the requested local e-commerce and basic PWA functionality, but **the current backend is not ready for reliable Vercel deployment**. Products, orders and admin sessions depend on a writable local JSON file. Move that storage to a shared database and harden authentication before publishing. The simplest recommended architecture is the existing Next.js application on Vercel plus Neon Postgres, retaining the current UI and APIs.

## Evidence and limits

Reviewed the commerce model/store/authentication, shop and admin pages/components/API routes, admin setup script, environment example, Next configuration, manifest, service worker, PWA controls, package scripts, original MEDIUM/HIGH request and `docs/medium-high-completion-report.md`.

The local private store contained four products, three orders and one session record at inspection; no customer details, credentials or session tokens are reproduced here. The prior completion report records successful lint, type checking, production build, core/API/PWA tests, browser checkout/admin flows, restart persistence, responsive checks and Chrome offline testing. Those are **previous recorded results**, not tests rerun during this read-only audit. Checkout/CRUD tests would modify state, so they were not repeated. No Vercel deployment, hosted database, installed-device PWA, penetration test or Lighthouse run was performed for this audit.

## 1. Current database and persistence

| Data | Current storage | Persistence boundary |
|---|---|---|
| Products, stock and visibility | `.data/commerce.json`, `products` array | Survives restarts only while the same persistent disk is retained |
| Orders, customer details, item/price snapshots, status and access-token hashes | Same file, `orders` array | Server-side persistence; not merely localStorage |
| Admin sessions and expiry | Same file, `sessions` array | Hashed opaque tokens; eight-hour expiry |
| Admin credential | Server environment `ADMIN_PASSWORD_HASH` | One shared admin password; no admin account database |
| Shopping cart | Browser localStorage | Browser-local convenience state; server revalidates checkout |
| Private confirmation access token | Browser sessionStorage | Tab/session-dependent access; not a customer account |
| Login/checkout rate-limit counters | Process-memory Map | Lost on restart; not shared between instances |

`src/lib/commerce/store.ts` uses `COMMERCE_DATA_DIR` or `<project>/.data`, creates a private directory, and replaces `commerce.json` through a temporary file and rename. A process-wide Promise queue serializes transactions inside one Node process. This prevents the tested single-process checkout race, but provides no distributed lock or multi-worker transaction protection.

Importantly, reads also go through the transaction wrapper and rewrite the file. Catalog reads, order lookups and session validation therefore need writable storage too. There is no external database integration, migration system or automatic backup currently implemented.

## 2. Suitability for Vercel

**Not suitable as implemented.** Vercel Functions do not provide a durable, shared application filesystem for these mutations. Bundled files can be read, but persistent writes require external storage. See [Vercel's file-handling guidance](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

Changing `COMMERCE_DATA_DIR` to `/tmp` would only provide temporary instance-local storage. It would not preserve orders through replacement/deployment, share sessions across instances, or prevent concurrent stock updates. Uploading the JSON file with the source would not solve this either. Object/blob storage alone would also require concurrency control; repeatedly replacing one JSON blob is not a safe substitute for order transactions.

The unchanged backend can run as a limited demo on one Node process with a writable persistent disk and private backups. That is a different hosting model from Vercel and must not be assumed to be a free persistent hosting option.

## 3. Admin authentication and security

### Implemented protections

- Salted Node `scryptSync` password hash with timing-safe comparison; the setup script requires at least 12 characters.
- Random 32-byte session tokens; only SHA-256 token hashes stored server-side.
- Eight-hour session expiry, logout revocation, HttpOnly and SameSite=Strict cookies; Secure cookies when the request is recognized as HTTPS.
- Server authentication on both admin pages and every admin API; no client-only authorization shortcut.
- Origin checking for mutations, JSON-only requests, field validation, no-store responses and basic login/checkout throttling.
- Order lookup requires a separate private token and omits customer contact information from the public confirmation response.

These are useful demo safeguards, but **not evidence of production security certification**.

### Confirmed gaps before public deployment

| Finding | Consequence / recommended action |
|---|---|
| Sessions use the local JSON store | Move them to the shared database before Vercel deployment |
| Throttling is process-local and uses forwarded IP headers | Implement shared limits with trusted platform IP handling; restarts/parallel instances currently bypass the shared limit |
| Scrypt uses default parameters | Defaults are N=16384, r=8, p=1; below OWASP's recommended scrypt configurations. Explicitly tune and benchmark hashing, preferably asynchronously, with an adequate memory allowance; regenerate the hash |
| Password rotation does not invalidate existing sessions | Provide explicit session revocation on rotation; currently manual local-session clearing is needed |
| Origin fallback depends on request headers | Configure exact HTTPS `APP_ORIGIN`; verify cookie/proxy behavior on the final deployment and preview environment |
| Body limit is checked after `request.text()` reads the body | Enforce a bounded request read/platform limit before allocating an arbitrarily large body |
| No accounts, roles, MFA or recovery | Acceptable for one demo admin; document this scope instead of presenting a multi-user management system |

Parameter references: [Node crypto defaults](https://nodejs.org/api/crypto.html#cryptoscryptsyncpassword-salt-keylen-options) and [OWASP password storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). OWASP recommends N=2^17/r=8/p=1 or listed equivalent configurations, rather than the current default cost.

`.env.local` and `.data/local-admin-password.txt` are ignored local-only files. Do not upload them or the private JSON store. Use a new deployment credential rather than the QA password. Keep all secrets server-side and use fictional customer details for this demo.

## 4. Checkout and product CRUD

**Functional and persistent locally under the single-process/disk assumptions**, supported by implementation inspection and the prior recorded integration/browser tests.

- Catalog, details, search/filtering, cart quantity changes and refresh persistence are implemented.
- Checkout validates customer fields and quantities, resolves active products, recalculates prices server-side, checks stock, persists the order and reduces stock in the serialized operation.
- Unique references and idempotency paired with the access-token hash prevent the tested retry from creating a second order/decrement.
- Admin create/edit/delete actually update the server store; old orders preserve item snapshots after deletion.
- Order details/status updates persist. Cancellation restores stock once and cannot be reopened.

They are not Vercel-persistent today. The queue is not a transaction across multiple instances. Confirmation access also depends on its tab-held token; another browser without that token cannot view it, while the admin can.

The four products/prices/illustrations and ordering are explicitly demo content. There is no payment gateway, real fulfillment, customer account, transactional email, or arbitrary product-image upload. None of those was required by the supplied special-task brief; the admin selects from supported image assets.

## 5. Environment variables

| Variable | Current requirement | Production action |
|---|---|---|
| `ADMIN_PASSWORD_HASH` | Required for admin sign-in; server-only `salt:hex` value | Set a newly generated hash in hosting secrets. Update hash generation/verification together if cost is hardened |
| `APP_ORIGIN` | Optional fallback exists; strongly recommended | Set the exact final HTTPS origin, without a trailing slash. Use matching configuration for previews |
| `COMMERCE_DATA_DIR` | Optional local/persistent-server override | Does not make Vercel storage durable; becomes obsolete after database migration |
| `DATABASE_URL` | **Not consumed by current code** | Proposed secret for Neon migration; setting it alone changes nothing until the storage adapter is implemented |
| `NODE_ENV` | Controls production-only SW registration | Hosting/build tooling sets production mode; not a secret or custom credential |

No current `SESSION_SECRET`, payment-provider key or public database key is required. Do not prefix backend credentials with `NEXT_PUBLIC_`. The future database driver/migration setup may need an additional direct connection URL; that is not an existing requirement.

## 6. PWA installability and offline behavior

The implementation includes a manifest with the correct app name, root start/scope/id, standalone display, brand colors, 192/512 icons and a maskable icon. A single native service worker registers only in production. HTTPS on the deployed site is required; localhost served as the previous secure-context test environment.

Prior Chrome testing recorded an install affordance and an activated worker, cached Home reload while offline, a previously visited Team page offline, and an explicit offline checkout fallback with no false order submission. This supports **basic installability prerequisites and offline functionality**, not a claim that installation was completed on a device.

Caching policy is appropriately separated:

- Home HTML and `/offline` are precached. Public company-profile page navigations are network-first with saved HTML/fallback.
- Encountered static chunks, permitted brand images, fonts and icons are cache-first with a bounded cache.
- Shop/admin/private confirmation/API content is excluded from public caching; order POSTs are never queued or reported successful offline.
- Waiting-worker UI requests activation/reload; old versioned public caches are removed on activation.

Limitations: never-visited/lazy images and chunks may be missing offline; commerce/admin need connectivity. Service-worker cache version is manually maintained, so releases changing assets at unchanged URLs must bump it to avoid stale cache-first images. Actual old-to-new update transitions, Safari/iOS and installed physical-device operation remain untested. Optional richer-install screenshots are absent, not a confirmed basic installability failure.

## 7. MEDIUM / HIGH completion assessment

Against the supplied brief (no payment gateway or full production commerce required):

| Requirement | Assessment |
|---|---|
| MEDIUM catalog, details, cart, checkout, order confirmation | Implemented; previous local functional tests recorded |
| MEDIUM protected admin product/order management | Implemented; previous local tests recorded; security hardening above remains |
| MEDIUM server-side order persistence | Implemented locally; **deployment persistence migration outstanding** |
| HIGH responsive app, manifest, icons, standalone mode, worker | Implemented; previous production-local browser evidence recorded |
| HIGH basic safe offline fallback/caching | Implemented and previously exercised in Chrome; not offline shopping |
| HIGH installability testing | Prerequisites/affordance checked; actual device installation not completed |
| HIGH update freshness | Update mechanism exists; release cache-version discipline and actual update-cycle validation still needed |

Do not represent the application as fully production-ready or every PWA platform as verified. Real merchandise approval, receipts, payment, shipping integrations and offline order queues are outside the requested demo requirements, not hidden implemented features.

## 8. Simplest reliable deployment architecture

### Recommendation: Vercel + Neon Postgres

```text
Browser / installed PWA
        |
        v
Vercel: existing Next.js App Router UI + Node API routes
        |
        v
Neon Postgres: products, orders, order items, sessions, rate limits

Public imagery/icons: existing repository assets served by Next/Vercel
Cart: browser localStorage | public offline cache: service worker
```

Neon offers a free plan and a Vercel integration; its managed Postgres is a small fit for this data model. See [Neon on Vercel Marketplace](https://vercel.com/marketplace/neon/neon). This is a recommendation requiring a backend migration, not infrastructure already configured. Check current quotas in the selected account before launch; no fixed cost or unlimited availability is promised.

Vercel Hobby is for personal, non-commercial use. A personal university demo with clearly simulated orders may fit; a real commercial/team shop needs the appropriate plan. See [Vercel Hobby terms and limits](https://vercel.com/docs/plans/hobby).

### Minimal development sequence before deployment

1. Replace the filesystem store behind the existing commerce interface with Postgres. Use a compatible pooled connection/transaction driver and keep routes/UI intact. Retain Node runtime; do not use static export for this backend.
2. Create constrained tables for products, orders, order items, hashed sessions and shared rate-limit counters. Keep order snapshots and a database uniqueness rule for idempotency/access-token pairing.
3. Use real SQL transactions and row locks or conditional stock updates for checkout/cancellation. Guarantee all-item stock changes and order creation commit together; rollback failures. Protect cancellation against double restocking across instances.
4. Seed approved demo products once. Do not seed on every request or migrate local QA sessions/customer records into the public deployment. Keep database backups/retention appropriate for any collected customer data.
5. Harden the existing single-admin authentication as described above. A separate auth provider is optional for this scope; adding one is not necessary merely to use Postgres.
6. Configure deployment secrets (`DATABASE_URL`, new `ADMIN_PASSWORD_HASH`, exact `APP_ORIGIN`). Build the existing Git repository root containing `package.json` with `npm ci` / `npm run build` and the Next.js preset. The nested local folder name does not imply a nested Git deployment root.
7. Re-run lint, typecheck, build and commerce/PWA tests against the migrated backend. Add multi-connection concurrency tests and verify orders, products and sessions survive a deployment replacement. Test HTTPS login/logout, origin rejection, throttling, private caching, actual install and an old-to-new worker update cycle.

No Redis, object-storage uploads, payment service or separate frontend/backend application is necessary for the present demo. Shared throttling can reside in Postgres at this scale. The required decisions are hosting/account eligibility and approval to implement the persistence/security migration; neither migration nor deployment was performed in this audit.
