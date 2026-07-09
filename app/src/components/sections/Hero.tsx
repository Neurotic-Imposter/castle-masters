'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';

/**
 * Hero
 *
 * Homepage hero section — primary visual and CTA entry point.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Heading, Text, Button, Badge, Logo primitives
 * - Rendering brand name, tagline, CTA buttons, stats row, chess board visual
 * - Responsive layout: stacked mobile (<768px), side-by-side desktop (≥768px)
 * - Static chess board placeholder (no engine, no interactivity)
 * - Animated counter numbers (CSS-only, respects prefers-reduced-motion)
 *
 * Not Responsible For
 * - Chess game logic or engine
 * - Authentication or user state
 * - Routing (CTAs are Links with href from data)
 * - Data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 * - app/src/app/cm013-preview/page.tsx (CM013 preview verification)
 */

// ─── Chess Board Placeholder ────────────────────────────────────────────────

interface ChessBoardPlaceholderProps {
  className?: string;
}

const ChessBoardPlaceholder = ({ className = '' }: ChessBoardPlaceholderProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const piecePositions = [
    { piece: '♞', top: '-30px', right: '20px', delay: '0s' },
    { piece: '♛', bottom: '-20px', left: '20px', delay: '-2s' },
    { piece: '♜', top: '40%', right: '-40px', delay: '-3.5s' },
  ];

  return (
    <div className={`relative flex items-center justify-center ${className}`.trim()}>
      <div
        className="relative"
        style={{
          transform: 'rotateX(15deg) rotateY(-15deg)',
          transformStyle: 'preserve-3d',
          animation: prefersReducedMotion
            ? 'none'
            : 'boardFloat 6s ease-in-out infinite alternate',
        }}
      >
        <div
          className="chess-board-visual"
          style={{
            width: '380px',
            height: '380px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.1)',
          }}
        >
          {Array.from({ length: 64 }, (_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isLight = (row + col) % 2 === 0;
            return (
              <div
                key={i}
                className="cell"
                style={{
                  aspectRatio: '1',
                  background: isLight ? '#1c1c24' : '#111115',
                }}
              />
            );
          })}
        </div>
        {piecePositions.map(({ piece, top, right, bottom, left, delay }, i) => (
          <div
            key={i}
            className="floating-piece"
            style={{
              position: 'absolute',
              fontSize: '2.5rem',
              zIndex: 10,
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
              animation: prefersReducedMotion
                ? 'none'
                : `pieceFloat 5s ease-in-out infinite alternate`,
              animationDelay: delay,
              top,
              right,
              bottom,
              left,
              pointerEvents: 'none',
            }}
          >
            {piece}
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes boardFloat {
          0% { transform: rotateX(15deg) rotateY(-15deg) translateY(0); }
          100% { transform: rotateX(15deg) rotateY(-15deg) translateY(-15px); }
        }
        @keyframes pieceFloat {
          0% { transform: translateY(0) rotate(0); }
          100% { transform: translateY(-12px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
};

// ─── Stat Item ──────────────────────────────────────────────────────────────

// ─── Hero Section ───────────────────────────────────────────────────────────

export const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-180px)] flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '-200px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'var(--accent-emerald)',
            filter: 'blur(120px)',
            opacity: '0.12',
            mixBlendMode: 'screen',
            animation: 'floatOrb 12s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '10%',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'var(--accent-cyan)',
            filter: 'blur(120px)',
            opacity: '0.12',
            mixBlendMode: 'screen',
            animation: 'floatOrb 12s ease-in-out infinite alternate',
            animationDelay: '-4s',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '40%',
            right: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'var(--accent-violet)',
            filter: 'blur(120px)',
            opacity: '0.12',
            mixBlendMode: 'screen',
            animation: 'floatOrb 12s ease-in-out infinite alternate',
            animationDelay: '-8s',
          }}
        />
        <style jsx global>{`
          @keyframes floatOrb {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-50px) scale(1.1); }
          }
        `}</style>
      </div>

      <Container size="wide">
        <Grid columns={2} gap="xl" className="items-center gap-16 lg:gap-24">
          {/* ── Copy Column ── */}
          <div className="text-center md:text-left">
            <Badge variant="emerald" pulse>
              India&apos;s Complete Chess Ecosystem
            </Badge>
            <Stack spacing="md" className="mt-6">
              <Heading size="hero" as="h1" className="leading-hero">
                Where Chess
                <br />
                <span className="text-emerald">Champions</span>
                <br />
                <span className="text-cyan">Are Built</span>
              </Heading>
              <Text size="xl" color="muted" className="max-w-[520px] mx-auto md:mx-0">
                Coaching, tournaments, corporate programs, school partnerships, and a thriving chess
                community — Castle Masters is more than an academy. It is a movement.
              </Text>
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Book Free Trial
                </Link>
                <Link
                  href="/coaching"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-medium rounded-xl bg-transparent border border-border text-foreground hover:bg-emerald/5 hover:border-emerald transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Explore Coaching →
                </Link>
              </div>
            </Stack>
          </div>

          {/* ── Visual Column ── */}
          <div className="relative">
            <ChessBoardPlaceholder className="w-full" />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
