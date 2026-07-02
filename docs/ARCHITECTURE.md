# Architecture — Castle Masters

## Overview

Castle Masters is a **full-stack web application** built on Next.js 16 (App Router). The production system serves a premium chess platform with marketing pages, a chess puzzle module, tournament information, a merchandise cart with payment processing, and corporate inquiry features.

The architecture is **module-first** and **incremental**: each feature module (puzzles, tournaments, cart, payments) is developed and deployed independently without breaking existing pages.

The architecture prioritizes:
- **Design fidelity**: Production faithfully implements the frozen prototype — no redesign
- **Modularity**: Each domain (puzzles, tournaments, cart) is self-contained
- **Performance**: Static generation where possible; server components for dynamic data
- **Incremental delivery**: Frontend-first, backend added per phase

---

## Repository Structure

```
castle-masters/
├── prototype/              ← FROZEN. Visual source of truth. Never modify.
│   └── index.html          ← Single-file HTML+CSS+JS prototype
│
├── app/                    ← Next.js 16 App Router (production)
│   ├── layout.tsx          ← Root layout: Nav, Footer, Providers
│   ├── page.tsx            ← Home page
│   ├── coaching/
│   ├── tournaments/
│   ├── chess-puzzles/      ← (formerly "Games" — renamed)
│   ├── corporate/
│   ├── team/
│   ├── contact/
│   └── api/                ← Next.js API Routes (backend)
│       ├── tournaments/
│       ├── puzzles/
│       ├── cart/
│       ├── checkout/
│       └── payment/
│           └── verify/
│
├── components/             ← Shared React components
│   ├── ui/                 ← Base UI primitives
│   ├── layout/             ← Nav, Footer, MobileMenu
│   ├── sections/           ← Reusable page sections
│   └── chess/              ← Chess board visual component
│
├── modules/                ← Feature domain modules
│   ├── puzzles/            ← Chess puzzle logic and types
│   ├── tournaments/        ← Tournament data and management
│   ├── cart/               ← Cart state and operations
│   ├── payments/           ← Razorpay integration
│   └── shared/             ← Shared types and helpers
│
├── lib/                    ← Infrastructure utilities
│   ├── supabase/           ← Supabase client + queries
│   ├── razorpay/           ← Razorpay client + helpers
│   └── utils/              ← General utilities
│
├── styles/                 ← Global CSS and design tokens
│   ├── globals.css         ← CSS variables + reset
│   └── animations.css      ← Keyframe animation library
│
├── public/                 ← Static assets served at root
├── assets/                 ← Design system assets, brand kit
└── docs/                   ← Project documentation
```

---

## Frontend Architecture

### Page Architecture

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Full storytelling hub |
| `/coaching` | Coaching | Online & offline programs |
| `/tournaments` | Tournaments & Events | Upcoming + Past tabs |
| `/chess-puzzles` | Chess Puzzles | (renamed from "Games") |
| `/corporate` | Corporate | B2B programs + inquiry form |
| `/team` | Team | Placeholder cards |
| `/contact` | Contact | Inquiry form + locations |

> **Note:** Merchandise has been removed from navigation per founder decision. Cart flow is handled via a dedicated cart UI, not a nav page.

### Component Map

#### Layout Components
- `<NavPill />` — Floating glass navigation pill with nav links + CTA
- `<MobileMenu />` — Full-screen overlay drawer for mobile
- `<Footer />` — Brand statement, links, legal
- `<AmbientOrbs />` — Fixed background ambient glow layers
- `<WhatsAppWidget />` — Fixed floating chat widget

#### UI Primitives
- `<GlassCard />` — Core glassmorphic card with spotlight hover effect
- `<Badge />` — Pill badge with optional pulse dot
- `<Button />` — Primary, Ghost, Outline variants
- `<SectionLabel />` — Uppercase cyan category label
- `<GradientText />` — Emerald-to-cyan gradient text
- `<TabNav />` / `<TabPanel />` — Tab switcher component
- `<Accordion />` — FAQ collapsible accordion
- `<AnimatedCounter />` — Number tick animation
- `<ScrollReveal />` — IntersectionObserver scroll reveal wrapper

#### Chess Components
- `<HeroChessBoard />` — 8×8 CSS grid, visual only, never playable

#### Page-Level Section Components
- `<HeroSection />`, `<StatsRow />`, `<MissionBox />`
- `<CoachingCategoryGrid />`, `<RoadmapGrid />`, `<TrainingWeekTable />`
- `<TournamentCard />`, `<PastTournamentCard />`
- `<PuzzleCard />`, `<CartItem />`, `<CheckoutForm />`
- `<TeamCard />`, `<TeamCategorySection />`
- `<ContactForm />`, `<LocationMiniCard />`, `<ContactInfoBlock />`

---

## Backend Architecture

### API Routes (Next.js App Router)

All backend logic lives inside Next.js. No separate server.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/tournaments` | Fetch tournament list |
| `GET` | `/api/puzzles` | Fetch puzzle catalog |
| `POST` | `/api/cart` | Add/update cart items |
| `POST` | `/api/checkout` | Initiate checkout session |
| `POST` | `/api/payment/verify` | Verify Razorpay payment signature |

### Module Responsibilities

| Module | Responsibility |
|---|---|
| `modules/puzzles` | Puzzle metadata, difficulty, pack structure |
| `modules/tournaments` | Tournament data, upcoming/past, registration |
| `modules/cart` | Cart state, item management, total calculation |
| `modules/payments` | Razorpay order creation, signature verification |
| `modules/shared` | Shared TypeScript types, error handling |

---

## Database Architecture (Supabase — Planned Phase 9)

| Table | Key Fields |
|---|---|
| `products` | id, name, description, price, category, image_url, in_stock |
| `orders` | id, user_id, items, total, status, razorpay_order_id, created_at |
| `puzzles` | id, fen, solution, difficulty, pack_id, is_premium |
| `tournaments` | id, name, date, venue, entry_fee, prize_pool, status |
| `users` | id, email, name, rating, created_at *(future phase)* |

---

## Design System

Design tokens are derived from the prototype's CSS variables and carried into production:

```css
:root {
  --bg: #030303;
  --bg-card: rgba(15, 15, 20, 0.6);
  --bg-card-hover: rgba(25, 25, 35, 0.8);
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(16, 185, 129, 0.3);
  --accent-emerald: #10B981; /* Primary brand accent */
  --accent-cyan: #06B6D4;   /* Secondary accent */
  --accent-violet: #8B5CF6; /* Ambient/subtle accent */
  --text: #F9FAFB;
  --text-muted: #9CA3AF;
  --font-sans: 'Inter', sans-serif;
  --font-heading: 'Space Grotesk', sans-serif;
}
```

---

## Animation System

All animations must use GPU-friendly properties only:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur only for ambient orbs)

No animation shall use `width`, `height`, `top`, `left`, or `margin` as animated properties.

Scroll reveal: `IntersectionObserver` API with `threshold: 0.15`.
Transition timing: `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## Cart Flow Architecture

```
Products Page / Homepage CTA
        ↓
     Cart UI
        ↓
   Checkout Form
        ↓
   Razorpay Modal
        ↓
 POST /api/payment/verify
        ↓
  Success Screen
        ↓
  Order Saved (Supabase)
```

---

## Future Integrations

| Integration | Phase | Notes |
|---|---|---|
| Supabase | 9 | Database + auth |
| Razorpay | 10 | Indian payment gateway |
| Vercel | 11 | Hosting + edge functions |

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Cumulative Layout Shift | < 0.1 |
| JavaScript Bundle (initial) | < 150KB gzipped |
