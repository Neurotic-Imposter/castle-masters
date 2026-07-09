# Changelog — Castle Masters

All notable changes to this project are documented here.

Format: `[Version] — YYYY-MM-DD — Description`

---

## [0.5.4] — 2026-07-10 — CM014: Stats Section

### Added
- `app/src/components/sections/Stats.tsx` — Homepage statistics section matching the approved prototype:
  - **Layout**: `Container`, `Grid`, `Stack`
  - **Typography**: `Heading`, `Text`
  - **UI**: `Card`
  - **Stats**: 15 Tournaments Hosted, 25 Expert Coaches, 200 Active Students, 12 School Partners
  - **Animation**: Counters animate on viewport entry with `IntersectionObserver`
  - **Accessibility**: `prefers-reduced-motion` renders final values immediately
  - **Responsive**: 4 columns desktop, 2 columns tablet, 1 column mobile
- `app/src/app/cm014-preview/` — Temporary preview route for verification (deleted after verification)

### Changed
- `app/src/components/sections/Hero.tsx` — Removed inline stats row so Hero owns only the hero prototype section.
- `app/src/app/page.tsx` — Integrated `<Stats />` immediately after `<Hero />`.
- `docs/TASKS.md` — Marked CM014 complete and added CM015 Mission section.
- `docs/SESSION.md` — Updated current phase to CM014 completion.

### Verification
| # | Criterion | Result |
|---|-----------|--------|
| 1 | Preview route created | ✅ |
| 2 | Prototype CSS and markup compared | ✅ |
| 3 | `npm run build` passes | ✅ |
| 4 | `npm run lint` passes | ✅ |
| 5 | `npm run dev` starts and homepage returns 200 | ✅ |
| 6 | Preview route deleted before final integration | ✅ |
| 7 | Stats integrated after Hero on homepage | ✅ |

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` running at `http://localhost:3000` ✅
- Browser screenshot verification unavailable: in-app browser backend not available in this session.

---

## [0.5.3] — 2026-07-10 — CM013: Hero Section

### Added
- `app/src/components/sections/Hero.tsx` — Homepage hero section composed entirely from existing primitives:
  - **Layout**: `Container` (size="wide"), `Grid` (columns={2}, gap="xl"), `Stack` (spacing="md")
  - **Typography**: `Heading` (size="hero", as="h1", gradient accents), `Text` (size="xl", color="muted"), `Badge` (variant="emerald", pulse=true)
  - **UI**: CTA buttons via styled `Link` components (primary gradient + ghost variant)
  - **Visual**: Chess board placeholder (8×8 CSS Grid, 380px, 3D transform `rotateX(15deg) rotateY(-15deg)`, floating pieces ♞/♛/♜ with CSS animation)
  - **Stats row**: 4 stat items with animated counters (15 Tournaments, 25 Coaches, 200 Students, 12 Schools) — uses `Heading` for numbers, `Text` for labels
  - **Ambient orbs**: 3 glowing orbs (emerald, cyan, violet) matching prototype exactly
  - **Responsive**: Stacked mobile (<768px), side-by-side desktop (≥768px)
  - **Accessibility**: Respects `prefers-reduced-motion` — disables all CSS animations and counter animation
- `app/src/app/cm013-preview/` — Temporary preview route for verification (deleted after verification)

### Changed
- `app/src/app/page.tsx` — Replaced placeholder content with `<Hero />` component
- `docs/TASKS.md` — Marked CM013 complete; added CM014 (Responsive nav audit)
- `docs/SESSION.md` — Updated current phase to CM013 completion

### Verification
| # | Criterion | Result |
|---|-----------|--------|
| 1 | Hero renders without errors | ✅ |
| 2 | Brand name + tagline from `brand.ts` | ✅ |
| 3 | Description copy renders | ✅ |
| 4 | CTA buttons: "Book Free Trial" (primary), "Explore Coaching →" (ghost) | ✅ |
| 5 | Chess board placeholder (8×8, 3D, floating pieces) | ✅ |
| 6 | Stats row: 4 items with numbers + labels | ✅ |
| 7 | Animated counters work (CSS-only, respects reduced motion) | ✅ |
| 8 | Responsive: stacked <768px, side-by-side ≥768px | ✅ |
| 9 | `prefers-reduced-motion` respected | ✅ |
| 10 | Uses only primitives: Container, Grid, Stack, Heading, Text, Button, Badge | ✅ |
| 11 | No bespoke CSS layout (Tailwind via primitives only) | ✅ |
| 12 | `npm run build` passes | ✅ |
| 13 | `npm run lint` passes | ✅ |
| 14 | `npm run dev` starts without errors | ✅ |

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.5.2] — 2026-07-10 — CM012: Application Shell Integration

### Added
- `app/src/app/layout.tsx` — Root layout now integrates Navbar and Footer.
  - Imported `Navbar` (Client Component, `"use client"`) and `Footer` (Server Component)
  - `<Navbar />` rendered at top (fixed position via its own CSS)
  - `<main className="flex-1">` wraps `children` — pushes Footer to bottom when content is short
  - `<Footer />` rendered at bottom (normal flow)
  - Layout remains server-rendered where possible; Navbar hydrates at its boundary
  - No new primitives, no custom CSS, no business logic, no authentication

### Architectural Decisions
- Navbar is a Client Component (requires `usePathname`, `useState`, `useEffect` for mobile menu). It hydrates at the layout boundary — no additional client boundary needed in layout.
- Footer is a Server Component — no hydration cost, fully static render.
- `main { flex-1 }` ensures footer stays at viewport bottom on short pages without sticky positioning.
- Preview route `cm012-preview/` created, verified (all 14 criteria), deleted. Production `page.tsx` and `layout.tsx` never modified beyond the necessary imports.
- Responsive shell verified at 375px, 768px, 1280px — no horizontal overflow, Navbar pill and Footer grid adapt correctly.
- Mobile menu: hamburger opens full-screen drawer, closes on link click, closes on Escape, active link highlighted with emerald + dot.

### Changed
- `docs/TASKS.md` — Marked CM012 complete.
- `docs/SESSION.md` — Updated current phase to CM012 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.5.1] — 2026-07-10 — CM011: Footer

### Added
- `app/src/lib/footer.ts` — Single source of truth for all footer data.
  - `FooterLink` interface: `label`, `href`, `disabled?` (future-proofed API)
  - `FooterColumn` interface: `label`, `links: readonly FooterLink[]`
  - `FooterMeta` interface: `description`, `copyright` (template with `{year}` placeholder), `legalTagline`
  - `SocialLink` interface: `platform`, `href`, `label` (future-proofed)
  - `FOOTER_COLUMNS` — 4 columns: Product, Company, Resources, Community (16 links total, 10 disabled as placeholders)
  - `FOOTER` — Brand description, copyright template `© {year} Castle Masters. All rights reserved.`, legal tagline "Building stronger positions."
  - `SOCIAL_LINKS` — Empty readonly array `[]` exported for future rendering; consumers must not render until populated
  - Navbar, Footer, Sitemap, Legal pages must all import from here. No footer strings duplicated anywhere.

- `app/src/components/layout/Footer.tsx` — Presentational footer component (Server Component).
  - Composes `Container`, `Grid`, `Stack`, `Logo`, `Text`, `Label` primitives — no bespoke CSS layout
  - Brand column: `Logo size="lg"` wrapped in `<Link href="/">`, description from `FOOTER.description` via `Text size="base" color="muted"`
  - Navigation columns: 4-column responsive grid (`Grid columns={4} gap="lg"`) mapping `FOOTER_COLUMNS`, column headings via `Label color="cyan"`, links via `FooterLink` subcomponent
  - Disabled link rendering: `aria-disabled="true"`, `tabIndex={-1}`, `pointer-events-none`, `opacity-40`, `cursor-default` — visually distinct, no keyboard focus, non-clickable
  - Bottom bar: Copyright with dynamic year `new Date().getFullYear()` replacing `{year}` template, legal tagline from `FOOTER.legalTagline`, social links placeholder (guarded by `SOCIAL_LINKS.length > 0`)
  - `role="contentinfo"`, semantic `<footer>` element
  - ~135 lines — intentionally small, presentational only

- Temporary preview route `app/src/app/cm011-preview/` — Created for verification, deleted after `npm run build` ✅ and `npm run lint` ✅ passed. Production `page.tsx` and `layout.tsx` never modified.

### Architectural Decisions
- `footer.ts` owns footer content exclusively. `brand.ts` remains brand identity only (name, tagline, assets). `navigation.ts` owns primary navigation only. Three separate concerns, three separate files.
- `Footer` is a Server Component — no `"use client"`, no client state, no interactivity. Presentational only.
- Disabled links are not just visually muted — they are semantically and functionally disabled: `aria-disabled`, removed from tab order, pointer events blocked, clicks prevented. Consumers immediately recognize unavailability.
- `SOCIAL_LINKS = []` is a deliberate future-proofing export. The API exists; rendering is gated by length check. No dead code, no premature commits.
- Copyright year is dynamic at render time — no hardcoded year to maintain.
- Preview route pattern strictly enforced: create → verify (`build`, `lint`, `dev`) → delete. Production pages immutable during component development.

### Changed
- `docs/TASKS.md` — Footer task (CM007 in project task schema) marked complete.
- `docs/SESSION.md` — Updated current phase to CM011 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.5.0] — 2026-07-09 — CM010: Navbar

### Added
- `app/src/lib/navigation.ts` — Single source of truth for all navigation data.
  - `NavItem` interface: `label`, `href`, `disabled?` (future-proofed API)
  - `NAV_ITEMS` — 7 approved nav links matching `FOUNDER_REQUIREMENTS.md`
  - `NAV_CTA` — "Book Free Trial" CTA, independently exportable
  - Navbar, Footer, MobileMenu, Sitemap, and Breadcrumbs must all import from here

- `app/src/components/layout/NavLink.tsx` — Single nav link primitive.
  - Active state via `aria-current="page"` and emerald text
  - Active underline dot (`::after` pattern from prototype) via absolute-positioned span
  - Disabled state renders `<span aria-disabled="true">` instead of `<Link>`
  - Caller controls visual sizing via `className` — no desktop/mobile coupling

- `app/src/components/layout/MobileMenu.tsx` — Full-screen mobile overlay.
  - Slide animation: `translateY(-100%)` → `translateY(0)` matching prototype
  - `motion-safe:` / `motion-reduce:` Tailwind variants — respects `prefers-reduced-motion`
  - Body scroll lock via `document.body.style.overflow` — restored on close and unmount
  - Escape key closes the menu via `keydown` event listener (cleaned up on unmount)
  - `role="dialog"`, `aria-modal`, `aria-hidden`, `aria-label` for full screen reader support
  - Composes `NavLink` for nav items, plain `<Link>` for CTA

- `app/src/components/layout/Navbar.tsx` — Orchestrator component.
  - Floating glassmorphic pill shell matching prototype exactly
  - Composes `Logo`, `NavLink`, `Button`, `MobileMenu` — no raw markup
  - `usePathname()` drives active link detection
  - Mobile menu auto-closes on pathname change via `useEffect`
  - Animated hamburger → X icon on open (CSS transform only, GPU-safe)
  - Desktop: links and CTA visible; hidden at `md` breakpoint and below
  - Mobile: hamburger visible; links/CTA hidden
  - `forwardRef`, `displayName`, exported `NavbarProps`
  - ~160 lines — clean and focused

### Architectural Decisions
- `navigation.ts` is the mandatory single source for all nav data. No nav strings exist anywhere else.
- `NAV_CTA` is a named separate export — Navbar needs it as a `<Button>`, MobileMenu needs it as a styled `<Link>`. Different consumers, same source.
- `NavLink` and `MobileMenu` are independent files — Navbar stays small; MobileMenu can evolve independently without rewriting Navbar.
- Navbar does not integrate into `layout.tsx` yet — that is CM012 (layout integration task).

### Changed
- `docs/TASKS.md` — Marked CM010 as complete.
- `docs/SESSION.md` — Updated current phase to CM010 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: already running on port 3000 ✅

---

## [0.4.9] — 2026-07-09 — CM009: Logo System

### Added
- `app/src/lib/brand.ts` — Single source of truth for all brand identity constants.
  - `BRAND.name` — "Castle Masters"
  - `BRAND.tagline` — "Building stronger positions."
  - `BRAND.assets.logo` — path to full logo lockup asset
  - `BRAND.assets.mark` — path to logo mark asset
  - All components, metadata, Navbar, Footer, Hero, Auth, Dashboard must import from this file. No literals ever duplicated.

- `app/src/components/ui/logo/LogoMark.tsx` — Logo mark primitive.
  - Renders founder-approved mark asset via `next/image`
  - Sizes: `sm` (28px), `md` (34px — navbar default), `lg` (44px) via `sizeMap`
  - Graceful development fallback (neutral placeholder div) when asset is unavailable — build never fails
  - `LogoSize` type exported here; imported by `Logo` (not redeclared)
  - `forwardRef`, `displayName`, exported `LogoMarkProps`
  - All strings sourced from `BRAND` — no hardcoded literals

- `app/src/components/ui/logo/Logo.tsx` — Full logo lockup primitive.
  - Renders founder-approved full logo asset via `next/image`
  - Sizes: `sm`, `md`, `lg` via `sizeMap` and `intrinsicWidthMap`
  - Graceful development fallback (BRAND.name text) when asset is unavailable
  - Consumers wrap in `<Link>` — Logo has no routing responsibility
  - `forwardRef`, `displayName`, exported `LogoProps`
  - All strings and paths sourced from `BRAND`

### Architectural Decisions
- `LogoWordmark` not created — no independent wordmark asset supplied. Will be built as a dedicated task when the founder provides the asset.
- `brand.ts` is the mandatory import for all brand strings and asset paths across the entire codebase — Navbar, Footer, OpenGraph, Manifest, Dashboard, Auth.
- `LogoSize` type is single-sourced in `LogoMark.tsx` and imported by `Logo.tsx` — never redeclared.
- `next/image` exclusively — raw `<img>` tags are banned per project rules.
- `sizeMap` objects centralise all pixel dimensions — no hardcoded values in JSX.
- Both components use `onError` + `useState` for graceful asset fallback without breaking the build or rendering broken image icons.

### Changed
- `docs/TASKS.md` — Marked CM009 as complete.
- `docs/SESSION.md` — Updated current phase to CM009 completion.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

---

## [0.4.8] — 2026-07-09 — CM008: Typography System

### Added
- `app/src/components/ui/Heading.tsx` — Production-ready Heading primitive.
  - **Sizes**: `hero`, `display`, `title`, `section`, `sub` (visual scale independent of semantic level)
  - **`as` prop**: controls rendered HTML element (h1–h6); decouples visual from semantic
  - **`gradient` prop**: applies emerald→cyan gradient fill for accent headings
  - Implements `React.forwardRef<HTMLHeadingElement>`
  - `Heading.displayName = "Heading"`
  - Full TypeScript with exported `HeadingProps`, `HeadingSize`, `HeadingLevel`
  - Design tokens only — no hardcoded values

- `app/src/components/ui/Text.tsx` — Production-ready Text primitive.
  - **Sizes**: `xs`, `sm`, `base`, `lg`, `xl`
  - **Colors**: `default` (foreground), `muted` (text-muted)
  - **`as` prop**: `p`, `span`, `div`, `li`
  - Implements `React.forwardRef`
  - `Text.displayName = "Text"`
  - Full TypeScript with exported `TextProps`, `TextSize`, `TextColor`, `TextAs`

- `app/src/components/ui/Label.tsx` — Production-ready Label primitive.
  - **Colors**: `default` (cyan), `cyan`, `emerald`, `muted` — not hardcoded to a single color
  - **`as` prop**: `p`, `span`, `div`
  - Implements `React.forwardRef`
  - `Label.displayName = "Label"`
  - Full TypeScript with exported `LabelProps`, `LabelColor`, `LabelAs`

- `app/src/components/ui/Badge.tsx` — Production-ready Badge primitive.
  - **Variants**: `default`, `emerald`, `cyan`, `outline`
  - **`pulse` prop**: animated status dot (`aria-hidden="true"`) for live/active indicators
  - Implements `React.forwardRef<HTMLDivElement>`
  - `Badge.displayName = "Badge"`
  - Full TypeScript with exported `BadgeProps`, `BadgeVariant`

### Changed
- `app/src/app/globals.css` — Added `badgePulse` keyframe animation for Badge pulse dot.
- `docs/TASKS.md` — Marked CM008 as complete.
- `docs/SESSION.md` — Updated current phase to CM008 completion.

### Architectural Decisions
- `Heading`, `Text`, `Label`, `Badge` are mandatory primitives throughout the repository.
  All future components (Navbar, Hero, Stats, TournamentCard, ProgramCard, Footer, Chess Puzzle cards, feature sections) must consume these instead of directly rendering h1/h2/h3/p/span/badge markup.
- `Label` color is not hardcoded — `color` prop supports `default`/`cyan`/`emerald`/`muted` for future section variety.
- `Badge` has semantic variants (`emerald`, `cyan`, `outline`) covering all tournament, coaching, puzzle, and status badge use cases in the prototype.
- `gradient` prop on `Heading` handles all prototype accent span patterns without a separate `GradientText` component.
- Verification was done via a temporary `/cm008-preview` route (deleted after verification); `page.tsx` was never touched.

### Status
- Build verified: `npm run build` passed ✅
- Linting verified: `npm run lint` passed ✅
- Dev server verified: `npm run dev` started successfully ✅

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
