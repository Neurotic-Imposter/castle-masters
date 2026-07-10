import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { TOURNAMENTS_PAGE_CONTENT, type UpcomingTournamentCard, type PastTournamentCard } from '@/lib/content/tournaments';

export const metadata = {
  title: 'Tournaments & Events',
  description:
    'Participate in rated tournaments and community events. View upcoming and past competitions from Castle Masters.',
};

// ─── Upcoming Tournament Card ─────────────────────────────────────────────────

const UpcomingCard = ({ title, date, venue, format, registerUrl }: UpcomingTournamentCard) => (
  <Card padding="lg" hoverable className="flex flex-col gap-5">
    <Heading as="h3" size="title" className="text-lg">
      {title}
    </Heading>
    <Stack spacing="sm" className="flex-1">
      <div className="flex items-start gap-3">
        <span className="text-text-muted text-sm w-16 shrink-0">Date</span>
        <Text as="span" size="sm">{date}</Text>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-text-muted text-sm w-16 shrink-0">Venue</span>
        <Text as="span" size="sm">{venue}</Text>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-text-muted text-sm w-16 shrink-0">Format</span>
        <Text as="span" size="sm">{format}</Text>
      </div>
    </Stack>
    {registerUrl !== null ? (
      <Link
        href={registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg mt-auto"
      >
        Register Now
      </Link>
    ) : (
      <span
        aria-disabled="true"
        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl bg-emerald/10 text-emerald/40 cursor-not-allowed select-none mt-auto"
        title="Registration link coming soon"
      >
        Registration Opening Soon
      </span>
    )}
  </Card>
);

// ─── Past Tournament Card ─────────────────────────────────────────────────────

const PastCard = ({ title, completedDate, venue, results }: PastTournamentCard) => (
  <Card padding="lg" className="flex flex-col gap-5">
    <Heading as="h3" size="title" className="text-lg">
      {title}
    </Heading>
    <Stack spacing="sm">
      <div className="flex items-start gap-3">
        <span className="text-text-muted text-sm w-24 shrink-0">Completed</span>
        <Text as="span" size="sm">{completedDate}</Text>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-text-muted text-sm w-24 shrink-0">Venue</span>
        <Text as="span" size="sm">{venue}</Text>
      </div>
    </Stack>
    <div className="border-t border-border pt-4">
      <Text size="sm" color="muted" className="italic">
        {results}
      </Text>
    </div>
  </Card>
);

// ─── Tournaments Page ─────────────────────────────────────────────────────────

export default function TournamentsPage() {
  const { label, titleLines, subtitle, upcoming, past } = TOURNAMENTS_PAGE_CONTENT;

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

      {/* ── Upcoming Tournaments ─────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {upcoming.heading}
          </Heading>
          <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {upcoming.cards.map((card) => (
              <UpcomingCard key={card.id} {...card} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Past Tournaments ─────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {past.heading}
          </Heading>
          <Grid columns={2} gap="lg" className="max-[768px]:grid-cols-1">
            {past.cards.map((card) => (
              <PastCard key={card.id} {...card} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
