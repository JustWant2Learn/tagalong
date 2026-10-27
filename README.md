# Tagalong

Play-with marketplace for **ARC Raiders**, **Valheim** and **Enshrouded**. Customers book skilled players (Guides) who join *their* squad or world on the Guide’s own account. We never ask for a password.

Brand name, colors, domain and support email live in [`lib/brand.ts`](lib/brand.ts). Change that file to rebrand.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS 4)
- shadcn/ui + Lucide
- Game configs in `lib/games/*` (add a game = one config file + catalog rows)
- Phase 1 uses typed seed modules. Phase 2 moves the catalog to Supabase.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Phase status

| Phase | Status |
| --- | --- |
| 1 Foundation & marketing site | In progress in this repo |
| 2 Data model & booking | Not started |
| 3 Guide side & matching | Not started |
| 4 Payments, ledger & payouts | Not started — confirm Paddle/Lemon Squeezy accepts play-with before going live |
| 5 Trust & admin | Not started |

## Adding a game

1. Add `lib/games/<slug>.ts` implementing `GameConfig`.
2. Register it in `lib/games/index.ts`.
3. Add catalog rows (services, targets) in `lib/seed/catalog.ts` (admin UI in Phase 5).
4. No new pages. `/[game]` and `/services/[slug]` are data-driven.

## Scripts

- `npm run dev` — local app
- `npm run build` — production build
- `npm run lint` — ESLint
