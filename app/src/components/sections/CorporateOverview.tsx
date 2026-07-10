import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Link from 'next/link';
import { CORPORATE_CONTENT } from '@/lib/home';

/**
 * CorporateOverview
 *
 * Homepage corporate programs preview section.
 *
 * Responsibilities
 * - Rendering corporate label, heading, and two feature cards
 * - Composing Container, Grid, Stack, Card, Heading, Text, Label primitives
 * - Header layout: label + heading left, ghost CTA right (matches prototype grid-header)
 * - Responsive layout: 2 columns desktop, 1 column mobile
 *
 * Not Responsible For
 * - Full corporate page content (separate page at /corporate)
 * - Business data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

export const CorporateOverview = () => {
  const { label, titleLines, exploreCta, cards } = CORPORATE_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <Stack spacing="sm">
            <Label color="cyan">{label}</Label>
            <Heading size="display" gradient className="leading-title">
              {titleLines[0]}
              <br />
              <span className="text-emerald">{titleLines[1]}</span>
            </Heading>
          </Stack>
          <Link
            href={exploreCta.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground border border-border rounded-xl px-4 py-2 transition-colors"
          >
            {exploreCta.label}
          </Link>
        </div>

        <Grid columns={2} gap="lg" className="max-[480px]:grid-cols-1">
          {cards.map((card) => (
            <Card key={card.title} padding="md" className="text-left h-full">
              <Stack spacing="sm">
                <span className="inline-flex items-center justify-center w-[50px] h-[50px] rounded-xl text-[1.6rem] bg-white/[0.04] border border-border">
                  {card.icon}
                </span>
                <Heading as="h3" size="title" className="text-lg">
                  {card.title}
                </Heading>
                <Text size="sm" color="muted">
                  {card.description}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default CorporateOverview;
