import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Link from 'next/link';
import { TEAM_PREVIEW_CONTENT } from '@/lib/home';

/**
 * TeamPreview
 *
 * Homepage team preview section.
 *
 * Responsibilities
 * - Rendering team label, heading, and single centered placeholder panel
 * - Composing Container, Stack, Card, Heading, Text, Label, Link primitives
 * - Header layout: label + heading left, ghost CTA right (matches prototype grid-header)
 *
 * Not Responsible For
 * - Full team page (separate page at /team)
 * - Individual team member cards or real bios
 * - Business data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

export const TeamPreview = () => {
  const { label, titleLines, meetCta, icon, heading, description, viewAllCta } =
    TEAM_PREVIEW_CONTENT;

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
            href={meetCta.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground border border-border rounded-xl px-4 py-2 transition-colors"
          >
            {meetCta.label}
          </Link>
        </div>

        <Card padding="lg" className="text-center">
          <Stack spacing="md" className="items-center">
            <span className="text-[4rem] leading-none text-emerald" aria-hidden="true">
              {icon}
            </span>
            <Heading as="h3" size="title">
              {heading}
            </Heading>
            <Text size="base" color="muted" className="max-w-[600px] mx-auto">
              {description}
            </Text>
            <Link
              href={viewAllCta.href}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-medium text-emerald border border-emerald rounded-xl hover:bg-emerald/10 transition-colors"
            >
              {viewAllCta.label}
            </Link>
          </Stack>
        </Card>
      </Container>
    </section>
  );
};

export default TeamPreview;
