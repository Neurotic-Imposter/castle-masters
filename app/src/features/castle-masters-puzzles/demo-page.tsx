"use client"

// Example integration — this is how the module gets dropped into a route.
// Not required by the module itself; copy the pattern into your own page.

import { useState } from "react"
import { PuzzleCard } from "./components/puzzle-card"
import { ModeSelector } from "./components/mode-selector"
import type { PuzzleModeId } from "./lib/types"
import "./components/puzzle-theme.css"

export default function PuzzleDemoPage() {
  const [mode, setMode] = useState<PuzzleModeId>("mate-in-1")

  return (
    <div className="cm-root" style={{ background: "#05080a", minHeight: "100svh" }}>
      <main
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "4rem 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <header style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#34d399",
              marginBottom: "0.5rem",
            }}
          >
            Castle Masters
          </p>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#eef2f1", margin: 0 }}>
            Sharpen your tactics.
          </h1>
        </header>

        <ModeSelector active={mode} onChange={setMode} />
        <PuzzleCard mode={mode} onExploreDeck={() => console.log("navigate to /puzzles")} />
      </main>
    </div>
  )
}
