# CM013 — Hero Section Implementation Plan

> **CM013 — Hero Section**
> Build the Hero section component composing existing primitives, preview, verify, delete preview, auto-generate CM014.

---

## 1. SPECIFICATION

### 1.1 Scope

Build the **Hero** section component at `app/src/components/sections/Hero.tsx`:

- Compose: `Container`, `Grid`, `Stack`, `Heading`, `Text`, `Button`, `Badge`, `Logo`
- Content from `brand.ts` (name, tagline) + prototype copy
- Chess board visual placeholder (static, no engine)
- CTA buttons: "Book Free Trial" (primary), "Watch Demo" (ghost)
- Stats row: 3 statistics with animated counters
- Responsive: stacked mobile, side-by-side desktop
- Preview at `cm013-preview/` → verify → delete
- Auto-generate CM014 plan

### 1.2 Out of Scope

- Chess engine or interactive board
- Animation library (use CSS transitions only)
- Backend API calls
- Authentication state
- New primitives

---

## 2. FILE STRUCTURE

```
app/src/
├── components/
│   ├── sections/
│   │   └── Hero.tsx              ← NEW: Hero section component
│   ├── ui/
│   │   ├── Heading.tsx           ← EXISTING
│   │   ├── Text.tsx              ← EXISTING
│   │   ├── Button.tsx            ← EXISTING
│   │   ├── Badge.tsx             ← EXISTING
│   │   └── logo/Logo.tsx         ← EXISTING
│   └── layout/
│       ├── Container.tsx         ← EXISTING
│       ├── Grid.tsx              ← EXISTING
│       └── Stack.tsx             ← EXISTING
├── lib/
│   └── brand.ts                  ← EXISTING: BRAND.name, BRAND.tagline
└── app/
    ├── page.tsx                  ← MODIFY: Import Hero
    ├── cm013-preview/
    │   ├── page.tsx              ← NEW: Preview (DELETE after verify)
    │   └── layout.tsx            ← NEW: Preview layout (DELETE after verify)
    └── layout.tsx                ← UNCHANGED (Navbar + Footer already integrated)
```

---

## 3. IMPLEMENTATION STEPS

### Step 1: Create `app/src/components/sections/Hero.tsx`

**Component Documentation Header:**
```tsx
/**
 * Hero
 *
 * Homepage hero section — primary visual and CTA entry point.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Heading, Text, Button, Badge, Logo primitives
 * - Rendering brand name, tagline, CTA buttons, stats row, chess board visual
 * - Responsive layout: stacked mobile (<768px), side-by-side desktop (≥768px)
 * - Static chess board placeholder (no engine, no interactivity)
 * - Animated counter numbers (CSS-only, respects prefers-reduced-motion)
 *
 * Not Responsible For
 * - Chess game logic or engine
 * - Authentication or user state
 * - Routing (CTAs are Links/Buttons with href from data)
 * - Data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 * - app/src/app/cm013-preview/page.tsx (CM013 preview verification)
 */
```

**Data Source:**
- `BRAND.name`, `BRAND.tagline` from `@/lib/brand`
- Prototype copy for description, CTA labels, stat labels/values
- No new data files needed

**Composition:**
```tsx
// Layout structure:
<Container size="wide">
  <Stack spacing="xl" className="py-16 md:py-24">
    {/* ── Copy Column ── */}
    <Stack spacing="md" className="text-center md:text-left">
      <Badge variant="emerald" pulse>New</Badge>
      <Heading size="hero" as="h1" gradient>
        {BRAND.name}
      </Heading>
      <Text size="xl" color="muted" className="max-w-2xl mx-auto md:mx-0">
        {BRAND.tagline}
      </Text>
      <Text size="lg" color="muted" className="max-w-xl mx-auto md:mx-0">
        Prototype description copy here...
      </Text>
      {/* ── CTA Buttons ── */}
      <Stack spacing="sm" direction="row" className="justify-center md:justify-start gap-4">
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact">Book Free Trial</Link>
        </Button>
        <Button variant="ghost" size="lg" asChild>
          <Link href="/demo">Watch Demo</Link>
        </Button>
      </Stack>
    </Stack>

    {/* ── Visual Column ── */}
    <div className="relative">
      {/* Chess board visual placeholder */}
      <ChessBoardPlaceholder />
    </div>

    {/* ── Stats Row ── */}
    <Stack spacing="md" className="pt-8 border-t border-border">
      <Stack direction="row" spacing="lg" className="flex-wrap justify-center gap-8 md:gap-12">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </Stack>
    </Stack>
  </Stack>
</Container>
```

**ChessBoardPlaceholder:**
- Static visual using CSS Grid (8×8)
- Alternating dark/light squares
- 3–4 pieces positioned as in prototype
- No JavaScript, no canvas, no engine
- Respects `prefers-reduced-motion`

**StatItem:**
- Animated counter using CSS `counter-increment` + `animation` (or simple static number if animation complex)
- Label below number
- `Text` primitive for label, `Heading` for number
- Respects `prefers-reduced-motion`

---

### Step 2: Modify `app/src/app/page.tsx`

Import and render `Hero` in the existing placeholder page:
```tsx
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Hero />
      {/* Existing placeholder content can remain below or be removed */}
    </div>
  );
}
```

---

### Step 3: Create Preview Route

```
app/src/app/cm013-preview/
├── page.tsx      ← Renders Hero in full page context
└── layout.tsx    ← Minimal wrapper (fonts, globals.css)
```

**page.tsx:**
```tsx
import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'CM013 Preview — Hero Section',
  description: 'Castle Masters Hero section preview',
};

export default function CM013PreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
    </div>
  );
}
```

---

### Step 4: Verification Checklist

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Hero renders without errors | `npm run dev` → visit `/cm013-preview` |
| 2 | Brand name + tagline from `brand.ts` | Visual: "Castle Masters" + "Building stronger positions." |
| 3 | Description copy renders | Visual |
| 4 | CTA buttons: "Book Free Trial" (primary), "Watch Demo" (ghost) | Visual + click → navigate |
| 5 | Chess board placeholder renders (8×8 grid, pieces) | Visual |
| 6 | Stats row: 3 items with numbers + labels | Visual |
| 7 | Animated counters work (or static fallback) | Visual |
| 8 | Responsive: stacked <768px, side-by-side ≥768px | Resize browser |
| 9 | `prefers-reduced-motion` respected | Toggle in DevTools → animations disabled |
| 10 | Uses only primitives: Container, Grid, Stack, Heading, Text, Button, Badge, Logo | Code review |
| 11 | No bespoke CSS layout (Tailwind via primitives only) | Code review |
| 12 | `npm run build` passes | Run command |
| 13 | `npm run lint` passes | Run command |
| 14 | `npm run dev` starts without errors | Run command |

---

### Step 5: Verification Commands

```bash
npm run build
npm run lint
npm run dev
# Visit http://localhost:3000/cm013-preview
```

---

### Step 6: Cleanup

After verification passes:
- Delete `app/src/app/cm013-preview/`
- Verify `npm run build` still passes

---

### Step 7: Documentation Updates

- Update `docs/TASKS.md` — mark CM013 complete
- Update `docs/SESSION.md` — log CM013 completion
- Update `docs/CHANGELOG.md` — add CM013 entry

---

### Step 8: Auto-Generate CM014 Plan

Immediately generate CM014 — Stats section implementation plan.

---

## 4. CM014 PREVIEW (Auto-Generated Next)

**CM014 — Stats Section**

- Build `Stats` component in `app/src/components/sections/Stats.tsx`
- Compose: `Container`, `Grid`, `Stack`, `Heading`, `Text`, `Badge`
- 3–4 statistics with animated counters
- Responsive grid: 1 col mobile, 2 tablet, 3–4 desktop
- Preview at `cm014-preview/` → verify → delete
- Auto-generate CM015 plan

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

**Reviewer:** Review this plan against CM013 scope. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–8 → Auto-generate CM014 PLAN.md