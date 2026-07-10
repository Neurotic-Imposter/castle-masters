import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { TESTIMONIALS_CONTENT } from '@/lib/home';

/**
 * Testimonials
 *
 * Homepage testimonials section.
 *
 * Responsibilities
 * - Rendering section label, heading, and three placeholder testimonial cards
 * - Composing Container, Grid, Stack, Card, Heading, Text, Label primitives
 * - Centered header with no CTA (matches prototype)
 * - Responsive: 3-column desktop, 2-column tablet, 1-column mobile
 *
 * Not Responsible For
 * - Real testimonials or reviewer data
 * - Star rating interactivity
 * - Business data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

export const Testimonials = () => {
  const { label, titleLines, cards } = TESTIMONIALS_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="wide">
        <Stack spacing="md" className="text-center max-w-3xl mx-auto mb-16">
          <Label color="cyan">{label}</Label>
          <Heading size="display" gradient className="leading-title">
            {titleLines[0]}
            <br />
            <span className="text-emerald">{titleLines[1]}</span>
          </Heading>
        </Stack>

        <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[480px]:grid-cols-1">
          {cards.map((card) => (
            <Card key={card.authorName} padding="md" className="flex flex-col gap-4">
              <Text as="span" size="base" className="text-amber-400 tracking-wide" aria-label={`${card.stars} out of 5 stars`}>
                {'★'.repeat(card.stars)}
              </Text>
              <blockquote>
                <Text size="sm" color="muted" className="italic leading-relaxed">
                  &ldquo;{card.quote}&rdquo;
                </Text>
              </blockquote>
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border">
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.04] border border-border text-emerald text-lg shrink-0"
                  aria-hidden="true"
                >
                  ♟
                </span>
                <div>
                  <Text size="sm" className="font-medium">
                    {card.authorName}
                  </Text>
                  <Text size="sm" color="muted">
                    {card.authorSub}
                  </Text>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Testimonials;
