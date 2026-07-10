# Architecture — Castle Masters

## Overview

Castle Masters is a **Next.js 16 App Router application**. The current production implementation contains the shared design system, application shell, and a fully implemented homepage (11 sections). The planned full product includes inner marketing pages, a chess puzzle module with a physical Puzzle Deck product (first commerce flow), tournament information, and corporate inquiry features.

> **Merchandise is not a standalone feature.** The first commerce flow is the Chess Puzzle Deck sold via the Chess Puzzles page.

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
├── app/                    ← Next.js 16 App Router production app
│   ├── src/
│   │   ├── app/            ← Root layout, homepage, global CSS
│   │   ├── components/     ← Shared React components
│   │   │   ├── ui/         ← Existing UI primitives
│   │   │   ├── layout/     ← Existing layout shell components
│   │   │   └── sections/   ← Homepage/page sections
│   │   └── lib/            ← Existing brand, navigation, footer, homepage data
│   └── public/             ← Static assets served by Next.js
│
├── modules/                ← Planned feature domain modules
│   ├── puzzles/            ← Planned chess puzzle logic and types
│   ├── tournaments/        ← Planned tournament data and management
│   ├── cart/               ← Planned cart state and operations
│   ├── payments/           ← Planned Razorpay integration
│   └── shared/             ← Planned shared types and helpers
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
| `/` | Home | Full storytelling hub — **✅ Complete** |
| `/coaching` | Coaching | Online & offline programs — **✅ Complete** |
| `/tournaments` | Tournaments & Events | **Two tabs only**: Upcoming + Past |
| `/chess-puzzles` | Chess Puzzles | Demo puzzles + Puzzle Deck product |
| `/corporate` | Corporate | B2B programs + inquiry form |
| `/team` | Team | Placeholder cards |
| `/contact` | Contact | Inquiry form + locations |

> **Note:** Merchandise is not a nav page. Commerce is accessed via the Chess Puzzles page (Puzzle Deck product).
> **Tournament tabs:** Upcoming and Past only — School Events, Special Events, Leaderboard, and Registrations portal removed per founder decision.

### Content Sources

Presentation content is centralized in typed modules under `app/src/lib/`. No section component duplicates copy or configuration strings inline.

**Shared modules (`app/src/lib/` root):**
- `brand.ts` — Brand identity (name, tagline, asset paths)
- `navigation.ts` — Primary navigation data (nav links, CTA)
- `footer.ts` — Footer data (columns, legal, social placeholders)
- `home.ts` — Single source of truth for homepage presentation content

**Page-scoped modules (`app/src/lib/content/`) — DEC-021:**
All inner-page content modules live here. One file per page.
- `content/coaching.ts` — Coaching page copy ✅
- `content/tournaments.ts` — Tournaments page copy (planned)
- `content/chess-puzzles.ts` — Chess Puzzles page copy (planned)
- `content/corporate.ts` — Corporate page copy (planned)
- `content/team.ts` — Team page copy (planned)
- `content/contact.ts` — Contact page copy (planned)

> **Convention (DEC-021):** All future page-scoped content modules must be created under `app/src/lib/content/`. The four existing root-level modules (`home.ts`, `brand.ts`, `navigation.ts`, `footer.ts`) are not migrated.

### Component Map

#### Layout Components
- Existing: `<Container />`, `<Section />`, `<Stack />`, `<Grid />`, `<Spacer />`
- Existing: `<Navbar />` — Floating glass navigation shell with desktop links, mobile trigger, and CTA
- Existing: `<NavLink />` — Shared navigation link rendering
- Existing: `<MobileMenu />` — Full-screen overlay drawer for mobile
- Existing: `<Footer />` — Brand statement, links, legal
- Planned: `<WhatsAppWidget />` — Fixed floating chat widget

#### UI Primitives
- Existing: `<Button />` — Primary, secondary, outline, ghost variants
- Existing: `<Card />` — Glass/elevated visual container
- Existing: `<Heading />`, `<Text />`, `<Label />`, `<Badge />`
- Existing: `<Logo />`, `<LogoMark />`
- Planned where needed: tab, accordion, and shared scroll/counter abstractions

#### Chess Components
- Current: Hero Section includes a visual-only chess board inside `<Hero />`
- Planned: Extracted chess visual component only if reuse makes it necessary

#### Page-Level Section Components
- Existing: `<Hero />`, `<Stats />`, `<Mission />`
- Homepage: All 11 sections ✅ Complete (CM013–CM023)
- Planned inner pages: Coaching, Tournaments (2 tabs), Chess Puzzles (Demo + Puzzle Deck), Corporate, Team, Contact
- Planned commerce: Cart, Checkout, Razorpay (Phase 8–9)

---

## Backend Architecture

### API Routes (Next.js App Router — Planned Phase 5)

All backend logic will live inside Next.js. No separate server.

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/tournaments` | Fetch tournament list |
| `GET` | `/api/puzzles` | Fetch puzzle catalog |
| `GET` | `/api/products` | Fetch Puzzle Deck product |
| `POST` | `/api/cart` | Add/update cart items |
| `POST` | `/api/checkout` | Initiate checkout session |
| `POST` | `/api/payment/verify` | Verify Razorpay payment signature |

### Module Responsibilities (Planned)

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

## Commerce Flow Architecture (Planned — Phase 8–9)

```
Puzzle Deck "Add to Cart" (Chess Puzzles page)
        ↓
     Cart Drawer
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
| Supabase (Database) | 6 | Products, orders, puzzles, tournaments |
| Supabase (Auth) | 7 | Email/password authentication |
| Razorpay | 9 | Indian payment gateway |
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
