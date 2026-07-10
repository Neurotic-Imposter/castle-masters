import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { PUZZLES_CONTENT } from '@/lib/home';

/**
 * ChessPuzzlesPreview
 *
 * Homepage chess puzzles preview section.
 *
 * Responsibilities
 * - Rendering puzzle label, title, and program cards
 * - Composing Container, Grid, Stack, Card, Heading, Text, Label, Badge primitives
 * - Responsive layout: 1 column mobile, 2 columns tablet, 4 columns desktop
 * - "Coming Soon" cards rendered with reduced opacity and disabled CTAs
 *
 * Not Responsible For
 * - Full chess puzzles page (separate page at /chess-puzzles)
 * - Chess engine or puzzle logic
 * - Business data fetching
 * - Authentication or user state
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

const PuzzleCard = ({
  status,
  icon,
  title,
  description,
  href,
  ctaLabel,
}: (typeof PUZZLES_CONTENT.cards)[number]) => {
  const isComingSoon = status.variant === 'soon';
  return (
    <Card padding="md" className={`text-left h-full flex flex-col ${isComingSoon ? 'opacity-40' : ''}`}>
      <Stack spacing="sm">
        <Badge variant={isComingSoon ? 'outline' : 'emerald'}>
          {status.label}
        </Badge>
        <Text as="span" size="lg" className="font-heading">
          {icon}
        </Text>
        <Heading as="h3" size="title" className="text-lg">
          {title}
        </Heading>
        <Text size="sm" color="muted" className="flex-1">
          {description}
        </Text>
        {isComingSoon ? (
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald/50 mt-auto cursor-not-allowed"
            aria-disabled="true"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </span>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-cyan transition-colors mt-auto"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </Stack>
    </Card>
  );
};

export const ChessPuzzlesPreview = () => (
  <section className="py-20 md:py-28">
    <Container size="wide">
      <Stack spacing="md" className="text-center max-w-3xl mx-auto mb-16">
        <Label color="cyan">{PUZZLES_CONTENT.label}</Label>
        <Stack spacing="sm">
          <Heading size="display" gradient className="leading-title">
            {PUZZLES_CONTENT.titleLines[0]}
            <br />
            <span className="text-emerald">{PUZZLES_CONTENT.titleLines[1]}</span>
          </Heading>
        </Stack>
      </Stack>

      <Grid
        columns={4}
        gap="lg"
        className="max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1"
      >
        {PUZZLES_CONTENT.cards.map((card) => (
          <PuzzleCard key={card.title} {...card} />
        ))}
      </Grid>

      <div className="mt-12 text-center">
        <Link
          href={PUZZLES_CONTENT.viewAllHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-cyan transition-colors"
        >
          {PUZZLES_CONTENT.viewAllLabel}
        </Link>
      </div>
    </Container>
  </section>
);

export default ChessPuzzlesPreview;