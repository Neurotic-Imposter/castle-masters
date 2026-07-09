/**
 * Home Page Data — Single Source of Truth
 *
 * All copy, statistics, and configuration for the Home page sections.
 * Consumers: Hero, Stats, Mission, and other homepage sections.
 * Never duplicate these values in components.
 */

export interface StatItem {
  label: string;
  value: number;
}

export interface HeroCopy {
  badge: string;
  headingLines: [string, string, string];
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface MissionCopy {
  label: string;
  quote: string;
  description: string;
}

export const HERO_COPY: HeroCopy = {
  badge: "India's Complete Chess Ecosystem",
  headingLines: [
    'Where Chess',
    'Champions',
    'Are Built',
  ],
  description:
    'Coaching, tournaments, corporate programs, school partnerships, and a thriving chess community — Castle Masters is more than an academy. It is a movement.',
  ctaPrimary: { label: 'Book Free Trial', href: '/contact' },
  ctaSecondary: { label: 'Explore Coaching →', href: '/coaching' },
};

export const HERO_STATS: readonly StatItem[] = [
  { label: 'Tournaments Hosted', value: 15 },
  { label: 'Expert Coaches', value: 25 },
  { label: 'Active Students', value: 200 },
  { label: 'School Partners', value: 12 },
] as const;

export const MISSION_COPY: MissionCopy = {
  label: 'Our Mission',
  quote: "To build India's most complete chess ecosystem where every player discovers structured paths to grow, compete, and master the board.",
  description:
    'We combine grandmaster-grade curriculum design with flexible delivery models to support growth from novice moves to tournament performance.',
};

export const SECTION_LABELS = {
  statistics: 'Statistics',
  statsTitle: 'By the Numbers',
  statsSubtitle: 'Key metrics that define our impact across India\'s chess ecosystem.',
} as const;

export const CHESS_BOARD_CONFIG = {
  width: 380,
  height: 380,
  piecePositions: [
    { piece: '♞', top: '-30px', right: '20px', delay: '0s' },
    { piece: '♛', bottom: '-20px', left: '20px', delay: '-2s' },
    { piece: '♜', top: '40%', right: '-40px', delay: '-3.5s' },
  ],
  boardTransform: 'rotateX(15deg) rotateY(-15deg)',
  floatAnimation: {
    board: 'boardFloat 6s ease-in-out infinite alternate',
    piece: 'pieceFloat 5s ease-in-out infinite alternate',
  },
} as const;

export const AMBIENT_ORBS_CONFIG = [
  {
    top: '-200px',
    right: '-100px',
    width: '600px',
    height: '600px',
    background: 'var(--accent-emerald)',
    animationDelay: '0s',
  },
  {
    bottom: '10%',
    left: '-100px',
    width: '500px',
    height: '500px',
    background: 'var(--accent-cyan)',
    animationDelay: '-4s',
  },
  {
    top: '40%',
    right: '20%',
    width: '400px',
    height: '400px',
    background: 'var(--accent-violet)',
    animationDelay: '-8s',
  },
] as const;