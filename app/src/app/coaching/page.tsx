import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import { COACHING_PAGE_CONTENT } from '@/lib/content/coaching';

export const metadata = {
  title: 'Coaching Programs',
  description:
    'Structured chess coaching for every level. Online and offline tracks from beginner foundations to tournament preparation.',
};

// ─── Program Card ─────────────────────────────────────────────────────────────

const ProgramCard = ({
  level,
  title,
  description,
  features,
}: (typeof COACHING_PAGE_CONTENT.onlineCategory.programs)[number]) => (
  <Card padding="lg" hoverable className="flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <Badge variant="emerald">{level}</Badge>
      <Heading as="h3" size="title" className="text-lg mt-1">
        {title}
      </Heading>
      <Text size="sm" color="muted" className="leading-relaxed">
        {description}
      </Text>
    </div>
    <ul className="flex flex-col gap-2 flex-1">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <span className="text-emerald mt-0.5 text-sm flex-shrink-0" aria-hidden="true">
            ✓
          </span>
          <Text as="span" size="sm" color="muted">
            {feature}
          </Text>
        </li>
      ))}
    </ul>
    <Link
      href={COACHING_PAGE_CONTENT.cta.primaryHref}
      className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg mt-auto"
    >
      {COACHING_PAGE_CONTENT.cta.primaryLabel}
    </Link>
  </Card>
);

// ─── Coaching Page ────────────────────────────────────────────────────────────

export default function CoachingPage() {
  const { label, titleLines, subtitle, onlineCategory, offlineCategory, roadmap, studyPlan, cta } =
    COACHING_PAGE_CONTENT;

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

      {/* ── Online Coaching Tracks ───────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {onlineCategory.heading}
          </Heading>
          <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {onlineCategory.programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Offline Coaching Tracks ──────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Heading as="h2" size="section" className="mb-8 text-foreground">
            {offlineCategory.heading}
          </Heading>
          <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
            {offlineCategory.programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Progress Milestones ──────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Stack spacing="sm" className="text-center mb-10">
            <Label color="cyan">{roadmap.label}</Label>
            <Heading as="h2" size="section">
              {roadmap.heading}
            </Heading>
          </Stack>
          <Grid columns={3} gap="md" className="max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
            {roadmap.steps.map((step) => (
              <Card key={step.title} padding="md" className="text-center flex flex-col items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {step.icon}
                </span>
                <Heading as="h3" size="sub">
                  {step.title}
                </Heading>
                <Text size="sm" color="muted">
                  {step.timeframe}
                </Text>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Weekly Study Plan ────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <Stack spacing="sm" className="text-center mb-10">
            <Label color="cyan">{studyPlan.label}</Label>
            <Heading as="h2" size="section">
              {studyPlan.heading}
            </Heading>
          </Stack>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Day</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Instruction Block</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Self-Study Focus</th>
                </tr>
              </thead>
              <tbody>
                {studyPlan.days.map((row, i) => (
                  <tr
                    key={row.day}
                    className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-bg-card/30' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                      {row.day}
                    </td>
                    <td className="px-6 py-4 text-text-muted">{row.instruction}</td>
                    <td className="px-6 py-4 text-text-muted">{row.selfStudy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="rounded-3xl border border-emerald/20 bg-emerald/5 p-8 md:p-12 text-center flex flex-col items-center gap-6">
            <Label color="emerald">Get Started</Label>
            <Heading as="h2" size="display" className="leading-title">
              {cta.heading}
            </Heading>
            <Text size="lg" color="muted" className="max-w-lg">
              {cta.description}
            </Text>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Link
                href={cta.primaryHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {cta.primaryLabel}
              </Link>
              <Link
                href={cta.secondaryHref}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl bg-transparent border border-border text-foreground hover:bg-emerald/5 hover:border-emerald transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
