import React from 'react';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { MISSION_CONTENT } from '@/lib/home';

/**
 * Mission
 *
 * Homepage mission statement section.
 *
 * Responsibilities
 * - Rendering the mission label, quote, and supporting description
 * - Composing existing Container, Stack, Heading, Text, and Label primitives
 *
 * Not Responsible For
 * - Hero, Stats, or any other homepage section
 * - Business data fetching
 * - Animation (prototype renders this section statically on the server)
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

export const Mission = () => {
  return (
    <section className="relative py-20">
      <Container size="narrow">
        <div
          className="mx-auto max-w-[800px] text-center"
          style={{
            background:
              'radial-gradient(circle at top, rgba(16, 185, 129, 0.05), transparent 70%)',
            borderRadius: '30px',
            border: '1px solid var(--border)',
            padding: '4rem 3rem',
          }}
        >
          <Stack spacing="md" className="items-center">
            <Label color="cyan">{MISSION_CONTENT.label}</Label>
            <Text
              as="p"
              size="xl"
              className="font-heading text-[1.85rem] leading-[1.4] font-medium"
            >
              {MISSION_CONTENT.quote}
            </Text>
            <Text size="sm" color="muted" className="max-w-[640px]">
              {MISSION_CONTENT.description}
            </Text>
          </Stack>
        </div>
      </Container>
    </section>
  );
};

export default Mission;
