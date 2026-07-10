import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { FAQ_CONTENT } from '@/lib/home';

/**
 * FAQ
 *
 * Homepage FAQ accordion section.
 *
 * Responsibilities
 * - Rendering section label, heading, and four FAQ items
 * - Composing Container, Stack, Heading, Text, Label primitives
 * - Accordion via native HTML <details>/<summary> — zero client JS
 * - Centered header, single-column accordion list (max-w-[800px])
 *
 * Not Responsible For
 * - Custom accordion animation beyond browser native
 * - State management of any kind
 *
 * Primary Consumers
 * - app/src/app/page.tsx (Home page)
 */

export const FAQ = () => {
  const { label, titleLines, items } = FAQ_CONTENT;

  return (
    <section className="py-20 md:py-28">
      <Container size="default">
        <Stack spacing="md" className="text-center max-w-3xl mx-auto mb-12">
          <Label color="cyan">{label}</Label>
          <Heading size="display" className="leading-title">
            {titleLines[0]}
            <br />
            <span className="text-emerald">{titleLines[1]}</span>
          </Heading>
        </Stack>

        <div className="max-w-[800px] mx-auto flex flex-col gap-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border border-border rounded-[16px] overflow-hidden bg-bg-card backdrop-blur-[12px] transition-colors duration-300 hover:border-[rgba(16,185,129,0.2)]"
            >
              <summary className="flex items-center justify-between gap-4 px-8 py-5 cursor-pointer font-heading font-semibold text-foreground transition-colors duration-300 hover:text-emerald list-none [&::-webkit-details-marker]:hidden">
                <Text as="span" size="base" className="font-heading font-semibold text-foreground group-open:text-emerald transition-colors duration-300">
                  {item.question}
                </Text>
                <span
                  className="shrink-0 text-[1.2rem] text-text-muted transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-border bg-black/20 px-8 py-5">
                <Text size="sm" color="muted" className="leading-relaxed">
                  {item.answer}
                </Text>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
