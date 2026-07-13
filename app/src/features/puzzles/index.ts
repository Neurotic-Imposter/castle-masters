// Castle Masters — Puzzle Module — Public API

export { PuzzleCard } from "./components/puzzle-card"
export { ChessBoard } from "./components/chess-board"
export { ModeSelector } from "./components/mode-selector"
export { usePuzzleEngine } from "./hooks/use-puzzle-engine"
export { PuzzleEngine, squareToCoords, squareToPercent } from "./lib/chess-engine"
export { PUZZLES, PUZZLE_MODES, getPuzzlesForMode, getModeMeta } from "./lib/puzzles-data"
export type {
  PuzzleDefinition,
  PuzzleModeId,
  PuzzleModeMeta,
  Difficulty,
  BoardHighlight,
  GamePhase,
  SquareId,
} from "./lib/types"

import "./components/puzzle-theme.css"
