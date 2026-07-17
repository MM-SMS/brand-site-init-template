# brand-site-init-template

Clean Next.js starter for new brand sites. Clone it for each brand: same stack, same folder layout, shared subscription forms and legal pages. Brand styles and copy are customized per site — the template stays intentionally minimal.

Repo: [MM-SMS/brand-site-init-template](https://github.com/MM-SMS/brand-site-init-template)

---

## Why this template

When launching a new brand you should not rebuild from scratch:

- site shell (layout, header, footer, about/contact);
- email/SMS subscribe flow with consent, captcha, and API;
- Privacy / Terms driven by legal-entity data;
- unsubscribe;
- LP redirect fallbacks (`/expired`, 404 / not-found);
- env contract for Turnstile, Resend, Textbelt, and the campaigns API.

Brand sites stay comparable: you change `BRAND` / `LEGAL`, palette, font, and page content — not the architecture.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| UI | Tailwind v4, design tokens as CSS variables in `app/globals.css` |
| Components | shadcn/ui (`components.json`) — only `button` ships by default; add more via CLI |
| Email | Resend |
| SMS | Textbelt (optional) |
| Captcha | Cloudflare Turnstile |
| LP redirects | `redirections-lp-setup` (private git dependency) |

No auth or CMS by default. Only add Supabase / Sanity if that specific brand actually needs them.

---

## Quick start

```bash
git clone git@github.com:MM-SMS/brand-site-init-template.git my-brand-site
cd my-brand-site
npm install
cp .env.example .env.local   # fill in keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## First things to customize

1. **`lib/constants.ts`**
   - `BRAND` — name, tagline, description, contactEmail, domain, legalEntity
   - `LEGAL` — entity details, addresses, EIN, Privacy/Terms dates, privacy/copyright emails
   - URLs (`SITE_URL`, `/privacy`, `/terms`, …) and `NAV_LINKS` are derived from here
2. **`app/globals.css`** — tokens such as `--background`, `--primary`, `--muted-foreground`
3. **`app/layout.tsx`** — font (currently Inter) and metadata
4. **Pages** — `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`
5. **`.env.local`** — copy from `.env.example` (see below)

After updating `BRAND` / `LEGAL`, forms, emails, Privacy/Terms, and the footer pick up the new values automatically.

---

## What ships in the template

### Base site

- Home / About / Contact — placeholder copy
- Sticky header + footer (footer includes Subscribe, Privacy, Terms, Unsubscribe)
- `robots.ts` — defaults to `Disallow: /` (site stays unindexed until you change it)
- Empty `data/`, `hooks/`, `public/`, `scripts/`, `styles/` with `.gitkeep`

### Subscription (email + SMS)

Full opt-in / opt-out loop:

| Piece | Location |
|---|---|
| Form body | `components/forms/subscribe-form-body.tsx` |
| Modal | `components/forms/subscription/subscribe-modal.tsx` |
| Auto-open | `SubscribeModalAuto` in `app/layout.tsx` |
| Subscribe page | `/subscribe` |
| Unsubscribe page | `/unsubscribe` |
| API | `POST /api/subscription/subscribe`, `POST /api/subscription/unsubscribe` |
| Client helper | `lib/subscription-client.ts` |
| Modal timing | `lib/subscription-modal.ts` |

**Form fields:** first/last name, email, phone, email / SMS / marketing / Terms+Privacy checkboxes, Cloudflare Turnstile.

**Validation:** email required when email consent is checked; phone required for SMS/marketing; Terms required; captcha required.

**Auto modal:**

- first show after ~4s;
- then escalating cooldowns: 2 min → 5 min → 20 min;
- skipped on `/subscribe`, `/unsubscribe`, `/privacy`, `/terms`, `/expired`, `/not-found`;
- after a successful subscribe, `localStorage` (`brand_subscribed`) stops further opens.

**Subscribe backend:**

1. Verify Turnstile (`TURNSTILE_SECRET_KEY`; without a key in dev, verification is skipped with a warning)
2. Welcome email via Resend (when email is present)
3. Welcome SMS via Textbelt (when phone + SMS consent and `TEXTBELT_API_KEY` are set)
4. Admin notification to `RESEND_FORWARD_EMAIL`

Email HTML lives in `app/api/subscription/_lib/emails/templates.ts` — brand-neutral, pulls name/tagline/address from `BRAND` / `LEGAL`.

### Legal

- `/privacy` and `/terms` — full US-oriented copy via `components/legal/legal-body.tsx`
- Brand, entity, addresses, and dates all come from `lib/constants.ts`
- Form and footer Terms/Privacy links point at these pages

Before production, replace placeholder `LEGAL.*` values and `termsLastUpdated` / `privacyLastUpdated`. Treat the copy as a starting template; legal review may still be required per brand.

### Landing-page / campaign fallbacks

`redirections-lp-setup` installs `/go/[code]`. When resolving a campaign:

| Case | Redirect / UI |
|---|---|
| Code not found | `/not-found` → `app/not-found.tsx` |
| Offer inactive / expired | `/expired` |
| OK | HTML from `public/lp/…` with inject for the route type |

Already included:

- **`/expired`** — “offer no longer available”, CTAs to home / subscribe
- **`app/not-found.tsx`** — App Router 404 and unknown-campaign redirect target

`/go` and `lib/lp/*` appear after the package setup command (see `redirections-lp-setup` README). Env: `CAMPAIGNS_MNG_URL`, `LINK_PUBLIC_SECRET`.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/about` | About |
| `/contact` | Contact |
| `/subscribe` | Subscribe page |
| `/unsubscribe` | Unsubscribe (email / SMS / both) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms & Conditions |
| `/expired` | Expired / removed LP offer |
| *(unknown path)* | `not-found.tsx` |
| `POST /api/subscription/subscribe` | Opt-in |
| `POST /api/subscription/unsubscribe` | Opt-out |

After LP setup: `GET /go/:code` — serve or redirect the campaign landing page.

---

## Folder structure

```
app/
  page.tsx, about/, contact/     # brand content
  subscribe/, unsubscribe/       # forms
  privacy/, terms/               # legal
  expired/, not-found.tsx        # LP / 404 fallbacks
  api/subscription/              # subscribe + unsubscribe API
  globals.css, layout.tsx, robots.ts
components/
  layout/          # header, footer
  forms/           # form body, Turnstile, modal, auto-modal
  legal/           # LegalBody, LegalSection, …
  ui/              # shadcn (button)
lib/
  constants.ts           # BRAND + LEGAL — primary brand config
  subscription-client.ts
  subscription-modal.ts
  utils.ts
data/ hooks/ public/ scripts/ styles/   # empty placeholders (.gitkeep)
```

Empty folders are kept with `.gitkeep`. Leave `.gitkeep` in place until real files exist beside it — otherwise git drops the empty directory.

---

## Environment variables

Copy `.env.example` → `.env.local`:

| Variable | Used for |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Captcha widget |
| `TURNSTILE_SECRET_KEY` | Server-side captcha verify |
| `RESEND_API_KEY` | Outbound email |
| `RESEND_FORWARD_EMAIL` | Admin copy of new subscriptions |
| `RESEND_FROM` / `RESEND_REPLY_TO` | From / Reply-To (falls back from `BRAND` if unset) |
| `TEXTBELT_API_KEY` | SMS (skipped when missing) |
| `SITE_URL` | Absolute links inside emails |
| `CAMPAIGNS_MNG_URL` | LP resolve (after wiring redirections) |
| `LINK_PUBLIC_SECRET` | Auth for campaigns public API |

Without Turnstile/Resend the form UI still loads, but submit will fail captcha/email checks — use real keys for an end-to-end test.

---

## Design notes

- Drive palette only through CSS variables in `app/globals.css` — do not hardcode brand colors into shared form/legal components
- Forms and legal use design tokens (`primary`, `muted-foreground`, `border`, `destructive`)
- Add shadcn pieces with `npx shadcn@latest add <name>` — do not copy components by hand from other brands
- Brand-specific visuals (heroes, motion, illustrations) belong in that brand’s `app/` / `components/`, not in the shared form shell

---

## New-brand checklist

- [ ] Clone / fork this template
- [ ] Fill `BRAND` and `LEGAL` in `lib/constants.ts`
- [ ] Set colors in `globals.css`, font in `layout.tsx`
- [ ] Replace home / about / contact copy
- [ ] Configure `.env.local` + Cloudflare Turnstile site + Resend domain
- [ ] Test `/subscribe`, auto-modal, `/unsubscribe`, and emails
- [ ] Review `/privacy` and `/terms` (dates, addresses, phone)
- [ ] If needed: run `redirections-lp-setup`, add domain to `DOMAIN_BRAND_MAP`, drop LPs under `public/lp/`
- [ ] Before production: decide whether to keep `robots` on `Disallow: /`

---

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

---

## Notes

- Do not commit `.env.local` or secrets
- Do not add brand-only features (quizzes, CMS, auth) to the shared template “just in case”
- Keep git history linear: template improvements are normal commits on `main` — no force-push over shared history
