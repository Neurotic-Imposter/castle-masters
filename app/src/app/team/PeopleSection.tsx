"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { people, type Person } from "./people";
import { PersonCard } from "./PersonCard";
import PersonModal from "./PersonModal";

export function PeopleSection() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[750px] bg-background"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, transparent 50%, rgba(0, 0, 0, 0.25) 100%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cpath d='M45 0 L90 45 L45 90 L0 45 Z' fill='rgba(16, 185, 129, 0.015)'/%3E%3C/svg%3E")
        `,
        backgroundSize: '100% 100%, 90px 90px',
        backgroundRepeat: 'no-repeat, repeat',
      }}
    >
      {/* ── Ambient Orbs — identical to Hero/Homepage ───────────────── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '-200px',
          right: '-100px',
          width: '600px',
          height: '600px',
          background: 'var(--accent-emerald)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: '0.12',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '10%',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'var(--accent-cyan)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: '0.12',
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Soft Shared Ambient Glow behind the cards row ────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none"
        style={{
          width: '80%',
          maxWidth: '1200px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 60%, transparent 100%)',
          filter: 'blur(200px)',
        }}
      />

      {/* ── Heading ────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center max-w-xl px-6 mb-16 md:mb-24 flex flex-col items-center gap-3">
        <span className="text-[10px] font-mono-accent uppercase tracking-[0.3em] text-emerald">
          THE PEOPLE
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Behind Castle Masters
        </h2>
        <p className="text-sm md:text-base text-text-muted max-w-sm">
          Meet the people shaping the future of chess.
        </p>
      </div>

      {/* ── Cards Row Container ───────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-row flex-nowrap items-start justify-start lg:justify-center gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none py-4">
        {people.map((person) => (
          <div key={person.id} className="shrink-0 snap-center">
            <PersonCard
              person={person}
              onClick={() => setSelectedPerson(person)}
            />
          </div>
        ))}
      </div>

      {/* ── Profile Detail Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedPerson && (
          <PersonModal
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default PeopleSection;
