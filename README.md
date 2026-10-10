# Anargya ITS EV Team — Company Profile


## Pages

- `/` — Home
- `/team` — Team history, divisions and member directory
- `/vehicles` — Formula EV vehicles and published specifications
- `/achievements` — Competition history and interactive Track Record
- `/research` — Engineering and development activities
- `/sponsors` — Acknowledged supporters and sponsorship/contact information
- `/shop` — Clearly disclosed concept collection, detail pages, persistent cart and checkout
- `/admin` — Server-protected product and order management
- `/offline` — PWA offline fallback

Mobile navigation includes keyboard focus management and scroll locking. The Track Record carousel supports pointer, touch and keyboard input and reduced motion.

## Run locally

Use Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The company profile needs no credentials. The demo shop requires PostgreSQL configuration; admin sign-in requires the setup below.

## Demo admin and PostgreSQL persistence

See [Supabase migration setup](docs/supabase-migration.md). Configure server-only `DATABASE_URL` from the Supabase Transaction pooler, optional `DATABASE_SSL_CA`, and exact `APP_ORIGIN` in ignored `.env.local`.

```bash
npm run db:migrate
npm run db:seed
npm run admin:setup
```

The admin setup saves a hardened versioned scrypt hash to ignored `.env.local`. Restart the server; changing that hash invalidates sessions under the previous credential. Old `salt:hash` credentials are rejected. Products, orders and hashed sessions now persist in PostgreSQL. Local `.data/commerce.json` is no longer read and is not imported; QA orders/customer information are not migrated.

Use fictional checkout details. No payments, emails or shipments occur. All merchandise illustrations, stock and prices are demo data, not official offers.

## PWA

Test with a production build on localhost. The manifest and service worker support installation and offline Home/previously visited public pages. Commerce, API and admin responses are excluded from offline caches. New releases should increment the cache version in `public/sw.js`; waiting-worker updates require the visible reload action. Installation availability depends on the browser.

## Validate and build

```bash
npm run lint
npm run typecheck
npm run test:commerce # Requires isolated TEST_DATABASE_URL; see migration guide
npm run test:pwa
npm run build
npm run start
```

Additional browser audit scripts are in `tests/`. They require Playwright supplied separately (not a project dependency), with an optional `PLAYWRIGHT_MODULE` path and `BASE_URL`. Some scripts capture earlier single-page layouts and should be reviewed before reuse. Generated preview folders are intentionally excluded from Git.

## Project organization

- `src/app/` — App Router pages and styles
- `src/components/` — Shared navigation, footer, cards and interactive components
- `src/lib/` and `src/data/` — Source-qualified content and structured team/sponsor data
- `public/images/anargya/` — Official-source website imagery and logos
- `public/images/team/member-placeholder.svg` — Shared neutral member portrait
- `public/fonts/` — Inter font and its OFL license
- `docs/` — Brand guidance, asset provenance, content verification, planning and audit reports

## Deploy to Vercel with Supabase

The app is ready for a university demo; see [final deployment checklist](docs/final-deployment-checklist.md). Deployment has not been performed.

1. Import the existing repository and select the directory containing this `package.json` as the Vercel Root Directory. Use the Next.js preset, `npm ci` install command and `npm run build` build command. Use a supported Node.js runtime (20.9 or newer); do not use static export or an Edge runtime for PostgreSQL routes.
2. Configure server-only environment variables in Vercel before building:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | Supabase Transaction pooler URI on port 6543; URL-encode its password. |
   | `DATABASE_SSL_CA` | The trusted Supabase CA PEM used successfully locally; literal `\n` separators are supported. Preserve certificate verification. |
   | `ADMIN_PASSWORD_HASH` | Existing versioned scrypt hash from local admin setup; copy privately without committing it. |
   | `APP_ORIGIN` | Exact HTTPS deployment origin, without a trailing slash; update when changing domains. |

   Never prefix these with `NEXT_PUBLIC_`. Do not upload `.env.local`, `.data/`, local customer records, sessions, QA passwords or generated previews. `MIGRATION_DATABASE_URL` is optional for local maintenance, not needed in the deployed application.
3. Apply versioned migrations once from a trusted local terminal with the target database configured: `npm run db:migrate`. For a new empty database only, seed the ten approved fictional concept products with `npm run db:seed`. Both migrations and the ten-product concept seed are already applied to the current Supabase database. Do not run seeding on every build or use it to reset stock. See [database setup and TLS](docs/supabase-migration.md) for the migration connection and CA details.
4. After deployment is authorized, check `/shop`, sign in at `/admin/login`, submit a fictional order, and confirm it in `/admin`. Check the HTTPS session cookie and PWA offline behavior on the final origin. Preview deployments need their own matching `APP_ORIGIN`.

The application uses a small server-side PostgreSQL pool (maximum three connections per instance) with verified TLS and Supabase transaction pooling. Persistence does not depend on Vercel's filesystem. Checkout is a demo order submission; no payment processor, automatic emails or shipping service is configured.

## Merchandise collection

The shop presents ten fictional motorsport-inspired products with original generated studio mockups, proposed specifications and simulated orders. See [collection inventory and refresh tests](docs/shop-refresh.md). `npm run db:seed` inserts missing stable IDs and archives the four legacy listings transactionally; repeat runs preserve edited products and stock. Existing orders, item snapshots and sessions are not reset. No official retail availability or fulfilment is claimed.
