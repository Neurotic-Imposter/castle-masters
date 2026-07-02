# Decision Log — Castle Masters

> All significant architecture, product, and design decisions are recorded here with rationale.
> Format: Decision number, date, category, decision, rationale, alternatives considered.

---

## DEC-001 — Prototype as Visual Source of Truth

**Date**: 2026-06-27
**Category**: Process
**Decision**: The HTML prototype (`prototype/index.html`) is frozen and becomes the visual source of truth for production development. It must never be modified unless explicitly requested by the founder.
**Rationale**: The prototype has completed founder review and is approved. Any accidental modifications would invalidate the baseline reference design.
**Alternatives Considered**: Using Figma designs as source of truth — rejected because the prototype is the final approved artifact.

---

## DEC-002 — Emerald-First Brand Color

**Date**: 2026-06-27
**Category**: Design
**Decision**: The primary brand accent color is Emerald `#10B981`, not the previously used green `#4ADE80`.
**Rationale**: Emerald `#10B981` is more sophisticated and premium. The brighter lime green felt generic.
**Alternatives Considered**: `#4ADE80` (previous prototype green), `#22C55E` (Tailwind green-500).

---

## DEC-003 — Background Color

**Date**: 2026-06-27
**Category**: Design
**Decision**: Background color is `#030303` (near-black), not standard dark navy `#0B1020`.
**Rationale**: `#030303` creates a more premium, editorial feel aligned with the Synapse-inspired design direction.
**Alternatives Considered**: `#0B1020` (previous prototype background), `#000000` (pure black).

---

## DEC-004 — Single-File HTML Prototype

**Date**: 2026-06-27
**Category**: Architecture
**Decision**: The prototype is a single `index.html` file containing all CSS, HTML, and JavaScript inline. This will not be changed or split.
**Rationale**: Single-file prototyping enabled rapid iteration and founder review without a build pipeline.
**Alternatives Considered**: Splitting into separate CSS/JS files — rejected for the prototype phase.

---

## DEC-005 — No Invented Business Data

**Date**: 2026-06-27
**Category**: Content
**Decision**: No names, FIDE ratings, pricing, testimonials, addresses, or tournament results shall be invented or populated until the founder provides real data.
**Rationale**: Invented data risks being misinterpreted as real information and creates cleanup work. Professional placeholders are equally effective visually.
**Alternatives Considered**: Fictional placeholder names — rejected as implying false credibility.

---

## DEC-006 — Hero Chess Board Visual Only

**Date**: 2026-06-27
**Category**: Product
**Decision**: The chess board in the hero section is a visual-only CSS Grid element. It will never be a playable game.
**Rationale**: A chess engine adds significant complexity, bugs, and performance cost to a marketing website. The tactical highlight visualization provides full visual value.
**Alternatives Considered**: Embedding chess.js/chessboard.js — rejected for the hero.

---

## DEC-007 — Next.js 16 with App Router

**Date**: 2026-07-02
**Category**: Technology
**Decision**: The production application is built in **Next.js 16** using the App Router pattern.
**Rationale**: Next.js 16 is current. App Router enables React Server Components for better performance, and Vercel deployment is seamless. Turbopack provides fast development builds.
**Alternatives Considered**: Pages Router (legacy), plain React with Vite (no SSR), Next.js 14 (older version — upgraded to 16).

---

## DEC-008 — Tailwind CSS Retained

**Date**: 2026-07-02
**Category**: Technology
**Decision**: Tailwind CSS is installed and used in the production application alongside CSS custom properties for brand design tokens.
**Rationale**: Tailwind accelerates UI development. Custom properties carry the brand tokens. Both coexist without conflict. The earlier decision to exclude Tailwind was based on an incorrect assumption about the prototype migration — it does not apply to the production Next.js app.
**Alternatives Considered**: Vanilla CSS only — rejected as slower for component-level utility styling.

---

## DEC-009 — Information Architecture (7 Nav Pages)

**Date**: 2026-07-02 *(revised from 2026-06-27)*
**Category**: Product
**Decision**: The site navigation contains 7 pages: Home, Coaching, Tournaments & Events, Chess Puzzles, Corporate, Team, Contact. Merchandise is removed from the nav and handled via cart flow.
**Rationale**: Merchandise as a nav item implied a full shopping experience. Moving it to a cart flow is more appropriate for an ecommerce model and reduces nav clutter.
**Alternatives Considered**: Merchandise as nav page (previous decision) — superseded by founder direction.

---

## DEC-010 — No Pricing Information

**Date**: 2026-06-27
**Category**: Product
**Decision**: No pricing, package costs, or fee structures will be published on any page of the website.
**Rationale**: The primary conversion action is "Book Free Trial" — pricing is discussed in the sales conversation to avoid upfront drop-off.
**Alternatives Considered**: Showing price ranges — rejected by founder.

---

## DEC-011 — Games Renamed to Chess Puzzles

**Date**: 2026-07-02
**Category**: Product
**Decision**: The "Games" page and navigation item is renamed to "Chess Puzzles". Route changes to `/chess-puzzles`.
**Rationale**: "Chess Puzzles" is more specific, descriptive, and accurately represents the module's content. "Games" was too generic.
**Alternatives Considered**: Keeping "Games" — rejected as not descriptive enough.

---

## DEC-012 — Tournament Tabs Simplified

**Date**: 2026-07-02
**Category**: Product
**Decision**: The Tournaments page tabs are reduced to: Upcoming, Past Tournaments, School Events, Special Events. Removed: Registrations portal, Results table, Leaderboard.
**Rationale**: The removed tabs required backend infrastructure (registration system, results data) not yet built. Simplified tabs can be built and released immediately.
**Alternatives Considered**: Building all 7 original tabs — rejected as premature without backend.

---

## DEC-013 — Backend Inside Next.js

**Date**: 2026-07-02
**Category**: Architecture
**Decision**: All backend logic lives inside Next.js using App Router API Routes. No separate Express/Fastify/NestJS server.
**Rationale**: Reduces infrastructure complexity. Next.js API Routes provide sufficient capability for the planned endpoints. Vercel deployment handles both frontend and API seamlessly.
**Alternatives Considered**: Separate Express server, separate NestJS server — rejected as over-engineered for current scope.

---

## DEC-014 — Supabase as Database

**Date**: 2026-07-02
**Category**: Technology
**Decision**: Supabase is the selected database and backend-as-a-service provider.
**Rationale**: Supabase provides PostgreSQL database, auth, and storage in one platform. Excellent Next.js SDK support. Generous free tier for early-stage products.
**Alternatives Considered**: Firebase (NoSQL, more complex pricing), PlanetScale (MySQL, fewer features), self-hosted PostgreSQL (operational overhead).

---

## DEC-015 — Razorpay as Payment Gateway

**Date**: 2026-07-02
**Category**: Technology
**Decision**: Razorpay is the selected payment gateway for Indian transactions.
**Rationale**: Razorpay is purpose-built for India. Supports UPI, Net Banking, Cards, Wallets. Straightforward integration with Next.js. Well-documented.
**Alternatives Considered**: Stripe (limited Indian payment method support), PayU (less developer-friendly).

---

## DEC-016 — Chess Puzzle Module Independent

**Date**: 2026-07-02
**Category**: Architecture
**Decision**: The Chess Puzzles module is built as an independent module, not coupled to the cart or payment system.
**Rationale**: Free puzzles (Mate in 1, Mate in 4) must be accessible without payment. Premium puzzle packs are a future monetization layer. Decoupling ensures free content is never blocked by payment infrastructure.
**Alternatives Considered**: Gating all puzzles behind payment — rejected; free content is a discovery and retention tool.

---

## DEC-017 — Module-First Architecture

**Date**: 2026-07-02
**Category**: Architecture
**Decision**: Production code is organized into domain modules (`modules/puzzles`, `modules/tournaments`, `modules/cart`, `modules/payments`, `modules/shared`) alongside the Next.js `app/` directory.
**Rationale**: Module boundaries enforce separation of concerns. Each feature (puzzles, cart, payments) can be developed, tested, and deployed independently without risk to other modules.
**Alternatives Considered**: Flat component structure — rejected as it leads to coupling and unclear ownership as the codebase grows.

---

## DEC-018 — Incremental Implementation

**Date**: 2026-07-02
**Category**: Process
**Decision**: Features are implemented one task at a time, in phase order. Each task is reviewed before the next begins, unless the founder explicitly instructs otherwise.
**Rationale**: Incremental delivery reduces risk, enables early feedback, and avoids large untested batches of code. Each completed task is a working, reviewable deliverable.
**Alternatives Considered**: Building all pages at once — rejected as unreviewed and high-risk.
