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
  /** Platform identifier (e.g., 'instagram', 'linkedin'). */
  platform: string;
  /** Profile URL. */
  href: string;
  /** Accessible label. */
  label: string;
  /** Display icon (emoji or text symbol). */
  icon: string;
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
      { label: 'Corporate', href: '/corporate' },
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
      { label: 'Privacy Policy', href: '/privacy', disabled: true },
      { label: 'Terms of Service', href: '/terms', disabled: true },
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

/** Social media placeholder links — TODO (Founder): replace with official profile URLs. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'instagram', href: 'https://www.instagram.com/', label: 'Castle Masters on Instagram', icon: '📸' },
  { platform: 'facebook', href: 'https://www.facebook.com/', label: 'Castle Masters on Facebook', icon: '📘' },
  { platform: 'youtube', href: 'https://www.youtube.com/', label: 'Castle Masters on YouTube', icon: '▶️' },
  { platform: 'linkedin', href: 'https://www.linkedin.com/', label: 'Castle Masters on LinkedIn', icon: '💼' },
  { platform: 'x', href: 'https://x.com/', label: 'Castle Masters on X', icon: '𝕏' },
] as const;