"use client";

import { useState } from "react";

import { PuzzleCard } from "@/features/puzzles/components/puzzle-card";
import { ModeSelector } from "@/features/puzzles/components/mode-selector";
import type { PuzzleModeId } from "@/features/puzzles/lib/types";

import "@/features/puzzles/components/puzzle-theme.css";

export default function PuzzleDemoPage() {
  const [mode, setMode] = useState<PuzzleModeId>("mate-in-1");

  return (
    <div
      className="cm-root"
      style={{
        background: "#05080a",
        minHeight: "100svh",
      }}
    >
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

          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#eef2f1",
              margin: 0,
            }}
          >
            Sharpen your tactics.
          </h1>
        </header>

        <ModeSelector active={mode} onChange={setMode} />

        <PuzzleCard
          mode={mode}
          onExploreDeck={() => console.log("Navigate to /chess-puzzles")}
        />
      </main>
    </div>
  );
}