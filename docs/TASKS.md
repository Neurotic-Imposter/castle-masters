# Implementation Tasks — Castle Masters

> All tasks follow the ID format `CM###`. Tasks are grouped by MVP phase.
> Status: 🔲 Not Started | 🔄 In Progress | ✅ Complete | ⏸ Blocked

---

## Legend

Each task includes:
- **ID** — Unique task identifier
- **Description** — What to build
- **Status** — Current state
- **Expected Files** — Files to create or modify
- **Dependencies** — Tasks that must be complete first
- **Definition of Done** — Acceptance criteria

---

## Phase 0 — Documentation

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM000 | Write and populate all docs/ files | ✅ | All `docs/*.md` | — | All 10 doc files present and internally consistent |
| CM0S1 | Synchronize documentation with current project state | ✅ | All `docs/*.md` | CM000 | No outdated references (Next.js 14, excluded Tailwind, old roadmap) remain |

---

## Phase 1 — Foundation, Branding, and Navigation

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM001 | Clean up default Next.js boilerplate and setup minimal UI | ✅ | `app/layout.tsx`, `app/page.tsx` | CM0S1 | Minimal placeholder displayed, defaults removed |
| CM002 | Configure Google Fonts (Space Grotesk + Inter) | ✅ | `app/layout.tsx` | CM001 | Fonts load correctly; headings use Space Grotesk, body uses Inter |
| CM003 | Set up global design tokens and CSS variables | ✅ | `app/src/app/globals.css` | CM002 | All brand tokens (`--bg`, `--accent-emerald`, spacing, etc.) defined and matching prototype |
| CM004 | Configure Tailwind with brand design tokens | ✅ | `globals.css` | CM003 | Custom colors, fonts, spacing tokens registered in Tailwind config |
| CM005 | Build layout primitives | ✅ | `app/src/components/layout/*.tsx` | CM004 | Created Container, Section, Stack, Grid, Spacer primitives |
| CM006 | Build reusable Button component | ✅ | `app/src/components/ui/Button.tsx` | CM005 | Button component with all variants, sizes, and states created |
| CM007 | Build reusable Card component | ✅ | `app/src/components/ui/Card.tsx` | CM006 | Card visual container with glass and elevated variants created |
| CM008 | Build Typography System | ✅ | `app/src/components/ui/Heading.tsx`, `app/src/components/ui/Text.tsx`, `app/src/components/ui/Label.tsx`, `app/src/components/ui/Badge.tsx` | CM007 | Heading, Text, Label, Badge primitives created; all variants verified; build and lint passed |
| CM009 | Build Logo System | ✅ | `app/src/lib/brand.ts`, `app/src/components/ui/logo/LogoMark.tsx`, `app/src/components/ui/logo/Logo.tsx` | CM008 | BRAND constant, LogoMark and Logo primitives created; graceful fallback for missing assets; build, lint, and dev passed |
| CM010 | Build Navbar component | ✅ | `app/src/lib/navigation.ts`, `app/src/components/layout/NavLink.tsx`, `app/src/components/layout/MobileMenu.tsx`, `app/src/components/layout/Navbar.tsx` | CM009 | Floating glass pill navbar with desktop links, mobile overlay, active state, scroll lock, reduced motion, Escape key; build and lint passed |

---

## Phase 2 — Application Shell

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM011 | Build Footer component | ✅ | `app/src/lib/footer.ts`, `app/src/components/layout/Footer.tsx` | CM010 | 4-column footer with brand, links, legal; dynamic year; disabled links with aria-disabled; SOCIAL_LINKS placeholder; preview route created and deleted; build and lint passed |
| CM012 | Integrate application shell | ✅ | `app/src/app/layout.tsx` | CM010, CM011 | Navbar + Footer integrated in layout.tsx; flex-1 main pushes footer; responsive shell verified at 375/768/1280px; preview route created and deleted; build and lint passed |

---

## Phase 3 — Homepage Sections

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM013 | Build Hero Section component | ✅ | `app/src/components/sections/Hero.tsx` | CM008, CM012 | Hero Section composed from primitives (Container, Grid, Stack, Heading, Text, Button, Badge); badge with pulse; gradient heading; chess board visual; responsive; preview route created and deleted; build and lint passed |
| CM014 | Build Stats Section component | ✅ | `app/src/components/sections/Stats.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM013 | Stats Section matches prototype; uses existing primitives; preview route created and deleted; build and lint passed |
| CM015 | Build Mission Section component | ✅ | `app/src/components/sections/Mission.tsx`, `app/src/app/page.tsx` | CM014 | Mission Section matches prototype; uses existing primitives; preview route created and deleted; build and lint passed |
| CM016 | Build Coaching Overview homepage section | ✅ | `app/src/components/sections/CoachingOverview.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM015 | Coaching Overview matches prototype; uses existing primitives; preview route created and deleted; build and lint passed |
| CM017 | Build Chess Puzzles Preview homepage section | ✅ | `app/src/components/sections/ChessPuzzlesPreview.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM016 | Puzzle Preview matches prototype; uses existing primitives; preview route created and deleted; build and lint passed |
| CM018 | Build Upcoming Tournament homepage section | ✅ | `app/src/components/sections/UpcomingTournament.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM017 | Upcoming Tournament section matches prototype with placeholder-only data; preview route created and deleted; build and lint passed |
| CM019 | Build Corporate Overview homepage section | ✅ | `app/src/components/sections/CorporateOverview.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM018 | Corporate Overview matches prototype; uses existing primitives; preview route created and deleted; build and lint passed |
| CM020 | Build Team Preview homepage section | ✅ | `app/src/components/sections/TeamPreview.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM019 | Team Preview matches prototype; single placeholder panel, no invented members; preview route created and deleted; build and lint passed |
| CM021 | Build Testimonials homepage section | ✅ | `app/src/components/sections/Testimonials.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM020 | Placeholder testimonial cards match prototype; no invented real names or quotes; preview route created and deleted; build and lint passed |
| CM022 | Build FAQ homepage section | ✅ | `app/src/components/sections/FAQ.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM021 | FAQ accordion matches prototype; uses existing primitives; native `<details>`/`<summary>`; no client JS; preview route created and deleted; build and lint passed |
| CM023 | Build CTA homepage section | ✅ | `app/src/components/sections/HomeCTA.tsx`, `app/src/app/page.tsx`, `app/src/lib/home.ts` | CM022 | Book Free Trial CTA banner matches prototype; preview route created and deleted; build and lint passed |

---

## Phase 4 — Inner Pages (Frontend)

> All pages built as Server Components with placeholder data. No backend wiring yet.

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM024 | Build Coaching page | ✅ | `app/src/app/coaching/page.tsx`, `app/src/lib/content/coaching.ts` | CM023 | Online + Offline coaching tracks, learning roadmap, weekly study plan; matches prototype; no pricing; preview route created and deleted; build and lint passed |
| CM025 | Build Tournaments & Events page | ✅ | `app/src/app/tournaments/page.tsx`, `app/src/lib/content/tournaments.ts` | CM024 | Upcoming (3 cards) + Past (2 cards) sections; Server Component only, no client hooks; Register Now links to Google Forms placeholder; past results inline in card; preview route created and deleted; build and lint passed |
| CM026 | Build Chess Puzzles page | ✅ | `app/src/app/chess-puzzles/page.tsx`, `app/src/lib/content/chess-puzzles.ts` | CM025 | Available Now cards (Mate in 1, Mate in 4) with disabled Demo CTA; 3 Coming Soon cards; Puzzle Deck product card with disabled Available Soon CTA (commerce Phase 8); Server Component only; preview route created and deleted; build and lint passed |
| CM027 | Build Corporate page | ✅ | `app/src/app/corporate/page.tsx`, `app/src/lib/content/corporate.ts` | CM026 | 5 program cards from prototype; CTA links to /contact (no inline form); Server Component only; no pricing; no invented clients; preview route created and deleted; build and lint passed |
| CM028 | Build Team page | ✅ | `app/src/app/team/page.tsx`, `app/src/lib/content/team.ts` | CM027 | 5 categories (Founders, Coaches, Trainers, Advisors, Operations), 8 placeholder cards from prototype; no invented names, ratings, or bios; Server Component only; preview route created and deleted; build and lint passed |
| CM029 | Build Contact page | ✅ | `app/src/app/contact/page.tsx`, `app/src/lib/content/contact.ts`, `app/src/components/contact/ContactForm.tsx` | CM028 | Free Trial inquiry form (Client Component island); contact channels + 4 hub placeholders; inline success message on submit (no backend); no invented addresses or phone numbers; preview route created and deleted; build and lint passed |
| CM030 | Frontend QA & Responsive Audit — complete frontend sign-off before backend | ✅ | — | CM024–CM029 | Navbar CTA fixed (window.location.href → Link); dead coaching hash anchors fixed; invented FIDE claims removed; Privacy/Terms footer links disabled; social links populated with placeholder platform URLs; build/lint/TypeScript all pass |

---

## Phase 5 — Backend Foundation

> Next.js API Routes with static/mock data. No database connection yet.

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM031 | Define shared TypeScript types | 🔲 | `modules/shared/types.ts` | CM030 | Types for Tournament, Puzzle, Product, CartItem, Order, ApiResponse defined and exported |
| CM032 | Create `GET /api/tournaments` route | 🔲 | `app/src/app/api/tournaments/route.ts` | CM031 | Returns static tournament JSON; consistent `{ success, data, error }` response shape |
| CM033 | Create `GET /api/puzzles` route | 🔲 | `app/src/app/api/puzzles/route.ts` | CM031 | Returns static puzzle catalog JSON; consistent response shape |
| CM034 | Create `GET /api/products` route | 🔲 | `app/src/app/api/products/route.ts` | CM031 | Returns Puzzle Deck product data as JSON; consistent response shape |
| CM035 | API response types and error handling | 🔲 | `app/src/lib/api.ts` | CM032–CM034 | All routes return consistent `{ success, data, error }` shape; error responses standardized |

---

## Phase 6 — Database (Supabase)

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM036 | Set up Supabase project and environment variables | 🔲 | `.env.local` | CM035 | Supabase URL and anon key configured; connection verified |
| CM037 | Create Supabase client utility | 🔲 | `app/src/lib/supabase/client.ts` | CM036 | Client exported and usable in API routes and Server Components |
| CM038 | Create database schema | 🔲 | Supabase SQL migrations | CM037 | Tables created: `products`, `orders`, `puzzles`, `tournaments`; columns and relationships correct |
| CM039 | Wire `GET /api/tournaments` to Supabase | 🔲 | `app/src/app/api/tournaments/route.ts` | CM038 | Route fetches live data from Supabase `tournaments` table |
| CM040 | Wire `GET /api/puzzles` to Supabase | 🔲 | `app/src/app/api/puzzles/route.ts` | CM038 | Route fetches live data from Supabase `puzzles` table |
| CM041 | Wire `GET /api/products` to Supabase | 🔲 | `app/src/app/api/products/route.ts` | CM038 | Route fetches Puzzle Deck product from Supabase `products` table |

---

## Phase 7 — Authentication

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM042 | Supabase Auth setup | 🔲 | `app/src/lib/supabase/auth.ts` | CM037 | Supabase Auth configured; email/password flow enabled |
| CM043 | Auth middleware (protect routes) | 🔲 | `app/src/middleware.ts` | CM042 | Protected routes redirect unauthenticated users to login |
| CM044 | Sign up / Login page | 🔲 | `app/src/app/auth/page.tsx` | CM043 | Sign up and login forms work with Supabase Auth |
| CM045 | User session handling | 🔲 | `app/src/lib/supabase/session.ts` | CM044 | Session persists across page navigation; sign-out works |

---

## Phase 8 — Cart & Checkout

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM046 | Cart TypeScript types | 🔲 | `modules/cart/types.ts` | CM031 | Types for `CartItem`, `Cart`, `Order` defined and exported |
| CM047 | Cart state management | 🔲 | `modules/cart/CartContext.tsx` | CM046 | React Context with add, remove, update quantity, calculate total; persists in sessionStorage |
| CM048 | Cart UI component | 🔲 | `app/src/components/cart/CartDrawer.tsx` | CM047 | Slide-in cart drawer; renders items, quantities, totals; empty state; close button |
| CM049 | Checkout form | 🔲 | `app/src/app/checkout/page.tsx` | CM048 | Form collects Name, Email, Phone, Address; validation; summary of cart items |
| CM050 | `POST /api/cart` route | 🔲 | `app/src/app/api/cart/route.ts` | CM046 | Accepts cart payload; validates; returns confirmation |
| CM051 | `POST /api/checkout` route | 🔲 | `app/src/app/api/checkout/route.ts` | CM050 | Creates draft order record; initiates Razorpay order |
| CM052 | Order success screen | 🔲 | `app/src/app/checkout/success/page.tsx` | CM051 | Success message shown after payment confirmation; order reference displayed |

---

## Phase 9 — Razorpay Integration

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM053 | Razorpay account and environment variables | 🔲 | `.env.local` | — | Key ID and secret configured; test mode active |
| CM054 | Razorpay utility client | 🔲 | `app/src/lib/razorpay/client.ts` | CM053 | Razorpay instance initialized and exported |
| CM055 | Order creation in checkout route | 🔲 | `app/src/app/api/checkout/route.ts` | CM054 | Razorpay order created with correct amount and currency; order ID returned |
| CM056 | Razorpay checkout modal on frontend | 🔲 | `app/src/app/checkout/page.tsx` | CM055 | Modal opens on payment step; test payment completes |
| CM057 | `POST /api/payment/verify` route | 🔲 | `app/src/app/api/payment/verify/route.ts` | CM056 | Signature verified using Razorpay secret; invalid signatures rejected; order saved to Supabase on success |
| CM058 | End-to-end cart → payment → success test | 🔲 | — | CM057 | Full purchase flow works with Razorpay test keys; order appears in Supabase |

---

## Phase 10 — Admin Dashboard

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM059 | Admin route protection | 🔲 | `app/src/middleware.ts` | CM043 | `/admin/*` routes accessible only to admin users |
| CM060 | Orders dashboard | 🔲 | `app/src/app/admin/orders/page.tsx` | CM059 | List of orders with status, amount, customer details; fetched from Supabase |
| CM061 | Tournament management | 🔲 | `app/src/app/admin/tournaments/page.tsx` | CM059 | Add/edit/delete tournament entries; changes persist to Supabase |

---

## Phase 11 — Production Deployment

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM062 | Configure Vercel project linked to GitHub | 🔲 | Vercel dashboard | CM058 | Auto-deploy triggers on push to `main` |
| CM063 | Set production environment variables on Vercel | 🔲 | Vercel dashboard | CM062 | Supabase and Razorpay keys set in Vercel production environment |
| CM064 | Configure custom domain | 🔲 | Vercel dashboard | CM062 | Domain resolves; SSL active |
| CM065 | Production smoke test | 🔲 | — | CM063, CM064 | All pages load; cart → checkout → payment flow works; no console errors |
| CM066 | Lighthouse performance audit | 🔲 | — | CM065 | Score ≥ 90 on all core pages |

---

## Phase 12 — Quality Assurance

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM067 | Cross-page visual consistency audit vs. prototype | 🔲 | — | All pages | No visual deviations from prototype |
| CM068 | Responsive audit: 375px, 768px, 1280px | 🔲 | — | All pages | No overflow; all interactions work on mobile |
| CM069 | Verify no invented content | 🔲 | — | All pages | All content is professional placeholders or real data |
| CM070 | Accessibility audit (contrast, focus, aria) | 🔲 | — | All pages | WCAG AA compliant |
| CM071 | Animation GPU properties audit | 🔲 | — | All pages | No layout-triggering properties animated |
| CM072 | Official logo integration | ⏸ | `app/src/components/ui/logo/` | Asset delivery | Official logo asset replaces temporary placeholder; LogoMark and Logo components updated |
| CM073 | Final founder review | 🔲 | — | All above | Founder sign-off received |
