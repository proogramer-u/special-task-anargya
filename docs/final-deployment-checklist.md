# Final deployment checklist

Reviewed 10 October 2026 against the current production build and configured Supabase database. Result: **READY FOR DEPLOYMENT for the special-task demo**, with hosting environment configuration below. No deployment or Git push was performed.

| Requirement | Result | Evidence |
| --- | --- | --- |
| Complete checkout against Supabase | PASS | Production API flow with fictional customer `qa@example.invalid` and a temporary demo product. Valid order created; server recalculated 2 × Rp16,000 = Rp32,000, rejected invalid input and insufficient stock. |
| Persistence and admin dashboard | PASS | Authenticated `/admin` rendered the submitted reference; admin orders API returned it. After the temporary production server stopped and database pool reopened, the cancelled order and item snapshots remained readable from Supabase. |
| Admin login and product CRUD | PASS | Wrong password rejected; correct login, create, edit, delete and logout verified against production APIs. A random in-memory test credential was supplied only to the temporary test process; the configured admin hash was not changed. |
| Status updates and stock management | PASS | Processing and cancellation passed. Stock changed 5 → 3 on checkout and returned to 5 on cancellation. Reopening a cancelled order was rejected; deleting the temporary product preserved order snapshots. |
| Idempotency and private confirmation | PASS | Retried checkout returned the same reference. Order retrieval without its private token returned 404. |
| Server-side authentication and database access | PASS | Unauthenticated admin reads/writes returned 401. Foreign-origin mutation and oversized request rejected. HttpOnly/SameSite=Strict session cookie verified locally; server-only DB modules, credential-version session handling and private-schema access reviewed. Verified TLS retained. No configured credentials found in 63 production client files. |
| Git excludes credentials and local records | PASS | No configured DB URI/password or admin hash in Git candidate files. `.env.local`, `.data/commerce.json` and local QA password are ignored; no private files are staged. Recheck before any future commit. |
| ESLint | PASS | `npm run lint`, exit 0. |
| TypeScript | PASS | `npm run typecheck`, exit 0. |
| Production build | PASS | `npm run build`, exit 0; company-profile, commerce, admin and PWA routes built. |
| Company-profile route regression | PASS | `/`, `/team`, `/vehicles`, `/achievements`, `/research`, `/sponsors` each returned 200 through the production integration test. No profile UI changes. |
| PWA manifest and registration | PASS | Manifest returned 200, standalone display and 512px icon verified. Chrome production-mode Application panel showed the activated/running `sw.js`; browser offered installation. Optional richer-install screenshots are absent, which does not prevent basic installation. |
| Basic offline support in production browser | PASS | Enabled Chrome DevTools Offline. Reloaded Home successfully with offline status; `/shop` displayed the explicit offline fallback and did not submit an order. Restored online mode; `/shop` rendered all four demo products. |
| Private cache exclusions | PASS | `npm run test:pwa` passed: API/admin/commerce/POST/RSC responses excluded, public Home and offline fallback supported. |
| Runtime dependency audit | PASS | `npm audit --omit=dev`: zero vulnerabilities. |
| Critical fixes and regression | PASS | No critical runtime defect found in this pass. Strengthened API test to assert the actual admin page contains the submitted order. Existing application design and behavior preserved. |
| Setup/migration/deployment instructions | PASS | README updated for Supabase pooling, verified TLS, migration/seed commands, required server environment and Vercel configuration. |
| Final hosted HTTPS validation | NOT TESTED | No deployment authorized. Secure cookie behavior, final-domain origin configuration and PWA installation on the deployed origin must be checked after deployment. |
| Physical-device install and cross-browser offline | NOT TESTED | Chrome localhost production-mode behavior tested; actual installation on iOS/Android and Safari not rerun. |
| Manual browser checkout/admin form traversal | NOT TESTED | Full backend workflow and server-rendered dashboard tested through production HTTP APIs; this pass did not repeat every form manually. |
| Concurrent checkout stress test on hosted Supabase | NOT TESTED | Retry/stock checks passed serially; transaction locking reviewed. No hosted load test performed. |

## Test data and changes

The temporary QA product was deleted and its order cancelled/restocked. The fictional cancelled QA order remains in Supabase as persistence evidence; it is not a local record and is not committed. The four approved demo products remain in the catalog. No real customer details or payments were used. Test sessions were logged out and the temporary server stopped.

Files changed in this readiness pass: `tests/commerce-api.cjs`, `README.md`, and this report. Existing uncommitted migration/application work was preserved. No new dependencies, redesign, database reset or Figma changes.

## Deployment configuration

Set Vercel `DATABASE_URL`, `DATABASE_SSL_CA`, `ADMIN_PASSWORD_HASH`, and `APP_ORIGIN=https://YOUR_FINAL_DOMAIN` as server-only values. Use the Next.js preset and the package directory as Root Directory. Current Supabase migrations and four-product seed are already applied; do not reset or reseed on build. See README and `docs/supabase-migration.md`.

There are no confirmed essential blockers for the university demo. Commerce remains explicitly simulated: order persistence/management is functional, but real payment processing, email delivery and shipping are not provided.

## Local development TLS follow-up

The subsequent `localhost:3000/shop` certificate failure came from a long-running dev process started before the trusted CA configuration changed. Its globally cached PostgreSQL pool retained the previous SSL settings. Restarted only port 3000; fresh `SELECT 1` returned 1 with encrypted/authorized TLS, `/shop` returned 200, and Chrome rendered the four-product catalog. No credentials or application code changed. Restart the dev server after changing database/TLS environment settings.

## Collection refresh follow-up

The later ten-product storefront refresh supersedes the four-product catalog count above. Supabase seed integrity, all product routes, commerce API regression, responsive browser checks and a fresh lint/typecheck/build passed. See `docs/shop-refresh.md` for inventory, database effects and scope.
