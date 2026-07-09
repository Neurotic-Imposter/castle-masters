'use client';

/**
 * MobileMenu
 *
 * Full-screen mobile navigation overlay.
 *
 * Responsibilities
 * - Rendering the full-screen glass overlay when open
 * - Rendering all nav items and the CTA via NavLink
 * - Slide-in/out animation (translateY) matching the prototype
 * - Respecting prefers-reduced-motion
 * - Closing on Escape key
 * - Body scroll lock while open
 * - aria attributes for screen readers
 *
 * Not Responsible For
 * - Determining which links to show (sourced from navigation.ts)
 * - The hamburger toggle button (owned by Navbar)
 * - Routing logic
 *
 * Primary Consumers
 * - Navbar (CM010)
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, NAV_CTA } from '@/lib/navigation';
import NavLink from './NavLink';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const MobileMenu = ({ isOpen, onClose, currentPath }: MobileMenuProps) => {

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Always restore on unmount
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key closes the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      className={`
        fixed inset-0 z-overlay flex flex-col items-center justify-center gap-8
        backdrop-blur-[20px]
        motion-safe:transition-transform motion-safe:duration-[500ms] motion-safe:ease-spring
        motion-reduce:transition-none
        ${isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}
      `}
      style={{ background: 'rgba(3, 3, 3, 0.95)' }}
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          isActive={currentPath === item.href}
          onClick={onClose}
          className="font-heading text-2xl font-semibold"
        />
      ))}

      {/* CTA link — styled differently from regular nav items */}
      <Link
        href={NAV_CTA.href}
        onClick={onClose}
        className="font-heading text-2xl font-semibold text-emerald transition-opacity duration-200 hover:opacity-80"
      >
        {NAV_CTA.label} →
      </Link>
    </div>
  );
};

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;
