# Master Prompt — Castle Masters

> This document is the canonical context prompt for any AI agent working on this project.
> Paste this at the start of any new development session to establish correct context.
> This prompt is binding. All rules here apply to every task in every session.

---

## Project Identity

You are working on **Castle Masters** — India's complete chess ecosystem.

Castle Masters is a premium chess platform serving students, parents, corporations, and chess enthusiasts. It provides structured coaching, tournaments, tactical chess puzzles (with a physical Puzzle Deck product), and corporate programs.

> **Merchandise is not a standalone feature.** The first commerce flow is the Chess Puzzle Deck sold through the Chess Puzzles page.

---

## Repository Context

```
castle-masters/
├── prototype/     ← FROZEN. Visual source of truth. Never modify.
│   └── index.html ← Approved HTML prototype
├── app/           ← Next.js 16 production application (App Router)
├── docs/          ← All project documentation
└── assets/        ← Static design assets
```

The production application lives in `app/`. All new code goes there.

---

## Technology Stack

- **Framework**: Next.js 16, App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS custom properties (design tokens)
- **Fonts**: Google Fonts via `next/font/google`
- **Animations**: Pure CSS keyframes + JS `IntersectionObserver`
- **Dev Server**: Turbopack
- **Backend**: Next.js API Routes (`app/src/app/api/`, Phase 5)
- **Database**: Supabase (Phase 6+)
- **Auth**: Supabase Auth (Phase 7+)
- **Payments**: Razorpay (Phase 9+)
- **Deployment**: Vercel (Phase 11+)

---

## Core Rules

1. **The prototype is frozen.** `prototype/index.html` must never be modified under any circumstances.
2. **No redesign.** Implement exactly what the prototype shows. Do not improve, simplify, or alter the design.
3. **No invented data.** Never generate names, FIDE ratings, prices, addresses, testimonials, or tournament results.
4. **Use professional placeholders** for all missing real business data.
5. **Tailwind CSS is active.** Use Tailwind utility classes alongside CSS custom properties.
6. **GPU animations only.** Only animate `transform`, `opacity`, and `filter`.
7. **No chess engine.** The chess board is a visual element only — never implement gameplay.
8. **Strict TypeScript.** No `any` types. All props must be typed. Interfaces over inline types.
9. **No commerce until Phase 8–9.** Cart and payment flow is built incrementally after all pages are complete.
10. **Always use "Chess Puzzles".** Never "Games". This is a permanent rename.
11. **Logo placeholder active.** Official logo asset not yet delivered. Do not attempt logo replacement until asset is provided.

---

## Agent Behavior Rules

### Scope Control
- **Never scan the entire project.** Read only the files required for the current task.
- **Never perform project-wide refactors.** Only touch files directly relevant to the task.
- **Never modify unrelated files.** If a file is not mentioned in the task, do not change it.
- **Never redesign pages.** Match the prototype exactly.

### Before Starting Any Task
- State which files will be affected and why
- Explain the full implementation plan before writing any code
- Confirm the task ID from TASKS.md

### After Completing Any Task
- Update `TASKS.md` — mark the task ✅ Complete
- Update `SESSION.md` — record what was done and what comes next
- Update `CHANGELOG.md` — add a versioned entry for the work completed
- **Stop and wait for review** before beginning the next task, unless explicitly instructed to continue

### Code Quality
- Keep components **reusable** — one component, one responsibility
- **Prefer composition over duplication** — extract shared patterns into primitives
- All components must accept and forward relevant HTML attributes (className, etc.)
- Avoid magic numbers — use CSS variables or named constants
- Preserve all existing functionality — never break what is already working

---

## Design Tokens (from prototype)

```css
--bg: #030303;
--bg-card: rgba(15, 15, 20, 0.6);
--bg-card-hover: rgba(25, 25, 35, 0.8);
--border: rgba(255, 255, 255, 0.06);
--border-hover: rgba(16, 185, 129, 0.3);
--accent-emerald: #10B981; /* Primary */
--accent-cyan: #06B6D4;   /* Secondary */
--accent-violet: #8B5CF6; /* Ambient */
--text: #F9FAFB;
--text-muted: #9CA3AF;
--font-heading: 'Space Grotesk', sans-serif;
--font-sans: 'Inter', sans-serif;
```

---

## Information Architecture

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Full storytelling hub — **100% complete** |
| `/coaching` | Coaching | Online + offline programs |
| `/tournaments` | Tournaments & Events | Upcoming + Past tabs only |
| `/chess-puzzles` | Chess Puzzles | Demo puzzles + Puzzle Deck product |
| `/corporate` | Corporate | B2B programs + inquiry |
| `/team` | Team | Placeholder cards only |
| `/contact` | Contact | Inquiry form + locations |

> **Merchandise is not a nav page.** Commerce is initiated from the Chess Puzzles page (Puzzle Deck).

> **Tournament tabs**: Upcoming and Past only. School Events and Special Events tabs have been removed per founder decision.

---

## Homepage Section Order

The homepage is **fully implemented** (CM013–CM023):

1. Hero Section ✅
2. Stats Section ✅
3. Mission Section ✅
4. Coaching Overview Section ✅
5. Chess Puzzles Preview Section ✅
6. Upcoming Tournament Section ✅
7. Corporate Overview Section ✅
8. Team Preview Section ✅
9. Testimonials Section ✅
10. FAQ Section ✅
11. CTA Section ✅
12. Footer ✅

**Next task**: CM024 — Coaching page

---

## Development Phase Order

1. **Phase 4** — Inner pages (Coaching, Tournaments, Chess Puzzles, Corporate, Team, Contact)
2. **Phase 5** — Backend API routes (static mock data)
3. **Phase 6** — Database (Supabase)
4. **Phase 7** — Authentication
5. **Phase 8** — Cart & Checkout
6. **Phase 9** — Razorpay Payments
7. **Phase 10** — Admin Dashboard
8. **Phase 11** — Production Deployment
9. **Phase 12** — Quality Assurance

---

## Cart Flow

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

---

## Current Phase

**Phase 4 — Inner Pages**

**Completed work**: CM001–CM023 (Homepage 100% complete)

**Next Task**: CM024 — Coaching page

See [TASKS.md](TASKS.md) for the full implementation roadmap.

---

## How to Approach Any Task

1. Identify the task ID in TASKS.md
2. Read the relevant section of `prototype/index.html` — extract HTML and CSS
3. State which files will be created or modified
4. Explain the implementation plan
5. Implement only the requested task
6. Update TASKS.md, SESSION.md, and CHANGELOG.md
7. Stop and wait for review
