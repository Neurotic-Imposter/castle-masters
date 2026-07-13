/**
 * Footer Configuration — Single Source of Truth
 *
 * All footer consumers must import from this file.
 * Never duplicate footer labels, hrefs, or legal copy in components.
 */

import type { SocialPlatform } from '@/components/ui/icons/SocialIcons';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
  /**
   * When true, rendered non-interactive with aria-disabled="true".
   * Use for pages not yet built.
   */
  disabled?: boolean;
}

export interface FooterColumn {
  label: string;
  links: readonly FooterLink[];
}

export interface FooterMeta {
  description: string;
  /** Copyright template — {year} replaced at render time. */
  copyright: string;
  legalTagline: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

// ─── Footer Columns ──────────────────────────────────────────────────────────

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
      { label: 'Team', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy', disabled: true },
      { label: 'Terms of Service', href: '/terms', disabled: true },
    ],
  },
] as const;

// ─── Footer Metadata ─────────────────────────────────────────────────────────

export const FOOTER: FooterMeta = {
  description:
    'Castle Masters is the premier platform for chess coaching, tournaments, and community. Building stronger positions on and off the board.',
  copyright: '© {year} Castle Masters. All rights reserved.',
  legalTagline: 'Building stronger positions.',
} as const;

// ─── Social Links ─────────────────────────────────────────────────────────────

/** TODO (Founder): replace placeholder hrefs with official Castle Masters profile URLs. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: 'instagram', href: 'https://www.instagram.com/castlemastersofficial?utm_source=qr', label: 'Castle Masters on Instagram' },
  { platform: 'facebook', href: 'https://www.facebook.com/', label: 'Castle Masters on Facebook' },
  { platform: 'whatsapp', href: 'https://www.whatsapp.com/', label: 'Contact Castle Masters on WhatsApp' },
  { platform: 'youtube', href: 'https://www.youtube.com/', label: 'Castle Masters on YouTube' },
  { platform: 'linkedin', href: 'https://www.linkedin.com/', label: 'Castle Masters on LinkedIn' },
  { platform: 'x', href: 'https://x.com/', label: 'Castle Masters on X' },
] as const;
