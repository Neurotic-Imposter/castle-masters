# Castle Masters

> India's Complete Chess Ecosystem

**Castle Masters** is a premium chess platform providing coaching, tournaments, corporate programs, tactical chess puzzles (with a physical Puzzle Deck commerce flow), and school outreach — serving players from beginner to advanced across India.

> **Merchandise is not a standalone feature.** The first commerce flow is the Chess Puzzle Deck sold from the Chess Puzzles page.

---

## Repository Structure

```
castle-masters/
├── app/           ← Next.js 16 production application (App Router)
├── prototype/     ← Frozen HTML prototype (visual source of truth — never modify)
├── docs/          ← All project documentation
└── assets/        ← Shared static assets (logos, brand kit)
```

### Directory Purposes

| Directory | Purpose |
|---|---|
| `app/` | Next.js 16 App Router application. All production code lives here. |
| `prototype/` | Single-file HTML prototype approved by founder. Frozen — never modified. |
| `docs/` | Project documentation: architecture, tasks, decisions, session log. |
| `assets/` | Brand kit, logos, and shared static design assets. |

---

## Quick Start

### Prerequisites

- Node.js 20 LTS or higher
- npm 10+
- Git

### Development

```bash
# Enter the production app
cd app

# Install dependencies
npm install

# Start the development server (Turbopack)
npm run dev

# Open in browser
http://localhost:3000
```

### Preview the Prototype

```bash
# Open the frozen prototype directly in your browser
start prototype/index.html
```

---

## Development Workflow

1. Check [SESSION.md](SESSION.md) for the active context and current task
2. Pick the next uncompleted task from [TASKS.md](TASKS.md)
3. Read the relevant section of `prototype/index.html` before writing any component
4. Implement only the requested task — do not touch unrelated files
5. Update `TASKS.md`, `SESSION.md`, and `CHANGELOG.md` after completing the task
6. Wait for review before beginning the next task

---

## Git Workflow

```bash
# Create a feature branch per task
git checkout -b feat/CM015-mission-section

# Commit with task ID
git commit -m "feat(CM015): build mission section"

# Push and open PR
git push origin feat/CM015-mission-section
```

**Branch naming:** `feat/CM###-short-description`
**Commit format:** `feat|fix|docs|chore(CM###): description`

---

## Deployment

- **Platform**: Vercel (planned deployment target)
- **GitHub Repository**: Source control; production deployment setup is tracked in later CM tasks
- **Domain**: TBD by founder

---

## Documentation Index

| File | Purpose |
|---|---|
| [README.md](README.md) | Project overview, setup, and workflow |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical architecture and system design |
| [PRODUCT.md](PRODUCT.md) | Product requirements and feature specifications |
| [TECH_STACK.md](TECH_STACK.md) | Technology decisions and rationale |
| [TASKS.md](TASKS.md) | MVP implementation roadmap (CM001–CM###) |
| [SESSION.md](SESSION.md) | Current session log and active context |
| [DECISIONS.md](DECISIONS.md) | Architecture and product decision log |
| [CHANGELOG.md](CHANGELOG.md) | Versioned history of all changes |
| [MASTER_PROMPT.md](MASTER_PROMPT.md) | Canonical AI agent prompt for all sessions |
| [FOUNDER_REQUIREMENTS.md](FOUNDER_REQUIREMENTS.md) | Approved founder requirements (source of truth) |

---

## Current Phase

**Phase 4 — Inner Pages**

**Completed work**: CM001–CM023

Implemented production pieces:

- **Foundation**
  - Design tokens, fonts, Tailwind theme setup
  - Layout primitives: Container, Section, Stack, Grid, Spacer
  - UI primitives: Button, Card, Heading, Text, Label, Badge
  - Logo system and brand constants
- **Application Shell**
  - Navbar, MobileMenu, Footer, and root application shell
- **Homepage** ✅ **100% Complete**
  - Hero, Stats, Mission, Coaching Overview, Chess Puzzles Preview, Upcoming Tournament, Corporate Overview, Team Preview, Testimonials, FAQ, CTA

**Next Milestone**: CM024 — Coaching page

For detailed task status, see [TASKS.md](TASKS.md).
For internal development questions, refer to [SESSION.md](SESSION.md) and [DECISIONS.md](DECISIONS.md).
