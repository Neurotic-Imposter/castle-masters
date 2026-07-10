/**
 * Chess Puzzles Page Data — Single Source of Truth
 *
 * All copy for the /chess-puzzles inner page.
 * Two responsibilities:
 *   A. Interactive puzzle demos (visual-only, no engine)
 *   B. Puzzle Deck product card (Add to Cart — commerce Phase 8)
 *
 * Never duplicate these values in components.
 * Never invent: ratings, difficulty scores, prices, SKUs, stock numbers.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type PuzzleStatus = 'available' | 'coming-soon';

export interface PuzzleCard {
  id: string;
  status: PuzzleStatus;
  title: string;
  description: string;
  /** Unicode chess piece for visual decoration — aria-hidden in component. */
  icon: string;
}

export interface PuzzleDeckProduct {
  label: string;
  title: string;
  description: string;
  features: readonly string[];
  /** CTA label — commerce not yet implemented. */
  ctaLabel: string;
}

export interface ChessPuzzlesPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  available: {
    heading: string;
    cards: readonly PuzzleCard[];
  };
  comingSoon: {
    heading: string;
    cards: readonly PuzzleCard[];
  };
  deck: PuzzleDeckProduct;
}

// ─── Chess Puzzles Page Content ───────────────────────────────────────────────

export const CHESS_PUZZLES_PAGE_CONTENT: ChessPuzzlesPageCopy = {
  label: 'Tactical Simulators',
  titleLines: ['Chess', 'Puzzles'],
  subtitle:
    'Solve tactical challenges to build fast pattern recognition. Puzzles are presented as premium training products. No active engine logic is loaded.',

  available: {
    heading: 'Available Now',
    cards: [
      {
        id: 'mate-in-1',
        status: 'available',
        title: 'Mate in 1 Challenges',
        description:
          'Develop fundamental tactical vision. Single-move mating puzzles organized by pin, skewer, and fork patterns.',
        icon: '♟',
      },
      {
        id: 'mate-in-4',
        status: 'available',
        title: 'Mate in 4 Campaigns',
        description:
          'Complex tactical strings. Test positional sacrifices, deflection plans, and mating calculations across multiple moves.',
        icon: '♛',
      },
    ] as const,
  },

  comingSoon: {
    heading: 'Coming Soon',
    cards: [
      {
        id: 'mate-in-2',
        status: 'coming-soon',
        title: 'Mate in 2 Challenges',
        description:
          'Double-move calculation blocks designed to expand forecasting and coordinate control. Under final testing.',
        icon: '♞',
      },
      {
        id: 'mate-in-3',
        status: 'coming-soon',
        title: 'Mate in 3 Campaigns',
        description:
          'Positional evaluations and forced defensive structures requiring a three-move sequence to execute checkmate.',
        icon: '♜',
      },
      {
        id: 'tactical-cards',
        status: 'coming-soon',
        title: 'Tactical Training Cards',
        description:
          'Interactive coordinate and opening strategy card decks designed to gamify FIDE rules learning and memory.',
        icon: '🃏',
      },
    ] as const,
  },

  deck: {
    label: 'Academy Store',
    title: 'Chess Puzzle Deck',
    description:
      'Physical tactical study card deck covering key checkmate patterns and positional themes. Designed for self-study and group training sessions.',
    features: [
      'Printed checkmate pattern cards',
      'Positional theme categories',
      'Suitable for all skill levels',
      'Designed for group and solo study',
    ],
    // Commerce (Add to Cart, Checkout, Razorpay) launches in Phase 8.
    ctaLabel: 'Available Soon',
  },
} as const;
