/**
 * Chess Puzzles Page Data — Single Source of Truth
 *
 * All copy and product specs for the /chess-puzzles inner page.
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  playable?: boolean;
}

export interface ChessPuzzlesPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
}

export const CHESS_PUZZLES_PAGE_CONTENT: ChessPuzzlesPageCopy = {
  label: 'Tactical Simulators',
  titleLines: ['Chess', 'Puzzles'],
  subtitle:
    'Solve tactical challenges to build fast pattern recognition. Puzzles are presented as premium training products. No active engine logic is loaded.',
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "mate-in-1",
    title: "Mate in 1",
    description: "Develop fundamental tactical vision. Single-move mating puzzles organized by pin, skewer, and fork patterns.",
    icon: "♟",
    price: 199,
    playable: true,
  },
  {
    id: "mate-in-2",
    title: "Mate in 2",
    description: "Double-move calculation blocks designed to expand forecasting and coordinate control. Under final testing.",
    icon: "♞",
    price: 299,
    playable: true,
  },
  {
    id: "mate-in-3",
    title: "Mate in 3",
    description: "Positional evaluations and forced defensive structures requiring a three-move sequence to execute checkmate.",
    icon: "♜",
    price: 399,
    playable: true,
  },
  {
    id: "mate-in-4",
    title: "Mate in 4",
    description: "Complex tactical strings. Test positional sacrifices, deflection plans, and mating calculations across multiple moves.",
    icon: "♛",
    price: 499,
    playable: true,
  },
  {
    id: "playing-deck",
    title: "Playing Deck",
    description: "Physical tactical study card deck covering key checkmate patterns and positional themes. Designed for self-study and group training.",
    icon: "🃏",
    price: 799,
  },
] as const;
