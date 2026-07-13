// Castle Masters — Puzzle Module — Type Definitions
// Keep puzzle content (data) fully separate from UI and engine logic.

export type PuzzleModeId = "mate-in-1" | "mate-in-2" | "mate-in-3" | "mate-in-4"

export type Difficulty = "Beginner" | "Easy" | "Intermediate" | "Advanced"

/**
 * A single puzzle definition. Positions are stored as FEN and validated /
 * played through chess.js at runtime — no hardcoded board logic here.
 */
export interface PuzzleDefinition {
  id: string
  mode: PuzzleModeId
  title: string
  difficulty: Difficulty
  category: string
  /** Starting position. It is always the human side's turn to move. */
  fen: string
  /**
   * The full forced solution line, in SAN, starting with the player's first
   * move. Even-indexed entries (0, 2, 4…) are the player's moves; odd-indexed
   * entries are the engine's scripted reply. The final move always delivers
   * checkmate.
   */
  solution: string[]
  /** Shown once the puzzle is solved. */
  explanation: string
  /** Short line shown while the puzzle is in progress, e.g. "White to move — mate in 2". */
  objective: string
}

export interface PuzzleModeMeta {
  id: PuzzleModeId
  label: string
  shortLabel: string
  description: string
  plies: number // number of moves the player must find
}

export type SquareId = string // e.g. "e4"

export interface BoardHighlight {
  square: SquareId
  kind: "selected" | "legal" | "capture" | "last-from" | "last-to" | "check" | "success"
}

export type GamePhase =
  | "playing" // waiting for the player's move
  | "opponent-reply" // scripted engine reply animating
  | "solved" // full line completed, final position is checkmate
  | "failed" // player made a move outside the solution line

export interface PuzzleAttemptState {
  phase: GamePhase
  fen: string
  moveIndex: number // index into solution[] the player must find next
  lastMove: { from: SquareId; to: SquareId } | null
  wrongAttempts: number
  hintsUsed: number
}
