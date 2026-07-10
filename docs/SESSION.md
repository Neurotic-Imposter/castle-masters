# Session Log — Castle Masters

> This file tracks the current development session, active context, last decisions, and open questions.
> Updated at the start and end of each working session.

---

## Current Session

**Date**: 2026-07-11
**Focus**: Final stabilization pass (pre-CM028) + CM027 Corporate page
**Status**: ✅ Complete

### What Was Completed This Session

**Repository Cleanup (Pre-CM024):**
- Fixed banned terminology: `'View All Games →'` → `'View All Chess Puzzles →'` in `home.ts`
- Fixed `titleLines[1]: 'Training Games'` → `'Training Puzzles'` in `home.ts` (PUZZLES_CONTENT)
- Removed dead export `SECTION_LABELS` from `home.ts` (unused)
- Updated tournament placeholder date from past (`March 15–17, 2026`) to future (`November 22–24, 2026`)
- Moved Hero animation keyframes (`boardFloat`, `pieceFloat`, `floatOrb`) from `<style jsx global>` in `Hero.tsx` into `globals.css` (design system)
- Normalized all spacing tokens to `rem` units in `globals.css` (was mixed px/rem for spacing-1 through spacing-7)
- Fixed Turbopack lockfile warning: added `turbopack.root` to `next.config.ts`
- Established `app/src/lib/content/` convention for page-scoped content modules (documented in ARCHITECTURE.md)

**CM024 — Coaching Page:**
- Created `app/src/lib/content/coaching.ts` — content module (first under new `lib/content/` convention)
- Created `app/src/app/coaching/page.tsx` — Server Component: header, 5 online + 5 offline program cards, progress roadmap (6 steps), weekly study plan table, dual CTA (Book Free Trial / Contact Us)
- All content sourced from frozen prototype — no invented data
- Preview route created (`/cm024-preview`), verified, deleted
- Build, lint, TypeScript: all PASS

**Final Stabilization Pass (post-CM024):**
- Fixed nested `<main>` in `coaching/page.tsx` — layout already wraps in `<main>`; coaching page root changed to fragment
- Updated DEC-012 in DECISIONS.md — reflected final founder decision (Upcoming + Past only; previous entry incorrectly listed School Events and Special Events)
- Added DEC-021 to DECISIONS.md — `lib/content/` page convention formally recorded
- Removed stale preview route references from 8 component JSDoc blocks (cm011, cm016, cm017, cm019, cm020, cm021, cm022, cm023-preview — all routes deleted; docblocks updated)
- Build, lint, TypeScript: all PASS

**CM025 — Tournaments & Events Page + Refinements:**
- Created `app/src/lib/content/tournaments.ts` — typed content module: `UpcomingTournamentCard`, `PastTournamentCard`, `TournamentsPageCopy` interfaces; 3 upcoming + 2 past placeholder cards
- Created `app/src/app/tournaments/page.tsx` — Server Component (no `use client`): page header, Upcoming section (3-col grid), Past section (2-col grid)
- **Refinements applied post-implementation:**
  - `registerUrl` changed from `'#register-placeholder'` to `string | null` — `null` renders disabled "Registration Opening Soon" button with `aria-disabled="true"`
  - All invented tournament names removed — cards use generic "Upcoming Tournament — Placeholder" / "Past Tournament — Placeholder"
  - Past results fields simplified — single `results: string` field replacing invented winner/runner-up/standings; displays "Results will appear here once provided by the organizing team."
  - All TODO (Founder) comments added to content module
- Preview route created (`/cm025-preview`), build/lint/TypeScript verified, deleted
- Build, lint, TypeScript: all PASS

**CM026 — Chess Puzzles Page:**
- Created `app/src/lib/content/chess-puzzles.ts` — typed content module: `PuzzleCard`, `PuzzleDeckProduct`, `ChessPuzzlesPageCopy` interfaces; 2 available cards, 3 coming-soon cards, 1 Puzzle Deck product card
- Created `app/src/app/chess-puzzles/page.tsx` — Server Component (no `use client`): page header, Available Now grid (2-col), Coming Soon grid (3-col), Puzzle Deck product section; all CTAs disabled (demo not built, commerce Phase 8)
- Preview route created (`/cm026-preview`), build/lint/TypeScript verified, deleted
- Build, lint, TypeScript: all PASS

**Final Stabilization Pass (pre-CM028):**
- `home.ts` `TournamentCard` — removed `entryFee` and `prizePool` fields (invented pricing, banned). Replaced with single `details: string` placeholder field. Updated `UpcomingTournament.tsx` to match.
- `home.ts` `UPCOMING_TOURNAMENT_CONTENT.card` — replaced invented venue ("Bangalore International Convention Centre"), invented pricing, and invented tournament rules with placeholder copy
- `coaching/page.tsx` CTA section — removed hardcoded "FIDE-certified coaches" invented claim; moved `cta.heading` and `cta.description` to `coaching.ts` content module
- `docs/TASKS.md` — corrected CM027/CM028/CM029 file paths (`lib/corporate.ts` → `lib/content/corporate.ts` etc.); removed "B2B inquiry form (client component)" from CM027 (Contact page handles forms)
- `footer.ts` — enabled Corporate link (was `disabled: true`; page now live)
- Build, lint, TypeScript: all PASS

**CM027 — Corporate Page:**
- Created `app/src/lib/content/corporate.ts` — 5 program cards from prototype (Corporate Tournaments, Leadership Through Chess, Custom Team Building, Employee Engagement, Customised Events); CTA block linking to `/contact`
- Created `app/src/app/corporate/page.tsx` — Server Component (no `use client`): page header, 5-card program grid (3→2→1 col responsive), CTA banner linking to `/contact`; no inline form; no invented clients or metrics
- Preview route created (`/cm027-preview`), build/lint/TypeScript verified, deleted
- Build, lint, TypeScript: all PASS

### Currently Active

- Next task: **CM028 — Team page**

### Homepage Progress

**✅ COMPLETE** — All 11 sections implemented (CM013–CM023)

### Inner Pages Progress (Phase 4)

- Coaching (CM024) ✅
- Tournaments & Events (CM025) ✅
- Chess Puzzles (CM026) ✅
- Corporate (CM027) ✅
- Team (CM028) 🔲
- Contact (CM029) 🔲


---

## Session History (Compressed)

### 2026-07-10 — Homepage Sections CM013–CM023
Implemented all remaining homepage sections as Server Components (except Stats = Client for animation):
- CM013 Hero, CM014 Stats, CM015 Mission, CM016 Coaching Overview, CM017 Chess Puzzles Preview, CM018 Upcoming Tournament, CM019 Corporate Overview, CM020 Team Preview, CM021 Testimonials, CM022 FAQ, CM023 CTA
- All content centralized in `app/src/lib/home.ts` (DEC-019)
- Section pattern: content in `home.ts`, presentation in `components/sections/`, composition in `page.tsx` (DEC-020)

### 2026-07-10 — CM011–CM012 Application Shell
- CM011 Footer: 4-column, dynamic year, disabled links with `aria-disabled`, `SOCIAL_LINKS = []`
- CM012 Root layout: `<Navbar />` + `main { flex-1 }` + `<Footer />`

### 2026-07-09 — CM008–CM010 Design System & Navbar
- CM008: Heading, Text, Label, Badge primitives (mandatory for all future components)
- CM009 Logo system: `brand.ts`, `LogoMark`, `Logo` with graceful fallbacks
- CM010 Navbar: glass pill, mobile drawer, active state, `navigation.ts` single source

### 2026-07-02 — Phase 0–1 Foundation
- Docs synchronized, tokens, fonts, Tailwind, layout primitives, Button, Card

### 2026-06-27 — Prototype
- Final IA (8 nav → 7 nav), emerald `#10B981`, bg `#030303`, glass pill, visual-only chess board

---

## Open Questions

| # | Question | Raised | Status |
|---|----------|--------|---------|
| Q1 | Production domain? | 2026-07-02 | Open |
| Q2 | Real coach/team data availability? | 2026-07-02 | Open |
| Q3 | Social media channels for links? | 2026-07-02 | Open |
| Q4 | Puzzle Deck: physical product only or digital packs? | 2026-07-10 | Open — first commerce flow is physical Puzzle Deck |
| Q5 | Tournament registration: Google Forms confirmed | 2026-07-10 | ✅ Resolved — links to Google Forms |
| Q6 | Razorpay account holder details? | 2026-07-02 | Open |
| Q7 | Official logo asset: ETA from founder? | 2026-07-10 | Open — awaiting asset delivery |