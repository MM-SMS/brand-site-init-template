# brand-template

This repo is a clean starting point for a new brand site, cloned each time a new brand needs a site on the same stack. It is intentionally minimal — most folders are empty on purpose. Keep the structure below intact when building out a new brand on top of this template, so brand sites stay comparable to each other.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind v4, design tokens as CSS variables in `app/globals.css`
- shadcn/ui primitives (config in `components.json`) — only `components/ui/button.tsx` is included; add more with `npx shadcn@latest add <component>` rather than hand-writing them, so they stay consistent with the project's shadcn config
- Subscription forms (email/SMS) via Resend + Textbelt + Cloudflare Turnstile
- `subscribe-form-config` (Notion field visibility/required/copy) via `github:MM-SMS/opt-in-form-settings-script`
- `orione-pay` from `MM-SMS/payment-script` — `/shop` Buy CTA, `/payment` checkout (`PAYMENT_FLOW=stripe|custom`)
- `redirections-lp-setup` (private git dependency) for landing-page redirects — wire up routes for it as the brand needs them; `/expired` and `not-found` are ready for campaign fallbacks
- No auth or CMS by default. Only add Supabase/Sanity back if this specific brand actually needs login or a CMS — don't restore them out of habit

## First things to customize for a new brand

1. `lib/constants.ts` — the `BRAND` and `LEGAL` objects (name, tagline, contact email, domain, entity details). Everything else in the template reads from here.
2. `app/globals.css` — the CSS variables under `:root` (`--background`, `--primary`, etc.) define the brand's color palette.
3. `app/layout.tsx` — swap the font if the brand needs something other than Inter.
4. `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx` — placeholder copy, replace with real content.
5. `.env.local` — copy from `.env.example` (Turnstile, Resend, optional Textbelt, `SITE_URL`).

## Folder structure

- `app/` — routes. Home, shop, about, contact, subscribe, unsubscribe, privacy, terms, expired, payment, purchase success/cancel; plus `not-found.tsx` for 404 / unknown campaign links. API under `app/api/subscription/` and `app/api/orione-pay/`.
- `components/layout/` — `header.tsx`, `footer.tsx`.
- `components/forms/` — subscribe form body, Turnstile, auto-opening subscribe modal.
- `components/legal/` — shared legal page helpers.
- `components/ui/` — shadcn primitives, add via the CLI.
- `data/` — empty placeholder, for static/seed data (e.g. content config) once the brand needs it.
- `hooks/` — empty placeholder, for shared React hooks once the brand needs them.
- `lib/` — `utils.ts`, `constants.ts`, `subscription-client.ts`, `subscription-modal.ts`, `subscribe-form-server.ts`, `payment.ts`.
- `public/` — empty placeholder, for static assets (icons, images).
- `scripts/` — empty placeholder, for DB migrations if the brand adds a database.
- `styles/` — empty placeholder, reserved for extra stylesheets outside `app/globals.css`.

The empty folders each contain a `.gitkeep` file — git doesn't track empty directories, so removing `.gitkeep` before adding real files there will make the folder disappear from git history if it becomes empty again. Leave `.gitkeep` in place once other files exist alongside it; it has no effect on the build.
