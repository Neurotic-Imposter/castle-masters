# Founder Requirements — Castle Masters

> This document captures all requirements approved by the founder across development sessions.
> It is the authoritative source of truth for product scope and constraints.
> Requirements are organized by category.
> **Never invent founder information, pricing, or coach data.**

---

## Brand

**Product Name**: Castle Masters
**Tagline**: India's Complete Chess Ecosystem

### Logo

The official Castle Masters logo asset will replace the current temporary ♟ text-mark placeholder.

> **Status**: Official logo asset pending delivery from founder.
> Do NOT implement logo replacement until the asset is provided.
> Existing LogoMark and Logo components already contain placeholder fallback — no code changes needed until asset arrives.

---

## Information Architecture

**Approved Navigation:**
- Home
- Coaching
- Tournaments & Events
- Chess Puzzles *(renamed from "Games" — permanent)*
- Corporate
- Team
- Contact
- Book Free Trial *(Primary CTA — links to Contact)*

**Removed from navigation (permanently — do not recreate):**
- Merchandise *(not a nav page — first commerce flow is the Puzzle Deck product)*
- About
- Academy
- Programs
- Pricing
- Locations
- Success Stories

---

## Homepage Section Order (Strict)

The homepage sections must appear in this exact order:

1. Hero Section
2. Stats Section
3. Mission Section
4. Coaching Section
5. Chess Puzzles Section
6. Upcoming Tournament Section
7. Corporate Section
8. Team Section
9. Testimonials Section
10. FAQ Section
11. CTA Section
12. Footer

**Status**: ✅ Fully implemented (CM013–CM023)

---

## Coaching Page Requirements

- Two categories: **Online Coaching** and **Offline Coaching**
- Each category contains 5 tracks: Beginner, Intermediate, Advanced, Tournament Preparation, One-to-One
- Primary CTAs: "Book Free Trial" and "Contact Us"
- **No pricing** on this page — ever
- Includes learning roadmap and weekly study plan

---

## Tournaments & Events Requirements

**Two tabs only:**

1. **Upcoming** — Tournament cards with:
   - Date
   - Venue
   - Entry Fee
   - Prize Pool
   - Description
   - Register Now CTA → Google Forms link (placeholder)
2. **Past Tournaments** — Archive cards with:
   - Winner (placeholder)
   - Runner-up (placeholder)
   - Standings (placeholder)
   - Results embedded in the card (no separate Results page)

**Permanently removed (do not recreate without explicit founder approval):**
- School Events tab
- Special Events tab
- Registrations portal
- Results table (separate page)
- Leaderboard

> Registration links to Google Forms — no in-app registration system.
> Past tournament cards contain results directly — no separate Results page.

All tournament data is placeholder only. Do not invent winners, venues, or dates.

---

## Chess Puzzles Module Requirements

*(This page was previously called "Games" — it is now "Chess Puzzles" throughout. Never use "Games".)*

### Responsibility A — Interactive Puzzle Demo

- Free demo puzzles playable online
- No login or payment required
- Placeholder interaction (informational alerts) — no chess engine
- Never implement gameplay logic

**Available Now:**
- Mate in 1 Challenges
- Mate in 4 Campaigns

**Coming Soon:**
- Mate in 2 Challenges
- Mate in 3 Campaigns
- Tactical Training Cards

Each card: title, description, visual preview, action button ("Play Demo" or "Notify Me").

### Responsibility B — Puzzle Deck Product (First Commerce Flow)

The academy sells **physical Chess Puzzle Decks**.

Users can:
1. View the product
2. Add to cart
3. Checkout
4. Pay (Razorpay)

This is the **first production commerce flow** for the platform.

> The Puzzle Deck product lives on the Chess Puzzles page — not a separate Merchandise page.

---

## Cart & Commerce Requirements

Commerce is initiated from the Chess Puzzles page (Puzzle Deck product), not a standalone Merchandise navigation item.

The complete purchase journey:

```
Puzzle Deck "Add to Cart" CTA (Chess Puzzles page)
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

- **Not a navigation page** — commerce is accessed via CTAs within pages
- Payments via **Razorpay** (Indian payment gateway)

---

## Development Priority Order

The approved development order is:

1. **Complete website** — all pages built (CM024–CM040)
2. **Backend foundation** — API routes with static/mock data
3. **Database** — Supabase schema and client
4. **Authentication** — user accounts
5. **API** — routes wired to live database
6. **Cart** — cart state and UI
7. **Checkout** — checkout form
8. **Payment** — Razorpay integration
9. **Deployment** — Vercel production

> Payment is part of a complete website delivery, not an isolated early milestone.

---

## Corporate Requirements

- Include: Corporate Tournaments, Leadership Through Chess, Team Building, Employee Engagement, Customized Events
- End with a strong enterprise B2B inquiry CTA and form
- **No pricing** on this page

---

## Team Requirements

- Must remain a dedicated navigation item
- Categories: Founders, Coaches, Trainers, Advisors, Operations Team
- **Do not invent names, biographies, or FIDE ratings**
- **Use professional placeholders only**

---

## Contact Requirements

- Includes: Inquiry Form, Book Free Trial, Location mini-cards, Phone, Email, WhatsApp, Social links
- Location cards: placeholder regional centers (Delhi, Mumbai, Bangalore, Chennai) + Online
- All contact information is professional placeholders

---

## Backend Requirements

- Backend lives **inside Next.js** using App Router API Routes under `app/src/app/api/`
- No separate server
- **Module structure:**
  ```
  modules/
  ├── puzzles/
  ├── tournaments/
  ├── cart/
  ├── payments/
  └── shared/
  ```
- **API Routes:**
  - `GET /api/tournaments`
  - `GET /api/puzzles`
  - `POST /api/cart`
  - `POST /api/checkout`
  - `POST /api/payment/verify`

---

## Database Requirements

- **Provider**: Supabase
- **Tables**: products, orders, puzzles, tournaments, users (future)

---

## Hosting & Infrastructure

| Service | Purpose |
|---|---|
| Vercel | Frontend + API Routes |
| Supabase | Database |
| Razorpay | Indian payment processing |
| GitHub | Source control (connected to Vercel) |

- **Domain**: TBD by founder

---

## Design Language Requirements

### Colors
- Primary brand accent: Emerald `#10B981`
- Secondary accent: Cyan `#06B6D4`
- Ambient accent: Violet `#8B5CF6`
- Background: `#030303`

### Visual Style
- Premium glassmorphism
- Floating ambient lighting (orbs)
- High contrast
- Minimal aesthetic

---

## UI & Motion Requirements

Required motion elements:
- Floating emerald ambient orbs
- Soft cyan lighting
- Glass navigation pill
- Scroll reveal animations
- Staggered card entrances
- Hover lift on cards
- Emerald hover glow
- Animated counters
- Smooth cubic-bezier transitions
- Responsive touch interactions
- Premium button animations
- Gentle parallax in the hero
- Floating chess board
- Subtle highlighted chess move
- Lightweight micro-interactions

All animations must remain elegant and performance-friendly (GPU-only properties: `transform`, `opacity`, `filter`).

---

## Content Rules (Absolute — Never Violate)

Never invent the following:
- Founder names
- Coach names
- Student names
- FIDE ratings
- Testimonials (real quotes)
- Tournament winners
- Addresses
- Phone numbers
- Pricing of any kind

Use professional placeholders consistently.

---

## Technical Constraints

- Prototype (`prototype/index.html`) is **frozen** — never modified
- Production: Next.js 16 (App Router) in `app/` directory
- TypeScript strict mode enforced
- Tailwind CSS is installed and in use
- Keep implementation clean, modular, and migration-ready
- Incremental delivery: each phase is independently releasable

---

## Approval Status

| Requirement Group | Status |
|---|---|
| Information Architecture | ✅ Approved 2026-06-27 |
| Homepage section order | ✅ Approved 2026-06-27 |
| Design language (emerald, `#030303`) | ✅ Approved 2026-06-27 |
| Content rules (no invented data) | ✅ Approved 2026-06-27 |
| Prototype frozen | ✅ Approved 2026-06-27 |
| Production framework (Next.js 16) | ✅ Approved 2026-07-02 |
| Tailwind CSS retained | ✅ Approved 2026-07-02 |
| Backend inside Next.js | ✅ Approved 2026-07-02 |
| Supabase as database | ✅ Approved 2026-07-02 |
| Razorpay as payment gateway | ✅ Approved 2026-07-02 |
| Merchandise removed from nav (cart flow) | ✅ Approved 2026-07-02 |
| Games renamed to Chess Puzzles (permanent) | ✅ Approved 2026-07-02 |
| Module-first architecture | ✅ Approved 2026-07-02 |
| Documentation synchronized | ✅ Approved 2026-07-02 |
| Official logo asset (pending delivery) | ⏸ Pending asset from founder |
| Chess Puzzles: dual responsibility (Demo + Puzzle Deck product) | ✅ Approved 2026-07-10 |
| Tournaments: 2 tabs only (Upcoming + Past) | ✅ Approved 2026-07-10 |
| Tournament registration via Google Forms | ✅ Approved 2026-07-10 |
| Puzzle Deck as first commerce flow | ✅ Approved 2026-07-10 |
| Development order: website → backend → DB → auth → API → cart → checkout → payment → deploy | ✅ Approved 2026-07-10 |
