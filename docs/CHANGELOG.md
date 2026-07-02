# Changelog — Castle Masters

All notable changes to this project are documented here.

Format: `[Version] — YYYY-MM-DD — Description`

---

## [0.4.7] — 2026-07-02 — CM007: Build Reusable Card Component

### Added
- `app/src/components/ui/Card.tsx` — Production-ready Card visual container component with glassmorphic styling.
  - **Variants**: `glass`, `elevated`
  - **Padding options**: `none`, `sm`, `md`, `lg`
  - **Hoverable mode**: Optional visual hover effects (lift, border glow, shadow)
  - Implements `React.forwardRef<HTMLDivElement>` for ref forwarding
  - Set `Card.displayName = "Card"` for debugging clarity
  - Pure CSS hover effects (no JavaScript mouse handlers)
  - Full TypeScript support with exported `CardProps` interface
  - Uses semantic design tokens from CM003/CM004
  - Serves as primitive visual container for composition

### Architectural Decisions
- Removed redundant "default" variant (no duplicate APIs until visual differences exist)
- Deferred spotlight mouse-tracking effect to future composable wrapper
- Deferred CardHeader, CardFooter, CardMedia, CardActions to future tasks
- Card is a semantic `<div>` — consumers add interactivity when needed
- `hoverable` prop controls visual styling only, not click behavior

### Changed
- `docs/TASKS.md` — Marked CM007 as complete.
- `docs/SESSION.md` — Updated current phase to CM007 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.4.6] — 2026-07-02 — CM006: Build Reusable Button Component

### Added
- `app/src/components/ui/Button.tsx` — Production-ready Button component with comprehensive variant, size, and state support.
  - **Variants**: `primary`, `secondary`, `outline`, `ghost`
  - **Sizes**: `sm`, `md`, `lg`
  - **States**: `default`, `hover`, `focus`, `disabled`, `loading`
  - Inline loading spinner (CSS-only, no external dependencies)
  - Full TypeScript support with exported `ButtonProps` interface
  - Accessibility: keyboard focus, disabled state, aria-busy for loading
  - Uses semantic design tokens from CM003/CM004 (no hardcoded colors)

### Changed
- `docs/TASKS.md` — Marked CM006 as complete.
- `docs/SESSION.md` — Updated current phase to CM006 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.4.5] — 2026-07-02 — CM005: Create Layout Primitives

### Added
- `app/src/components/layout/Container.tsx` — Added semantic width constraints (`default`, `narrow`, `wide`, `full`).
- `app/src/components/layout/Section.tsx` — Added semantic vertical spacing (`default`, `compact`, `large`).
- `app/src/components/layout/Stack.tsx` — Added vertical layout helper with strict semantic spacing props.
- `app/src/components/layout/Grid.tsx` — Added responsive grid layout helper with constrained columns and gap props.
- `app/src/components/layout/Spacer.tsx` — Added micro-adjustment spacer.

### Changed
- `docs/TASKS.md` — Marked CM005 as complete and updated description to match the layout primitives scope.

### Status
- Build successfully verified and TypeScript strict mode passed perfectly.

---

## [0.4.4] — 2026-07-02 — CM004: Configure Application Theme

### Changed
- `app/src/app/globals.css` — Configured Tailwind v4 `@theme` block to expose existing `:root` variables as semantic utility classes (e.g., `text-emerald`, `bg-bg-card`, `radius-md`).
- `docs/TASKS.md` — Marked CM004 as complete.

### Status
- Verified semantic class generation and confirmed clean placeholder UI load.

---

## [0.4.3] — 2026-07-02 — CM003: Global Design Tokens

### Added
- `app/src/app/globals.css` — Extracted and centralized all semantic CSS custom properties from the prototype (Colors, Typography, Spacing, Borders, Elevation, Motion, Z-Index) directly into `:root`.

### Changed
- `docs/TASKS.md` — Marked CM003 as complete and updated description to match the refined scope (Global Design Tokens).

### Status
- Build successfully verified.

---

## [0.4.2] — 2026-07-02 — CM002: Configure Google Fonts

### Changed
- `app/layout.tsx` — Replaced default Geist fonts with `Space_Grotesk` and `Inter` via `next/font/google`.
- `app/layout.tsx` — Added semantic CSS variables `--font-heading` and `--font-sans` to the root `<html>` tag.
- `docs/TASKS.md` — Marked CM002 as complete.

### Status
- Build successfully verified.

---

## [0.4.1] — 2026-07-02 — CM001: Minimal Production Placeholder

### Changed
- `app/layout.tsx` — Updated metadata to "Castle Masters" and "Building stronger positions."
- `app/page.tsx` — Removed Next.js default boilerplate and added a centered, minimal placeholder message.
- `docs/TASKS.md` — Marked CM001 as complete and updated its description.

### Status
- Build successfully verified.

---

## [0.4.0] — 2026-07-02 — Documentation Synchronization

### Changed
- `docs/README.md` — Updated repo structure (Next.js 16), added setup instructions, dev workflow, Git workflow, deployment target
- `docs/TECH_STACK.md` — Full rewrite: Next.js 16, Tailwind CSS retained, Turbopack, planned Supabase/Razorpay stack, removed incorrect "Tailwind excluded" statement
- `docs/ARCHITECTURE.md` — Full rewrite: module-first full-stack architecture, API routes, Supabase schema, cart flow, updated page routes (Chess Puzzles, no Merchandise nav)
- `docs/TASKS.md` — Complete rewrite: MVP implementation roadmap (CM001–CM069, Phases 1–12) replacing prototype-migration task list; added Expected Files, Dependencies, Definition of Done columns
- `docs/FOUNDER_REQUIREMENTS.md` — Updated: "Games" → "Chess Puzzles", Merchandise removed from nav, tournament tabs simplified, backend/Supabase/Razorpay requirements added, Next.js 16 / Tailwind references updated
- `docs/MASTER_PROMPT.md` — Added agent behavior rules (scope control, explain-first, doc-update after task), updated tech stack, updated IA, added cart flow
- `docs/SESSION.md` — Reflects current state: documentation synchronized; next milestone CM001
- `docs/DECISIONS.md` — Corrected DEC-007 (Next.js 16), replaced DEC-008 (Tailwind retained), revised DEC-009 (7 nav pages), added DEC-011–DEC-018

### Fixed
- Removed all "Next.js 14" references throughout documentation (updated to Next.js 16)
- Removed "Tailwind CSS excluded" from TECH_STACK.md — Tailwind is installed and active
- Removed outdated "Next.js not yet initialized" status — project is initialized
- Removed incorrect "no backend" statements — backend is planned (Phase 8)
- Corrected roadmap from prototype-migration focus to MVP feature implementation

### Status
- Documentation synchronized ✅
- Ready to begin CM001 — Branding

---

## [0.3.0] — 2026-07-02 — Phase 0: Documentation & Planning

### Added
- Created full repository folder structure (`prototype/`, `app/`, `docs/`, `assets/`)
- `docs/README.md` — Project overview and repository guide
- `docs/ARCHITECTURE.md` — Technical system design and component map
- `docs/PRODUCT.md` — Product requirements and feature specifications
- `docs/TECH_STACK.md` — Technology decisions and rationale
- `docs/TASKS.md` — Full implementation roadmap (CM001–CM099)
- `docs/SESSION.md` — Session log and active context
- `docs/DECISIONS.md` — Architecture and product decision log
- `docs/CHANGELOG.md` — This file
- `docs/MASTER_PROMPT.md` — Canonical AI agent context prompt
- `docs/FOUNDER_REQUIREMENTS.md` — Approved founder requirements
- `prototype/index.html` — Prototype moved to dedicated directory and frozen

---

## [0.2.0] — 2026-06-27 — Prototype: Final Architecture Pass

### Changed
- Complete prototype rewrite aligned with founder-approved information architecture
- Navigation expanded to 8 tabs: Home, Coaching, Tournaments & Events, Games, Merchandise, Corporate, Team, Contact
- Background color updated from `#0B1020` to `#030303`
- Primary accent updated from `#4ADE80` to `#10B981` (Emerald)
- Navigation redesigned from flat bar to floating glassmorphic pill
- All animations converted to GPU-friendly `transform` and `opacity` properties

### Added
- Games page with Mate in 1, Mate in 4 (Available Now) and 3 Coming Soon cards
- Merchandise page with 5 Coming Soon product cards
- Team page with 5 categorized sections (Founders, Coaches, Trainers, Advisors, Operations)
- Contact page with merged Locations section (4 regional hubs + Online)
- FAQ accordion section on Home page
- Mission statement section on Home page
- Corporate B2B inquiry form
- Scroll reveal animations via IntersectionObserver
- Animated statistics counters
- Glass card spotlight hover effect (mouse-tracking CSS variable)
- Hero chess board 3D tilt effect

### Removed
- About page (content merged into Home)
- Academy page (content merged into Coaching)
- Programs page (content merged into Coaching)
- Pricing page (pricing removed entirely per founder decision)
- Locations page (content merged into Contact)
- Success Stories page (testimonials merged into Home)

---

## [0.1.0] — 2026-06-27 — Prototype: Initial Build

### Added
- Initial HTML prototype: Chess Masters (pre-rebranding)
- Pages: Home, About, Coaches, Programs, Academy, Tournaments, Locations, Success Stories, Pricing, Contact
- Dark theme with navy background (`#0B1020`)
- Space Grotesk + Inter typography
- Interactive chess board (CSS Grid)
- Basic SPA navigation via JavaScript
- Responsive mobile layout

### Notes
- Pre-rebranding: "Chess Masters"
- Contained invented data (coaches, ratings, testimonials) — later removed per founder requirement
