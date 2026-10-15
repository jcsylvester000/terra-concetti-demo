# Terra Concetti — Website (Phase 1)

Marketing and SEO website for **Terra Concetti Properties Corp.**, built to the approved BRD
(`6 - Final Documentation/Terra Concetti Website BRD - 2026-10-15/`, v1.2).

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Motion
- **No database.** All content lives in this repository (`src/content/*.ts`, journal in `src/content/journal/*.mdx`).
- **Static HTML for every public page** (SEO), deployed on **Netlify** from GitHub.
- **Contact is information-only** in Phase 1 (decisions D2/D4): phones, email and address are plain text.
  No buttons, forms, `tel:`/`mailto:` or chat links. The build fails if any are added (`scripts/content-guard.mjs`).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + content guard + production build
npm run test:e2e     # Playwright (run `npm run build` first)
```

Node 22.6 or newer.

## Editing content

| What | File |
|---|---|
| Company details, phones, email, address, License to Sell numbers, **contact switch** | `src/content/site.ts` |
| Destinations (text, key facts, status, prices switch, gallery) | `src/content/projects.ts` |
| Residence types, sizes, counts, prices | `src/content/unit-types.ts` |
| Leadership and design partner | `src/content/team.ts` |
| Navigation | `src/content/navigation.ts` |
| Image library (alt text, render/photo label, placeholder flag) | `src/content/images.ts` + `src/assets/images/` |

Rules enforced by the build:

- A project can only be `now-selling` when its DHSUD License to Sell number is filled in `site.ts`; prices only show then.
- Blocked terms (IRR, GDV, MOIC, valuation, tranches, visa/citizenship claims, "fractional ownership",
  "carbon-neutral", "net-zero", fake urgency) fail the build. See `scripts/content-guard.mjs`.
- Every image declares its kind; renders always show "Artist's perspective".
- Placeholder images (cut from the investor deck) are counted on every build. Set
  `REQUIRE_FINAL_ASSETS=true` for the production launch build to block any that remain.

## Environment variables (Netlify → Site configuration → Environment variables)

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL. Optional until the domain is connected (falls back to the Netlify URL). |
| `ALLOW_INDEXING` | `true` **only** on the real domain. Otherwise every page is noindex and robots.txt disallows all. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Empty = no tracking scripts and no consent banner. |

No secrets are used in Phase 1.

## Deploy

1. Push to `main` on `github.com/jcsylvester000/terra-concetti-demo`.
2. Netlify → *Add new site* → *Import from Git* → pick the repo. Build settings come from `netlify.toml`
   (`npm run build`, publish `.next`, `@netlify/plugin-nextjs`, Node 22).
3. Every push to `main` deploys; pull requests get deploy previews.

## Project map

```
src/app/            routes (one folder per URL), sitemap.ts, robots.ts, not-found.tsx, styleguide/ (noindex)
src/components/     layout/ (header, menus, footer, breadcrumbs), ui/ (design system), consent/, sections/, motion/
src/content/        all site content (typed + validated with Zod)
src/lib/            seo.ts (metadata), jsonld.tsx (structured data), routes.ts (sitemap list), env.ts
src/styles/         globals.css (Tailwind v4 @theme brand tokens)
scripts/            content-guard.mjs, brand/ (OG image source)
tests/              Playwright end-to-end tests
```

## Interim brand assets

`src/components/ui/monogram.tsx` and `public/brand/*` hold an interim monogram traced from the deck cover.
Replace with the official vector logo when TCPC/PDP supply it (BRD asset A1).
