"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import { Grid } from "@/components/layout/Grid";
import Button from "@/components/ui/Button";
import { PuzzleCard as PuzzleEngineCard } from "@/features/puzzles/components/puzzle-card";
import { ModeSelector } from "@/features/puzzles/components/mode-selector";
import type { PuzzleModeId } from "@/features/puzzles/lib/types";
import type { PuzzleCard } from "@/lib/content/chess-puzzles";

import "@/features/puzzles/components/puzzle-theme.css";

const PLAYABLE_MODES = new Set<string>(["mate-in-1", "mate-in-2", "mate-in-3", "mate-in-4"]);

export function PuzzleDemoSection({ cards }: { cards: readonly PuzzleCard[] }) {
  const [activeMode, setActiveMode] = useState<PuzzleModeId | null>(null);

  const handlePlay = (id: string) => {
    if (PLAYABLE_MODES.has(id)) setActiveMode(id as PuzzleModeId);
  };

  return (
    <div className="flex flex-col gap-8">
      <Grid columns={2} gap="lg" className="max-[600px]:grid-cols-1">
        {cards.map((card) => (
          <Card key={card.id} padding="lg" hoverable className="flex flex-col gap-5 items-start">
            <Badge variant="emerald">Available Now</Badge>
            <span className="text-4xl" aria-hidden="true">
              {card.icon}
            </span>
            <div className="flex flex-col gap-2 flex-1">
              <Heading as="h3" size="title" className="text-lg">
                {card.title}
              </Heading>
              <Text size="sm" color="muted" className="leading-relaxed">
                {card.description}
              </Text>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePlay(card.id)}
              aria-pressed={activeMode === card.id}
            >
              {activeMode === card.id ? "Playing Demo ↓" : "Play Demo"}
            </Button>
          </Card>
        ))}
      </Grid>

      {activeMode && (
        <div className="cm-root flex flex-col items-center gap-4">
          <div className="w-full max-w-[30rem] mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Text size="sm" color="muted" className="font-semibold uppercase tracking-label">
                Interactive Demo
              </Text>
              <button
                type="button"
                onClick={() => setActiveMode(null)}
                className="text-sm text-text-muted hover:text-foreground transition-colors"
                aria-label="Close demo"
              >
                ✕ Close
              </button>
            </div>
            <ModeSelector active={activeMode} onChange={setActiveMode} />
            <PuzzleEngineCard
              mode={activeMode}
              onExploreDeck={() => setActiveMode(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
