/**
 * Navigation Configuration — Single Source of Truth
 *
 * All navigation consumers must import from this file:
 * Navbar, Footer, Mobile Menu, Sitemap generation, Breadcrumbs.
 *
 * Never duplicate navigation labels, hrefs, or the CTA definition.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  /** Display label shown in navigation. */
  label: string;
  /** Route href — must match Next.js App Router page paths. */
  href: string;
  /**
   * When true, the link is rendered but non-interactive.
   * No UI treatment is required yet — this future-proofs the API.
   */
  disabled?: boolean;
}

// ─── Navigation Items ─────────────────────────────────────────────────────────

/** Primary navigation links — consumed by Navbar, Footer, MobileMenu, Sitemap. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home',                 href: '/'              },
  { label: 'Coaching',             href: '/coaching'       },
  { label: 'Tournaments & Events', href: '/tournaments'    },
  { label: 'Chess Puzzles',        href: '/chess-puzzles'  },
  { label: 'Corporate',            href: '/corporate'      },
  { label: 'Team',                 href: '/team'           },
  { label: 'Contact',              href: '/contact'        },
] as const;

/** Primary call-to-action — consumed by Navbar and any future CTA surfaces. */
export const NAV_CTA: NavItem = {
  label: 'Book Free Trial',
  href: '/contact',
};
