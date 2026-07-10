'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import { STATS_CONTENT } from '@/lib/home';

/**
 * Stats
 *
 * Homepage statistics section matching the approved prototype.
 *
 * Responsibilities
 * - Rendering the four homepage statistic cards from the prototype
 * - Composing existing Container, Grid, Stack, Card, Heading, and Text primitives
 * - Animating counters when the section enters the viewport
 * - Respecting prefers-reduced-motion by rendering final values immediately
 *
 * Does NOT own
 * - Hero content, CTAs, or chess-board visual
 * - Mission or any later homepage sections
 * - Business data fetching
 * - Global scroll-reveal primitives
 * - Homepage section ordering beyond its own section markup
 *
 * Consumers
 * - app/src/app/page.tsx
 */

interface StatCardProps {
  label: string;
  value: number;
  shouldAnimate: boolean;
  prefersReducedMotion: boolean;
}

const animationDuration = 1200;

const StatCard = ({ label, value, shouldAnimate, prefersReducedMotion }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const renderedValue = prefersReducedMotion ? value : displayValue;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (!shouldAnimate) {
      return;
    }

    let startTime: number | null = null;
    let frameId = 0;

    const animate = (timestamp: number): void => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / animationDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easedProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, shouldAnimate, value]);

  return (
    <Card
      padding="none"
      className="rounded-xl px-6 py-8 text-center"
      aria-label={`${value}+ ${label}`}
    >
      <Stack spacing="none" className="items-center">
        <Heading
          as="h3"
          size="display"
          gradient
          className="mb-1 text-[2.75rem] leading-none"
        >
          {renderedValue}+
        </Heading>
        <Text
          as="p"
          size="sm"
          color="muted"
          className="text-[0.85rem] uppercase tracking-badge"
        >
          {label}
        </Text>
      </Stack>
    </Card>
  );
};

export const Stats = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event: MediaQueryList | MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
      if (event.matches) {
        setShouldAnimate(true);
      }
    };

    updatePreference(mediaQuery);
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative z-base -mt-12 mb-20">
      <Container>
        <Grid columns={4} gap="md" className="max-[1024px]:grid-cols-2 max-[1024px]:mt-20 max-[480px]:grid-cols-1">
          {STATS_CONTENT.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              shouldAnimate={shouldAnimate}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Stats;
