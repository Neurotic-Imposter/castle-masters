import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import Heading from '@/components/ui/Heading';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { CHESS_PUZZLES_PAGE_CONTENT } from '@/lib/content/chess-puzzles';
import { PuzzleDemoSection } from './PuzzleDemoSection';

export const metadata = {
  title: 'Chess Puzzles',
  description:
    'Tactical chess puzzles and training products. Solve mate-in-N challenges and explore the Castle Masters Puzzle Deck.',
};

export default function ChessPuzzlesPage() {
  const { label, titleLines, subtitle } = CHESS_PUZZLES_PAGE_CONTENT;

  return (
    <>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <Section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-background">
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

      {/* ── Products Section ────────────────────────────────────────────── */}
      <Section className="py-12 md:py-16 bg-background">
        <Container>
          <PuzzleDemoSection />
        </Container>
      </Section>
    </>
  );
}
