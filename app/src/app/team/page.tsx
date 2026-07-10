import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Card from '@/components/ui/Card';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import Badge from '@/components/ui/Badge';
import { TEAM_PAGE_CONTENT, type TeamMember } from '@/lib/content/team';

export const metadata = {
  title: 'Team — Castle Masters',
  description:
    'Meet the Castle Masters team — founders, coaches, trainers, advisors, and operations coordinators.',
};

// ─── Member Card ──────────────────────────────────────────────────────────────

const MemberCard = ({ avatar, role, title, description, status }: TeamMember) => (
  <Card padding="lg" className="flex flex-col gap-4">
    <span className="text-4xl" aria-hidden="true">
      {avatar}
    </span>
    <div className="flex flex-col gap-1">
      <Badge variant="outline" className="w-fit">
        {role}
      </Badge>
      <Heading as="h3" size="title" className="text-base mt-2">
        {title}
      </Heading>
      <Text size="sm" color="muted" className="leading-relaxed">
        {description}
      </Text>
    </div>
    <Label color="muted" className="text-xs mt-auto pt-3 border-t border-border">
      {status}
    </Label>
  </Card>
);

// ─── Team Page ────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const { label, titleLines, subtitle, categories } = TEAM_PAGE_CONTENT;

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

      {/* ── Team Categories ──────────────────────────────────────────────── */}
      {categories.map((category) => (
        <Section key={category.id} className="py-10 md:py-12">
          <Container>
            <Heading as="h2" size="section" className="mb-8 text-foreground">
              {category.heading}
            </Heading>
            <Grid columns={3} gap="lg" className="max-[1024px]:grid-cols-2 max-[600px]:grid-cols-1">
              {category.members.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Grid>
          </Container>
        </Section>
      ))}
    </>
  );
}
