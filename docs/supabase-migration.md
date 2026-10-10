# Supabase PostgreSQL commerce migration

Date: 10 October 2026.

## Status and scope

The JSON backend has been replaced with server-side PostgreSQL queries using `pg`. Existing shop/admin UI, endpoint URLs, response shapes, demo products, LOW pages and service-worker behavior are preserved. No local orders, customer information or sessions were imported. No Supabase project was created, nothing was deployed and nothing was pushed.

**Initial migration status:** the adapter was initially tested against isolated local PostgreSQL 15 without hosted credentials. The subsequent live TLS/configuration verification below establishes hosted connection and schema readiness. Commerce does not fall back to JSON; the old `.data/commerce.json` remains untouched and ignored.

## Architecture

- Existing Next.js App Router server pages and route handlers remain the backend.
- `src/lib/commerce/database.ts`: lazy per-instance `pg.Pool`, at most three connections, short idle/connect timeouts, query/statement timeouts and checked-out-client transactions. No named prepared statements or session-dependent locks are used.
- `src/lib/commerce/store.ts`: parameterized SQL for products, orders/items, sessions and rate limits. The whole-file callback abstraction is removed; its callers use focused store operations.
- Supabase **Transaction pooler** on port 6543 is the intended Vercel runtime connection. A direct connection or Session pooler on 5432 is preferable for maintenance/migrations.
- Remote connections require TLS with certificate verification; localhost test connections use no TLS. Optional `DATABASE_SSL_CA` supplies the project's trusted certificate. URL SSL flags are removed by the adapter so they cannot override its verified TLS configuration. Never disable certificate verification to work around a connection error.
- Private `commerce` schema, not Supabase's public Data API. PUBLIC, `anon` and `authenticated` have no schema/table access. Do not add `commerce` to exposed schemas or grant browser-facing roles access.
- Server-only imports prevent accidentally bundling the database adapter/password code into client components. No Supabase JavaScript client, service-role key or anon key is needed.

Connection guidance: [Supabase serverless drivers](https://supabase.com/docs/guides/database/connecting-to-postgres/serverless-drivers), [Supabase PostgreSQL connections](https://supabase.com/docs/guides/database/connecting-to-postgres), and [node-postgres TLS configuration](https://node-postgres.com/features/ssl).

## Migrations and transaction guarantees

Versioned SQL lives in `supabase/migrations/`:

1. `202610100001_commerce.sql`: products, orders, order-item snapshots, admin sessions and shared rate-limit buckets; indexes and constraints.
2. `202610100002_catalog_order_and_access.sql`: stable catalog insertion order and explicit Supabase browser-role access revocation.

The runner records filenames/checksums in `commerce.schema_migrations`, takes a transaction-scoped migration lock, and applies pending files atomically. Re-running skips unchanged applied versions; modifying an applied version fails. Add a new migration instead of editing applied SQL.

Checkout takes a transaction-scoped advisory lock for the existing idempotency/access-token pair, then locks product rows in deterministic ID order. Stock validation, authoritative prices, order insertion, item snapshots and stock decrements commit together. A database uniqueness constraint backs the idempotency pair. Concurrent retries return the same order without another decrement. Preserve the existing client behavior: retry in the same checkout session uses the same pair; reloading the checkout creates a new pair and is a new attempt.

Cancellation locks the order and updates inventory within the same transaction. Duplicate cancellation restocks once, and cancelled orders cannot reopen. Deleted products leave historical item snapshots intact; cancellation skips a product that no longer exists, matching the original behavior.

## Configure Supabase

1. Create/select your Supabase PostgreSQL project. Use its Connect panel to obtain the runtime Transaction pooler URI and a maintenance Direct/Session pooler URI. URL-encode special characters in the database password.
2. Put credentials in ignored `.env.local` for local use, or hosting secrets later. Never put them in source, documentation, `NEXT_PUBLIC_*`, browser code or committed command files.
3. Copy the variable names from `.env.example`, replacing all placeholders. Do not copy the example password literally.
4. Apply migrations with a schema-owning maintenance credential, seed approved demo products, and generate a new admin password hash.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Required runtime PostgreSQL URI, normally Supabase Transaction pooler on 6543 |
| `MIGRATION_DATABASE_URL` | Optional maintenance-only Direct/Session URI; migration runner prefers it, otherwise uses `DATABASE_URL` |
| `DATABASE_SSL_CA` | Optional PEM CA certificate from Supabase; literal `\n` newlines are supported |
| `ADMIN_PASSWORD_HASH` | Required `scrypt-v1:salt:hash`, generated with `npm run admin:setup` |
| `APP_ORIGIN` | Required in production; exact origin, no trailing slash, e.g. `https://your-demo.example` |
| `TEST_DATABASE_URL` | Tests only: separate disposable migrated PostgreSQL database, never production |

`COMMERCE_DATA_DIR` is no longer used. No service-role key or `SESSION_SECRET` is required. Keep maintenance credentials out of Vercel runtime configuration when using a separate restricted runtime role.

```sh
npm ci
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run build
npm run start -- --port 3003
```

The setup script prompts for 12–200 characters; input is explicitly visible. It saves the hash in ignored `.env.local` with restrictive permissions. Existing legacy hashes are intentionally rejected. Restart existing servers after changing variables; set `APP_ORIGIN=http://localhost:3003` or `http://127.0.0.1:3003` to match the URL actually used. On Vercel, copy the generated hash into server-side secrets and configure the final HTTPS origin; preview deployments need a matching origin and separate demo database where practical.

### Optional least-privilege runtime role

The maintenance credential owns migrations. For a smaller runtime privilege surface, create a separate LOGIN role through Supabase's administrative SQL connection with a securely chosen password, then grant only these permissions (replace `commerce_app` if you choose a different role):

```sql
GRANT USAGE ON SCHEMA commerce TO commerce_app;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON commerce.products, commerce.orders, commerce.order_items,
     commerce.admin_sessions, commerce.rate_limits TO commerce_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA commerce TO commerce_app;
```

Use that role's supported pooler connection string in `DATABASE_URL`, while keeping the owner URL only in local `MIGRATION_DATABASE_URL`. Do not grant this role schema creation, migration-ledger writes or browser-facing access. The custom private schema uses PostgreSQL privileges rather than browser RLS policies; authentication/authorization remains in the server routes. These restricted-role/pooler permissions must be verified on the actual Supabase project.

### Seed policy

`npm run db:seed` inserts only the four approved `seedProducts` from the existing model. Conflicting IDs are left untouched, so re-seeding does not reset stock or edited values. No JSON import exists. Run seeding deliberately: a deleted demo seed product can be recreated by another seed run. New databases start without orders or sessions. Use fictional checkout data.

## Authentication hardening

- Asynchronous scrypt uses N=131072, r=8, p=1, 256 MiB memory allowance, random 16-byte salts and timing-safe comparison. A versioned format rejects weaker legacy credentials. Cost should be benchmarked in the final hosting environment.
- Login permits only one concurrent password derivation per instance to bound memory. Shared database counters enforce 10 login attempts per IP per ten minutes, plus 50 globally; checkout uses 30 per IP plus 300 globally. Limits include successful attempts.
- On Vercel the platform-provided `x-vercel-forwarded-for` is used; arbitrary caller `x-forwarded-for` is ignored. Other hosts/local tests share a conservative `local` bucket until a trustworthy proxy-specific strategy is implemented. This is documented protection, not a promise to defeat all abuse. See [Vercel request headers](https://vercel.com/docs/headers/request-headers).
- Session tokens are random, hashed in PostgreSQL, expire after eight hours and retain HttpOnly/SameSite=Strict/HTTPS Secure cookie behavior. Sessions carry a fingerprint of the configured password hash; rotating the hash invalidates old sessions immediately on instances using the new configuration.
- Admin pages and each admin API continue enforcing server authorization. Production mutations require configured `APP_ORIGIN`. Request JSON is bounded while streaming, before parsing; raw database errors in mutation responses are replaced with a generic storage message.
- Expired sessions are cleaned during login; rate-limit buckets older than a day are cleaned during limit consumption. One admin password remains the intended scope; no account system/MFA/recovery was added.

## Tests and results

Test database: isolated local PostgreSQL 15 cluster, loopback-only on a temporary port, outside the repository. It contained approved demo seeds and synthetic fixtures only. No hosted credentials, customer data or old JSON records were used.

Passed during this migration:

- `npm run lint`
- `npm run typecheck`
- `npm run build` — including without a live database URL; DB access is lazy and commerce pages remain dynamic.
- `npm run db:migrate` and a repeated run — both versions apply, then skip without duplication.
- `npm run db:seed` twice — no duplicate/reset of existing demo records.
- `npm run test:db` — real PostgreSQL product CRUD, simultaneous retry idempotency, competing-stock protection, multi-line rejection, rollback after a SQL constraint failure following an inventory write, private token lookup, concurrent cancellation, immutable order snapshots, persistence across connection replacement, session expiry/rotation/logout, shared rate limits and password correctness.
- `npm run test:api` — isolated production Next server on port 3004, fresh synthetic credential; auth/CSRF, bounded request body, checkout validation/server price, CRUD, stock/idempotency, status/restock, private confirmation, logout, manifest/worker and HTTP regression checks for all LOW routes.
- `npm run test:pwa` — offline Home/fallback and sensitive-content exclusions.
- `npm audit --omit=dev` — zero reported runtime vulnerabilities at audit time. Full dependency audit reports five high findings in the existing ESLint/glob tooling chain; no forced Next downgrade was applied.

### Repeat database tests safely

Create a **dedicated disposable** test database. Point `DATABASE_URL` (and maintenance URL if set) at it while applying migrations and seed; then set `TEST_DATABASE_URL` to that same test database. Restore your development variables afterwards. Test scripts perform synthetic writes and must never target the production database.

```sh
# After configuring the isolated test database and applying migrations/seed:
npm run build
npm run test:commerce
npm run test:pwa
```

`test:commerce` runs the real DB suite and starts/stops its own production API-test server on port 3004. Tests create an ephemeral credential in memory; they do not read the old local QA password. Database/API tests stop with a configuration blocker when `TEST_DATABASE_URL` is absent. TLS is bypassed only for loopback test connections; remote test connections retain verification.

## Remaining blockers and preserved scope

- Hosted pooler/TLS, migrations and demo seeding are now verified in the update below. Restricted-role grants, hosted checkout concurrency and restart/deployment persistence still require validation. The TLS task did not rotate or inspect the configured admin credential.
- Verify HTTPS cookies, exact production/preview origin and scrypt memory/latency on the chosen Vercel plan before deployment.
- This migration did not redo browser visual/device-install/offline testing. UI and PWA source were retained; production HTTP and worker-policy regressions passed. Actual install/update-cycle/iOS checks remain as documented in the earlier audit.
- Demo commerce still has no payment, shipment, email or real merchandise promise; none was added by this backend migration.
- Previous audit/completion documents describe the historical JSON implementation. This document and the updated README describe the current PostgreSQL setup and supersede those storage/setup instructions.

Main changed/new files: `src/lib/commerce/{database,store,password,auth}.ts`, admin/store-calling API routes, `src/app/admin/page.tsx`, `supabase/migrations/*`, maintenance scripts, `.env.example`, package/lock files, DB/API tests, README and this document. LOW page content, shop component markup/styles, manifest, PWA controls and `public/sw.js` were not redesigned or edited. The admin login setup hint now names the new `npm run admin:setup` command.


## Live Supabase TLS verification

After the user configured the database URL and admin hash, the driver reproduced `SELF_SIGNED_CERT_IN_CHAIN` before PostgreSQL authentication. Diagnostics showed no conflicting SSL query parameters, no `DATABASE_SSL_CA` / extra CA configuration, and no proxy environment variables. The endpoint presented a Supabase Intermediate 2021 CA chain terminating in Supabase Root 2021 CA, which is absent from the default Node trust bundle. No evidence indicated a local proxy or PostgreSQL query/configuration fault.

The trusted CA was obtained independently over verified HTTPS using the download URL published in [Supabase's official dashboard configuration](https://github.com/supabase/supabase/blob/master/apps/studio/hooks/custom-content/custom-content.json), substituting its production environment:

`https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt`

Root SHA-256 fingerprint: `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`. Certificate expiry: 26 April 2031. The downloaded CA matched the root observed in the pooler chain; the root supplied by the failing socket itself was not used as the trust source.

Fix: added the official CA PEM to `DATABASE_SSL_CA` in ignored `.env.local`, preserving all existing credentials. The adapter already accepts this setting and strips conflicting URL SSL options, so no driver code change was required. `rejectUnauthorized: true` and default hostname verification remain enabled. No global TLS bypass or unverified connection was used. This configuration follows [Supabase's certificate verification guidance](https://supabase.com/docs/guides/platform/ssl-enforcement). When deploying later, configure the same CA trust in server-side environment settings, and review certificate rotation before expiry.

Fresh hosted verification:

- TLS socket: encrypted, authorized, TLSv1.3.
- `SELECT 1 AS ok`: returned `1` using the existing database driver with verification enabled.
- Initially `commerce.schema_migrations` and `commerce.products` were absent. Required commands `npm run db:migrate` and `npm run db:seed` were reported to the user before execution.
- Both versioned migrations applied successfully; ledger now contains `202610100001_commerce.sql` and `202610100002_catalog_order_and_access.sql`.
- Seed completed with four approved demo products. No database reset, table deletion, QA order/customer import or session import occurred.
- Existing local server: `/shop` HTTP 200; `/api/shop/products` HTTP 200 with four visible products.
- Actual in-app browser reload displayed the catalog heading and all four product links; rendered shop inspected with a screenshot.

This verifies hosted connectivity, migrations and catalog reads. Hosted checkout/admin mutation/concurrency and deployment tests have not been rerun in this TLS task. No application UI/PWA changes, deployment or GitHub push occurred.
