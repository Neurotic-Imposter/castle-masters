/**
 * Tournaments Page Data — Single Source of Truth
 *
 * All copy for the /tournaments inner page.
 * Never duplicate these values in components.
 *
 * Upcoming: 3 placeholder cards
 * Past: 2 placeholder cards
 *
 * TODO (Founder): Replace registerUrl null values with real Google Form URLs
 * when the production registration links are provided.
 * Example: registerUrl: 'https://forms.google.com/...'
 *
 * TODO (Founder): Replace all placeholder card content (titles, dates, venues,
 * formats, prizes, results) with real tournament data.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TournamentBadgeVariant = 'emerald' | 'cyan' | 'outline';

export interface UpcomingTournamentCard {
  id: string;
  /** TODO (Founder): Replace with real tournament name. */
  title: string;
  /** TODO (Founder): Replace with real date once confirmed. */
  date: string;
  /** TODO (Founder): Replace with real venue once confirmed. */
  venue: string;
  /** TODO (Founder): Replace with real format once confirmed. */
  format: string;
  /**
   * Google Forms registration URL.
   * Set to null until founder provides the production URL.
   * When null, the Register button renders as disabled.
   * TODO (Founder): Replace null with real Google Form URL.
   */
  registerUrl: string | null;
}

export interface PastTournamentCard {
  id: string;
  /** TODO (Founder): Replace with real tournament name. */
  title: string;
  /** TODO (Founder): Replace with real completion date. */
  completedDate: string;
  /** TODO (Founder): Replace with real venue. */
  venue: string;
  /**
   * Results placeholder.
   * TODO (Founder): Replace with actual results data (winner, runner-up,
   * standings) once the organizing committee provides the information.
   */
  results: string;
}

export interface TournamentsPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  upcoming: {
    heading: string;
    cards: readonly UpcomingTournamentCard[];
  };
  past: {
    heading: string;
    cards: readonly PastTournamentCard[];
  };
}

// ─── Tournaments Page Content ─────────────────────────────────────────────────

export const TOURNAMENTS_PAGE_CONTENT: TournamentsPageCopy = {
  label: 'Competition Hub',
  titleLines: ['Tournaments &', 'Events'],
  subtitle:
    'Participate in rated tournaments and community events. All entries below are placeholder entries pending schedule confirmation from the organizing team.',

  upcoming: {
    heading: 'Upcoming Tournaments',
    cards: [
      {
        id: 'upcoming-1',
        title: 'Upcoming Tournament — Placeholder',
        date: 'Date to be announced',
        venue: 'Venue to be announced',
        format: 'Format to be announced',
        // TODO (Founder): Replace null with real Google Form URL when provided.
        registerUrl: null,
      },
      {
        id: 'upcoming-2',
        title: 'Upcoming Tournament — Placeholder',
        date: 'Date to be announced',
        venue: 'Venue to be announced',
        format: 'Format to be announced',
        // TODO (Founder): Replace null with real Google Form URL when provided.
        registerUrl: null,
      },
      {
        id: 'upcoming-3',
        title: 'Upcoming Tournament — Placeholder',
        date: 'Date to be announced',
        venue: 'Venue to be announced',
        format: 'Format to be announced',
        // TODO (Founder): Replace null with real Google Form URL when provided.
        registerUrl: null,
      },
    ] as const,
  },

  past: {
    heading: 'Past Tournaments',
    cards: [
      {
        id: 'past-1',
        title: 'Past Tournament — Placeholder',
        completedDate: 'Date placeholder',
        venue: 'Venue placeholder',
        // TODO (Founder): Replace with actual results when provided by organizing committee.
        results: 'Results will appear here once provided by the organizing team.',
      },
      {
        id: 'past-2',
        title: 'Past Tournament — Placeholder',
        completedDate: 'Date placeholder',
        venue: 'Venue placeholder',
        // TODO (Founder): Replace with actual results when provided by organizing committee.
        results: 'Results will appear here once provided by the organizing team.',
      },
    ] as const,
  },
} as const;
