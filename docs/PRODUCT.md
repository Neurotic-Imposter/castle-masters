# Product Requirements — Castle Masters

## Product Vision

Castle Masters is India's complete chess ecosystem — a premium digital platform serving students, parents, corporations, and chess enthusiasts with structured coaching, competitive tournaments, tactical chess puzzles, a merchandise cart, and corporate programs.

---

## Navigation Structure

The approved top-level navigation contains **7 pages** plus a primary CTA:

| # | Route | Page | Description |
|---|---|---|---|
| 1 | `/` | Home | Primary storytelling and discovery hub |
| 2 | `/coaching` | Coaching | Online and offline training tracks |
| 3 | `/tournaments` | Tournaments & Events | Upcoming and past competition hub |
| 4 | `/chess-puzzles` | Chess Puzzles | Tactical training puzzle module |
| 5 | `/corporate` | Corporate | Enterprise chess programs |
| 6 | `/team` | Team | Coaching and operations directory |
| 7 | `/contact` | Contact | Inquiry form, locations, and support |
| — | — | Book Free Trial | Primary CTA — links to Contact |

**Removed from navigation (permanently — do not recreate):**
- Games *(renamed to Chess Puzzles)*
- Merchandise *(not a nav page — exists only through the cart flow)*
- About, Academy, Programs, Pricing, Locations, Success Stories

> **Merchandise note**: Products, cart, checkout, and payment are accessed via CTAs embedded across the site. There is no standalone Merchandise navigation item.

---

## Page Requirements

---

### 1. Home

Structured in strict section order:

1. **Hero** — H1 headline, subtext, CTA buttons (Book Free Trial + Explore Coaching), decorative chess board visual
2. **Statistics** — Animated counters for key platform metrics
3. **Our Mission** — Centered brand statement block
4. **Coaching Overview** — 2-card grid (Online + Offline) linking to Coaching page
5. **Chess Puzzles Preview** — 2 cards (Mate in 1, Mate in 4) with Play Demo CTA
6. **Upcoming Tournament** — Featured event card with Register Now CTA
7. **Corporate Overview** — 2-card grid of corporate program highlights
8. **Team Preview** — Summary card linking to Team page
9. **Testimonials** — 3 placeholder testimonial cards
10. **FAQ** — Collapsible accordion, minimum 4 questions
11. **Book Free Trial Banner** — Full-width CTA section
12. **Footer** — Brand, quick links, legal

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

**4-tab navigation** (simplified from previous 7-tab spec):

| Tab | Content |
|---|---|
| Upcoming | Tournament cards |
| Past Tournaments | Archive cards |
| School Events | School outreach and inter-school leagues |
| Special Events | Masterclasses and specialty events |

**Removed tabs (do not recreate without explicit founder approval):**
- Registrations portal
- Results table
- Leaderboard

#### Upcoming Tournament Card — Required Fields

Each upcoming tournament card must display:
- Date
- Venue
- Entry Fee
- Prize Pool
- Description
- Register Now CTA

#### Past Tournament Card — Required Fields

Each past tournament card must display:
- Winner
- Runner-up
- Standings
- View Results CTA

All tournament data is **placeholder only**. Do not invent dates, venues, winners, fees, or prize amounts.

---

### 4. Chess Puzzles

*(This module was previously documented as "Games" — the name is now Chess Puzzles throughout.)*

**Module characteristics:**
- Independent module — not coupled to payments or cart
- Free demo puzzles require no account or payment
- Future premium puzzle packs are a planned monetization layer (not yet implemented)
- No chess engine — all puzzle interaction is placeholder (informational alerts only)
- Never implement gameplay

**Available Now:**
- Mate in 1 Challenges — card with description, preview, "Play Demo" button
- Mate in 4 Campaigns — card with description, preview, "Play Demo" button

**Coming Soon:**
- Mate in 2 Challenges
- Mate in 3 Campaigns
- Tactical Training Cards

Each card must have: title, description, visual preview, action button.

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

## Cart & Merchandise Flow

Merchandise is **not a navigation page**. Products are accessible via CTAs embedded across the site (e.g., homepage, chess puzzles page, corporate page).

The complete purchase journey:

```
Product CTA (anywhere on site)
        ↓
    Products
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

**Product categories:** Training Cards, Chess Boards, Books/Manuals, Chess Clocks, Apparel

**Current state:** All products marked Coming Soon until Razorpay integration is complete (Phase 10).

---

## Backend Architecture

The backend lives **inside the Next.js 16 application** using App Router API Routes. No separate server.

### API Routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/tournaments` | Fetch tournament list |
| `GET` | `/api/puzzles` | Fetch puzzle catalog |
| `POST` | `/api/cart` | Add / update cart items |
| `POST` | `/api/checkout` | Initiate checkout session |
| `POST` | `/api/payment/verify` | Verify Razorpay payment signature |

### Module-First Architecture

Each feature domain is a self-contained module:

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
| Database | Supabase (Phase 9+) |
| Payments | Razorpay (Phase 10+) |
| Hosting | Vercel |

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

All placeholder text must read professionally. Acknowledge placeholder status clearly where needed.

---

## Design Language

- **Aesthetic**: Emerald-first dark mode, glassmorphism, floating ambient lighting
- **Primary accent**: Emerald `#10B981`
- **Secondary accent**: Cyan `#06B6D4`
- **Ambient accent**: Violet `#8B5CF6`
- **Background**: `#030303` (near-black)
- **Typography**: Space Grotesk (headings), Inter (body)
- **Motion**: Smooth cubic-bezier transitions, scroll reveal, hover lifts, GPU-only animations (`transform`, `opacity`, `filter`)
- **Chess board**: Signature hero element with 3D tilt, tactical highlights, floating pieces — never a playable game
