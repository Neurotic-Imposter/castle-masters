# CM012 — Application Shell Integration Plan

> **CM012 — Application Shell Integration**
> Integrate Navbar and Footer into root layout, preserve placeholder page, verify responsive shell.

---

## 1. SPECIFICATION

### 1.1 Scope

Integrate the **Navbar** and **Footer** components into `app/src/app/layout.tsx` to create the complete application shell:

- Import and render `Navbar` at the top of the page (fixed position, z-index managed via CSS)
- Import and render `Footer` at the bottom of the page (normal flow, pushed down by content)
- Preserve existing placeholder `page.tsx` content
- Ensure responsive shell works at all breakpoints
- Keep layout server-rendered where possible (Navbar is Client Component, Footer is Server Component)
- No business logic, no authentication, no backend functionality
- Use existing primitives only

### 1.2 Out of Scope

- Hero section or any page content beyond existing placeholder
- Authentication state or user menus
- Backend API integration
- New UI primitives

---

## 2. FILE STRUCTURE

```
app/src/
├── app/
│   ├── layout.tsx              ← MODIFY: Add Navbar + Footer
│   ├── page.tsx                ← PRESERVE: Existing placeholder
│   ├── cm012-preview/
│   │   ├── page.tsx            ← NEW: Preview page (DELETE after verify)
│   │   └── layout.tsx          ← NEW: Preview layout (DELETE after verify)
│   └── globals.css             ← UNCHANGED
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← EXISTING: Client Component
│   │   └── Footer.tsx          ← EXISTING: Server Component
│   └── ui/
│       ├── Container.tsx       ← EXISTING
│       ├── Grid.tsx            ← EXISTING
│       └── ...                 ← EXISTING
└── lib/
    ├── navigation.ts           ← EXISTING
    └── footer.ts               ← EXISTING
```

---

## 3. IMPLEMENTATION STEPS

### Step 1: Modify `app/src/app/layout.tsx`

**Current structure:**
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

**Required changes:**
1. Import `Navbar` from `@/components/layout/Navbar`
2. Import `Footer` from `@/components/layout/Footer`
3. Wrap `children` with Navbar (fixed) and Footer (bottom)
4. Ensure `body` has `flex-1` to push Footer down

**Result structure:**
```tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Critical requirements:**
- Navbar is a Client Component (`"use client"`) — it will hydrate at the layout boundary
- Footer is a Server Component — no client boundary needed
- `main` with `flex-1` ensures Footer stays at bottom when content is short
- No additional wrappers, no custom CSS

---

### Step 2: Create Preview Route

```
app/src/app/cm012-preview/
├── page.tsx      ← Renders placeholder page with Navbar + Footer
└── layout.tsx    ← Minimal wrapper (fonts, globals.css)
```

**page.tsx:**
```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CM012 Preview — Application Shell',
  description: 'Castle Masters shell integration preview',
};

export default function CM012PreviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h1 className="mb-4 text-3xl font-heading font-bold text-foreground">
            CM012 Application Shell Preview
          </h1>
          <p className="text-text-muted">
            Verifying Navbar (fixed top) and Footer (bottom) integration.
          </p>
        </div>
      </main>
      <Footer />
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
  title: 'CM012 Preview — Application Shell',
  description: 'Castle Masters shell integration preview',
};

export default function CM012PreviewLayout({ children }: { children: React.ReactNode }) {
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

### Step 3: Verification Checklist

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Navbar renders at top, fixed position | Visual: pill nav at top of viewport |
| 2 | Footer renders at bottom | Visual: footer at bottom of page |
| 3 | Footer stays at bottom on short content | Viewport height < content: footer at bottom |
| 4 | Navbar links work (Home, Coaching, etc.) | Click → navigate |
| 5 | Mobile hamburger opens menu | Click hamburger → full-screen drawer |
| 6 | Mobile menu closes on link click | Click nav link → menu closes |
| 7 | Mobile menu closes on Escape | Press Escape → menu closes |
| 8 | Active link highlighted | Current route → emerald color + dot |
| 9 | Responsive: 375px, 768px, 1280px | Resize browser → no overflow |
| 10 | Footer columns responsive (1/2/4) | Resize → grid adapts |
| 11 | Footer disabled links: aria-disabled, no focus, no click | Tab through → skipped; click → nothing |
| 12 | Dynamic copyright year renders | Inspect: `© 2026 Castle Masters...` |
| 13 | `npm run build` passes | Run command |
| 14 | `npm run lint` passes | Run command |
| 14 | `npm run dev` starts without errors | Run command |

---

### Step 4: Verification Commands

```bash
npm run build
npm run lint
npm run dev
# Visit http://localhost:3000/cm012-preview
```

---

### Step 5: Cleanup

After verification passes:
- Delete `app/src/app/cm012-preview/`
- Verify `npm run build` still passes

---

### Step 6: Documentation Updates

- Update `docs/TASKS.md` — mark CM012 complete
- Update `docs/SESSION.md` — log CM012 completion
- Update `docs/CHANGELOG.md` — add CM012 entry

---

### Step 7: Auto-Generate CM013 Plan

Immediately generate CM013 — Hero section implementation plan.

---

## 4. CM013 PREVIEW (Auto-Generated Next)

**CM013 — Hero Section**

- Build `Hero` component in `app/src/components/sections/Hero.tsx`
- Compose: `Container`, `Grid`, `Stack`, `Heading`, `Text`, `Button`, `Badge`
- Hero content from `brand.ts` (name, tagline) + prototype copy
- Chess board visual placeholder (static, no engine)
- CTA buttons: "Book Free Trial" (primary), "Watch Demo" (ghost)
- Stats row: 3 statistics with animated counters
- Responsive: stacked mobile, side-by-side desktop
- Preview at `cm013-preview/` → verify → delete
- Auto-generate CM014 plan

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

**Reviewer:** Review this plan against CM012 scope. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–7 → Auto-generate CM013 PLAN.md