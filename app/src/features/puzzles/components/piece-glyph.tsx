// Castle Masters — Puzzle Module — Piece Glyphs
//
// Unicode chess glyphs rendered with layered SVG-quality styling (gradient
// fill + soft outline) so no external piece image set is required. Keeps
// the module dependency-free and trivially themeable.

const GLYPHS: Record<string, string> = {
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
}

export function PieceGlyph({ type, color }: { type: string; color: "w" | "b" }) {
  const glyph = GLYPHS[type] ?? "?"
  return (
    <span
      className={`cm-piece cm-piece--${color}`}
      aria-hidden="true"
      style={{ fontFamily: '"Noto Sans Symbols 2", "Segoe UI Symbol", "DejaVu Sans", sans-serif' }}
    >
      {glyph}
    </span>
  )
}

export const PIECE_NAMES: Record<string, string> = {
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
}
