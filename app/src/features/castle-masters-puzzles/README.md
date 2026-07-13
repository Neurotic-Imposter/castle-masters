# Castle Masters — Puzzle Module

Reusable Mate-in-1 / 2 / 3 / 4 puzzle module, styled to match the Castle Masters
site (dark glass cards, emerald→cyan gradient accents).

## Install

```bash
npm install chess.js
```

Copy this folder's contents into your Next.js project, e.g. under
`src/features/puzzles/`, adjusting the `@/*` import alias if your project's
`tsconfig.json` paths differ.

**Note on `lib/utils.ts`:** your project already has a `cn()` helper
(shadcn-style, using `clsx` + `tailwind-merge`). Delete the one shipped here
and let the module's imports resolve to your existing one — signatures are
compatible.

## Wire it in

```tsx
import { useState } from "react"
import { PuzzleCard, ModeSelector, type PuzzleModeId } from "@/features/puzzles"

export default function PuzzlesSection() {
  const [mode, setMode] = useState<PuzzleModeId>("mate-in-1")
  return (
    <div className="cm-root">
      <ModeSelector active={mode} onChange={setMode} />
      <PuzzleCard mode={mode} onExploreDeck={() => router.push("/puzzles")} />
    </div>
  )
}
```

Import the stylesheet once, globally:

```ts
// app/globals.css
@import "../features/puzzles/components/puzzle-theme.css";
```

Wrap any tree that renders puzzle components in a `.cm-root` class — that's
where the `--cm-*` design tokens are scoped, so they never leak into or
collide with the rest of your site's CSS variables.

## Architecture

```
lib/
  types.ts          — shared TypeScript types, zero logic
  chess-engine.ts    — thin wrapper around chess.js (rules, legal moves, mate detection)
  puzzles-data.ts    — puzzle content (FEN + solution line + copy), zero UI
  utils.ts           — cn() helper (see note above)
hooks/
  use-puzzle-engine.ts — the state machine: selection, move validation,
                          scripted opponent reply, hints, retry, success
components/
  chess-board.tsx     — presentational board, click-to-move, no chess rules
  piece-glyph.tsx      — piece rendering (inline glyphs, no external assets)
  mode-selector.tsx    — Mate in 1–4 tab switcher
  puzzle-card.tsx       — composes board + status + controls + deck CTA
  puzzle-theme.css        — all design tokens + styles
index.ts             — public barrel export
demo-page.tsx         — example route wiring (reference only, not required)
```

Everything reads from `PUZZLES` in `lib/puzzles-data.ts`. Add more puzzles by
appending objects there — no other file needs to change, and the puzzle
picker in `puzzle-card.tsx` will automatically cycle through however many
puzzles exist for the active mode.

## Puzzle data format

```ts
{
  id: "m2-corner-net",
  mode: "mate-in-2",
  title: "Corner Net",
  difficulty: "Easy",
  category: "King & Queen · Tactical",
  fen: "8/8/8/6Q1/8/8/p2K4/k7 w - - 0 1",
  solution: ["Kc3", "Kb1", "Qg1#"],   // player, opponent(scripted), player…
  objective: "White to move — mate in 2",
  explanation: "…shown once solved",
}
```

`solution` alternates: even indices are moves the *player* must find (chess.js
validates that whatever square-pair they click produces this exact SAN);
odd indices are the opponent's scripted reply, auto-played after a short
delay. The final entry always ends in `#` and chess.js additionally confirms
`isCheckmate()` after it plays.

All four shipped puzzles were generated and verified with a minimax
forced-mate search against chess.js (guaranteeing every included line is a
genuine, forced checkmate — not just "a" continuation), so you can trust the
positions as-is or replace them with your own curated set later.

## Chess engine

All rules (legal moves, check, checkmate, promotion) come from `chess.js`.
`lib/chess-engine.ts` only adapts its API to the shapes the board/hook need —
no chess logic is reimplemented.

## Extending to hundreds of puzzles

- Nothing in the architecture assumes a fixed puzzle count.
- Group puzzles by `mode`, filtered via `getPuzzlesForMode()`.
- If the list grows large, swap the in-memory `PUZZLES` array for a fetch
  from your CMS/DB — the shape (`PuzzleDefinition`) is the only contract the
  rest of the module depends on.

## Responsive & accessibility

- Board is a CSS grid inside an `aspect-square` container — scales cleanly
  from mobile to desktop.
- Every square is a real `<button>` with an `aria-label`; the board itself
  has `role="img"` with a plain-language position summary for screen readers.
- Visible focus rings (`:focus-visible`) on every interactive element.
- `prefers-reduced-motion` disables piece-slide, shake, and pop animations.
- Status text and the solved banner are in an `aria-live="polite"` region.
