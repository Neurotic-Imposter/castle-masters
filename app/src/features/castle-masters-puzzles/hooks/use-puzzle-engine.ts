"use client"
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/refs */

// Castle Masters — Puzzle Module — Game State Hook
//
// One reusable state machine drives all four puzzle modes. It owns:
//  - the chess.js-backed engine instance
//  - which squares are selectable / legal targets
//  - the scripted opponent reply after a correct player move
//  - success / failure detection and retry
//
// UI components stay presentational; all rules live here.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { PuzzleEngine } from "../lib/chess-engine"
import type { BoardHighlight, GamePhase, PuzzleDefinition, SquareId } from "../lib/types"

const OPPONENT_REPLY_DELAY_MS = 650
const SUCCESS_SETTLE_DELAY_MS = 550

export function usePuzzleEngine(puzzle: PuzzleDefinition) {
  const engineRef = useRef<PuzzleEngine>(new PuzzleEngine(puzzle.fen))
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const [fen, setFen] = useState(puzzle.fen)
  const [phase, setPhase] = useState<GamePhase>("playing")
  const [moveIndex, setMoveIndex] = useState(0)
  const [selected, setSelected] = useState<SquareId | null>(null)
  const [lastMove, setLastMove] = useState<{ from: SquareId; to: SquareId } | null>(null)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [shake, setShake] = useState(false)

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timers.current.push(t)
    return t
  }, [])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  // Reset whenever the active puzzle changes.
  useEffect(() => {
    clearTimers()
    engineRef.current = new PuzzleEngine(puzzle.fen)
    setFen(puzzle.fen)
    setPhase("playing")
    setMoveIndex(0)
    setSelected(null)
    setLastMove(null)
    setWrongAttempts(0)
    setHintsUsed(0)
    setShake(false)
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.id])

  const legalTargets = useMemo(() => {
    if (!selected || phase !== "playing") return []
    return engineRef.current.legalTargetsFrom(selected)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, phase, fen])

  const movableSquares = useMemo(() => {
    if (phase !== "playing") return new Set<SquareId>()
    return new Set(engineRef.current.movableSquares())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, fen])

  const reset = useCallback(() => {
    clearTimers()
    engineRef.current.reset(puzzle.fen)
    setFen(puzzle.fen)
    setPhase("playing")
    setMoveIndex(0)
    setSelected(null)
    setLastMove(null)
    setShake(false)
  }, [puzzle.fen, clearTimers])

  const selectSquare = useCallback(
    (square: SquareId) => {
      if (phase !== "playing") return

      // Clicking a square that belongs to the side to move (re)selects it.
      if (movableSquares.has(square)) {
        setSelected(square)
        return
      }

      if (!selected) return

      const attemptTargets = engineRef.current.legalTargetsFrom(selected)
      const target = attemptTargets.find((m) => m.to === square)
      if (!target) {
        setSelected(null)
        return
      }

      const expectedSan = puzzle.solution[moveIndex]
      const result = engineRef.current.move(selected, square)
      setSelected(null)
      if (!result.ok) return

      const correct = result.san === expectedSan
      setFen(result.fen!)
      setLastMove({ from: selected, to: square })

      if (!correct) {
        setShake(true)
        later(() => setShake(false), 420)
        setWrongAttempts((n) => n + 1)
        // Undo the wrong move after a brief beat so the player sees what they tried.
        later(() => {
          engineRef.current.reset(puzzle.fen)
          // replay any already-confirmed correct moves before this attempt
          for (let i = 0; i < moveIndex; i++) engineRef.current.moveSan(puzzle.solution[i])
          setFen(engineRef.current.fen)
          setLastMove(null)
        }, 700)
        return
      }

      const nextIndex = moveIndex + 1
      const isFinalMove = nextIndex >= puzzle.solution.length

      if (isFinalMove) {
        later(() => setPhase("solved"), SUCCESS_SETTLE_DELAY_MS)
        setMoveIndex(nextIndex)
        return
      }

      // Correct, but the line continues — play the scripted opponent reply.
      setMoveIndex(nextIndex)
      setPhase("opponent-reply")
      later(() => {
        const replySan = puzzle.solution[nextIndex]
        const replyResult = engineRef.current.moveSan(replySan)
        if (replyResult.ok) {
          setFen(replyResult.fen!)
          setMoveIndex(nextIndex + 1)
          setPhase("playing")
        }
      }, OPPONENT_REPLY_DELAY_MS)
    },
    [phase, selected, movableSquares, moveIndex, puzzle, later],
  )

  const requestHint = useCallback(() => {
    setHintsUsed((h) => Math.min(h + 1, 2))
  }, [])

  const hintSquares = useMemo((): SquareId[] => {
    if (hintsUsed === 0 || moveIndex >= puzzle.solution.length) return []
    const expectedSan = puzzle.solution[moveIndex]
    const pieces = engineRef.current.pieces()
    for (const piece of pieces) {
      const targets = engineRef.current.legalTargetsFrom(piece.square)
      const match = targets.find((t) => t.san === expectedSan)
      if (match) {
        if (hintsUsed === 1) return [match.from]
        return [match.from, match.to]
      }
    }
    return []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hintsUsed, moveIndex, puzzle, fen])

  const highlights = useMemo((): BoardHighlight[] => {
    const list: BoardHighlight[] = []
    if (selected) list.push({ square: selected, kind: "selected" })
    for (const t of legalTargets) {
      list.push({ square: t.to, kind: t.isCapture ? "capture" : "legal" })
    }
    if (lastMove) {
      list.push({ square: lastMove.from, kind: "last-from" })
      list.push({ square: lastMove.to, kind: "last-to" })
    }
    if (phase === "playing" && engineRef.current.isCheck()) {
      const king = engineRef.current.kingSquare(engineRef.current.turn)
      if (king) list.push({ square: king, kind: "check" })
    }
    for (const sq of hintSquares) list.push({ square: sq, kind: "legal" })
    if (phase === "solved") {
      const king = engineRef.current.kingSquare(engineRef.current.turn === "w" ? "b" : "w")
      if (king) list.push({ square: king, kind: "success" })
    }
    return list
  }, [selected, legalTargets, lastMove, phase, hintSquares])

  const progress = Math.min(moveIndex, puzzle.solution.length) // player-confirmed plies so far (counting replies)
  const movesRemaining = Math.ceil((puzzle.solution.length - moveIndex) / 2)

  return {
    fen,
    phase,
    pieces: engineRef.current.pieces(),
    selected,
    selectSquare,
    highlights,
    movableSquares,
    wrongAttempts,
    hintsUsed,
    requestHint,
    hintsRemaining: 2 - hintsUsed,
    shake,
    reset,
    progress,
    movesRemaining,
    isSolved: phase === "solved",
  }
}
