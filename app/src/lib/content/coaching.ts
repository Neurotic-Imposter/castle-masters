/**
 * Coaching Page Data — Single Source of Truth
 *
 * All copy for the /coaching inner page.
 * Never duplicate these values in components.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProgramCard {
  level: string;
  title: string;
  description: string;
  features: readonly string[];
}

export interface RoadmapStep {
  icon: string;
  title: string;
  timeframe: string;
}

export interface StudyDay {
  day: string;
  instruction: string;
  selfStudy: string;
}

export interface CoachingPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  onlineCategory: {
    heading: string;
    programs: readonly ProgramCard[];
  };
  offlineCategory: {
    heading: string;
    programs: readonly ProgramCard[];
  };
  roadmap: {
    label: string;
    heading: string;
    steps: readonly RoadmapStep[];
  };
  studyPlan: {
    label: string;
    heading: string;
    days: readonly StudyDay[];
  };
  cta: {
    heading: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

// ─── Coaching Page Content ────────────────────────────────────────────────────

export const COACHING_PAGE_CONTENT: CoachingPageCopy = {
  label: 'Academy Training',
  titleLines: ['Coaching', 'Programs'],
  subtitle:
    'Structured learning pathways for every level. Connect with FIDE-certified trainers online or at our physical centers.',

  onlineCategory: {
    heading: 'Online Coaching Tracks',
    programs: [
      {
        level: 'Beginner',
        title: 'Online Foundation',
        description:
          'Basic rules, piece movement, coordinates, checkmate patterns, and starter tactical structures.',
        features: [
          'Interactive video lessons',
          'Tactical puzzle packs',
          'Monthly skill reviews',
        ],
      },
      {
        level: 'Intermediate',
        title: 'Online Accelerator',
        description:
          'Opening repertoire design, positional planning, middle-game tactics, and introductory endgame techniques.',
        features: [
          'Repertoire configuration',
          'Game evaluation tools',
          'Weekly training matches',
        ],
      },
      {
        level: 'Advanced',
        title: "Online Master's Track",
        description:
          'Deep theoretical evaluations, tactical calculations, complex endgame play, and psychological control methods.',
        features: [
          'Custom GM assessments',
          'Advanced positional analysis',
          'FIDE tournament prep',
        ],
      },
      {
        level: 'Tournament Prep',
        title: 'Tournament Prep Elite',
        description:
          'Simulated competitive play, specific opponent preparation, time control optimization, and rules guidelines.',
        features: [
          'Simulated Swiss rounds',
          'Interactive game review',
          'AICF registration guide',
        ],
      },
      {
        level: 'One-to-One',
        title: 'Private Mentorship',
        description:
          'Dedicated FIDE coach assigned to map a customized learning speed, review specific games, and isolate errors.',
        features: [
          '100% individual instruction',
          'Custom study scheduling',
          'Full session recordings',
        ],
      },
    ] as const,
  },

  offlineCategory: {
    heading: 'Offline Coaching Tracks',
    programs: [
      {
        level: 'Beginner',
        title: 'Center Foundation',
        description:
          'Physical board interaction, piece configurations, board etiquette, and core tactical patterns.',
        features: [
          'Over-the-board instruction',
          'Activity puzzle worksheets',
          'Class tournament games',
        ],
      },
      {
        level: 'Intermediate',
        title: 'Center Accelerator',
        description:
          'Tactical calculation drills, opening principles, basic positional plans, and endgame practice.',
        features: [
          'Clock play methodologies',
          'Weekly local matches',
          'Positional masterclasses',
        ],
      },
      {
        level: 'Advanced',
        title: "Center Master's Track",
        description:
          'Detailed theory lectures, advanced tactical combinations, positional dynamics, and tournament preps.',
        features: [
          'Deep tactical simulations',
          'FIDE-standard training',
          'Opening database reviews',
        ],
      },
      {
        level: 'Tournament Prep',
        title: 'Center Tournament Prep',
        description:
          'Local competitive simulations, strict tournament clock usage, FIDE rule review, and performance coaching.',
        features: [
          'Official chess clocks',
          'Local tournament entry',
          'Post-game review blocks',
        ],
      },
      {
        level: 'One-to-One',
        title: 'Center Private Mentorship',
        description:
          'Dedicated private analysis sessions at our academy hub. Focus on isolating errors on a physical board.',
        features: [
          'In-person review sessions',
          'Custom evaluation maps',
          'Open board practice access',
        ],
      },
    ] as const,
  },

  roadmap: {
    label: 'Methodology',
    heading: 'Your Progress Milestones',
    steps: [
      { icon: '📚', title: 'Chess Basics',      timeframe: 'Weeks 1–4'   },
      { icon: '🧩', title: 'Tactics & Vision',  timeframe: 'Weeks 5–12'  },
      { icon: '♟',  title: 'Opening Layouts',   timeframe: 'Weeks 13–20' },
      { icon: '🏰', title: 'Positional Plans',  timeframe: 'Weeks 21–32' },
      { icon: '⚔️', title: 'Endgame Mastery',   timeframe: 'Weeks 33–48' },
      { icon: '🏆', title: 'Tournament Entry',  timeframe: 'Ongoing'     },
    ] as const,
  },

  studyPlan: {
    label: 'Schedule',
    heading: 'Typical Training Week Layout',
    days: [
      {
        day: 'Monday',
        instruction: 'Online Theory Review (30 min)',
        selfStudy: 'Tactical puzzle worksheets (30 min)',
      },
      {
        day: 'Tuesday',
        instruction: 'Coaching session (60–90 min)',
        selfStudy: 'Active game analysis & reviews',
      },
      {
        day: 'Wednesday',
        instruction: 'Endgame Mastery drills (30 min)',
        selfStudy: 'Positional coordinate training (30 min)',
      },
      {
        day: 'Thursday',
        instruction: 'Online training matches (rapid/blitz)',
        selfStudy: 'Self-review with training engine tools',
      },
      {
        day: 'Friday',
        instruction: 'Group tactical analysis classes',
        selfStudy: 'Opening repertoire checkouts',
      },
      {
        day: 'Weekend',
        instruction: 'Academy / Simulator tournaments',
        selfStudy: 'Review sessions with assigned tutor',
      },
    ] as const,
  },

  cta: {
    heading: 'Ready to Begin?',
    description: 'Book a complimentary trial session with one of our coaches. No commitment required.',
    primaryLabel: 'Book Free Trial',
    primaryHref: '/contact',
    secondaryLabel: 'Contact Us',
    secondaryHref: '/contact',
  },
} as const;
