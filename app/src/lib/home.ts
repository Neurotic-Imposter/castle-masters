/**
 * Home Page Data — Single Source of Truth
 *
 * All copy, statistics, and configuration for the Home page sections.
 * Consumers: Hero Section, Stats Section, Mission Section, Coaching Section, and other homepage sections.
 * Never duplicate these values in components.
 */

// ─── Shared Types ────────────────────────────────────────────────────────────

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

export interface CoachingCard {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface CoachingOverviewCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  cards: readonly CoachingCard[];
}

export interface PuzzleStatus {
  label: string;
  variant: 'now' | 'soon';
}

export interface PuzzleCard {
  status: PuzzleStatus;
  icon: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface PuzzlesPreviewCopy {
  label: string;
  titleLines: [string, string];
  viewAllHref: string;
  viewAllLabel: string;
  cards: readonly PuzzleCard[];
}

// ─── Hero Section ────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  copy: {
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
  } satisfies HeroCopy,
  chessBoard: {
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
  } as const,
  ambientOrbs: [
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
  ] as const,
} as const;

// ─── Stats Section ───────────────────────────────────────────────────────────

export const STATS_CONTENT = [
  { label: 'Tournaments Hosted', value: 15 },
  { label: 'Expert Coaches', value: 25 },
  { label: 'Active Students', value: 200 },
  { label: 'School Partners', value: 12 },
] as const;

// ─── Mission Section ─────────────────────────────────────────────────────────

export const MISSION_CONTENT = {
  label: 'Our Mission',
  quote: "To build India's most complete chess ecosystem where every player discovers structured paths to grow, compete, and master the board.",
  description:
    'We combine grandmaster-grade curriculum design with flexible delivery models to support growth from novice moves to tournament performance.',
} satisfies MissionCopy;

// ─── Coaching Section ────────────────────────────────────────────────────────

export const COACHING_CONTENT = {
  label: 'Coaching Programs',
  titleLines: [
    'Structured Coaching',
    'For Every Level',
  ],
  subtitle:
    'From first moves to championship preparation, our programs adapt to your goals.',
  cards: [
    {
      icon: '👶',
      title: 'Beginner Foundations',
      description: 'Learn piece movement, basic tactics, and opening principles through guided play.',
      href: '/coaching',
    },
    {
      icon: '⚔️',
      title: 'Intermediate Tactics',
      description: 'Master combinations, positional concepts, and tournament-ready repertoire.',
      href: '/coaching',
    },
    {
      icon: '🏆',
      title: 'Advanced Competition',
      description: 'Grandmaster-level analysis, psychological preparation, and peak performance training.',
      href: '/coaching',
    },
    {
      icon: '🏫',
      title: 'School Programs',
      description: 'Curriculum-aligned chess education delivered in-school or after-school.',
      href: '/coaching',
    },
  ] as const,
} as const;

// ─── Chess Puzzles Section ───────────────────────────────────────────────────

export const PUZZLES_CONTENT = {
  label: 'Tactical Play',
  titleLines: [
    'Interactive',
    'Training Puzzles',
  ],
  viewAllHref: '/chess-puzzles',
  viewAllLabel: 'View All Chess Puzzles →',
  cards: [
    {
      status: { label: 'Available Now', variant: 'now' },
      icon: '🧩',
      title: 'Mate in 1 Challenges',
      description:
        'Sharpen tactical pattern recognition with quick single-move mating sequences designed to build fast tactical calculations.',
      href: '/chess-puzzles',
      ctaLabel: 'Play Demo',
    },
    {
      status: { label: 'Available Now', variant: 'now' },
      icon: '⚔️',
      title: 'Mate in 4 Campaigns',
      description:
        'Advanced calculation coordinates showing complex tactical motifs. Test your foresight and positional calculations.',
      href: '/chess-puzzles',
      ctaLabel: 'Play Demo',
    },
    {
      status: { label: 'Coming Soon', variant: 'soon' },
      icon: '🔐',
      title: 'Mate in 2 Series',
      description:
        'Two-move forced mates developing calculation depth and intermediate tactical themes.',
      href: '/chess-puzzles',
      ctaLabel: 'Notify Me',
    },
    {
      status: { label: 'Coming Soon', variant: 'soon' },
      icon: '🎯',
      title: 'Mate in 3 Compositions',
      description:
        'Three-move combinations requiring precise candidate selection and defensive refutation.',
      href: '/chess-puzzles',
      ctaLabel: 'Notify Me',
    },
  ] as const,
} as const;

// ─── Upcoming Tournament Section ──────────────────────────────────────────────

export interface TournamentCard {
  date: string;
  venue: string;
  details: string;
  description: string;
  cta: { label: string; href: string };
}

export interface UpcomingTournamentCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  card: TournamentCard;
}

export const UPCOMING_TOURNAMENT_CONTENT: UpcomingTournamentCopy = {
  label: 'Upcoming Tournament',
  titleLines: [
    'Next Major Event',
    'Coming Soon',
  ],
  subtitle: 'Mark your calendar for our flagship tournament of the season.',
  card: {
    date: 'Date to be announced',
    venue: 'Venue to be announced',
    details: 'Format and registration details to be announced',
    description: 'Full tournament details will be published when confirmed by the organizing team.',
    cta: { label: 'View Tournaments →', href: '/tournaments' },
  },
} as const;

// ─── Corporate Overview Section ──────────────────────────────────────────────

export interface CorporateCard {
  icon: string;
  title: string;
  description: string;
}

export interface CorporateOverviewCopy {
  label: string;
  titleLines: [string, string];
  exploreCta: { label: string; href: string };
  cards: readonly CorporateCard[];
}

export const CORPORATE_CONTENT: CorporateOverviewCopy = {
  label: 'Enterprise Solutions',
  titleLines: ['Corporate', 'Chess Modules'],
  exploreCta: { label: 'Explore Corporate →', href: '/corporate' },
  cards: [
    {
      icon: '🏢',
      title: 'Strategic Workshops',
      description:
        'Translating chess principles (foresight, resource management, defense) into core corporate planning methodologies.',
    },
    {
      icon: '🤝',
      title: 'Employee Engagement',
      description:
        'Fostering team cohesion through local inter-departmental chess leagues, blitz events, and custom chess platforms.',
    },
  ] as const,
} as const;

// ─── Team Preview Section ─────────────────────────────────────────────────────

export interface TeamPreviewCopy {
  label: string;
  titleLines: [string, string];
  meetCta: { label: string; href: string };
  icon: string;
  heading: string;
  description: string;
  viewAllCta: { label: string; href: string };
}

export const TEAM_PREVIEW_CONTENT: TeamPreviewCopy = {
  label: 'Who We Are',
  titleLines: ['The', 'Castle Team'],
  meetCta: { label: 'Meet Team →', href: '/team' },
  icon: '👥',
  heading: 'Expert Instructors & Coordinators',
  description:
    'Our coaching team comprises experienced chess instructors and active organizers who deliver structured curriculums designed for growth at every level.',
  viewAllCta: { label: 'View All Members', href: '/team' },
} as const;

// ─── Testimonials Section ────────────────────────────────────────────────────

export interface TestimonialCard {
  stars: number;
  quote: string;
  authorName: string;
  authorSub: string;
}

export interface TestimonialsCopy {
  label: string;
  titleLines: [string, string];
  cards: readonly TestimonialCard[];
}

export const TESTIMONIALS_CONTENT: TestimonialsCopy = {
  label: 'Success Stories',
  titleLines: ['Student', 'Reviews'],
  cards: [
    {
      stars: 5,
      quote:
        'Student feedback placeholder — details of learning growth, tactical progression, and FIDE rating improvements will be displayed here.',
      authorName: 'Student Profile - Placeholder',
      authorSub: 'Active Academy Learner',
    },
    {
      stars: 5,
      quote:
        'Parent testimonial placeholder — reviews from parents reflecting on structural improvements in focus, logic, and planning skills.',
      authorName: 'Parent Profile - Placeholder',
      authorSub: 'Junior Member Parent',
    },
    {
      stars: 5,
      quote:
        'Corporate coordinator feedback placeholder — reviews from executives on employee engagement, strategic workshops, and team response.',
      authorName: 'Corporate Client - Placeholder',
      authorSub: 'Workshop Participant',
    },
  ] as const,
} as const;

// ─── FAQ Section ─────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCopy {
  label: string;
  titleLines: [string, string];
  items: readonly FaqItem[];
}

export const FAQ_CONTENT: FaqCopy = {
  label: 'Support',
  titleLines: ['Frequently Asked', 'Questions'],
  items: [
    {
      question: 'What age groups do you coach?',
      answer:
        'We provide training programs customized for all groups, including junior development (ages 5+) and adult study sessions. Coaches personalize lessons based on individual skill levels.',
    },
    {
      question: 'Do you offer FIDE rating preparation?',
      answer:
        'Yes. Our advanced modules focus on opening preparation, positional evaluation, endgame theory, and clock control strategies tailored to prepare candidates for FIDE-rated tournaments.',
    },
    {
      question: 'How are online training sessions conducted?',
      answer:
        'Online lessons are hosted on secure, interactive chess servers coupled with live video streams. Students analyze games, solve puzzles, and play training matches in real time with their coach.',
    },
    {
      question: 'Can corporate sessions be customized?',
      answer:
        'Absolutely. We coordinate with HR/Corporate Leads to align strategic training modules, blitz leagues, or workshop durations to your organizational goals and participant numbers.',
    },
  ] as const,
} as const;

// ─── Homepage CTA Section ────────────────────────────────────────────────────

export interface CtaCopy {
  label: string;
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const CTA_CONTENT: CtaCopy = {
  label: 'Get Started',
  heading: 'Begin Your Chess Journey',
  description:
    'Join the Castle Masters ecosystem. Coordinate with our training coordinators for a complimentary assessment and starter trial.',
  primaryCta: { label: 'Book Free Trial', href: '/contact' },
  secondaryCta: { label: 'Inquire with Us', href: '/contact' },
} as const;

