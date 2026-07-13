import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { COACHING_CONTENT } from '@/lib/home';

/**
 * CoachingOverview
 *
 * Homepage coaching programs section.
 *
 * Responsibilities
 * - Rendering the coaching label, title, subtitle, and program cards
 * - Composing Container, Grid, Stack, Card, Heading, Text, Label primitives
 * - Responsive layout: 1 column mobile, 2 columns tablet, 4 columns desktop
 *
 * Not Responsible For
 * - Full coaching page content (separate page at /coaching)
 * - Business data fetching
 * - Authentication or user state
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

interface CoachingCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const CoachingCard = ({ icon, title, description, href }: CoachingCardProps) => (
  <Card padding="md" className="text-left h-full flex flex-col">
    <Stack spacing="sm">
      <Text as="span" size="lg" className="font-heading">
        {icon}
      </Text>
      <Heading as="h3" size="title" className="text-lg">
        {title}
      </Heading>
      <Text size="sm" color="muted" className="flex-1">
        {description}
      </Text>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-cyan transition-colors mt-auto"
      >
        Learn more
        <span aria-hidden="true">→</span>
      </Link>
    </Stack>
  </Card>
);

export const CoachingOverview = () => (
  <section className="py-20 md:py-28">
    <Container size="wide">
      <Stack spacing="md" className="text-center max-w-3xl mx-auto mb-16">
        <Label color="cyan">{COACHING_CONTENT.label}</Label>
        <Stack spacing="sm">
          <Heading size="display" gradient className="leading-title">
            {COACHING_CONTENT.titleLines[0]}
            <br />
            <span className="text-emerald">{COACHING_CONTENT.titleLines[1]}</span>
          </Heading>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto">
            {COACHING_CONTENT.subtitle}
          </Text>
        </Stack>
      </Stack>

      <Grid columns={4} gap="lg" className="max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1">
        {COACHING_CONTENT.cards.map((card) => (
          <CoachingCard key={card.title} {...card} />
        ))}
      </Grid>
    </Container>
  </section>
);

export default CoachingOverview;