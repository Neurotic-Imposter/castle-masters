/**
 * Footer Configuration — Single Source of Truth
 *
 * All footer consumers must import from this file:
 * Footer, Sitemap generation, Legal pages.
 *
 * Never duplicate footer labels, hrefs, descriptions, or legal copy.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  /** Display label shown in footer column. */
  label: string;
  /** Route href — must match Next.js App Router page paths. */
  href: string;
  /**
   * When true, the link is rendered but non-interactive.
   * Consumers must render with aria-disabled="true", tabIndex={-1},
   * pointer-events-none, and preventDefault on click.
   */
  disabled?: boolean;
}

export interface FooterColumn {
  /** Column heading label. */
  label: string;
  /** Links in this column. */
  links: readonly FooterLink[];
}

export interface FooterMeta {
  /** Brand description shown in the first footer column. */
  description: string;
  /** Copyright notice template — year is injected at render time. */
  copyright: string;
  /** Legal tagline / disclaimer shown in footer bottom bar. */
  legalTagline: string;
}

export interface SocialLink {
  /** Platform identifier (e.g., 'twitter', 'linkedin', 'github'). */
  platform: string;
  /** Profile URL. */
  href: string;
  /** Accessible label. */
  label: string;
}

// ─── Footer Columns ──────────────────────────────────────────────────────────

/** Footer navigation columns — consumed by Footer component. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    label: 'Product',
    links: [
      { label: 'Coaching', href: '/coaching' },
      { label: 'Tournaments & Events', href: '/tournaments' },
      { label: 'Chess Puzzles', href: '/chess-puzzles' },
      { label: 'Corporate', href: '/corporate', disabled: true },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '/about', disabled: true },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers', disabled: true },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { label: 'Blog', href: '/blog', disabled: true },
      { label: 'Help Center', href: '/help', disabled: true },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    label: 'Community',
    links: [
      { label: 'Discord', href: '/discord', disabled: true },
      { label: 'Newsletter', href: '/newsletter', disabled: true },
      { label: 'Affiliates', href: '/affiliates', disabled: true },
      { label: 'Press Kit', href: '/press', disabled: true },
    ],
  },
] as const;

// ─── Footer Metadata ─────────────────────────────────────────────────────────

/** Footer brand metadata — description, copyright template, legal tagline. */
export const FOOTER: FooterMeta = {
  description:
    'Castle Masters is the premier platform for chess coaching, tournaments, and community. Building stronger positions on and off the board.',
  copyright: '© {year} Castle Masters. All rights reserved.',
  legalTagline: 'Building stronger positions.',
} as const;

// ─── Social Links (Future-Proof API) ────────────────────────────────────────

/**
 * Social media links — exported for future rendering.
 * Currently empty; consumers should not render until populated.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = [] as const;