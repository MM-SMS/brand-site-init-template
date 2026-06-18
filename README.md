# brand-template

Clean Next.js starter for spinning up a new brand site. Ships with a working homepage, header/footer, and basic About/Contact pages — replace the placeholder copy in `lib/constants.ts` and the page content with the real brand.

## Setup

```bash
npm install
npm run dev
```

## Folder structure

- `app/` — Next.js App Router routes (`page.tsx`, `about/`, `contact/`) and global styles
- `components/layout/` — header and footer
- `components/ui/` — shadcn/ui primitives (only `button.tsx` included; add more via the shadcn CLI as needed)
- `data/` — static/seed data (empty, add as needed)
- `hooks/` — shared React hooks (empty, add as needed)
- `lib/` — `utils.ts` (`cn` helper) and `constants.ts` (brand config)
- `public/` — static assets
- `sanity/` — empty, add back if the new brand needs a CMS
- `scripts/` — empty, add DB migrations if the new brand needs a database
- `styles/` — empty, reserved for extra stylesheets

## Config included

- `package.json` — trimmed to only what this starter uses: Next.js, React, Tailwind, lucide-react, and the `redirections-lp-setup` package for landing-page redirects
- `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs` — Next.js/TypeScript/Tailwind setup
- `components.json` — shadcn/ui config
- `.gitignore`
