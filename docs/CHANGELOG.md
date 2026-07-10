# Changelog — Castle Masters

All notable changes to this project are documented here.

Format: `[Version] — YYYY-MM-DD — Description`

---

## [0.8.7] — 2026-07-11 — CM027: Corporate Page

### Added
- `app/src/lib/content/corporate.ts` — Page content module: 5 program cards from prototype (Corporate Tournaments, Leadership Through Chess, Custom Team Building, Employee Engagement, Customised Events); CTA block linking to `/contact`
- `app/src/app/corporate/page.tsx` — Server Component (no `use client`): page header, 5-card program grid (3→2→1 col responsive), CTA banner → `/contact`; no inline form; no invented clients or metrics

### Changed
- `footer.ts` — Corporate link enabled (was `disabled: true`; page now live)
- Documentation: TASKS.md (CM027 ✅), SESSION.md (current session updated)

---

## [0.8.6] — 2026-07-11 — Final Stabilization Pass (pre-CM028)

### Fixed
- `home.ts` — `TournamentCard` type: removed `entryFee` and `prizePool` fields (invented pricing, permanently banned). Replaced with single `details: string` placeholder field
- `home.ts` — `UPCOMING_TOURNAMENT_CONTENT.card`: replaced invented venue, pricing, and tournament rules with clean placeholder copy
- `components/sections/UpcomingTournament.tsx` — updated to consume `card.details` instead of deleted `card.entryFee`/`card.prizePool` fields
- `app/coaching/page.tsx` — removed hardcoded "FIDE-certified coaches" claim (invented credentials, banned); copy now sourced from `coaching.ts` content module
- `lib/content/coaching.ts` — added `cta.heading` and `cta.description` fields (previously hardcoded in component)
- `docs/TASKS.md` — corrected CM027/CM028/CM029 planned file paths to `lib/content/` convention; removed "B2B inquiry form (client component)" from CM027

---

## [0.8.5] — 2026-07-10 — CM026: Chess Puzzles Page

### Added
- `app/src/lib/content/chess-puzzles.ts` — Page content module: `PuzzleCard`, `PuzzleDeckProduct`, `ChessPuzzlesPageCopy` interfaces; 2 available puzzle cards (Mate in 1, Mate in 4), 3 coming-soon cards (Mate in 2, Mate in 3, Tactical Training Cards), Puzzle Deck product record
- `app/src/app/chess-puzzles/page.tsx` — Server Component (no `use client`): page header, Available Now grid (2-col), Coming Soon grid (3-col, reduced opacity), Puzzle Deck product card; all CTAs disabled (`aria-disabled`): demo not yet built, commerce launches Phase 8; no pricing, no invented data

### Changed
- Documentation: TASKS.md (CM026 ✅), SESSION.md (current session updated)

---

## [0.8.4] — 2026-07-10 — CM025: Tournaments & Events Page (+ Refinements)

### Added
- `app/src/lib/content/tournaments.ts` — Page content module: `UpcomingTournamentCard`, `PastTournamentCard`, `TournamentsPageCopy` interfaces; 3 upcoming placeholder cards, 2 past placeholder cards; `registerUrl: string | null` (null = registration not yet open)
- `app/src/app/tournaments/page.tsx` — Server Component (no `use client`): page header, Upcoming section (3-col responsive grid), Past section (2-col responsive grid); disabled "Registration Opening Soon" button when `registerUrl` is null; past results shown as single placeholder string

### Architectural Decision
- `registerUrl: string | null` — null renders disabled CTA with `aria-disabled="true"`. Founder replaces null with real Google Form URL; no code change needed in component.

### Changed
- All invented tournament names removed (was: "Open Classification", "Junior Division", "Online Arena", "Spring Championship", "Summer Junior Cup" — now: generic "Upcoming/Past Tournament — Placeholder")
- Past results fields simplified (was: separate winner/runnerUp/standings fields with invented data — now: single `results` string with placeholder text)
- All `TODO (Founder)` comments added to content module for every placeholder field
- Documentation: TASKS.md (CM025 ✅), SESSION.md (current session updated)

---

## [0.8.2] — 2026-07-10 — Final Stabilization Pass

### Fixed
- `coaching/page.tsx` — Root element changed from `<main>` to fragment; `layout.tsx` already wraps children in `<main>`, causing nested `<main>` (HTML validity + accessibility violation)
- `docs/DECISIONS.md` — DEC-012 updated to reflect final founder decision: Upcoming + Past tabs only (previous entry incorrectly listed School Events and Special Events)
- `docs/DECISIONS.md` — DEC-021 formally added: `lib/content/` page content convention
- 8 component JSDoc blocks — removed stale references to deleted preview routes (`cm011`, `cm016`, `cm017`, `cm019`, `cm020`, `cm021`, `cm022`, `cm023-preview`)

---

## [0.8.1] — 2026-07-10 — CM024: Coaching Page

### Added
- `app/src/lib/content/coaching.ts` — Page content module (first under new `lib/content/` convention): all 10 program cards, roadmap steps, study plan rows, CTA copy
- `app/src/app/coaching/page.tsx` — Server Component: header, 5 online + 5 offline program cards, 6-step progress roadmap, weekly study plan table, dual CTA

### Changed
- Documentation: TASKS.md (CM024 ✅), SESSION.md (current session updated)

---

## [0.8.0] — 2026-07-10 — Repository Cleanup

### Fixed
- `home.ts` — `PUZZLES_CONTENT.viewAllLabel`: `'View All Games →'` → `'View All Chess Puzzles →'` (banned terminology)
- `home.ts` — `PUZZLES_CONTENT.titleLines[1]`: `'Training Games'` → `'Training Puzzles'` (banned terminology)
- `home.ts` — Removed dead export `SECTION_LABELS` (unused; never imported)
- `home.ts` — Tournament placeholder date updated from `'March 15–17, 2026'` (past) to `'November 22–24, 2026'`
- `Hero.tsx` — Removed `<style jsx global>` blocks; keyframes moved to `globals.css`
- `globals.css` — Normalized spacing-1 through spacing-7 from `px` to `rem` (behavior-identical; consistency fix)
- `globals.css` — Added `boardFloat`, `pieceFloat`, `floatOrb` keyframes (moved from Hero.tsx)
- `globals.css` — `--spacing-120`: `120px` → `7.5rem` (rem normalization)
- `next.config.ts` — Added `turbopack.root` to silence multiple-lockfile workspace warning

### Architectural Decision
- **DEC-021** — Page content convention: all page-scoped content modules live under `app/src/lib/content/`. Existing modules (`home.ts`, `brand.ts`, `navigation.ts`, `footer.ts`) remain at `app/src/lib/` root.

---

## [0.7.0] — 2026-07-10 — Roadmap Update: Founder Decisions

### Changed (Documentation Only — No Production Code Modified)

Six founder decisions applied and propagated across all planning documents:

1. **Official logo** — Pending asset delivery from founder. No code changes. `Logo` and `LogoMark` components already have fallback handling. Tracked as CM072 (blocked until asset delivered).
2. **Merchandise removed as standalone feature** — Commerce is not a nav page. First production commerce flow is the **Chess Puzzle Deck** product sold from the Chess Puzzles page. All "Merchandise" standalone references removed from docs.
3. **"Games" → "Chess Puzzles"** — Permanent rename. Confirmed throughout all documentation. Never use "Games".
4. **Chess Puzzles: dual responsibility** — (A) Interactive Puzzle Demo (free, no login) + (B) Puzzle Deck Product (Add to Cart → Checkout → Razorpay). First commerce flow.
5. **Tournament tabs simplified** — Two tabs only: Upcoming + Past. School Events, Special Events, Leaderboard, and Registrations portal tabs removed permanently.
6. **Development priority order clarified** — Website → Backend → Database → Auth → API → Cart → Checkout → Payment → Deployment. Payment is not an isolated early milestone.

### CM Roadmap Regenerated (CM024–CM073)

| Phase | Tasks | Description |
|---|---|---|
| Phase 4 | CM024–CM030 | Inner pages (Coaching, Tournaments, Chess Puzzles, Corporate, Team, Contact) |
| Phase 5 | CM031–CM035 | Backend API routes (static mock data) |
| Phase 6 | CM036–CM041 | Database (Supabase schema + wire-up) |
| Phase 7 | CM042–CM045 | Authentication (Supabase Auth) |
| Phase 8 | CM046–CM052 | Cart & Checkout |
| Phase 9 | CM053–CM058 | Razorpay integration |
| Phase 10 | CM059–CM061 | Admin Dashboard |
| Phase 11 | CM062–CM066 | Production Deployment |
| Phase 12 | CM067–CM073 | Quality Assurance + Founder Sign-off |

### Files Modified
- `docs/FOUNDER_REQUIREMENTS.md` — Full rewrite with all 6 founder decisions
- `docs/TASKS.md` — CM001–CM023 preserved; CM024–CM073 regenerated
- `docs/MASTER_PROMPT.md` — Updated phase order, feature scope, and rules
- `docs/PRODUCT.md` — Updated chess puzzles dual responsibility, tournament tabs, commerce flow
- `docs/ARCHITECTURE.md` — Updated API routes, phase numbers, commerce flow
- `docs/README.md` — Updated current phase to Phase 4
- `docs/SESSION.md` — Updated current session, open questions

### Files NOT Modified
All production code — no components, pages, styles, or `app/` files changed.

---

## [0.6.3] — 2026-07-10 — CM023: Homepage CTA Section

### Added
- `HomeCTA.tsx` — Homepage final CTA section (Server Component): gradient banner, two CTAs ("Book Free Trial", "Inquire with Us"), content from `CTA_CONTENT` in `home.ts`

### Changed
- `page.tsx` — Added `<HomeCTA />` as final section after `<FAQ />`
- `home.ts` — Added `CtaCopy` interface and `CTA_CONTENT`
- Documentation updates (TASKS, SESSION)

---

## [0.6.2] — 2026-07-10 — CM022: FAQ Section

### Added
- `FAQ.tsx` — Homepage FAQ section (Server Component): native `<details>`/`<summary>` accordion, 4 items matching prototype, zero client JS

### Changed
- `page.tsx` — Added `<FAQ />` after `<Testimonials />`
- `home.ts` — Added `FaqItem`, `FaqCopy` interfaces and `FAQ_CONTENT`

---

## [0.6.1] — 2026-07-10 — CM021: Testimonials Section

### Added
- `Testimonials.tsx` — Homepage testimonials section (Server Component): 3 placeholder cards, star ratings, semantic `<blockquote>`, responsive grid (3/2/1)

### Changed
- `page.tsx` — Added `<Testimonials />` after `<TeamPreview />`
- `home.ts` — Added `TestimonialCard`, `TestimonialsCopy` interfaces and `TESTIMONIALS_CONTENT`

---

## [0.6.0] — 2026-07-10 — CM020: Team Preview Section

### Added
- `TeamPreview.tsx` — Homepage team preview (Server Component): single panel, "Meet Team →" CTA, no invented team members

### Changed
- `page.tsx` — Added `<TeamPreview />` after `<CorporateOverview />`
- `home.ts` — Added `TeamPreviewCopy` interface and `TEAM_PREVIEW_CONTENT`

---

## [0.5.9] — 2026-07-10 — CM019: Corporate Overview Section

### Added
- `CorporateOverview.tsx` — Homepage corporate programs preview (Server Component): 2 cards (Strategic Workshops, Employee Engagement), "Explore Corporate →" CTA

### Changed
- `page.tsx` — Added `<CorporateOverview />` after `<UpcomingTournament />`
- `home.ts` — Added `CorporateCard`, `CorporateOverviewCopy` interfaces and `CORPORATE_CONTENT`

---

## [0.5.8] — 2026-07-10 — CM018: Upcoming Tournament Section

### Added
- `UpcomingTournament.tsx` — Homepage featured tournament card (Server Component): date, venue, entry fee, prize pool, description, "Register Now" CTA

### Changed
- `page.tsx` — Added `<UpcomingTournament />` after `<ChessPuzzlesPreview />`
- `home.ts` — Added `TournamentCard`, `UpcomingTournamentCopy` interfaces and `UPCOMING_TOURNAMENT_CONTENT`

---

## [0.5.7] — 2026-07-10 — CM017: Chess Puzzles Preview Section

### Added
- `ChessPuzzlesPreview.tsx` — Homepage puzzles preview (Server Component): 4 cards (2 Available Now, 2 Coming Soon), "View All Games →" link, disabled CTAs for coming soon

### Changed
- `page.tsx` — Added `<ChessPuzzlesPreview />` after `<CoachingOverview />`
- `home.ts` — Added `PuzzleCard`, `PuzzlesPreviewCopy` interfaces and `PUZZLES_CONTENT`

---

## [0.5.6] — 2026-07-10 — CM016: Coaching Overview Section

### Added
- `CoachingOverview.tsx` — Homepage coaching programs (Server Component): 4 cards (Beginner, Intermediate, Advanced, School Programs), "Learn more" links

### Changed
- `page.tsx` — Added `<CoachingOverview />` after `<Mission />`
- `home.ts` — Added `CoachingCard`, `CoachingOverviewCopy` interfaces and `COACHING_CONTENT`

---

## [0.5.5] — 2026-07-10 — CM015: Mission Section

### Added
- `Mission.tsx` — Homepage mission statement (Server Component): radial gradient box, quote, description from `MISSION_CONTENT`

### Architectural Decision
- **DEC-019** — Homepage Content Centralization: all homepage copy in `app/src/lib/home.ts`

### Changed
- `page.tsx` — Added `<Mission />` after `<Stats />`
- `home.ts` — Added `MissionCopy` interface and `MISSION_CONTENT`
- Documentation sync across 6 files (SESSION, TASKS, MASTER_PROMPT, README, ARCHITECTURE, DECISIONS)

---

## [0.5.4] — 2026-07-10 — CM014: Stats Section

### Added
- `Stats.tsx` — Homepage animated counters (Client Component): 4 stats, `IntersectionObserver` viewport animation, `prefers-reduced-motion` support

### Changed
- `Hero.tsx` — Removed inline counters; Hero now owns only hero content
- `page.tsx` — Added `<Stats />` after `<Hero />`
- `home.ts` — Added `STATS_CONTENT` (single source for stats)

---

## [0.5.3] — 2026-07-10 — CM013: Hero Section

### Added
- `Hero.tsx` — Homepage hero (Client Component): badge, gradient heading, chess board visual, ambient orbs, CTAs

### Changed
- `page.tsx` — Replaced placeholder with `<Hero />`

---

## [0.5.2] — 2026-07-10 — CM012: Application Shell Integration

### Added
- `layout.tsx` — Root layout with `<Navbar />` (fixed top) and `<Footer />` (bottom), `main { flex-1 }` pushes footer

### Architectural Decisions
- Navbar = Client Component (hydrates at boundary)
- Footer = Server Component (static)
- No new primitives, no business logic

---

## [0.5.1] — 2026-07-10 — CM011: Footer Component

### Added
- `footer.ts` — Footer data: 4 columns, legal, dynamic year, `SOCIAL_LINKS = []`
- `Footer.tsx` — Server Component: `Container`, `Grid`, `Stack`, `Logo`, `Text`, `Label`, disabled links with `aria-disabled`

### Architectural Decisions
- `footer.ts` owns footer data; `brand.ts` owns brand identity; `navigation.ts` owns nav — three separate files
- `SOCIAL_LINKS = []` future-proof export, not rendered until populated

---

## [0.5.0] — 2026-07-09 — CM010: Navbar Component

### Added
- `navigation.ts` — Single source: `NAV_ITEMS` (7 links), `NAV_CTA`
- `NavLink.tsx` — Primitive with active state (emerald + dot), disabled rendering
- `MobileMenu.tsx` — Full-screen drawer, slide animation, scroll lock, Escape key, reduced-motion
- `Navbar.tsx` — Glass pill, composes `Logo`, `NavLink`, `Button`, `MobileMenu`

### Architectural Decisions
- `navigation.ts` mandatory for all nav consumers
- `NAV_CTA` separate export (Navbar needs `<Button>`, MobileMenu needs styled `<Link>`)

---

## [0.4.9] — 2026-07-09 — CM009: Logo System

### Added
- `brand.ts` — Single source: `BRAND.name`, `BRAND.tagline`, `BRAND.assets.logo/mark`
- `LogoMark.tsx` — Mark primitive, sizes sm/md/lg, graceful fallback
- `Logo.tsx` — Full lockup primitive, sizes sm/md/lg, graceful fallback

### Architectural Decisions
- `LogoWordmark` deferred until asset provided
- `brand.ts` mandatory for all brand strings/paths
- `LogoSize` type single-sourced in `LogoMark.tsx`

---

## [0.4.8] — 2026-07-09 — CM008: Typography System

### Added
- `Heading.tsx` — Sizes: hero/display/title/section/sub; `as` prop (h1–h6); `gradient` prop
- `Text.tsx` — Sizes: xs/sm/base/lg/xl; Colors: default/muted; `as` prop (p/span/div/li)
- `Label.tsx` — Colors: default(cyan)/cyan/emerald/muted; `as` prop (p/span/div)
- `Badge.tsx` — Variants: default/emerald/cyan/outline; `pulse` prop

### Architectural Decisions
- Heading/Text/Label/Badge are mandatory primitives — all future components must consume them
- `Label` color not hardcoded — supports cyan/emerald/muted
- `Badge` variants cover all prototype use cases
- `Heading.gradient` replaces separate `GradientText` component
- Verified via `cm008-preview` route (deleted after)

---

## [0.4.7] — 2026-07-02 — CM007: Card Component

### Added
- `Card.tsx` — Glass/elevated variants; padding none/sm/md/lg; hoverable visual effects; no click behavior

---

## [0.4.6] — 2026-07-02 — CM006: Button Component

### Added
- `Button.tsx` — Variants: primary/secondary/outline/ghost; Sizes: sm/md/lg; States: loading/disabled/focus; CSS-only spinner

---

## [0.4.5] — 2026-07-02 — CM005: Layout Primitives

### Added
- `Container.tsx` — Semantic widths: default/narrow/wide/full
- `Section.tsx` — Vertical spacing: default/compact/large
- `Stack.tsx` — Vertical layout: none/sm/md/lg/xl
- `Grid.tsx` — Responsive columns: 1–4/12; gaps: none/sm/md/lg/xl
- `Spacer.tsx` — Micro-adjustments

---

## [0.4.4] — 2026-07-02 — CM004: Tailwind + Design Tokens

### Changed
- `globals.css` — `@theme` block exposing CSS variables as Tailwind utilities

---

## [0.4.3] — 2026-07-02 — CM003: Global Design Tokens

### Added
- `globals.css` — All semantic CSS variables: colors, typography, spacing, borders, elevation, motion, z-index

---

## [0.4.2] — 2026-07-02 — CM002: Google Fonts

### Changed
- `layout.tsx` — Space Grotesk + Inter via `next/font/google`; `--font-heading`, `--font-sans` on `<html>`

---

## [0.4.1] — 2026-07-02 — CM001: Minimal Production Placeholder

### Changed
- `layout.tsx` — Metadata: "Castle Masters" / "Building stronger positions."
- `page.tsx` — Removed Next.js boilerplate; centered placeholder message

---

## [0.4.0] — 2026-07-02 — Documentation Synchronization

### Changed
- All docs updated: Next.js 16, Tailwind active, corrected IA (7 nav pages), added Supabase/Razorpay, module-first architecture
- Removed "Next.js 14", "Tailwind excluded", "no backend" references

---

## [0.3.0] — 2026-07-02 — Phase 0: Documentation & Planning

### Added
- Full repo structure: `prototype/`, `app/`, `docs/`, `assets/`
- All 10 doc files: README, ARCHITECTURE, PRODUCT, TECH_STACK, TASKS, SESSION, DECISIONS, CHANGELOG, MASTER_PROMPT, FOUNDER_REQUIREMENTS
- Prototype moved to `prototype/` and frozen

---

## [0.2.0] — 2026-06-27 — Prototype: Final Architecture Pass

### Changed
- IA consolidated to 8 tabs
- Background `#030303`, accent `#10B981`
- Navigation: floating glass pill
- Animations: GPU-only (`transform`, `opacity`)
- Added: Games page, Merchandise page, Team page, Contact page, FAQ, Mission, Hero 3D board, scroll reveal, animated counters, glass spotlight, 3D tilt

### Removed
- About, Academy, Programs, Pricing, Locations, Success Stories pages

---

## [0.1.0] — 2026-06-27 — Prototype: Initial Build

### Added
- Initial HTML prototype: Chess Masters (pre-rebrand)
- Pages: Home, About, Coaches, Programs, Academy, Tournaments, Locations, Success Stories, Pricing, Contact
- Dark theme `#0B1020`, accent `#4ADE80`
- Space Grotesk + Inter
- Interactive chess board (CSS Grid)
- Basic SPA nav, responsive mobile

### Notes
- Pre-rebrand: "Chess Masters"
- Contained invented data (later removed per founder requirement)