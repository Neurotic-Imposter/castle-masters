# CM014 — Stats Section Implementation Plan

> **CM014 — Stats Section**
> Build the Stats section component composing existing primitives, preview, verify, delete preview, auto-generate CM015.

---

## 1. SPECIFICATION

### 1.1 Scope

Build the **Stats** section component at `app/src/components/sections/Stats.tsx`:

- Compose: `Container`, `Grid`, `Stack`, `Heading`, `Text`, `Badge`
- 4 statistics with animated counters (reusing `StatItem` pattern from Hero)
- Section label + title above stats row (matching prototype "Statistics" / "By the Numbers")
- Responsive grid: 1 col mobile (<640px), 2 col tablet (640–1024px), 4 col desktop (≥1024px)
- Preview at `cm014-preview/` → verify → delete
- Auto-generate CM015 plan

### 1.2 Out of Scope

- New primitives
- Backend API calls
- Authentication state
- Chess engine or interactive elements

---

## 2. FILE STRUCTURE

```
app/src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              ← EXISTING (CM013)
│   │   └── Stats.tsx             ← NEW: Stats section component
│   ├── ui/
│   │   ├── Heading.tsx           ← EXISTING
│   │   ├── Text.tsx              ← EXISTING
│   │   ├── Badge.tsx             ← EXISTING
│   │   └── Card.tsx              ← EXISTING (glass variant for stat cards)
│   └── layout/
│       ├── Container.tsx         ← EXISTING
│       ├── Grid.tsx              ← EXISTING
│       └── Stack.tsx             ← EXISTING
├── lib/
│   └── brand.ts                  ← EXISTING
└── app/
    ├── page.tsx                  ← MODIFY: Import Stats after Hero
    ├── cm014-preview/
    │   ├── page.tsx              ← NEW: Preview (DELETE after verify)
    │   └── layout.tsx            ← NEW: Preview layout (DELETE after verify)
    └── layout.tsx                ← UNCHANGED
```

---

## 3. IMPLEMENTATION STEPS

### Step 1: Create `app/src/components/sections/Stats.tsx`

**Component Documentation Header:**
```tsx
/**
 * Stats
 *
 * Statistics section — displays key metrics with animated counters.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Heading, Text, Badge, Card primitives
 * - Rendering section label, section title, 4 stat cards with animated numbers
 * - Responsive grid: 1 col mobile (<640px), 2 col tablet (640–1024px), 4 col desktop (≥1024px)
 * - Animated counter numbers (CSS-only, respects prefers-reduced-motion)
 * - Reuses StatItem pattern from Hero for consistency
 *
 * Not Responsible For
 * - Data fetching (stats are static from prototype)
 * - Chess game logic or engine
 * - Authentication or user state
 * - Routing
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page, after Hero)
 * - app/src/app/cm014-preview/page.tsx (CM014 preview verification)
 */
```

**Data Source:**
- Prototype copy for section label, title, subtitle, stat labels/values
- No new data files needed

**Composition:**
```tsx
// Layout structure:
<Container size="wide">
  <Stack spacing="lg" className="py-20">
    {/* ── Section Header ── */}
    <div className="text-center">
      <Badge variant="cyan">Statistics</Badge>
      <Stack spacing="sm" className="mt-4">
        <Heading size="display" as="h2" gradient>
          By the Numbers
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl mx-auto">
          Key metrics that define our impact across India's chess ecosystem.
        </Text>
      </Stack>
    </div>

    {/* ── Stats Grid ── */}
    <Grid columns={4} gap="lg" className="mt-12">
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </Grid>
  </Stack>
</Container>
```

**StatCard Component:**
- Glass card variant (matches prototype `.stat-card`)
- Centered content
- Animated counter (Heading size="display", gradient text)
- Label below (Text size="xs", color="muted", uppercase, tracking)
- Respects `prefers-reduced-motion`

**STATS Data:**
```tsx
const STATS = [
  { label: 'Tournaments Hosted', value: 15 },
  { label: 'Expert Coaches', value: 25 },
  { label: 'Active Students', value: 200 },
  { label: 'School Partners', value: 12 },
] as const;
```

---

### Step 2: Modify `app/src/app/page.tsx`

Import and render `Stats` after `Hero`:
```tsx
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />
      <Stats />
    </div>
  );
}
```

---

### Step 3: Create Preview Route

```
app/src/app/cm014-preview/
├── page.tsx      ← Renders Stats in full page context
└── layout.tsx    ← Minimal wrapper (fonts, globals.css)
```

**page.tsx:**
```tsx
import type { Metadata } from 'next';
import Stats from '@/components/sections/Stats';

export const metadata: Metadata = {
  title: 'CM014 Preview — Stats Section',
  description: 'Castle Masters Stats section preview',
};

export default function CM014PreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Stats />
    </div>
  );
}
```

**layout.tsx:**
```tsx
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import '@/app/globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CM014 Preview — Stats Section',
  description: 'Castle Masters Stats section preview',
};

export default function CM014PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
```

---

### Step 4: Verification Checklist

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Stats renders without errors | `npm run dev` → visit `/cm014-preview` |
| 2 | Section label "Statistics" (cyan badge) | Visual |
| 3 | Section title "By the Numbers" (gradient) | Visual |
| 4 | Section subtitle renders | Visual |
| 5 | 4 stat cards in responsive grid | Visual + resize browser |
| 6 | Stat numbers: 15, 25, 200, 12 | Visual |
| 7 | Stat labels match prototype | Visual |
| 8 | Animated counters work (or static fallback) | Visual |
| 9 | Responsive: 1 col <640px, 2 col 640–1024px, 4 col ≥1024px | Resize browser |
| 10 | `prefers-reduced-motion` respected | Toggle in DevTools |
| 11 | Uses only primitives: Container, Grid, Stack, Heading, Text, Badge, Card | Code review |
| 12 | No bespoke CSS layout (Tailwind via primitives only) | Code review |
| 13 | `npm run build` passes | Run command |
| 14 | `npm run lint` passes | Run command |
| 15 | `npm run dev` starts without errors | Run command |

---

### Step 5: Verification Commands

```bash
npm run build
npm run lint
npm run dev
# Visit http://localhost:3000/cm014-preview
```

---

### Step 6: Cleanup

After verification passes:
- Delete `app/src/app/cm014-preview/`
- Verify `npm run build` still passes

---

### Step 7: Documentation Updates

- Update `docs/TASKS.md` — mark CM014 complete
- Update `docs/SESSION.md` — log CM014 completion
- Update `docs/CHANGELOG.md` — add CM014 entry

---

### Step 8: Auto-Generate CM015 Plan

Immediately generate CM015 — Mission Section implementation plan.

---

## 4. CM015 PREVIEW (Auto-Generated Next)

**CM015 — Mission Section**

- Build `Mission` component in `app/src/components/sections/Mission.tsx`
- Compose: `Container`, `Stack`, `Heading`, `Text`, `Badge`
- Mission quote with emerald accent, supporting description
- Preview at `cm015-preview/` → verify → delete
- Auto-generate CM016 plan

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

**Reviewer:** Review this plan against CM014 scope. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–8 → Auto-generate CM015 PLAN.md