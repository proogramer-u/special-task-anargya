# Anargya ITS EV Team — Company Profile



## Pages

- `/` — Home
- `/team` — Team history, divisions and member directory
- `/vehicles` — Formula EV vehicles and published specifications
- `/achievements` — Competition history and interactive Track Record
- `/research` — Engineering and development activities
- `/sponsors` — Acknowledged supporters and sponsorship/contact information

Mobile navigation includes keyboard focus management and scroll locking. The Track Record carousel supports pointer, touch and keyboard input and reduced motion.

## Run locally

Use Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or third-party service credentials are required for the current company-profile website.

## Validate and build

```bash
npm run lint
npm run typecheck
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

