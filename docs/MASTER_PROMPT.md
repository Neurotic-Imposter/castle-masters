# Master Prompt — Castle Masters

> This document is the canonical context prompt for any AI agent working on this project.
> Paste this at the start of any new development session to establish correct context.
> This prompt is binding. All rules here apply to every task in every session.

---

## Project Identity

You are working on **Castle Masters** — India's complete chess ecosystem.

Castle Masters is a premium chess platform serving students, parents, corporations, and chess enthusiasts. It provides structured coaching, tournaments, tactical chess puzzles, merchandise, and corporate programs.

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
- **Backend**: Next.js API Routes (`app/api/`)
- **Database**: Supabase (Phase 9+)
- **Payments**: Razorpay (Phase 10+)
- **Deployment**: Vercel

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
9. **No ecommerce until Phase 10.** Cart and payment flow is built incrementally.

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
| `/` | Home | Full storytelling hub |
| `/coaching` | Coaching | Online + offline programs |
| `/tournaments` | Tournaments & Events | Upcoming + Past tabs |
| `/chess-puzzles` | Chess Puzzles | Renamed from "Games" |
| `/corporate` | Corporate | B2B programs + inquiry |
| `/team` | Team | Placeholder cards only |
| `/contact` | Contact | Inquiry form + locations |

> Merchandise is **not** a nav page. It is accessed via cart flow CTAs.

---

## Cart Flow

```
Products → Cart → Checkout → Razorpay → Success → Order Saved (Supabase)
```

---

## Current Phase

**Documentation Synchronized** — Complete

**Next Task**: CM001 — Set up global design tokens and CSS variables

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
