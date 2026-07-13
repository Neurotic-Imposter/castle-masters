import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import { CHESS_PUZZLES_PAGE_CONTENT, type PuzzleCard } from '@/lib/content/chess-puzzles';
import { PuzzleDemoSection } from './PuzzleDemoSection';

export const metadata = {
  title: 'Chess Puzzles',
  description:
    'Tactical chess puzzles and training products. Solve mate-in-N challenges and explore the Castle Masters Puzzle Deck.',
};

// ─── Coming Soon Puzzle Card ──────────────────────────────────────────────────

const ComingSoonPuzzleCard = ({ icon, title, description }: PuzzleCard) => (
  <Card padding="lg" className="flex flex-col gap-5 items-start opacity-60">
    <Badge variant="outline">Coming Soon</Badge>
    <span className="text-4xl" aria-hidden="true">
      {icon}
    </span>
    <div className="flex flex-col gap-2 flex-1">
      <Heading as="h3" size="title" className="text-lg">
        {title}
      </Heading>
      <Text size="sm" color="muted" className="leading-relaxed">
        {description}
      </Text>
    </div>
  </Card>
);

// ─── Chess Puzzles Page ───────────────────────────────────────────────────────

export default function ChessPuzzlesPage() {
  const { label, titleLines, subtitle, available, comingSoon, deck } = CHESS_PUZZLES_PAGE_CONTENT;

  return (
    <>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <Section className="pt-28 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Stack spacing="sm">
              <Label color="cyan">{label}</Label>
              <Heading size="display" as="h1" className="leading-title">
                {titleLines[0]}{' '}
                <span className="text-emerald">{titleLines[1]}</span>
              </Heading>
            </Stack>
            <Text size="base" color="muted" className="max-w-md">
              {subtitle}
            </Text>
          </div>
        </Container>
      </Section>

      {/* ── Available Now ────────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {available.heading}
          </Heading>
          <PuzzleDemoSection cards={available.cards} />
        </Container>
      </Section>

      {/* ── Coming Soon ──────────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {comingSoon.heading}
          </Heading>
          <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {comingSoon.cards.map((card) => (
              <ComingSoonPuzzleCard key={card.id} {...card} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Puzzle Deck Product ──────────────────────────────────────────── */}
      <Section className="py-12 md:py-20">
        <Container>
          <Card padding="lg" className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-center">
            {/* Visual */}
            <div
              className="shrink-0 flex items-center justify-center w-full md:w-48 h-48 rounded-2xl bg-emerald/5 border border-emerald/10 text-7xl"
              aria-hidden="true"
            >
              🃏
            </div>

            {/* Copy */}
            <div className="flex flex-col gap-5 flex-1">
              <Stack spacing="sm">
                <Label color="emerald">{deck.label}</Label>
                <Heading as="h2" size="section">
                  {deck.title}
                </Heading>
                <Text size="base" color="muted" className="leading-relaxed">
                  {deck.description}
                </Text>
              </Stack>

              <ul className="flex flex-col gap-2">
                {deck.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-emerald mt-0.5 text-sm shrink-0" aria-hidden="true">
                      ✓
                    </span>
                    <Text as="span" size="sm" color="muted">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 mt-2">
                {/* Add to Cart disabled — commerce launches Phase 8. */}
                <span
                  aria-disabled="true"
                  className="inline-flex w-fit items-center justify-center px-7 py-3.5 text-base font-medium rounded-xl bg-emerald/10 text-emerald/40 cursor-not-allowed select-none"
                  title="Commerce launching in a future update"
                >
                  {deck.ctaLabel}
                </span>
                <Text size="xs" color="muted">
                  Add to Cart will be available when the commerce system launches.
                </Text>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
