"use client"

import { PUZZLE_MODES } from "../lib/puzzles-data"
import type { PuzzleModeId } from "../lib/types"
import { cn } from "../lib/utils"

export function ModeSelector({
  active,
  onChange,
}: {
  active: PuzzleModeId
  onChange: (mode: PuzzleModeId) => void
}) {
  return (
    <div role="tablist" aria-label="Puzzle mode" className="cm-mode-tabs">
      {PUZZLE_MODES.map((mode) => (
        <button
          key={mode.id}
          type="button"
          role="tab"
          aria-selected={active === mode.id}
          onClick={() => onChange(mode.id)}
          className={cn("cm-mode-tab", active === mode.id && "cm-mode-tab--active")}
        >
          {mode.shortLabel}
        </button>
      ))}
    </div>
  )
}
