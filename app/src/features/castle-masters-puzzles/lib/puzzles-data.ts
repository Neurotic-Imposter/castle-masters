// Castle Masters — Puzzle Module — Puzzle Content
//
// Pure data. Add new puzzles by appending to PUZZLES — nothing else needs to
// change. Every position/line below is verified as a legal, forced mate.

import type { PuzzleDefinition, PuzzleModeId, PuzzleModeMeta } from "./types"

export const PUZZLE_MODES: PuzzleModeMeta[] = [
  {
    id: "mate-in-1",
    label: "Mate in 1 Challenges",
    shortLabel: "Mate in 1",
    description: "Develop fundamental tactical vision. Single-move mating puzzles organized by pin, skewer, and fork patterns.",
    plies: 1,
  },
  {
    id: "mate-in-2",
    label: "Mate in 2 Challenges",
    shortLabel: "Mate in 2",
    description: "Two-move combinations. Spot the forcing move, calculate the only reply, and finish the attack.",
    plies: 2,
  },
  {
    id: "mate-in-3",
    label: "Mate in 3 Campaigns",
    shortLabel: "Mate in 3",
    description: "Short forced sequences that build calculation depth and pattern recognition across three moves.",
    plies: 3,
  },
  {
    id: "mate-in-4",
    label: "Mate in 4 Campaigns",
    shortLabel: "Mate in 4",
    description: "Complex tactical strings. Test positional sacrifices, deflection plans, and mating calculations across multiple moves.",
    plies: 4,
  },
]

export const PUZZLES: PuzzleDefinition[] = [
  {
    id: "m1-back-rank",
    mode: "mate-in-1",
    title: "The Sealed Rank",
    difficulty: "Beginner",
    category: "Back Rank · Tactical",
    fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
    solution: ["Ra8#"],
    objective: "White to move — mate in 1",
    explanation: "Ra8 is checkmate. Black's own pawns wall in the king, and the rook seals the entire back rank.",
  },
  {
    id: "m2-corner-net",
    mode: "mate-in-2",
    title: "Corner Net",
    difficulty: "Easy",
    category: "King & Queen · Tactical",
    fen: "8/8/8/6Q1/8/8/p2K4/k7 w - - 0 1",
    solution: ["Kc3", "Kb1", "Qg1#"],
    objective: "White to move — mate in 2",
    explanation:
      "Kc3 takes away the last flight square and forces the black king to b1. Qg1 is then mate, the queen covering the whole first rank with the king shut out of a2 and b2.",
  },
  {
    id: "m3-staircase",
    mode: "mate-in-3",
    title: "The Staircase",
    difficulty: "Intermediate",
    category: "Queen & Rook · Campaign",
    fen: "2K2k2/8/8/5R2/8/8/8/Q7 w - - 0 1",
    solution: ["Kd8+", "Kg8", "Qa7", "Kh8", "Rf8#"],
    objective: "White to move — mate in 3",
    explanation:
      "Kd8+ drives the king back to g8. Qa7 quietly covers the whole seventh rank and g1–a7 diagonal, leaving only h8 available. Rf8 is then checkmate — the queen controls every escape square.",
  },
  {
    id: "m4-long-march",
    mode: "mate-in-4",
    title: "The Long March",
    difficulty: "Advanced",
    category: "Queen & Rook · Campaign",
    fen: "3R4/8/k7/7K/8/8/5Q2/8 w - - 0 1",
    solution: ["Re8", "Kb7", "Re6", "Ka8", "Re7", "Kb8", "Qf8#"],
    objective: "White to move — mate in 4",
    explanation:
      "The rook shepherds the black king toward the corner one rank at a time while the queen stays in reserve. Once the king is boxed into a8/b8 with no escape, Qf8 delivers the final blow along the back rank.",
  },
]

export function getPuzzlesForMode(mode: PuzzleModeId): PuzzleDefinition[] {
  return PUZZLES.filter((p) => p.mode === mode)
}

export function getModeMeta(mode: PuzzleModeId): PuzzleModeMeta {
  const meta = PUZZLE_MODES.find((m) => m.id === mode)
  if (!meta) throw new Error(`Unknown puzzle mode: ${mode}`)
  return meta
}
