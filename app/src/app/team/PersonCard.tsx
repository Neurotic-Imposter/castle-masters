"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Person } from "./people";

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export function PersonCard({ person, onClick }: PersonCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const shouldReduceMotion = useReducedMotion();
  const hasReducedMotion = mounted && shouldReduceMotion;

  // Keyboard navigation opening
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  // Shared layout tag
  const layoutId = `person-card-${person.id}`;

  return (
    <motion.div
      tabIndex={0}
      role="button"
      aria-label={`${person.name}, ${person.role}. Press Enter to view profile details.`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      layoutId={layoutId}
      whileHover={
        hasReducedMotion
          ? {}
          : {
              y: -10,
              scale: 1.04,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border-hover)",
            }
      }
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut",
      }}
      className={`relative w-[215px] h-[310px] rounded-2xl overflow-hidden border border-border bg-bg-card backdrop-blur-card shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald group`}
    >
      {/* Portrait Image */}
      <div className="relative w-full h-full select-none pointer-events-none">
        <Image
          src={person.photoUrl}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="215px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* Bottom Glass Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-bg-card/90 backdrop-blur-card border-t border-border flex flex-col gap-0.5 z-10 transition-colors duration-200 group-hover:bg-bg-card-hover">
        <h3 className="text-sm font-semibold text-foreground tracking-wide">
          {person.name}
        </h3>
        <p className="text-[10px] text-text-muted font-mono-accent uppercase tracking-widest">
          {person.role}
        </p>
      </div>

      {/* Emerald Hover Accent Line */}
      {!hasReducedMotion && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-emerald z-20"
        />
      )}
    </motion.div>
  );
}
