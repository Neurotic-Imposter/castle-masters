/**
 * Team Page Data — Single Source of Truth
 *
 * All copy for the /team inner page.
 * Never duplicate these values in components.
 *
 * 5 categories, 8 member cards — all placeholder.
 * All profiles sourced directly from prototype/index.html.
 *
 * Never invent:
 * - Names, biographies, FIDE ratings, titles, credentials,
 *   achievements, experience, or statistics.
 *
 * TODO (Founder): Replace placeholder cards with real team profiles
 * when personal and credential data has been verified and approved.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  /** Unicode emoji for visual avatar — aria-hidden in component. */
  avatar: string;
  /** Role / job title (e.g. "Head of Academy"). */
  role: string;
  /** Display name — always ends with "— Placeholder" until real data provided. */
  title: string;
  /** Placeholder description. Never invent credentials or ratings. */
  description: string;
  /** Footer status line (e.g. "Profile Details Pending"). */
  status: string;
}

export interface TeamCategory {
  id: string;
  heading: string;
  members: readonly TeamMember[];
}

export interface TeamPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  categories: readonly TeamCategory[];
}

// ─── Team Page Content ────────────────────────────────────────────────────────

export const TEAM_PAGE_CONTENT: TeamPageCopy = {
  label: 'Our Directory',
  titleLines: ['Castle Masters', 'Team'],
  subtitle:
    'Our roster comprises professionals, logical advisors, and operations coordinators. All profiles are placeholders.',

  categories: [
    {
      id: 'founders',
      heading: 'Founders',
      members: [
        {
          id: 'founder-1',
          avatar: '👑',
          role: 'Head of Academy',
          title: 'Founder Profile — Placeholder',
          description:
            'Credentials & biography pending validation.',
          status: 'Profile Details Pending',
        },
        {
          id: 'founder-2',
          avatar: '👑',
          role: 'Director of Technology',
          title: 'Co-Founder Profile — Placeholder',
          description:
            'Lead System Architect — coordinates puzzle database design and training platforms.',
          status: 'Profile Details Pending',
        },
      ] as const,
    },
    {
      id: 'coaches',
      heading: 'Coaches',
      members: [
        {
          id: 'coach-1',
          avatar: '♟',
          role: 'Senior Coach',
          title: 'Coach Profile — Placeholder',
          description:
            'FIDE Rating — TBC. Focuses on advanced opening strategies and middle-game tactics.',
          status: 'Rating Details Pending',
        },
        {
          id: 'coach-2',
          avatar: '♜',
          role: 'Tactical Instructor',
          title: 'Coach Profile — Placeholder',
          description:
            'FIDE Rating — TBC. Focuses on junior training and fundamental logic structures.',
          status: 'Rating Details Pending',
        },
        {
          id: 'coach-3',
          avatar: '♞',
          role: 'Endgame Specialist',
          title: 'Coach Profile — Placeholder',
          description:
            'FIDE Rating — TBC. Focuses on rook endgames and tactical calculations.',
          status: 'Rating Details Pending',
        },
      ] as const,
    },
    {
      id: 'trainers',
      heading: 'Trainers',
      members: [
        {
          id: 'trainer-1',
          avatar: '♟',
          role: 'Tactics Tutor',
          title: 'Trainer Profile — Placeholder',
          description:
            'FIDE Rating — TBC. Manages beginner puzzle reviews and game notation training.',
          status: 'Rating Details Pending',
        },
      ] as const,
    },
    {
      id: 'advisors',
      heading: 'Advisors',
      members: [
        {
          id: 'advisor-1',
          avatar: '🧙',
          role: 'Grandmaster Advisor',
          title: 'Advisor Profile — Placeholder',
          description:
            'Grandmaster title pending verification. Consults on curriculum structure and advanced masterclasses.',
          status: 'Title Verification TBC',
        },
      ] as const,
    },
    {
      id: 'operations',
      heading: 'Operations Team',
      members: [
        {
          id: 'ops-1',
          avatar: '⚙️',
          role: 'Academy Coordinator',
          title: 'Operations Profile — Placeholder',
          description:
            'Handles class matching, FIDE entry forms, and online server access scheduling.',
          status: 'Inquiry Coordinator',
        },
      ] as const,
    },
  ] as const,
} as const;
