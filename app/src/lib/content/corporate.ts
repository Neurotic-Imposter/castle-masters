/**
 * Corporate Page Data — Single Source of Truth
 *
 * All copy for the /corporate inner page.
 * Never duplicate these values in components.
 *
 * 5 program cards from prototype.
 * Inquiry form lives on /contact — CTA links there.
 *
 * Never invent: client names, company names, testimonials,
 * metrics, case studies, pricing, or headcounts.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CorporateProgramCard {
  icon: string;
  title: string;
  description: string;
}

export interface CorporateCtaBlock {
  label: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
}

export interface CorporatePageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  programs: {
    heading: string;
    cards: readonly CorporateProgramCard[];
  };
  cta: CorporateCtaBlock;
}

// ─── Corporate Page Content ───────────────────────────────────────────────────

export const CORPORATE_PAGE_CONTENT: CorporatePageCopy = {
  label: 'Enterprise Coaching',
  titleLines: ['Corporate', 'Programs'],
  subtitle:
    'Develop strategic thinking, focus, and leadership through structured chess programs tailored for corporate teams.',

  programs: {
    heading: 'What We Offer',
    cards: [
      {
        icon: '🏆',
        title: 'Corporate Tournaments',
        description:
          'We coordinate, schedule, and host online or over-the-board chess leagues for your employees, complete with custom brackets and tournament rules.',
      },
      {
        icon: '💡',
        title: 'Leadership Through Chess',
        description:
          'Executive seminars translating chess board principles — evaluating risk, coordinating attacks, planning defenses — into practical management methods.',
      },
      {
        icon: '🧩',
        title: 'Custom Team Building',
        description:
          'High-energy interactive workshops including team tactical puzzles, blitz matches, and coordinate games to foster team interaction.',
      },
      {
        icon: '📊',
        title: 'Employee Engagement',
        description:
          'Launch dedicated corporate chess clubs supported by our training server platforms, tracking weekly performance and leagues.',
      },
      {
        icon: '⚙️',
        title: 'Customised Events',
        description:
          'We design custom corporate tournaments, family day chess zones, or specialised logical-thinking lectures to suit your company needs.',
      },
    ] as const,
  },

  cta: {
    label: 'Inquiry',
    heading: 'Corporate Partnership Inquiry',
    description:
      'Submit your program specifications via our contact form. An academy coordinator will respond to schedule a briefing.',
    primaryLabel: 'Send an Inquiry',
    primaryHref: '/contact',
  },
} as const;
