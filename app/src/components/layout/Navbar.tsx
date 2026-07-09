'use client';

/**
 * Navbar
 *
 * Floating glass pill navigation bar — persistent across all pages.
 *
 * Responsibilities
 * - Rendering the floating glassmorphic pill shell matching the prototype
 * - Composing Logo, NavLink, Button, and MobileMenu primitives
 * - Active link detection via usePathname()
 * - Hamburger toggle state and passing it down to MobileMenu
 * - Closing MobileMenu automatically on pathname change
 * - Responsive layout: desktop links/CTA hidden ≤768px, hamburger shown
 * - Prototype-accurate fixed positioning, spacing, and backdrop blur
 *
 * Not Responsible For
 * - Page content
 * - Authentication or user session state
 * - Backend calls of any kind
 * - Page transitions
 *
 * Primary Consumers
 * - app/src/app/layout.tsx (CM012 — layout integration)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/ui/logo/Logo';
import Button from '@/components/ui/Button';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS, NAV_CTA } from '@/lib/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className = '', ...props }, ref) => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close mobile menu automatically on route change
    useEffect(() => {
      setMenuOpen(false);
    }, [pathname]);

    const handleClose = useCallback(() => setMenuOpen(false), []);
    const handleToggle = useCallback(() => setMenuOpen((prev) => !prev), []);

    return (
      <>
        <header
          ref={ref}
          className={`fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-header ${className}`.trim()}
          {...props}
        >
          <nav
            aria-label="Main navigation"
            className="
              flex items-center justify-between
              px-6 py-2.5
              rounded-full
              border border-border
              backdrop-blur-[24px]
              transition-colors duration-[300ms]
              hover:border-emerald/20
              shadow-nav
            "
            style={{ background: 'var(--glass-nav)' }}
          >
            {/* ── Logo ───────────────────────────────────────────────── */}
            <Link
              href="/"
              aria-label="Castle Masters — Home"
              className="flex items-center gap-2.5 shrink-0"
            >
              <Logo size="md" />
            </Link>

            {/* ── Desktop Nav Links ───────────────────────────────────── */}
            <ul
              className="hidden md:flex items-center gap-5 list-none"
              role="list"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink
                    item={item}
                    isActive={pathname === item.href}
                    className="text-[0.85rem]"
                  />
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA + Mobile Hamburger ─────────────────────── */}
            <div className="flex items-center gap-3">
              {/* CTA — hidden on mobile */}
              <Button
                variant="primary"
                size="sm"
                className="hidden md:inline-flex rounded-full px-5 py-2.5 text-[0.85rem]"
                onClick={() => { window.location.href = NAV_CTA.href; }}
              >
                {NAV_CTA.label}
              </Button>

              {/* Hamburger — visible only on mobile */}
              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden flex flex-col gap-[5px] p-1.5 bg-transparent border-none cursor-pointer group"
              >
                <span
                  aria-hidden="true"
                  className={`
                    block w-[22px] h-[2px] bg-foreground rounded-sm
                    transition-transform duration-300
                    ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}
                  `}
                />
                <span
                  aria-hidden="true"
                  className={`
                    block w-[22px] h-[2px] bg-foreground rounded-sm
                    transition-opacity duration-300
                    ${menuOpen ? 'opacity-0' : 'opacity-100'}
                  `}
                />
                <span
                  aria-hidden="true"
                  className={`
                    block w-[22px] h-[2px] bg-foreground rounded-sm
                    transition-transform duration-300
                    ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}
                  `}
                />
              </button>
            </div>
          </nav>
        </header>

        {/* ── Mobile Menu ─────────────────────────────────────────────── */}
        <MobileMenu
          isOpen={menuOpen}
          onClose={handleClose}
          currentPath={pathname}
        />
      </>
    );
  }
);

Navbar.displayName = 'Navbar';

export default Navbar;
