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

## Phase 1 — Branding

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM001 | Clean up default Next.js boilerplate and setup minimal UI | ✅ | `app/layout.tsx`, `app/page.tsx` | CM0S1 | Minimal placeholder displayed, defaults removed |
| CM002 | Configure Google Fonts (Space Grotesk + Inter) | ✅ | `app/layout.tsx` | CM001 | Fonts load correctly; headings use Space Grotesk, body uses Inter |
| CM003 | Set up global animation keyframes | 🔲 | `styles/animations.css` | CM001 | All keyframes from prototype (`boardFloat`, `pieceFloat`, `pulseGlow`, etc.) extracted |
| CM004 | Configure Tailwind with brand design tokens | 🔲 | `tailwind.config.ts` | CM001 | Custom colors, fonts, spacing tokens registered in Tailwind config |

---

## Phase 2 — Layout

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM005 | Create root layout with providers and global imports | 🔲 | `app/layout.tsx` | CM001–CM004 | Layout renders without errors; fonts and CSS applied globally |
| CM006 | Build `<AmbientOrbs />` component | 🔲 | `components/layout/AmbientOrbs.tsx` | CM001 | 3 fixed ambient glow orbs render on all pages |
| CM007 | Build `<Footer />` component | 🔲 | `components/layout/Footer.tsx` | CM001 | 4-column footer renders with brand, links, legal |
| CM008 | Build `<WhatsAppWidget />` component | 🔲 | `components/layout/WhatsAppWidget.tsx` | CM001 | Fixed floating WhatsApp button visible on all pages |
| CM009 | Verify layout renders correctly with all sub-components | 🔲 | — | CM005–CM008 | Dev server shows layout shell with no hydration errors |

---

## Phase 3 — Navigation

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM010 | Build `<NavPill />` component (desktop) | 🔲 | `components/layout/NavPill.tsx` | CM001 | Floating glass pill with correct nav links renders; active link highlighted via `usePathname()` |
| CM011 | Build `<MobileMenu />` component | 🔲 | `components/layout/MobileMenu.tsx` | CM010 | Hamburger opens full-screen drawer; all links work; closes on selection |
| CM012 | Integrate navigation into root layout | 🔲 | `app/layout.tsx` | CM010, CM011 | Navigation present on all pages; no layout shift |
| CM013 | Responsive nav audit (375px, 768px, 1280px) | 🔲 | — | CM012 | No overflow at any viewport; mobile nav fully functional |

---

## Phase 4 — Design System

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM014 | Build `<GlassCard />` with mouse-tracking spotlight | 🔲 | `components/ui/GlassCard.tsx` | CM001 | Card renders with glassmorphic style; spotlight follows cursor on hover |
| CM015 | Build `<Button />` (Primary, Ghost, Outline variants) | 🔲 | `components/ui/Button.tsx` | CM001 | All 3 variants render correctly; hover/active states work |
| CM016 | Build `<Badge />` with pulse variant | 🔲 | `components/ui/Badge.tsx` | CM001 | Badge and animated pulse variant render |
| CM017 | Build `<SectionLabel />` component | 🔲 | `components/ui/SectionLabel.tsx` | CM001 | Uppercase cyan label renders correctly |
| CM018 | Build `<GradientText />` component | 🔲 | `components/ui/GradientText.tsx` | CM001 | Emerald-to-cyan gradient text renders |
| CM019 | Build `<TabNav />` and `<TabPanel />` | 🔲 | `components/ui/TabNav.tsx` | CM001 | Tab switching works; correct tab content shown |
| CM020 | Build `<Accordion />` (FAQ) | 🔲 | `components/ui/Accordion.tsx` | CM001 | Items expand/collapse with animation |
| CM021 | Build `<ScrollReveal />` wrapper | 🔲 | `components/ui/ScrollReveal.tsx` | CM001 | Elements animate into view on scroll via IntersectionObserver |
| CM022 | Build `<AnimatedCounter />` | 🔲 | `components/ui/AnimatedCounter.tsx` | CM001 | Counter ticks from 0 to target value when in viewport |
| CM023 | Build `<HeroChessBoard />` visual component | 🔲 | `components/chess/HeroChessBoard.tsx` | CM003 | 8×8 board renders with highlights and floating pieces; no gameplay interaction |

---

## Phase 5 — Tournament Module (Frontend)

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM024 | Create Tournaments & Events page | 🔲 | `app/tournaments/page.tsx` | CM014–CM023 | Page renders with correct hero and section structure |
| CM025 | Build Upcoming Tournaments tab | 🔲 | `components/sections/TournamentCard.tsx` | CM024 | Each card shows: Date, Venue, Entry Fee, Prize Pool, Description, Register Now CTA |
| CM026 | Build Past Tournaments tab | 🔲 | `components/sections/PastTournamentCard.tsx` | CM024 | Each card shows: Winner, Runner-up, Standings, View Results CTA |
| CM027 | Build School Events tab | 🔲 | — | CM024 | School events section renders with placeholder cards |
| CM028 | Build Special Events tab | 🔲 | — | CM024 | Special events / masterclass cards render |
| CM029 | Tournament page responsive audit | 🔲 | — | CM024–CM028 | No overflow; all tabs functional on mobile |

---

## Phase 6 — Chess Puzzle Module

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM030 | Create Chess Puzzles page | 🔲 | `app/chess-puzzles/page.tsx` | CM014–CM023 | Page renders at `/chess-puzzles` |
| CM031 | Build Available Now puzzle cards (Mate in 1, Mate in 4) | 🔲 | `components/sections/PuzzleCard.tsx` | CM030 | Cards with title, description, preview, and "Play Demo" informational button |
| CM032 | Build Coming Soon puzzle cards (Mate in 2, Mate in 3, Training Cards) | 🔲 | — | CM030 | Coming Soon cards with reduced opacity |
| CM033 | Build puzzle module types and data structure | 🔲 | `modules/puzzles/types.ts`, `modules/puzzles/data.ts` | CM030 | TypeScript types defined; static placeholder data ready for API replacement |
| CM034 | Verify no chess engine is bundled | 🔲 | — | CM030–CM033 | No chess.js or similar library in bundle; all game interaction is placeholder |

---

## Phase 7 — Cart

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM035 | Define product and cart TypeScript types | 🔲 | `modules/cart/types.ts` | — | Types for `Product`, `CartItem`, `Order` defined and exported |
| CM036 | Build cart state management (React Context or useState) | 🔲 | `modules/cart/CartContext.tsx` | CM035 | Add to cart, remove, update quantity, calculate total work correctly |
| CM037 | Build Cart UI component | 🔲 | `components/sections/Cart.tsx` | CM035, CM036 | Cart renders items, quantities, totals; empty state handled |
| CM038 | Build Checkout Form | 🔲 | `components/sections/CheckoutForm.tsx` | CM037 | Form collects: Name, Email, Phone, Address; validation works |
| CM039 | Build Order Success screen | 🔲 | `components/sections/OrderSuccess.tsx` | CM038 | Success message shown after payment confirmation |
| CM040 | Cart → Checkout → Success flow connected | 🔲 | — | CM037–CM039 | Full cart flow works end-to-end in mock mode |

---

## Phase 8 — Backend API Routes

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM041 | Create `GET /api/tournaments` route | 🔲 | `app/api/tournaments/route.ts` | CM024 | Returns tournament data as JSON; handles errors |
| CM042 | Create `GET /api/puzzles` route | 🔲 | `app/api/puzzles/route.ts` | CM030 | Returns puzzle catalog as JSON |
| CM043 | Create `POST /api/cart` route | 🔲 | `app/api/cart/route.ts` | CM035 | Accepts cart payload; validates and returns confirmation |
| CM044 | Create `POST /api/checkout` route | 🔲 | `app/api/checkout/route.ts` | CM038 | Creates order record; initiates Razorpay order |
| CM045 | Create `POST /api/payment/verify` route | 🔲 | `app/api/payment/verify/route.ts` | CM044 | Verifies Razorpay payment signature; returns success/failure |
| CM046 | API error handling and response types | 🔲 | `lib/utils/apiResponse.ts` | CM041–CM045 | All routes return consistent `{ success, data, error }` shape |

---

## Phase 9 — Supabase Integration

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM047 | Set up Supabase project and environment variables | 🔲 | `.env.local` | — | Supabase URL and anon key configured; connection verified |
| CM048 | Create Supabase client utility | 🔲 | `lib/supabase/client.ts` | CM047 | Client exported and usable in API routes |
| CM049 | Create database schema (products, orders, puzzles, tournaments) | 🔲 | Supabase SQL migrations | CM048 | Tables created with correct columns and relationships |
| CM050 | Wire `GET /api/tournaments` to Supabase | 🔲 | `app/api/tournaments/route.ts` | CM049 | Route fetches live data from Supabase |
| CM051 | Wire `GET /api/puzzles` to Supabase | 🔲 | `app/api/puzzles/route.ts` | CM049 | Route fetches live data from Supabase |
| CM052 | Wire order saving to Supabase after payment | 🔲 | `app/api/payment/verify/route.ts` | CM049 | Successful payments save order record to `orders` table |

---

## Phase 10 — Razorpay Integration

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM053 | Set up Razorpay account and environment variables | 🔲 | `.env.local` | — | Key ID and secret configured |
| CM054 | Create Razorpay utility client | 🔲 | `lib/razorpay/client.ts` | CM053 | Razorpay instance initialized and exported |
| CM055 | Implement order creation in checkout route | 🔲 | `app/api/checkout/route.ts` | CM054 | Razorpay order created with correct amount and currency |
| CM056 | Integrate Razorpay checkout modal on frontend | 🔲 | `components/sections/CheckoutForm.tsx` | CM055 | Modal opens; test payment completes |
| CM057 | Implement payment signature verification | 🔲 | `app/api/payment/verify/route.ts` | CM056 | Signature verified using Razorpay secret; invalid signatures rejected |
| CM058 | End-to-end cart → payment → success test | 🔲 | — | CM057 | Full purchase flow works with Razorpay test keys |

---

## Phase 11 — Deployment

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM059 | Configure Vercel project linked to GitHub | 🔲 | Vercel dashboard | CM047, CM053 | Auto-deploy triggers on push to `main` |
| CM060 | Set production environment variables on Vercel | 🔲 | Vercel dashboard | CM059 | Supabase and Razorpay keys set in Vercel environment |
| CM061 | Configure custom domain | 🔲 | Vercel dashboard | CM059 | Domain resolves; SSL active |
| CM062 | Production smoke test | 🔲 | — | CM060, CM061 | All pages load; cart flow works; no console errors |
| CM063 | Lighthouse performance audit | 🔲 | — | CM062 | Score ≥ 90 on all core pages |

---

## Phase 12 — Quality Assurance

| ID | Description | Status | Expected Files | Dependencies | Definition of Done |
|---|---|---|---|---|---|
| CM064 | Cross-page visual consistency audit vs. prototype | 🔲 | — | All pages | No visual deviations from prototype |
| CM065 | Responsive audit: 375px, 768px, 1280px | 🔲 | — | All pages | No overflow; all interactions work on mobile |
| CM066 | Verify no invented content (names, ratings, prices, addresses) | 🔲 | — | All pages | All content is professional placeholders or real data |
| CM067 | Accessibility audit (contrast, focus, aria) | 🔲 | — | All pages | WCAG AA compliant |
| CM068 | Animation GPU properties audit | 🔲 | — | All pages | No layout-triggering properties animated |
| CM069 | Final founder review | 🔲 | — | All above | Founder sign-off received |
