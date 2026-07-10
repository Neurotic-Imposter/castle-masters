import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { UPCOMING_TOURNAMENT_CONTENT } from '@/lib/home';

/**
 * UpcomingTournament
 *
 * Homepage featured tournament preview section.
 *
 * Responsibilities
 * - Rendering single featured tournament card from prototype
 * - Composing Container, Stack, Card, Heading, Text, Label, Badge primitives
 *
 * Not Responsible For
 * - Full tournaments page (separate page at /tournaments)
 * - Registration logic (CTA links to /tournaments#register)
 * - Multiple tournaments list
 */

export const UpcomingTournament = () => {
  const { label, titleLines, subtitle, card } = UPCOMING_TOURNAMENT_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <Stack spacing="md" className="text-center max-w-2xl mx-auto mb-12">
          <Label color="cyan">{label}</Label>
          <Stack spacing="sm">
            <Heading size="display" gradient className="leading-title">
              {titleLines[0]}
              <br />
              <span className="text-emerald">{titleLines[1]}</span>
            </Heading>
            <Text size="lg" color="muted">{subtitle}</Text>
          </Stack>
        </Stack>

        <Card padding="lg" className="max-w-3xl mx-auto text-left">
          <Stack spacing="md">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="emerald">Upcoming</Badge>
              <Badge variant="outline">{card.date}</Badge>
            </div>

            <Stack spacing="sm">
              <Text size="sm" color="muted">Venue</Text>
              <Text size="base" className="font-medium">{card.venue}</Text>
            </Stack>

            <Stack spacing="sm">
              <Text size="sm" color="muted">Details</Text>
              <Text size="base" className="font-medium">{card.details}</Text>
            </Stack>

            <Text size="sm" color="muted">{card.description}</Text>

            <Link
              href={card.cta.href}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 mt-4"
            >
              {card.cta.label}
            </Link>
          </Stack>
        </Card>
      </Container>
    </section>
  );
};

export default UpcomingTournament;