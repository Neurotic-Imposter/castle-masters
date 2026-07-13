// Castle Masters — Puzzle Module — Chess Engine Wrapper
//
// All legal-move generation, check/checkmate detection, and move application
// is delegated to chess.js. This file only adapts its API to the shapes the
// puzzle UI needs. Do not reimplement chess rules here.

import { Chess, type Square as ChessJsSquare } from "chess.js"
import type { SquareId } from "./types"

export interface LegalMove {
  from: SquareId
  to: SquareId
  san: string
  isCapture: boolean
  promotion?: string
}

export interface MoveResult {
  ok: boolean
  san?: string
  fen?: string
  isCheck?: boolean
  isCheckmate?: boolean
  capturedSquare?: SquareId
}

/** Thin, purpose-built wrapper. One instance per active puzzle attempt. */
export class PuzzleEngine {
  private chess: Chess

  constructor(fen: string) {
    this.chess = new Chess(fen)
  }

  get fen(): string {
    return this.chess.fen()
  }

  get turn(): "w" | "b" {
    return this.chess.turn()
  }

  isCheck(): boolean {
    return this.chess.inCheck()
  }

  isCheckmate(): boolean {
    return this.chess.isCheckmate()
  }

  /** All squares a piece currently sitting on `square` may legally move to. */
  legalTargetsFrom(square: SquareId): LegalMove[] {
    return this.chess
      .moves({ square: square as ChessJsSquare, verbose: true })
      .map((m) => ({
        from: m.from,
        to: m.to,
        san: m.san,
        isCapture: m.flags.includes("c") || m.flags.includes("e"),
        promotion: m.promotion,
      }))
  }

  /** Every square that currently holds a piece belonging to the side to move. */
  movableSquares(): SquareId[] {
    const board = this.chess.board()
    const squares: SquareId[] = []
    for (const row of board) {
      for (const cell of row) {
        if (cell && cell.color === this.chess.turn()) squares.push(cell.square)
      }
    }
    return squares
  }

  /** Attempts a move by from/to (+ optional promotion). Always promotes to queen by default. */
  move(from: SquareId, to: SquareId, promotion = "q"): MoveResult {
    try {
      const result = this.chess.move({ from: from as ChessJsSquare, to: to as ChessJsSquare, promotion })
      if (!result) return { ok: false }
      return {
        ok: true,
        san: result.san,
        fen: this.chess.fen(),
        isCheck: this.chess.inCheck(),
        isCheckmate: this.chess.isCheckmate(),
      }
    } catch {
      return { ok: false }
    }
  }

  /** Plays a move given as SAN (used for the scripted opponent reply). */
  moveSan(san: string): MoveResult {
    try {
      const result = this.chess.move(san)
      if (!result) return { ok: false }
      return {
        ok: true,
        san: result.san,
        fen: this.chess.fen(),
        isCheck: this.chess.inCheck(),
        isCheckmate: this.chess.isCheckmate(),
      }
    } catch {
      return { ok: false }
    }
  }

  /** Square the king of `color` currently sits on, if any. */
  kingSquare(color: "w" | "b"): SquareId | null {
    const board = this.chess.board()
    for (const row of board) {
      for (const cell of row) {
        if (cell && cell.type === "k" && cell.color === color) return cell.square
      }
    }
    return null
  }

  /** Flattened piece list for rendering. */
  pieces(): { square: SquareId; type: string; color: "w" | "b" }[] {
    const board = this.chess.board()
    const out: { square: SquareId; type: string; color: "w" | "b" }[] = []
    for (const row of board) {
      for (const cell of row) {
        if (cell) out.push({ square: cell.square, type: cell.type, color: cell.color })
      }
    }
    return out
  }

  reset(fen: string) {
    this.chess = new Chess(fen)
  }

  clone(): PuzzleEngine {
    return new PuzzleEngine(this.chess.fen())
  }
}

export function squareToCoords(square: SquareId): { file: number; rank: number } {
  const file = square.charCodeAt(0) - 97 // a=0
  const rank = Number.parseInt(square[1], 10) - 1 // 1=0
  return { file, rank }
}

export function squareToPercent(square: SquareId): { left: number; top: number } {
  const { file, rank } = squareToCoords(square)
  return { left: file * 12.5, top: (7 - rank) * 12.5 }
}
