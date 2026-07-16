# brand-template

Clean Next.js starter for spinning up a new brand site. Ships with homepage, header/footer, About/Contact, subscription forms (including an auto-opening modal), Privacy/Terms, unsubscribe, expired/not-found fallbacks, and subscription API routes.

Replace the placeholder copy in `lib/constants.ts` (`BRAND` + `LEGAL`) and page content with the real brand. Copy `.env.example` → `.env.local` for Turnstile / Resend / optional SMS.

## Setup

```bash
npm install
npm run dev
```

## Included routes

| Route | Purpose |
|---|---|
| `/` `/about` `/contact` | Site pages |
| `/subscribe` `/unsubscribe` | Opt-in / opt-out forms |
| `/privacy` `/terms` | Legal pages (text driven by `BRAND` / `LEGAL`) |
| `/expired` | Campaign offer expired (used by LP redirects) |
| unmatched routes | `app/not-found.tsx` (also covers unknown `/not-found` redirects) |
| `/api/subscription/subscribe` | Subscribe API |
| `/api/subscription/unsubscribe` | Unsubscribe API |

The subscribe modal opens automatically after a short delay (with escalating cooldowns) unless the visitor already subscribed or is on legal/subscribe paths.

## Folder structure

- `app/` — App Router routes, global styles, subscription API
- `components/layout/` — header and footer
- `components/forms/` — subscribe form, Turnstile, auto modal
- `components/legal/` — legal page helpers
- `components/ui/` — shadcn/ui primitives (`button` only; add more via CLI)
- `lib/` — `constants.ts`, `utils.ts`, subscription helpers
- `data/`, `hooks/`, `public/`, `scripts/`, `styles/` — empty placeholders

## Config included

- `package.json` — Next.js, React, Tailwind, lucide-react, Resend, `redirections-lp-setup`
- `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`
- `components.json` — shadcn/ui config
- `.env.example`, `.gitignore`
