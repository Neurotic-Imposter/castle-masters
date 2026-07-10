'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Badge from '@/components/ui/Badge';
import {
  HERO_CONTENT,
} from '@/lib/home';

/**
 * Hero
 *
 * Homepage hero section — primary visual and CTA entry point.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Heading, Text, and Badge primitives
 * - Rendering hero-only presentation content: badge, heading, description, CTA buttons, and chess board visual
 * - Responsive layout: stacked mobile (<768px), side-by-side desktop (≥768px)
 * - Static chess board placeholder (no engine, no interactivity)
 * - Ambient hero background orbs
 *
 * Not Responsible For
 * - Homepage statistics, mission, or any later homepage sections
 * - Chess game logic or engine
 * - Authentication or user state
 * - Routing (CTAs are Links with href from data)
 * - Data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
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

  return (
    <div className={`relative flex items-center justify-center ${className}`.trim()}>
      <div
        className="relative"
        style={{
          transform: HERO_CONTENT.chessBoard.boardTransform,
          transformStyle: 'preserve-3d',
          animation: prefersReducedMotion
            ? 'none'
            : HERO_CONTENT.chessBoard.floatAnimation.board,
        }}
      >
        <div
          className="chess-board-visual"
          style={{
            width: `${HERO_CONTENT.chessBoard.width}px`,
            height: `${HERO_CONTENT.chessBoard.height}px`,
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
        {HERO_CONTENT.chessBoard.piecePositions.map((piecePosition, i) => (
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
                : HERO_CONTENT.chessBoard.floatAnimation.piece,
              animationDelay: piecePosition.delay,
              top: 'top' in piecePosition ? piecePosition.top : undefined,
              right: 'right' in piecePosition ? piecePosition.right : undefined,
              bottom: 'bottom' in piecePosition ? piecePosition.bottom : undefined,
              left: 'left' in piecePosition ? piecePosition.left : undefined,
              pointerEvents: 'none',
            }}
          >
            {piecePosition.piece}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Hero Section ───────────────────────────────────────────────────────────

export const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-180px)] flex items-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {HERO_CONTENT.ambientOrbs.map((orb, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              ...orb,
              borderRadius: '50%',
              filter: 'blur(120px)',
              opacity: '0.12',
              mixBlendMode: 'screen',
              animation: 'floatOrb 12s ease-in-out infinite alternate',
            }}
          />
        ))}
      </div>

      <Container size="wide">
        <Grid columns={2} gap="xl" className="items-center gap-16 lg:gap-24">
          <div className="text-center md:text-left">
            <Badge variant="emerald" pulse>
              {HERO_CONTENT.copy.badge}
            </Badge>
            <Stack spacing="md" className="mt-6">
              <Heading size="hero" as="h1" className="leading-hero">
                {HERO_CONTENT.copy.headingLines[0]}
                <br />
                <span className="text-emerald">{HERO_CONTENT.copy.headingLines[1]}</span>
                <br />
                <span className="text-cyan">{HERO_CONTENT.copy.headingLines[2]}</span>
              </Heading>
              <Text size="xl" color="muted" className="max-w-[520px] mx-auto md:mx-0">
                {HERO_CONTENT.copy.description}
              </Text>
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link
                  href={HERO_CONTENT.copy.ctaPrimary.href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {HERO_CONTENT.copy.ctaPrimary.label}
                </Link>
                <Link
                  href={HERO_CONTENT.copy.ctaSecondary.href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-lg font-medium rounded-xl bg-transparent border border-border text-foreground hover:bg-emerald/5 hover:border-emerald transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  {HERO_CONTENT.copy.ctaSecondary.label}
                </Link>
              </div>
            </Stack>
          </div>

          <div className="relative">
            <ChessBoardPlaceholder className="w-full" />
          </div>
        </Grid>
      </Container>
    </section>
  );
};

export default Hero;
