# Founder Requirements — Castle Masters

> This document captures all requirements approved by the founder across development sessions.
> It is the authoritative source of truth for product scope and constraints.
> Requirements are organized by category.
> **Never invent founder information, pricing, or coach data.**

---

## Brand

**Product Name**: Castle Masters
**Tagline**: India's Complete Chess Ecosystem

---

## Information Architecture

**Approved Navigation:**
- Home
- Coaching
- Tournaments & Events
- Chess Puzzles *(renamed from "Games")*
- Corporate
- Team
- Contact
- Book Free Trial *(Primary CTA — links to Contact)*

**Removed from navigation (permanently):**
- Merchandise *(moved to cart flow, not a nav page)*
- About
- Academy
- Programs
- Pricing
- Locations
- Success Stories

> **Note on Merchandise**: The merchandise/cart flow exists as a product, but is not a top-level navigation item. Users access it through CTAs, not the main nav.

---

## Homepage Section Order (Strict)

The homepage sections must appear in this exact order:

1. Hero
2. Statistics
3. Our Mission
4. Coaching Overview
5. Chess Puzzles Preview *(renamed from Games Preview)*
6. Upcoming Tournament
7. Corporate Overview
8. Team Preview
9. Testimonials
10. FAQ
11. Book Free Trial
12. Footer

---

## Coaching Page Requirements

- Two categories: **Online Coaching** and **Offline Coaching**
- Each category contains 5 tracks: Beginner, Intermediate, Advanced, Tournament Preparation, One-to-One
- Primary CTAs: "Book Free Trial" and "Contact Us"
- **No pricing** on this page — ever
- Includes learning roadmap and weekly study plan

---

## Tournaments & Events Requirements

**Tabs to include:**
1. **Upcoming** — Tournament cards with:
   - Date
   - Venue
   - Entry Fee
   - Prize Pool
   - Description
   - Register Now CTA
2. **Past Tournaments** — Archive cards with:
   - Winner
   - Runner-up
   - Standings
   - View Results CTA
3. **School Events** — School outreach and inter-school leagues
4. **Special Events** — Masterclasses and specialty events

**Removed tabs (do not recreate without explicit approval):**
- Registrations portal
- Results table
- Leaderboard

All tournament data is placeholder only. Do not invent winners, venues, or dates.

---

## Chess Puzzles Module Requirements

*(This page was previously called "Games" — it is now "Chess Puzzles")*

- Independent module — not coupled to payments
- Must remain a dedicated navigation item
- **Available Now:**
  - Mate in 1 Challenges
  - Mate in 4 Campaigns
- **Coming Soon:**
  - Mate in 2 Challenges
  - Mate in 3 Campaigns
  - Tactical Training Cards
- Each card must have: description, preview, "Play Demo" placeholder button
- **Do not build a chess engine**
- **Do not build gameplay**
- Premium puzzle packs are a planned future monetization feature

---

## Cart & Merchandise Requirements

The merchandise flow follows this path:

```
Products → Cart → Checkout → Razorpay → Success → Order Saved
```

- **Not a navigation page** — accessed via CTAs
- Categories: Training Cards, Chess Boards, Books, Chess Clocks, Apparel
- Initial state: Coming Soon (no live ecommerce until Razorpay is integrated)
- Full cart → payment → order save flow to be built in Phases 7–10
- Payments via **Razorpay** (Indian payment gateway)

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

- Backend lives **inside Next.js** using App Router API Routes
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
- Inspired by Synapse design system aesthetic — not copying it

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
- Better mobile navigation
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
| Games renamed to Chess Puzzles | ✅ Approved 2026-07-02 |
| Tournament tabs simplified (no Registrations/Results/Leaderboard) | ✅ Approved 2026-07-02 |
| Module-first architecture | ✅ Approved 2026-07-02 |
| Documentation synchronized | ✅ Approved 2026-07-02 |
