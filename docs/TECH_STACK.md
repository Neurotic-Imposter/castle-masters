# Technology Stack — Castle Masters

## Current Status

| Layer | Status |
|---|---|
| Prototype (HTML/CSS/JS) | ✅ Complete — frozen as visual source of truth |
| Next.js 16 Application | ✅ Initialized — dev server running |
| TypeScript | ✅ Configured — strict mode |
| Tailwind CSS | ✅ Installed |
| ESLint | ✅ Configured |
| Turbopack | ✅ Active (dev server) |
| GitHub Repository | ✅ Connected |
| Backend / API | 🔲 Planned — Phase 8 |
| Database (Supabase) | 🔲 Planned — Phase 9 |
| Payments (Razorpay) | 🔲 Planned — Phase 10 |

---

## Current Stack

### Framework

- **Next.js 16** (App Router)
  - Router: App Router (not Pages Router)
  - Dev Server: Turbopack (fast refresh, faster builds)
  - Rendering: Static Site Generation (SSG) as default; Server Components where appropriate

### Language

- **TypeScript** — enforced throughout. Strict mode enabled. No plain `.js` files in `app/` or `components/`

### Styling

- **Tailwind CSS** — installed and active
- CSS custom properties (design tokens) co-exist with Tailwind for brand-specific values
- Google Fonts: Space Grotesk (headings), Inter (body) — loaded via `next/font/google`
- No CSS-in-JS libraries

### Animations

- Pure CSS keyframes and transitions — no animation library
- JavaScript: `IntersectionObserver` for scroll-reveal triggers
- All animations GPU-friendly: `transform`, `opacity`, `filter` only

### State Management

- No global state library required at this phase
- Client-side tab switching via `useState` in React components
- Navigation active state via Next.js `usePathname()`

### Forms

- Phase 1–7: Mock submit (no backend)
- Phase 8+: Next.js API Routes inside `app/api/`

---

## Development Tooling

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | Runtime |
| npm | 10+ | Package manager |
| TypeScript | 5.x | Type safety (strict) |
| ESLint | Built-in with Next.js | Linting |
| Turbopack | Built-in with Next.js 16 | Fast dev server |

---

## Planned Future Stack

These are approved for future phases but not yet implemented:

| Technology | Phase | Purpose |
|---|---|---|
| Supabase | Phase 9 | Database — Products, Orders, Puzzles, Tournaments, Users |
| Razorpay | Phase 10 | Payment processing for cart checkout |
| Vercel | Phase 11 | Production hosting (GitHub connected) |

---

## Backend Architecture (Planned — Phase 8+)

The backend will live **inside Next.js** using App Router API Routes. No separate server.

### Module Structure

```
app/
├── api/
│   ├── tournaments/
│   │   └── route.ts         ← GET /api/tournaments
│   ├── puzzles/
│   │   └── route.ts         ← GET /api/puzzles
│   ├── cart/
│   │   └── route.ts         ← POST /api/cart
│   ├── checkout/
│   │   └── route.ts         ← POST /api/checkout
│   └── payment/
│       └── verify/
│           └── route.ts     ← POST /api/payment/verify
│
lib/
├── supabase/                ← Supabase client + queries
├── razorpay/                ← Razorpay client + helpers
└── utils/                   ← Shared utilities
```

### Data Modules

```
modules/
├── puzzles/                 ← Chess puzzle logic
├── tournaments/             ← Tournament data and management
├── cart/                    ← Cart state and operations
├── payments/                ← Payment flow orchestration
└── shared/                  ← Shared types and helpers
```

---

## Database Schema (Planned — Phase 9)

Managed via Supabase. Tables planned:

| Table | Purpose |
|---|---|
| `products` | Merchandise catalog |
| `orders` | Purchase records |
| `puzzles` | Chess puzzle data |
| `tournaments` | Tournament records |
| `users` | User accounts (future phase) |

---

## Deployment Target

| Service | Purpose |
|---|---|
| Vercel | Frontend + API Routes hosting |
| Supabase | Database + auth (future) |
| Razorpay | Payment gateway (future) |

- **Domain**: TBD by founder
- **GitHub**: Connected — auto-deploy on push to `main`

---

## Explicitly Excluded

| Technology | Reason |
|---|---|
| Chess.js / Chessboard.js | No playable engine — chess board is visual only |
| Stripe / Shopify | Razorpay is the approved payment provider |
| Firebase | Supabase is the approved database provider |
| GraphQL | REST API routes via Next.js are sufficient |
| Redux / Zustand | No complex global state at this phase |
| Framer Motion | Pure CSS animations only |
| Pages Router | App Router is the standard for Next.js 16 |
