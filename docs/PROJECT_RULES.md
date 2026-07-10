# Castle Masters — Development Rules

> This is the permanent development constitution for the Castle Masters repository.
> Every rule applies to every session, every agent, and every task.
> No exceptions without explicit written founder approval.

---

## Rules

### Rule 1 — Prototype is Frozen

`prototype/index.html` is permanently frozen.

It must **never** be opened, modified, restructured, or touched in any way during production development. It exists solely as the visual source of truth for reference reading.

---

### Rule 2 — Never Redesign Approved UI

Do not improve, simplify, modernize, or alter any visual design decision that has been implemented in the prototype.

Implement what the prototype shows — exactly. If you believe a design decision is wrong, flag it for founder review. Do not silently change it.

---

### Rule 3 — One CM Task Per Implementation Session

Each implementation session handles exactly **one CM task** from `TASKS.md`.

Do not combine tasks. Do not start a new task until the current one is reviewed and approved.

---

### Rule 4 — Never Scan the Entire Repository

Do not read every file in the project looking for context.

Read only the specific files required to complete the current task. If you are unsure which files are needed, ask before reading.

---

### Rule 5 — Read Only Required Files

Before starting any task, identify the exact files you need to read. Read only those files.

Do not open files "just in case." Every unnecessary file read is wasted context.

---

### Rule 6 — Never Modify Unrelated Files

If a file is not in the scope of the current CM task, do not modify it.

Even if you notice a bug, typo, or improvement opportunity in an unrelated file — leave it. Log it as a separate observation. Fix it only in a dedicated task.

---

### Rule 7 — Explain Affected Files Before Implementation

Before writing any code, explicitly list:
- Every file that will be **created**
- Every file that will be **modified**
- Why each file is part of this task

If a file is not on this list, do not touch it.

---

### Rule 8 — Explain Implementation Plan Before Writing Code

Before writing any code, describe:
- What you are building
- How it works
- What design decisions are being made
- What the output will look like

Wait for confirmation before proceeding if the plan is non-trivial.

---

### Rule 9 — Implement Only the Requested CM Task

The task description in `TASKS.md` defines the exact scope of work.

Do not add extra features. Do not refactor adjacent code. Do not improve unrelated components. Build exactly what the task asks for — nothing more.

---

### Rule 10 — Keep Components Reusable

Every component must have a single, clear responsibility.

Components must accept props for all variable content. Do not hardcode strings, colors, or layout decisions that callers should control.

---

### Rule 11 — Prefer Composition Over Duplication

If two components share structure, extract a shared primitive. Do not copy-paste component code.

Build small, composable primitives. Assemble them into larger sections. Never duplicate logic.

---

### Rule 12 — Use Strict TypeScript

- No `any` types — ever
- All props must be explicitly typed with interfaces
- All function parameters and return values must be typed
- All API response shapes must be typed
- Enable and respect all strict TypeScript compiler options

---

### Rule 13 — Backend Remains Inside Next.js

All backend logic is implemented as Next.js App Router API Routes inside `app/src/app/api/`.

Do not introduce a separate server (Express, Fastify, NestJS, etc.). Do not use serverless functions on external platforms. Everything runs inside Next.js on Vercel.

---

### Rule 14 — Cart, Payments, and Chess Puzzles Are Independent Modules

These three modules must never be coupled to each other:

- `modules/cart` — cart state and operations
- `modules/payments` — Razorpay integration
- `modules/puzzles` — chess puzzle logic

The Chess Puzzles module must not depend on cart or payment state. Free puzzles must always be accessible without payment. Each module is developed and deployable independently.

---

### Rule 15 — Never Invent Business Data

The following must **never** be invented, generated, or assumed:
- Founder names
- Coach names or biographies
- FIDE ratings
- Student names or testimonials
- Tournament winners, venues, dates, or results
- Addresses or phone numbers
- Pricing of any kind

Use professional placeholders. If real data is needed, request it from the founder before proceeding.

---

### Rule 16 — Update Docs After Every Completed Task

After completing any CM task, update these three files before stopping:

1. **`docs/TASKS.md`** — Mark the task `✅ Complete`
2. **`docs/SESSION.md`** — Record what was done and what comes next
3. **`docs/CHANGELOG.md`** — Add a versioned entry describing the work

No task is complete until these three files are updated.

---

### Rule 17 — Stop After Every Completed CM Task

After completing a CM task and updating the three documentation files, **stop**.

Do not begin the next task. Do not add "bonus" improvements. Do not continue unless the founder explicitly instructs otherwise.

---

### Rule 18 — Wait for Founder Review

After stopping, wait for founder review and explicit approval before beginning the next task.

If the founder says "continue," proceed to the next task. If the founder says nothing, do not proceed.

---

### Rule 19 — Preserve Existing Functionality

Never break what already works.

Before modifying any existing file, understand its current behavior. After modification, verify the existing functionality still works. If a change risks breaking existing behavior, flag it before making the change.

---

### Rule 20 — Never Perform Project-Wide Refactors

Do not rename conventions project-wide. Do not restructure directory layouts. Do not change import patterns across all files.

Any refactor that touches more than 3 files is a project-wide refactor and requires explicit founder approval as a named CM task.

---

## Component Standards

Every reusable component must satisfy ALL of the following:

1. **Single Responsibility Principle** — One clear purpose, no unrelated concerns
2. **Semantic Public API** — Props expose intent, not implementation details
3. **No Business Logic** — Components handle presentation only
4. **Strong TypeScript Typing** — Exported interfaces, no `any` types
5. **Uses Only Semantic Design Tokens** — Never hardcode colors, spacing, or fonts
6. **No Duplicated Styling** — Extract shared patterns into primitives
7. **Composition Over Inheritance** — Build complex components by composing simple ones
8. **Fully Documented** — TSDoc comments for props and component purpose
9. **Must Pass All Verification** — `npm run build`, `npm run lint`, `npm run dev`
10. **Must Be Reused** — At least one production feature must consume it before MVP completion

---

## Planning Standard

Every implementation plan must always contain:

1. **Why This Task Exists** — Context and motivation
2. **Scope Assessment** — What's in scope, what's explicitly out of scope
3. **Prototype Mapping** — Which prototype sections are being extracted
4. **Component Contract** — Purpose, consumers, public API, extension rules
5. **Files to Modify** — Complete list of files to create or change
6. **Files Intentionally NOT Modified** — What we're explicitly avoiding
7. **Responsibilities Explicitly Excluded** — What this component will NOT do
8. **Accessibility Strategy** — Keyboard, screen reader, semantic HTML considerations
9. **Verification Plan** — How to test the implementation
10. **Definition of Done** — Clear acceptance criteria

---

## Prototype Mapping

Every future implementation plan must explicitly document:

- **Prototype Source** — Which sections of `prototype/index.html` are referenced
- **Referenced Sections** — Specific HTML structures or CSS classes being extracted
- **Elements Being Extracted** — What's being converted to React components
- **Elements Intentionally Deferred** — What's being postponed to future tasks

**Rules:**
- The prototype remains the single visual source of truth
- No redesigns
- No invented layouts
- No improvements to approved designs

---

## Component Contract

Every reusable component must document:

- **Purpose** — What problem does this solve?
- **Consumers** — Who will use this component?
- **Public API** — What props are exposed and why?
- **Extension Rules** — How should this component be composed or extended?
- **Future Deferred Features** — What functionality is intentionally postponed?

---

## Responsibility Check

Every implementation plan must explicitly answer:

**"This component IS responsible for:"**
- List specific concerns this component handles

**"This component IS NOT responsible for:"**
- List specific concerns explicitly excluded

This check is **mandatory** for every component implementation plan.

---

## Architecture Philosophy

**Prefer:**
- Small components
- Focused responsibilities
- Composable primitives
- Clear boundaries

**Never:**
- Create "God Components" that do too much
- Add unrelated props to existing components
- Mix presentation with business logic
- Duplicate styling patterns

**Always:**
- Choose composition instead of adding unrelated props
- Extract shared patterns into reusable primitives
- Keep components small and focused
- Document extension points clearly

---

## Quick Reference

| # | Rule |
|---|---|
| 1 | Prototype is frozen |
| 2 | Never redesign approved UI |
| 3 | One CM task per session |
| 4 | Never scan the entire repository |
| 5 | Read only required files |
| 6 | Never modify unrelated files |
| 7 | Explain affected files first |
| 8 | Explain implementation plan first |
| 9 | Implement only the requested task |
| 10 | Keep components reusable |
| 11 | Prefer composition over duplication |
| 12 | Use strict TypeScript |
| 13 | Backend stays inside Next.js |
| 14 | Cart, Payments, Chess Puzzles are independent modules |
| 15 | Never invent business data |
| 16 | Update TASKS.md, SESSION.md, CHANGELOG.md after every task |
| 17 | Stop after every completed CM task |
| 18 | Wait for founder review |
| 19 | Preserve existing functionality |
| 20 | Never perform project-wide refactors |
| 21 | Component Standards (10 requirements) |
| 22 | Planning Standard (10 mandatory sections) |
| 23 | Prototype Mapping (document source, extractions, deferrals) |
| 24 | Component Contract (purpose, consumers, API, extensions) |
| 25 | Responsibility Check (IS/IS NOT responsible for) |
| 26 | Architecture Philosophy (composition over inheritance) |

---

### Rule 21 — Type Safety

Avoid `as any` inside production components.

If an unsafe cast is genuinely unavoidable due to React or TypeScript limitations:
- Explain why with an inline comment.
- Keep the cast fully isolated inside the component.
- Never expose `any` through the public API (props, return types, exported interfaces).
- Prefer overloads, composition, or stronger generic typing whenever practical.

---

### Rule 22 — Primitive Reuse

Before creating any new reusable component, verify that an existing primitive cannot solve the problem.

Always reuse or compose existing primitives first.

**Current primitives:**

Layout: `Container`, `Section`, `Stack`, `Grid`, `Spacer`

UI: `Button`, `Card`, `Heading`, `Text`, `Label`, `Badge`

Never duplicate functionality already provided by these components.

---

### Rule 23 — Component Documentation Block

Every reusable component must begin with a TSDoc block describing:

- **Purpose** — What this component is
- **Responsibilities** — What it handles
- **Does NOT own** — What it explicitly excludes
- **Consumers** — Which future components will use it

Example:

```
/**
 * Heading
 *
 * Primitive typography component for all heading-level text.
 *
 * Responsibilities
 * - Rendering semantic heading elements (h1–h6)
 * - Applying visual type scale from the design system
 * - Gradient fill variant for accent headings
 *
 * Does NOT own
 * - Spacing or layout (use Stack, Section, or margin utilities)
 * - Positioning
 * - Color outside the defined token set
 *
 * Consumers
 * - Navbar, Hero Section, Stats Section, TournamentCard, ProgramCard, Footer
 */
```

---

### Rule 24 — Verification Without Touching page.tsx

Never modify `app/src/app/page.tsx` solely to test a component during development.

Use instead:
- A temporary preview route (e.g. `app/src/app/cm009-preview/page.tsx`)
- An isolated playground component
- A development-only preview page

Delete the temporary verification code after validation is complete.

The production application must remain exactly as it was before the task started.

---

### Rule 25 — Minimal API

Every primitive component must expose the smallest API that covers existing prototype use cases.

Do not add props because they "might be useful later."

Every prop must map to an existing use case documented in the prototype or an approved founder requirement.

---

### Rule 26 — Composition Over Inheritance

Always prefer composition over inheritance.

Never build feature-specific behaviour into primitive components.

Feature components must compose primitives — not extend them.

---

### Rule 27 — Prototype is the Only Visual Reference

`prototype/index.html` is permanently frozen.

It is NEVER modified. It is ONLY referenced.

All layouts, spacing, animations, typography, and interactions must faithfully follow the prototype.

Do not improve, simplify, or reinterpret any design decision. If something looks wrong, flag it — do not silently change it.

---

### Rule 28 — Implementation Plan is Mandatory

Every implementation plan MUST contain all of the following sections. No exceptions.

1. Why this task exists
2. Scope Assessment
3. Prototype Mapping
4. Responsibilities (IS / IS NOT responsible for)
5. Component Contract
6. Files to Create
7. Files to Modify
8. Files NOT to Modify
9. Explicitly Out of Scope
10. Accessibility Strategy
11. Verification Plan
12. Definition of Done

A plan missing any section is incomplete and must not proceed to implementation.

---

## Quick Reference (updated)

| # | Rule |
|---|---|
| 1 | Prototype is frozen |
| 2 | Never redesign approved UI |
| 3 | One CM task per session |
| 4 | Never scan the entire repository |
| 5 | Read only required files |
| 6 | Never modify unrelated files |
| 7 | Explain affected files first |
| 8 | Explain implementation plan first |
| 9 | Implement only the requested task |
| 10 | Keep components reusable |
| 11 | Prefer composition over duplication |
| 12 | Use strict TypeScript |
| 13 | Backend stays inside Next.js |
| 14 | Cart, Payments, Chess Puzzles are independent modules |
| 15 | Never invent business data |
| 16 | Update TASKS.md, SESSION.md, CHANGELOG.md after every task |
| 17 | Stop after every completed CM task |
| 18 | Wait for founder review |
| 19 | Preserve existing functionality |
| 20 | Never perform project-wide refactors |
| 21 | No `as any` in production — isolate, comment, never expose |
| 22 | Reuse existing primitives before creating new components |
| 23 | Every component must have a documentation block |
| 24 | Never touch page.tsx for testing — use preview routes |
| 25 | Minimal API — every prop needs a prototype use case |
| 26 | Composition over inheritance — never feature-logic in primitives |
| 27 | Prototype is the only visual reference — never reinterpret |
| 28 | Implementation plan is mandatory — all 12 sections required |

---

*Last updated: 2026-07-09*
*Authority: Founder-approved*
