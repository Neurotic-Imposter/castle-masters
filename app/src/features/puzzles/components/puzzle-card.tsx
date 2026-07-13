"use client"

// Castle Masters — Puzzle Module — Puzzle Card
//
// The single reusable component every mode (Mate in 1–4) renders through.
// Composition only: board + status + controls. All rules live in
// usePuzzleEngine; all content lives in lib/puzzles-data.ts.

import { useMemo, useState } from "react"
import { ChessBoard } from "./chess-board"
import { usePuzzleEngine } from "../hooks/use-puzzle-engine"
import { getPuzzlesForMode, getModeMeta } from "../lib/puzzles-data"
import type { PuzzleModeId } from "../lib/types"

export function PuzzleCard({
  mode,
  onExploreDeck,
}: {
  mode: PuzzleModeId
  /** Called when the player wants to see the full puzzle deck after solving. Optional. */
  onExploreDeck?: () => void
}) {
  const modeMeta = getModeMeta(mode)
  const puzzles = useMemo(() => getPuzzlesForMode(mode), [mode])
  const [puzzleIdx, setPuzzleIdx] = useState(0)
  const puzzle = puzzles[puzzleIdx % puzzles.length]

  const engine = usePuzzleEngine(puzzle)

  const boardLabel = `${puzzle.title}. ${puzzle.objective}.`

  const nextPuzzle = () => setPuzzleIdx((i) => (i + 1) % puzzles.length)

  return (
    <div className="cm-card">
      <div className="cm-card__header">
        <span className="cm-badge">
          {puzzle.difficulty}
          <span className="cm-badge__dot" aria-hidden="true" />
        </span>
        <span className="cm-card__category">{puzzle.category}</span>
        <span className="cm-card__mode-label">{modeMeta.shortLabel}</span>
      </div>

      <ChessBoard
        pieces={engine.pieces}
        highlights={engine.highlights}
        movableSquares={engine.movableSquares}
        onSquareClick={engine.selectSquare}
        shake={engine.shake}
        label={boardLabel}
      />

      <p className="cm-status-line" aria-live="polite">
        {engine.phase === "solved"
          ? "Checkmate."
          : engine.phase === "opponent-reply"
            ? "Opponent replies…"
            : puzzle.objective}
      </p>

      {engine.phase !== "solved" && (
        <div className="cm-controls">
          <h3 className="cm-puzzle-title">{puzzle.title}</h3>
          <p className="cm-puzzle-progress">
            {engine.movesRemaining === 1
              ? "Find the mating move."
              : `${engine.movesRemaining} moves to checkmate.`}
          </p>

          <div className="cm-controls__row">
            <button
              type="button"
              className="cm-link-btn"
              disabled={engine.hintsRemaining <= 0}
              onClick={engine.requestHint}
            >
              {engine.hintsUsed === 0
                ? "Need a nudge?"
                : engine.hintsUsed === 1
                  ? "One more hint"
                  : "That's all the hints!"}
            </button>
            {engine.wrongAttempts > 0 && <span className="cm-hint-note">Try again</span>}
          </div>
        </div>
      )}

      {engine.phase === "solved" && (
        <div className="cm-solved">
          <p className="cm-solved__banner">
            <span className="cm-solved__check">✓ Correct!</span> {puzzle.explanation}
          </p>

          <div className="cm-solved__actions">
            <button type="button" className="cm-btn cm-btn--ghost" onClick={engine.reset}>
              Retry
            </button>
            {puzzles.length > 1 && (
              <button type="button" className="cm-btn cm-btn--ghost" onClick={nextPuzzle}>
                Next puzzle
              </button>
            )}
          </div>

          <div className="cm-deck-cta">
            <div aria-hidden="true" className="cm-deck-cta__thumb">
              <span className="cm-deck-cta__thumb-card cm-deck-cta__thumb-card--back" />
              <span className="cm-deck-cta__thumb-card cm-deck-cta__thumb-card--mid" />
              <span className="cm-deck-cta__thumb-card cm-deck-cta__thumb-card--front">♞</span>
            </div>
            <div>
              <p className="cm-deck-cta__title">That puzzle came from the Castle Masters Puzzle Deck.</p>
              <p className="cm-deck-cta__body">
                A curated collection of tactical positions designed to sharpen calculation, pattern
                recognition, and board vision.
              </p>
            </div>
          </div>
          <button type="button" className="cm-btn cm-btn--primary cm-btn--full" onClick={onExploreDeck}>
            Explore the Complete Puzzle Deck →
          </button>
        </div>
      )}
    </div>
  )
}
