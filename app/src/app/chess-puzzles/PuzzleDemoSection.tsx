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
import { PRODUCTS, type Product } from "@/lib/content/chess-puzzles";
import { useCart } from "@/context/CartContext";

import "@/features/puzzles/components/puzzle-theme.css";

const PLAYABLE_MODES = new Set<string>(["mate-in-1", "mate-in-2", "mate-in-3", "mate-in-4"]);

export function PuzzleDemoSection() {
  const [activeMode, setActiveMode] = useState<PuzzleModeId | null>(null);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    if (PLAYABLE_MODES.has(id)) {
      setActiveMode(id as PuzzleModeId);
      // Scroll to demo player smoothly
      setTimeout(() => {
        document.getElementById("interactive-demo-player")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      icon: product.icon,
    });
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-12">
      <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
        {PRODUCTS.map((product) => (
          <Card key={product.id} padding="lg" hoverable className="flex flex-col gap-5 items-start h-full justify-between">
            <div className="flex flex-col gap-4 items-start w-full">
              <Badge variant="emerald">Available Now</Badge>
              <span className="text-4xl" aria-hidden="true">
                {product.icon}
              </span>
              <div className="flex flex-col gap-2">
                <Heading as="h3" size="title" className="text-lg">
                  {product.title}
                </Heading>
                <Text size="sm" color="muted" className="leading-relaxed">
                  {product.description}
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-muted">Price</span>
                <span className="text-base font-bold text-foreground">₹{product.price}</span>
              </div>
              <div className="flex gap-2 w-full">
                {product.playable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePlay(product.id)}
                    aria-pressed={activeMode === product.id}
                  >
                    {activeMode === product.id ? "Playing ↓" : "Demo"}
                  </Button>
                )}
                <Button
                  size="sm"
                  className={`flex-1 transition-all duration-200 ${
                    addedProductId === product.id ? "bg-emerald text-bg hover:bg-emerald" : ""
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedProductId === product.id ? "Added! ✓" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      {activeMode && (
        <div id="interactive-demo-player" className="cm-root flex flex-col items-center gap-4 border-t border-border pt-12">
          <div className="w-full max-w-[30rem] mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Text size="sm" color="muted" className="font-semibold uppercase tracking-label">
                Interactive Demo Simulator
              </Text>
              <button
                type="button"
                onClick={() => setActiveMode(null)}
                className="text-sm text-text-muted hover:text-foreground transition-colors"
                aria-label="Close demo"
              >
                ✕ Close Player
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
