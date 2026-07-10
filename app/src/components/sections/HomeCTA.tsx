import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { CTA_CONTENT } from '@/lib/home';

/**
 * HomeCTA
 *
 * Homepage final CTA (Call to Action) section.
 *
 * Responsibilities
 * - Rendering section label, heading, description, and two CTA links
 * - Composing Container, Stack, Heading, Text, Label primitives
 * - Gradient background banner matching prototype .cta-banner spec
 * - Centered layout, border-radius 30px, two side-by-side CTAs
 *
 * Not Responsible For
 * - Form handling or authentication
 * - Business data fetching
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page — final section before Footer)
 */

export const HomeCTA = () => {
  const { label, heading, description, primaryCta, secondaryCta } = CTA_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="default">
        <div
          className="rounded-[30px] border border-border text-center px-8 py-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))',
          }}
        >
          <Stack spacing="md" className="max-w-2xl mx-auto">
            <Label color="emerald">{label}</Label>
            <Heading size="display" className="leading-title">
              {heading}
            </Heading>
            <Text size="lg" color="muted" className="max-w-[600px] mx-auto">
              {description}
            </Text>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium rounded-xl bg-transparent border border-border text-foreground hover:bg-emerald/5 hover:border-emerald transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </Stack>
        </div>
      </Container>
    </section>
  );
};

export default HomeCTA;
