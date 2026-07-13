'use client';

/**
 * NavLink
 *
 * A single navigation link for use inside the Navbar and MobileMenu.
 *
 * Responsibilities
 * - Rendering an accessible Next.js <Link> with correct active state
 * - Applying active styles via aria-current and className
 * - Handling the disabled state (renders span instead of Link)
 *
 * Not Responsible For
 * - Layout or positioning
 * - Mobile vs desktop visual differences (controlled by className from parent)
 * - Navigation data (sourced from navigation.ts)
 *
 * Primary Consumers
 * - Navbar (desktop links)
 * - MobileMenu (mobile overlay links)
 */

import React from 'react';
import Link from 'next/link';
import { type NavItem } from '@/lib/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  /** Additional className — callers control desktop vs mobile visual differences. */
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

const NavLink = ({ item, isActive, className = '', onClick, tabIndex }: NavLinkProps) => {
  const baseStyles = 'relative font-medium transition-colors duration-[300ms] cursor-pointer';
  const activeStyles = isActive ? 'text-emerald' : 'text-text-muted hover:text-emerald';

  if (item.disabled) {
    return (
      <span
        className={`${baseStyles} opacity-40 cursor-not-allowed ${className}`.trim()}
        aria-disabled="true"
        tabIndex={-1}
      >
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
      tabIndex={tabIndex}
      className={`${baseStyles} ${activeStyles} ${className}`.trim()}
    >
      {item.label}
      {/* Active indicator dot — matches prototype ::after underline pattern */}
      <span
        aria-hidden="true"
        className={`
          absolute -bottom-0.5 left-1/2 -translate-x-1/2
          h-0.5 w-3.5 rounded-full bg-emerald
          transition-transform duration-[300ms] ease-out
          ${isActive ? 'scale-x-100' : 'scale-x-0'}
        `}
      />
    </Link>
  );
};

NavLink.displayName = 'NavLink';

export default NavLink;
