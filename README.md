# Anargya ITS EV Team — Company Profile

Responsive multi-page company-profile website for the Anargya 9th Generation Web Design & Development special task, **LOW difficulty**. Built with Next.js App Router, TypeScript, React and Tailwind CSS.

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

## Content and asset usage

Names, achievements, vehicle details and supporter acknowledgments are grounded in sources recorded in `docs/anargya-content.md`, `docs/anargya-team-directory.md`, `docs/anargya-assets.md` and `docs/anargya-sponsors-2026.md`. Acknowledgments do not establish current sponsorship contracts or tiers. The team directory follows the published eighth-generation roster.

All member cards use a shared silhouette. Temporary original portrait cards used for roster research are not included in this repository.

Official Anargya photography and third-party logos retain their respective rights; no open reuse license has been established. They are included for this Anargya special-task website with provenance and restrictions documented in the asset manifest. Do not treat this repository as a blanket license to redistribute those assets. Inter is supplied with its SIL Open Font License.

Dependencies, Next.js build output, environment files, local browser previews, temporary research downloads and generated TypeScript caches are excluded. MED e-commerce and HIGH PWA features are outside scope. This repository does not deploy automatically through any configuration added here.
