# CM018 — Upcoming Tournament Section Implementation Plan

> **CM018 — Upcoming Tournament Section**
> Single featured tournament card. Server Component. Existing primitives only.

---

## 1. SPECIFICATION

### 1.1 Scope

Build **UpcomingTournament** section at `app/src/components/sections/UpcomingTournament.tsx`:

- One featured tournament card (placeholder data, no invented real tournaments)
- Compose: `Container`, `Stack`, `Card`, `Heading`, `Text`, `Label`, `Badge`, `Link`
- Fields: date, venue, entry fee, prize pool, description, "Register Now" CTA
- Responsive: full-width card, centered, max-w-3xl
- Preview at `cm018-preview/` → verify → delete
- Auto-generate CM019 plan

### 1.2 Out of Scope

- Tournament list/pagination (that's `/tournaments` page)
- Registration logic (CTA links to `/tournaments#register`)
- Backend API, auth, new primitives

---

## 2. FILE STRUCTURE

```
app/src/
├── components/
│   ├── sections/
│   │   └── UpcomingTournament.tsx    ← NEW
│   ├── ui/
│   │   ├── Card.tsx                   ← EXISTING
│   │   ├── Heading.tsx                ← EXISTING
│   │   ├── Text.tsx                   ← EXISTING
│   │   ├── Label.tsx                  ← EXISTING
│   │   └── Badge.tsx                  ← EXISTING
│   └── layout/
│       ├── Container.tsx              ← EXISTING
│       └── Stack.tsx                  ← EXISTING
├── lib/
│   └── home.ts                        ← EXISTING: add UPCOMING_TOURNAMENT_CONTENT
└── app/
    ├── page.tsx                       ← MODIFY: add <UpcomingTournament />
    ├── cm018-preview/
    │   ├── page.tsx                   ← NEW: Preview (DELETE after verify)
    │   └── layout.tsx                 ← NEW: Preview layout (DELETE after verify)
    └── layout.tsx                     ← UNCHANGED
```

---

## 3. IMPLEMENTATION STEPS

### Step 1: Add Content to `app/src/lib/home.ts`

```typescript
export interface TournamentCard {
  date: string;
  venue: string;
  entryFee: string;
  prizePool: string;
  description: string;
  cta: { label: string; href: string };
}

export interface UpcomingTournamentCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  card: TournamentCard;
}

export const UPCOMING_TOURNAMENT_CONTENT: UpcomingTournamentCopy = {
  label: 'Upcoming Tournament',
  titleLines: [
    'Next Major Event',
    'Coming Soon',
  ],
  subtitle: 'Mark your calendar for our flagship tournament of the season.',
  card: {
    date: 'March 15–17, 2026',
    venue: 'Bangalore International Convention Centre',
    entryFee: '₹2,500',
    prizePool: '₹5,00,000',
    description: '3-day classical tournament. Open to all FIDE-rated and unrated players. 9 rounds, 90 min + 30 sec increment. Spot prizes for best U-1800, U-1600, U-1400.',
    cta: { label: 'Register Now →', href: '/tournaments#register' },
  },
} as const;
```

---

### Step 2: Create `app/src/components/sections/UpcomingTournament.tsx`

```tsx
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { UPCOMING_TOURNAMENT_CONTENT } from '@/lib/home';

/**
 * UpcomingTournament
 *
 * Homepage featured tournament preview.
 *
 * Responsibilities
 * - Rendering single tournament card from prototype
 * - Composing Container, Stack, Card, Heading, Text, Label, Badge, Link
 *
 * Not Responsible For
 * - Full tournaments page
 * - Registration logic
 */

export const UpcomingTournament = () => {
  const { label, titleLines, subtitle, card } = UPCOMING_TOURNAMENT_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <Stack spacing="md" className="text-center max-w-2xl mx-auto mb-12">
          <Label color="cyan">{label}</Label>
          <Stack spacing="sm">
            <Heading size="display" gradient className="leading-title">
              {titleLines[0]}
              <br />
              <span className="text-emerald">{titleLines[1]}</span>
            </Heading>
            <Text size="lg" color="muted">{subtitle}</Text>
          </Stack>
        </Stack>

        <Card padding="lg" className="max-w-3xl mx-auto text-left">
          <Stack spacing="md">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="emerald">Upcoming</Badge>
              <Badge variant="outline">{card.date}</Badge>
            </div>

            <Stack spacing="xs">
              <Text size="sm" color="muted">Venue</Text>
              <Text size="base" className="font-medium">{card.venue}</Text>
            </Stack>

            <div className="grid grid-cols-2 gap-4">
              <Stack spacing="xs">
                <Text size="sm" color="muted">Entry Fee</Text>
                <Text size="base" className="font-medium text-emerald">{card.entryFee}</Text>
              </Stack>
              <Stack spacing="xs">
                <Text size="sm" color="muted">Prize Pool</Text>
                <Text size="base" className="font-medium text-cyan">{card.prizePool}</Text>
              </Stack>
            </div>

            <Text size="sm" color="muted">{card.description}</Text>

            <Link
              href={card.cta.href}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 mt-4"
            >
              {card.cta.label}
            </Link>
          </Stack>
        </Card>
      </Container>
    </section>
  );
};

export default UpcomingTournament;
```

---

### Step 3: Modify `app/src/app/page.tsx`

Add `<UpcomingTournament />` after `<ChessPuzzlesPreview />`:

```tsx
import UpcomingTournament from '@/components/sections/UpcomingTournament';
// ...
<ChessPuzzlesPreview />
<UpcomingTournament />
```

---

### Step 4: Create Preview Route

```
app/src/app/cm018-preview/
├── page.tsx      ← Renders UpcomingTournament
└── layout.tsx    ← Minimal wrapper (fonts, globals.css)
```

**page.tsx:**
```tsx
import type { Metadata } from 'next';
import UpcomingTournament from '@/components/sections/UpcomingTournament';

export const metadata: Metadata = {
  title: 'CM018 Preview — Upcoming Tournament Section',
  description: 'Castle Masters Upcoming Tournament section preview',
};

export default function CM018PreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <UpcomingTournament />
    </div>
  );
}
```

**layout.tsx:** Same as previous previews.

---

### Step 5: Verification Checklist

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Preview route renders | `npm run dev` → visit `/cm018-preview` |
| 2 | Label, title, subtitle display | Visual |
| 3 | Card shows: date, venue, entry fee, prize pool, description | Visual |
| 4 | "Register Now" CTA links to `/tournaments#register` | Click test |
| 5 | Responsive: centered, max-w-3xl | Resize browser |
| 6 | Uses only existing primitives | Code review |
| 7 | `npm run build` passes | Run command |
| 8 | `npm run lint` passes | Run command |
| 9 | `npm run dev` starts without errors | Run command |

---

### Step 6: Cleanup

After verification:
- Delete `app/src/app/cm018-preview/`
- Verify `npm run build` still passes

---

### Step 7: Documentation Updates

- Update `docs/TASKS.md` — mark CM018 complete
- Update `docs/SESSION.md` — log CM018 completion
- Update `docs/CHANGELOG.md` — add CM018 entry

---

### Step 8: Auto-Generate CM019 Plan

Immediately generate CM019 — Corporate Overview Section implementation plan.

---

## 4. CM019 PREVIEW (Auto-Generated Next)

**CM019 — Corporate Overview Section**

- Build `CorporateOverview` component in `app/src/components/sections/CorporateOverview.tsx`
- Compose: `Container`, `Grid`, `Stack`, `Card`, `Heading`, `Text`, `Label`, `Badge`
- 2 corporate program cards with highlights
- Responsive: 1 col mobile, 2 col desktop
- Preview at `cm019-preview/` → verify → delete
- Auto-generate CM020 plan

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

**Reviewer:** Review this plan against CM018 scope. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–8 → Auto-generate CM019 PLAN.md