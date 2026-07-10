# Product Requirements — Castle Masters

## Product Vision

Castle Masters is India's complete chess ecosystem — a premium digital platform serving students, parents, corporations, and chess enthusiasts with structured coaching, competitive tournaments, tactical chess puzzles (including a physical Puzzle Deck product), and corporate programs.

> **Merchandise is not a standalone nav feature.** The first production commerce flow is the Chess Puzzle Deck sold via the Chess Puzzles page.

---

## Navigation Structure

The approved top-level navigation contains **7 pages** plus a primary CTA:

| # | Route | Page | Description |
|---|---|---|---|
| 1 | `/` | Home | Primary storytelling and discovery hub |
| 2 | `/coaching` | Coaching | Online and offline training tracks |
| 3 | `/tournaments` | Tournaments & Events | Upcoming and past competition hub |
| 4 | `/chess-puzzles` | Chess Puzzles | Tactical training + Puzzle Deck product |
| 5 | `/corporate` | Corporate | Enterprise chess programs |
| 6 | `/team` | Team | Coaching and operations directory |
| 7 | `/contact` | Contact | Inquiry form, locations, and support |
| — | — | Book Free Trial | Primary CTA — links to Contact |

**Removed from navigation (permanently — do not recreate):**
- Games *(renamed to Chess Puzzles — permanent)*
- Merchandise *(not a nav page — commerce accessed via Chess Puzzles page)*
- About, Academy, Programs, Pricing, Locations, Success Stories

---

## Page Requirements

---

### 1. Home

Structured in strict section order — **fully implemented (CM013–CM023)**:

1. **Hero Section** ✅
2. **Stats Section** ✅
3. **Mission Section** ✅
4. **Coaching Section** ✅
5. **Chess Puzzles Section** ✅
6. **Upcoming Tournament Section** ✅
7. **Corporate Section** ✅
8. **Team Section** ✅
9. **Testimonials Section** ✅
10. **FAQ Section** ✅
11. **CTA Section** ✅
12. **Footer** ✅

---

### 2. Coaching

- **Online Coaching Tracks**: Beginner, Intermediate, Advanced, Tournament Preparation, One-to-One
- **Offline Coaching Tracks**: Beginner, Intermediate, Advanced, Tournament Preparation, One-to-One
- Each card: track name, description, feature list, "Book Free Trial" CTA
- **No pricing** on this page — ever
- **Learning Roadmap**: 6-stage milestone grid (Weeks 1–4 through Ongoing)
- **Weekly Study Plan**: Table showing a sample daily training schedule

---

### 3. Tournaments & Events

**Two tabs only:**

| Tab | Content |
|---|---|
| Upcoming | Tournament cards |
| Past Tournaments | Archive cards with results |

**Removed tabs (do not recreate without explicit founder approval):**
- School Events
- Special Events
- Registrations portal
- Results table (separate page)
- Leaderboard

#### Upcoming Tournament Card — Required Fields

- Date
- Venue
- Entry Fee
- Prize Pool
- Description
- Register Now CTA → Google Forms link (placeholder)

> Registration links to Google Forms — no in-app registration system.

#### Past Tournament Card — Required Fields

- Winner (placeholder)
- Runner-up (placeholder)
- Standings (placeholder)
- Results embedded in card

> Past tournament results are contained within the card — no separate Results page.

All tournament data is **placeholder only**. Do not invent dates, venues, winners, fees, or prize amounts.

---

### 4. Chess Puzzles

*(This page was previously called "Games" — it is permanently renamed Chess Puzzles throughout.)*

#### Responsibility A — Interactive Puzzle Demo

- Free demo puzzles — no login or payment required
- No chess engine — placeholder interaction (informational alerts only)
- Never implement gameplay logic

**Available Now:**
- Mate in 1 Challenges — card with description, preview, "Play Demo" button
- Mate in 4 Campaigns — card with description, preview, "Play Demo" button

**Coming Soon:**
- Mate in 2 Challenges
- Mate in 3 Campaigns
- Tactical Training Cards

#### Responsibility B — Puzzle Deck Product (First Commerce Flow)

The academy sells **physical Chess Puzzle Decks**.

Users can:
1. View product
2. Add to Cart
3. Checkout
4. Pay (Razorpay)

This is the **first production commerce flow** for the platform.

> The Puzzle Deck product card lives on the Chess Puzzles page — not a separate Merchandise page.

---

### 5. Corporate

- 5 program cards: Corporate Tournaments, Leadership Through Chess, Team Building, Employee Engagement, Customized Events
- Enterprise B2B inquiry form: Company Name, Representative Name, Email, Program Interest, Specifications
- Strong enterprise CTA at the bottom
- **No pricing** on this page

---

### 6. Team

5 category sections:
1. **Founders** — 2 placeholder cards
2. **Coaches** — 3 placeholder cards
3. **Trainers** — 1+ placeholder cards
4. **Advisors** — 1 placeholder card
5. **Operations Team** — 1 placeholder card

- **No names, FIDE ratings, biographies, or student counts** — professional placeholders only

---

### 7. Contact

- Inquiry + trial booking form: Name, Email, Phone, Rating, Age, Program Interest, Goals
- Right column: Phone, Email, WhatsApp contact channels
- **4 regional center cards**: Delhi, Mumbai, Bangalore, Chennai + Online
- All addresses, phone numbers, and emails are professional placeholders
- Social media links (placeholder)

---

## Commerce Flow

Commerce is initiated from the Chess Puzzles page (Puzzle Deck product), not a standalone Merchandise navigation item.

```
Puzzle Deck "Add to Cart" (Chess Puzzles page)
        ↓
      Cart
        ↓
    Checkout
        ↓
    Razorpay
        ↓
    Success
        ↓
  Order Saved (Supabase)
```

**Current state:** Commerce UI shows placeholder/Coming Soon until Razorpay integration is complete (Phase 9).

---

## Backend Architecture

The backend lives **inside the Next.js 16 application** using App Router API Routes under `app/src/app/api/`. No separate server.

### API Routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/tournaments` | Fetch tournament list |
| `GET` | `/api/puzzles` | Fetch puzzle catalog |
| `GET` | `/api/products` | Fetch Puzzle Deck product data |
| `POST` | `/api/cart` | Add / update cart items |
| `POST` | `/api/checkout` | Initiate checkout session |
| `POST` | `/api/payment/verify` | Verify Razorpay payment signature |

### Module-First Architecture

```
modules/
├── puzzles/       ← Chess puzzle logic, types, data
├── tournaments/   ← Tournament data and management
├── cart/          ← Cart state and operations
├── payments/      ← Razorpay integration
└── shared/        ← Shared types and utilities
```

### Infrastructure

| Service | Role |
|---|---|
| Next.js 16 (App Router) | Frontend + API Routes |
| Supabase | Database (products, orders, puzzles, tournaments) |
| Supabase Auth | Authentication |
| Razorpay | Indian payment gateway |
| Vercel | Hosting and deployment |
| GitHub | Source control (connected to Vercel) |

---

## Technology Summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Dev Server | Turbopack |
| Database | Supabase (Phase 6+) |
| Auth | Supabase Auth (Phase 7+) |
| Payments | Razorpay (Phase 9+) |
| Hosting | Vercel |

---

## Development Priority Order

1. Complete website (all pages) — Phase 4
2. Backend foundation (API routes, mock data) — Phase 5
3. Database (Supabase) — Phase 6
4. Authentication — Phase 7
5. Cart & Checkout — Phase 8
6. Payment (Razorpay) — Phase 9
7. Admin Dashboard — Phase 10
8. Deployment — Phase 11
9. QA — Phase 12

> Payment is part of a complete website delivery — not an isolated early milestone.

---

## Content Rules (Absolute — Never Violate)

The following must **never** be invented:
- Founder names or biographies
- Coach names, FIDE ratings, or student counts
- Student or parent testimonial names
- Tournament results, winner names, venues, or dates
- Physical addresses
- Phone numbers
- Email addresses
- Pricing of any kind

All placeholder text must read professionally.

---

## Design Language

- **Aesthetic**: Emerald-first dark mode, glassmorphism, floating ambient lighting
- **Primary accent**: Emerald `#10B981`
- **Secondary accent**: Cyan `#06B6D4`
- **Ambient accent**: Violet `#8B5CF6`
- **Background**: `#030303` (near-black)
- **Typography**: Space Grotesk (headings), Inter (body)
- **Motion**: Smooth cubic-bezier transitions, scroll reveal, hover lifts, GPU-only animations

---

## Logo

The official Castle Masters logo is pending asset delivery from the founder.

> Do not attempt to replace the current temporary logo placeholder until the official asset is provided.
> Existing Logo and LogoMark components already have fallback handling ready.
