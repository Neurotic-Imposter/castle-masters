# CM011 — Footer Implementation Plan

> **CM011 — Footer Component**
> Build the Castle Masters Footer component following all CM011 architectural refinements.

---

## 1. SPECIFICATION

### 1.1 Scope

Build the **Footer** presentational component that:
- Renders footer columns from `app/src/lib/footer.ts`
- Composes existing primitives: `Container`, `Grid`, `Stack`, `Logo`, `Text`, `Label`
- Renders copyright year dynamically via `new Date().getFullYear()`
- Renders disabled footer links with `aria-disabled="true"`, no keyboard focus, non-clickable
- Prepares `SOCIAL_LINKS` export array (empty, not rendered yet)
- Creates preview route at `app/src/app/cm011-preview/` for verification
- Deletes preview route after verification

### 1.2 Out of Scope

- Navbar integration (CM012)
- Layout.tsx integration (CM012)
- Social link rendering (future CM task)
- Authentication, backend, business logic
- Production page modifications (use preview route)

---

## 2. ARCHITECTURAL REFINEMENTS (CM011 Mandatory Rules)

| # | Rule | Enforcement |
|---|------|-------------|
| 1 | **Separate Footer Data** — `footer.ts` owns `FooterColumn`, `FOOTER_COLUMNS`, `FOOTER`, `SOCIAL_LINKS` | `navigation.ts` owns only primary navigation |
| 2 | **Keep brand.ts Focused** — `brand.ts` = name, tagline, assets only. Footer copy goes in `footer.ts` | No footer copy in `brand.ts` |
| 3 | **Prepare Social Links** — Export `SOCIAL_LINKS = []` in `footer.ts` (empty, not rendered) | Future-ready API |
| 4 | **Dynamic Copyright Year** — Use `new Date().getFullYear()` | No hardcoded years |
| 5 | **Disabled Links** — `aria-disabled="true"`, `tabIndex={-1}`, `pointer-events-none`, non-clickable | Visually distinct, inaccessible |
| 6 | **Footer = Presentational** — Renders data only. No routing logic, no business logic | Consumer decides routing |
| 7 | **Compose Primitives** — Use `Container`, `Grid`, `Stack`, `Logo`, `Text`, `Label` | No bespoke CSS layout |
| 8 | **Keep Footer Small** — Split at ~200 lines into `Footer`, `FooterColumn`, `FooterBottom` | Composition over size |
| 9 | **Preview Route Only** — Verify at `app/src/app/cm011-preview/` | Never touch `page.tsx` or `layout.tsx` |

---

## 3. FILE STRUCTURE

```
app/src/
├── lib/
│   ├── footer.ts           ← NEW: Footer data (FooterColumn, FOOTER_COLUMNS, FOOTER, SOCIAL_LINKS)
│   ├── brand.ts            ← EXISTING: brand identity only
│   └── navigation.ts       ← EXISTING: primary nav only (no footer data)
├── components/
│   ├── layout/
│   │   ├── Footer.tsx           ← NEW: Main footer (≤200 lines)
│   │   ├── FooterColumn.tsx     ← NEW: Column renderer (if Footer >200 lines)
│   │   └── FooterBottom.tsx     ← NEW: Copyright/legal bottom bar (if Footer >200 lines)
│   └── ui/
│       ├── Text.tsx       ← EXISTING
│       ├── Label.tsx      ← EXISTING
│       └── logo/Logo.tsx  ← EXISTING
├── app/
│   ├── cm011-preview/
│   │   ├── page.tsx       ← NEW: Preview page (DELETE after verify)
│   │   └── layout.tsx     ← NEW: Preview layout (DELETE after verify)
│   ├── page.tsx           ← EXISTING: NEVER MODIFY
│   └── layout.tsx         ← EXISTING: NEVER MODIFY (CM012 integrates here)
```

---

## 4. IMPLEMENTATION STEPS

### Step 1: Create `app/src/lib/footer.ts`

**Exports:**
- `FooterColumn` — interface for column data
- `FOOTER_COLUMNS` — readonly array of footer columns
- `FOOTER` — footer metadata (description, copyright, legalTagline)
- `SOCIAL_LINKS` — empty array `[]` (future-proof, not rendered)

**Content per refinements:**
- `FOOTER.description` — brand description for footer
- `FOOTER.copyright` — template string using `new Date().getFullYear()`
- `FOOTER.legalTagline` — legal/tagline copy
- `FOOTER_COLUMNS` — array of columns with `label` and `links: FooterLink[]`
- `FooterLink` interface: `label`, `href`, `disabled?: boolean`
- **No duplicate content from `brand.ts` or `navigation.ts`**

---

### Step 2: Create `app/src/components/layout/Footer.tsx`

**Component Documentation Header:**
```tsx
/**
 * Footer
 *
 * Site footer — presentational component rendering footer columns,
 * brand description, copyright, and legal tagline.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Logo, Text, Label primitives
 * - Rendering FOOTER_COLUMNS, FOOTER, SOCIAL_LINKS from footer.ts
 * - Dynamic copyright year via new Date().getFullYear()
 * - Rendering disabled links with aria-disabled, no focus, no click
 *
 * Not Responsible For
 * - Routing logic (consumer wraps links)
 * - Business logic or data fetching
 * - Authentication or user state
 * - Social link rendering (SOCIAL_LINKS exported but not rendered)
 *
 * Primary Consumers
 * - app/src/app/layout.tsx (CM012 — layout integration)
 * - app/src/app/cm011-preview/page.tsx (CM011 — preview verification)
 */
```

**Composition:**
- `Container` (max-width, padding)
- `Grid` (responsive columns: 1 col mobile, 2 tablet, 4 desktop)
- `Stack` (vertical spacing within columns)
- `Logo` (size='lg' for footer prominence)
- `Text` (description, copyright, legal tagline)
- `Label` (column headings)

**Disabled Link Rendering:**
```tsx
// For FooterLink with disabled: true
<Link
  href={link.href}
  aria-disabled="true"
  tabIndex={-1}
  className="pointer-events-none opacity-40 select-none"
  onClick={(e) => e.preventDefault()}
>
  {link.label}
</Link>
```

---

### Step 3: Split if Footer > 200 lines

If `Footer.tsx` exceeds ~200 lines, extract:
- `FooterColumn.tsx` — renders single column (label + links)
- `FooterBottom.tsx` — renders copyright + legal tagline

---

### Step 4: Create Preview Route

```
app/src/app/cm011-preview/
├── page.tsx      ← Renders <Footer /> in a minimal layout
└── layout.tsx    ← Minimal wrapper (no Navbar, just Footer)
```

**Verification Checklist:**
- [ ] Footer renders all columns from `FOOTER_COLUMNS`
- [ ] Logo displays at `size="lg"`
- [ ] Description renders from `FOOTER.description`
- [ ] Copyright shows current year: `© ${new Date().getFullYear()} Castle Masters`
- [ ] Legal tagline renders from `FOOTER.legalTagline`
- [ ] Disabled links: `aria-disabled="true"`, no focus, not clickable, `opacity-40`
- [ ] Responsive: 1 col mobile, 2 col tablet, 4 col desktop
- [ ] Uses `Container`, `Grid`, `Stack`, `Logo`, `Text`, `Label` primitives
- [ ] No bespoke CSS layout (Tailwind utilities via primitives only)
- [ ] TypeScript strict mode passes
- [ ] `npm run build` passes
- [ ] `npm run lint` passes

---

### Step 5: Verification Commands

```bash
npm run build
npm run lint
npm run dev
# Visit http://localhost:3000/cm011-preview
```

---

### Step 6: Cleanup

After verification passes:
- Delete `app/src/app/cm011-preview/`
- Verify `npm run build` still passes

---

### Step 7: Documentation Updates

- Update any component index exports if applicable
- No separate docs needed — component headers are documentation

---

## 5. VERIFICATION CRITERIA (UAT)

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | `footer.ts` exists with all 4 exports | `ls app/src/lib/footer.ts` |
| 2 | `navigation.ts` has NO footer data | `grep -i footer app/src/lib/navigation.ts` → no matches |
| 3 | `brand.ts` has NO footer copy | `grep -i footer app/src/lib/brand.ts` → no matches |
| 4 | `FOOTER.copyright` uses `new Date().getFullYear()` | `grep getFullYear app/src/lib/footer.ts` |
| 5 | `SOCIAL_LINKS = []` exported | `grep SOCIAL_LINKS app/src/lib/footer.ts` |
| 6 | Disabled links: `aria-disabled`, no focus, no click | Inspect preview DOM |
| 7 | Footer ≤ 200 lines or split | `wc -l app/src/components/layout/Footer.tsx` |
| 8 | Uses only primitives (Container, Grid, Stack, Logo, Text, Label) | No custom Tailwind layout classes in Footer |
| 9 | Preview route works & deleted after | `ls app/src/app/cm011-preview/` → not found |
| 10 | `npm run build` ✓, `npm run lint` ✓ | Run commands |

---

## 6. CM012 PREVIEW (Auto-Generated Next)

After CM011 verification, immediately generate CM012 plan:

**CM012 — Application Shell Integration**
- Integrate `Navbar` into `app/src/app/layout.tsx`
- Integrate `Footer` into `app/src/app/layout.tsx`
- Preserve existing placeholder `page.tsx`
- Ensure responsive shell works (Navbar fixed, Footer at bottom)
- Keep layout server-rendered where possible
- No business logic, no auth, no backend
- Use existing primitives only
- Preview at `app/src/app/cm012-preview/` → verify → delete

---

## 7. PERMANENT PROJECT RULES (Enforced Forever)

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

## 8. APPROVAL

**Status:** READY FOR APPROVAL

**Reviewer:** Review this plan against CM011 refinements. Approve to proceed to implementation.

**Next:** Upon approval → Execute Steps 1–7 → Auto-generate CM012 PLAN.md