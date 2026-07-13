"use client"

// Castle Masters — Puzzle Module — Chess Board
//
// Purely presentational + input handling. Receives pieces/highlights/legal
// squares from the usePuzzleEngine hook and reports clicks back up. Contains
// no chess rules of its own.

import { squareToPercent } from "../lib/chess-engine"
import type { BoardHighlight, SquareId } from "../lib/types"
import { PIECE_NAMES, PieceGlyph } from "./piece-glyph"
import { cn } from "../lib/utils"

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"]

export interface BoardPiece {
  square: SquareId
  type: string
  color: "w" | "b"
}

export function ChessBoard({
  pieces,
  highlights,
  movableSquares,
  onSquareClick,
  shake,
  label,
  interactive = true,
}: {
  pieces: BoardPiece[]
  highlights: BoardHighlight[]
  movableSquares: Set<SquareId>
  onSquareClick: (square: SquareId) => void
  shake?: boolean
  label: string
  interactive?: boolean
}) {
  const highlightMap = new Map<SquareId, BoardHighlight["kind"][]>()
  for (const h of highlights) {
    const arr = highlightMap.get(h.square) ?? []
    arr.push(h.kind)
    highlightMap.set(h.square, arr)
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("cm-board", shake && "cm-board--shake")}
    >
      <div className="cm-board__grid">
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8)
          const col = i % 8
          const dark = (row + col) % 2 === 1
          const square = `${FILES[col]}${8 - row}`
          const kinds = highlightMap.get(square) ?? []

          return (
            <button
              key={square}
              type="button"
              disabled={!interactive}
              onClick={() => onSquareClick(square)}
              aria-label={`Square ${square}`}
              className={cn(
                "cm-square",
                dark ? "cm-square--dark" : "cm-square--light",
                movableSquares.has(square) && "cm-square--movable",
                kinds.includes("check") && "cm-square--check",
                kinds.includes("success") && "cm-square--success",
              )}
            >
              {col === 0 && <span className="cm-coord cm-coord--rank">{8 - row}</span>}
              {row === 7 && <span className="cm-coord cm-coord--file">{FILES[col]}</span>}

              {(kinds.includes("last-from") || kinds.includes("last-to")) && (
                <span className="cm-overlay cm-overlay--last" aria-hidden="true" />
              )}
              {kinds.includes("selected") && <span className="cm-overlay cm-overlay--selected" aria-hidden="true" />}
              {kinds.includes("legal") && <span className="cm-dot" aria-hidden="true" />}
              {kinds.includes("capture") && <span className="cm-ring" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      {/* pieces layered above the grid so movement can animate independently of square clicks */}
      <div className="cm-board__pieces" aria-hidden="true">
        {pieces.map((p) => {
          const pos = squareToPercent(p.square)
          return (
            <div
              key={`${p.color}${p.type}-${p.square}`}
              className="cm-piece-slot"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              title={`${p.color === "w" ? "White" : "Black"} ${PIECE_NAMES[p.type]}`}
            >
              <PieceGlyph type={p.type} color={p.color} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
