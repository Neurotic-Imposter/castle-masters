# CM017 — Chess Puzzles Preview Section Implementation Plan

> **CM017 — Chess Puzzles Preview Section**
> Build the Chess Puzzles Preview homepage section composing existing primitives, preview, verify, delete preview, auto-generate CM018.

---

## 1. SPECIFICATION

### 1.1 Scope

Build the **Chess Puzzles Preview** section component at `app/src/components/sections/ChessPuzzlesPreview.tsx`:

- Compose: `Container`, `Grid`, `Stack`, `Card`, `Heading`, `Text`, `Label`, `Badge`
- Content from `app/src/lib/home.ts`
- Two puzzle cards: "Mate in 1" (Available Now) + "Mate in 4" (Available Now)
- Two "Coming Soon" cards with reduced opacity: "Mate in 2", "Mate in 3"
- "Play Demo" informational buttons (no actual chess engine)
- Responsive: stacked mobile, 2-col tablet, 4-col desktop
- Preview at `cm017-preview/` → verify → delete
- Auto-generate CM018 plan

### 1.2 Out of Scope

- Chess engine or interactive board
- Full puzzle page (separate page at `/chess-puzzles`)
- Backend API calls
- Authentication state
- New primitives

---

## 2. FILE STRUCTURE

```
app/src/
├── components/
│   ├── sections/
│   │   └── ChessPuzzlesPreview.tsx    ← NEW
│   ├── ui/
│   │   ├── Card.tsx                   ← EXISTING
│   │   ├── Heading.tsx                ← EXISTING
│   │   ├── Text.tsx                   ← EXISTING
│   │   ├── Label.tsx                  ← EXISTING
│   │   └── Badge.tsx                  ← EXISTING
│   └── layout/
│       ├── Container.tsx              ← EXISTING
│       ├── Grid.tsx                   ← EXISTING
│       └── Stack.tsx                  ← EXISTING
├── lib/
│   └── home.ts                        ← EXISTING: add CHESS_PUZZLES_CONTENT
└── app/
    ├── page.tsx                       ← MODIFY: add <ChessPuzzlesPreview />
    ├── cm017-preview/
    │   ├── page.tsx                   ← NEW: Preview (DELETE after verify)
    │   └── layout.tsx                 ← NEW: Preview layout (DELETE after verify)
    └── layout.tsx                     ← UNCHANGED
```

---

## 3. IMPLEMENTATION STEPS

### Step 1: Add Content to `app/src/lib/home.ts`

Add `CHESS_PUZZLES_CONTENT` export:

```typescript
export interface PuzzleCard {
  title: string;
  description: string;
  difficulty: 'Available Now' | 'Coming Soon';
  cta: { label: string; href: string };
  disabled?: boolean;
}

export interface ChessPuzzlesPreviewCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  cards: readonly PuzzleCard[];
}

export const CHESS_PUZZLES_CONTENT: ChessPuzzlesPreviewCopy = {
  label: 'Chess Puzzles',
  titleLines: [
    'Sharpen Your Tactics',
    'With Daily Puzzles',
  ],
  subtitle: 'Mate-in-one to complex combinations — new puzzles every day.',
  cards: [
    {
      title: 'Mate in 1',
      description: 'Single-move checkmates to build pattern recognition.',
      difficulty: 'Available Now',
      cta: { label: 'Play Demo →', href: '/chess-puzzles#mate-in-1' },
    },
    {
      title: 'Mate in 4',
      description: 'Multi-move combinations requiring calculation depth.',
      difficulty: 'Available Now',
      cta: { label: 'Play Demo →', href: '/chess-puzzles#mate-in-4' },
    },
    {
      title: 'Mate in 2',
      description: 'Two-move forced mates — coming soon.',
      difficulty: 'Coming Soon',
      cta: { label: 'Notify Me', href: '/chess-puzzles#mate-in-2' },
      disabled: true,
    },
    {
      title: 'Mate in 3',
      description: 'Three-move combinations — coming soon.',
      difficulty: 'Coming Soon',
      cta: { label: 'Notify Me', href: '/chess-puzzles#mate-in-3' },
      disabled: true,
    },
  ],
} as const;
```

---

### Step 2: Create `app/src/components/sections/ChessPuzzlesPreview.tsx`

**Component Documentation Header:**
```tsx
/**
 * ChessPuzzlesPreview
 *
 * Homepage chess puzzles preview section.
 *
 * Responsibilities
 * - Rendering puzzle label, title, subtitle, and program cards
 * - Composing Container, Grid, Stack, Card, Heading, Text, Label, Badge primitives
 * - Responsive layout: 1 column mobile, 2 columns tablet, 4 columns desktop
 * - "Coming Soon" cards rendered with reduced opacity and disabled CTAs
 *
 * Not Responsible For
 * - Full chess puzzles page (separate page at /chess-puzzles)
 * - Chess engine or puzzle logic
 * - Business data fetching
 * - Authentication or user state
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 * - app/src/app/cm017-preview/page.tsx (CM017 preview verification)
 */
```

**Composition:**
- `Container` (size="wide")
- `Stack` for header (Label + Heading + Text)
- `Grid` (columns={4}, gap="lg", responsive: `max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1`)
- `Card` for each puzzle
- `Badge` for "Available Now" / "Coming Soon"
- `Heading` for card title
- `Text` for description
- `Link` for CTA (disabled for coming soon)

**Coming Soon styling:**
```tsx
const isComingSoon = card.difficulty === 'Coming Soon';
<Card
  padding="md"
  className={`text-left h-full flex flex-col ${isComingSoon ? 'opacity-40' : ''}`}
>
  <Stack spacing="sm">
    <Badge variant={isComingSoon ? 'outline' : 'emerald'}>
      {card.difficulty}
    </Badge>
    <Heading as="h3" size="title" className="text-lg">
      {card.title}
    </Heading>
    <Text size="sm" color="muted" className="flex-1">
      {card.description}
    </Text>
    <Link
      href={card.cta.href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-cyan transition-colors mt-auto"
      aria-disabled={isComingSoon}
      tabIndex={isComingSoon ? -1 : undefined}
      onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
      style={isComingSoon ? { pointerEvents: 'none' } : undefined}
    >
      {card.cta.label}
      <span aria-hidden="true">→</span>
    </Link>
  </Stack>
</Card>
```

---

### Step 3: Modify `app/src/app/page.tsx`

Add `<ChessPuzzlesPreview />` after `<CoachingOverview />`:

```tsx
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Mission from '@/components/sections/Mission';
import CoachingOverview from '@/components/sections/CoachingOverview';
import ChessPuzzlesPreview from '@/components/sections/ChessPuzzlesPreview';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />
      <Stats />
      <Mission />
      <CoachingOverview />
      <ChessPuzzlesPreview />
    </div>
  );
}
```

---

### Step 4: Create Preview Route

```
app/src/app/cm017-preview/
├── page.tsx      ← Renders ChessPuzzlesPreview in full page context
└── layout.tsx    ← Minimal wrapper (fonts, globals.css)
```

**page.tsx:**
```tsx
import type { Metadata } from 'next';
import ChessPuzzlesPreview from '@/components/sections/ChessPuzzlesPreview';

export const metadata: Metadata = {
  title: 'CM017 Preview — Chess Puzzles Preview Section',
  description: 'Castle Masters Chess Puzzles Preview section preview',
};

export default function CM017PreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ChessPuzzlesPreview />
    </div>
  );
}
```

**layout.tsx:**
```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import '@/app/globals.css';

const spaceGrotesk = Space_Grotesk({ variable: '--font-heading', subsets: ['latin'] });
const inter = Inter({ variable: '--font-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CM017 Preview — Chess Puzzles Preview Section',
  description: 'Castle Masters Chess Puzzles Preview section preview',
};

export default function CM017PreviewLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

---

### Step 5: Verification Checklist

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Preview route renders | `npm run dev` → visit `/cm017-preview` |
| 2 | Label, title, subtitle display | Visual |
| 3 | 4 cards render: Mate in 1, Mate in 4, Mate in 2, Mate in 3 | Visual |
| 4 | "Available Now" badges (emerald), "Coming Soon" badges (outline, opacity-40) | Visual |
| 5 | "Play Demo" links for available, "Notify Me" for coming soon (disabled) | Click test |
| 6 | Responsive grid: 1 col mobile, 2 col tablet, 4 col desktop | Resize browser |
| 7 | Uses only existing primitives | Code review |
| 8 | `npm run build` passes | Run command |
| 9 | `npm run lint` passes | Run command |
| 10 | `npm run dev` starts without errors | Run command |

---

### Step 6: Cleanup

After verification passes:
- Delete `app/src/app/cm017-preview/`
- Verify `npm run build` still passes

---

### Step 7: Documentation Updates

- Update `docs/TASKS.md` — mark CM017 complete
- Update `docs/SESSION.md` — log CM017 completion
- Update `docs/CHANGELOG.md` — add CM017 entry

---

### Step 8: Auto-Generate CM018 Plan

Immediately generate CM018 — Upcoming Tournament Section implementation plan.

---

## 4. CM018 PREVIEW (Auto-Generated Next)

**CM018 — Upcoming Tournament Section**

- Build `UpcomingTournament` component in `app/src/components/sections/UpcomingTournament.tsx`
- Compose: `Container`, `Stack`, `Card`, `Heading`, `Text`, `Label`, `Badge`
- Single featured tournament card with date, venue, entry fee, prize pool, description, "Register Now" CTA
- Responsive: centered, max-w-3xl
- Preview at `cm018-preview/` → verify → delete
- Auto-generate CM019 plan

---

## 5. PERMANENT PROJECT RULES (Enforced Forever)

1. **Implementation Plan → Approval → Implementation → Verification → Docs → Report → Next Plan**
2. **Never modify production pages** — always preview routes
3. **Single Responsibility** — each file owns one concern
4. **DRY** — no duplicate strings, assets, nav, footer content
5. **Composition over inheritance** — primitives compose
6. **Semantic design tokens** — no hardcoded values
7. **Strict TypeScript** — no `any`, explicit types
8. **No unnecessary dependencies** — use existing
9. **Component headers** — Purpose, Responsibilities, Not Responsible For, Primary Consumers
10. **Split at ~200 lines** — compose smaller components
11. **Prototype = visual truth** — founder assets override placeholders
12. **Auto-generate next CM plan** — no waiting for prompts

---

## 6. APPROVAL

**Status:** READY FOR APPROVAL

**Reviewer:** Review this plan against CM017 scope. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–8 → Auto-generate CM018 PLAN.md