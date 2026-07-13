import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import ContactForm from '@/components/contact/ContactForm';
import { CONTACT_PAGE_CONTENT } from '@/lib/content/contact';

export const metadata = {
  title: 'Contact',
  description:
    'Book a free trial session or inquire about coaching, corporate programs, and school partnerships.',
};

export default function ContactPage() {
  const { label, titleLines, subtitle, channels, hubs } = CONTACT_PAGE_CONTENT;

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

      {/* ── Two-column: Form | Details ───────────────────────────────────── */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">

            {/* ── Left: Inquiry Form ─────────────────────────────────────── */}
            <Card padding="lg">
              <Heading as="h2" size="section" className="mb-6 text-foreground">
                {CONTACT_PAGE_CONTENT.form.heading}
              </Heading>
              <ContactForm />
            </Card>

            {/* ── Right: Channels + Hubs ─────────────────────────────────── */}
            <div className="flex flex-col gap-8">

              {/* Contact Channels */}
              <Card padding="lg">
                <Heading as="h2" size="sub" className="mb-5 text-foreground">
                  {channels.heading}
                </Heading>
                <div className="flex flex-col gap-4">
                  {channels.items.map((channel) => (
                    <div key={channel.label} className="flex items-start gap-3">
                      <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
                        {channel.icon}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <Text size="xs" color="muted" className="uppercase tracking-badge font-semibold">
                          {channel.label}
                        </Text>
                        {channel.label.toLowerCase().includes('phone') ? (
                          <a
                            href="tel:+919818006599"
                            className="text-sm text-foreground hover:text-emerald transition-colors focus:outline-none focus:underline"
                          >
                            {channel.value}
                          </a>
                        ) : channel.label.toLowerCase().includes('email') ? (
                          <a
                            href={`mailto:${channel.value}`}
                            className="text-sm text-foreground hover:text-emerald transition-colors focus:outline-none focus:underline"
                          >
                            {channel.value}
                          </a>
                        ) : (
                          <Text size="sm">{channel.value}</Text>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Academy Hubs */}
              <Card padding="lg">
                <Heading as="h2" size="sub" className="mb-2 text-foreground">
                  {hubs.heading}
                </Heading>
                <Text size="sm" color="muted" className="mb-5 leading-relaxed">
                  {hubs.description}
                </Text>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hubs.items.map((hub) => (
                    <div
                      key={hub.name}
                      className="rounded-xl border border-border bg-bg-card/40 px-4 py-3 flex flex-col gap-1"
                    >
                      <Text size="sm" className="font-medium text-foreground">
                        {hub.name}
                      </Text>
                      <Text size="xs" color="muted">
                        {hub.address}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
