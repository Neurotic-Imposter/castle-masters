import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { CORPORATE_PAGE_CONTENT, type CorporateProgramCard } from '@/lib/content/corporate';

export const metadata = {
  title: 'Corporate Programs — Castle Masters',
  description:
    'Chess-based corporate programs for strategic thinking, leadership, and team engagement. Tournaments, workshops, and custom events for your organisation.',
};

// ─── Program Card ─────────────────────────────────────────────────────────────

const ProgramCard = ({ icon, title, description }: CorporateProgramCard) => (
  <Card padding="lg" hoverable className="flex flex-col gap-4">
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

// ─── Corporate Page ───────────────────────────────────────────────────────────

export default function CorporatePage() {
  const { label, titleLines, subtitle, programs, cta } = CORPORATE_PAGE_CONTENT;

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

      {/* ── Programs Grid ────────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {programs.heading}
          </Heading>
          <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {programs.cards.map((card) => (
              <ProgramCard key={card.title} {...card} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="rounded-3xl border border-emerald/20 bg-emerald/5 p-8 md:p-12 text-center flex flex-col items-center gap-6">
            <Label color="emerald">{cta.label}</Label>
            <Heading as="h2" size="display" className="leading-title">
              {cta.heading}
            </Heading>
            <Text size="lg" color="muted" className="max-w-lg">
              {cta.description}
            </Text>
            <Link
              href={cta.primaryHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {cta.primaryLabel}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
