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
 * - Hide-on-scroll-down / show-on-scroll-up via GPU-accelerated translateY
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

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/ui/logo/Logo';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS, NAV_CTA } from '@/lib/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

// ─── Scroll hide/show hook ────────────────────────────────────────────────────

/**
 * Returns true when the navbar should be visible.
 * Hidden when scrolling DOWN past threshold; shown when scrolling UP or at top.
 * ponytail: no external deps, no RAF polling — single passive scroll listener.
 */
function useNavbarVisible(): boolean {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const HIDE_THRESHOLD = 8; // px scrolled down before hiding

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 60) {
          // Always show near the top
          setVisible(true);
        } else if (delta > HIDE_THRESHOLD) {
          // Scrolling down — hide
          setVisible(false);
        } else if (delta < -HIDE_THRESHOLD) {
          // Scrolling up — show
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className = '', ...props }, ref) => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const navVisible = useNavbarVisible();

    // Close mobile menu automatically on route change
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
    }, [pathname]);

    // Always show navbar when mobile menu is open
    const shouldShow = navVisible || menuOpen;

    const handleClose = useCallback(() => setMenuOpen(false), []);
    const handleToggle = useCallback(() => setMenuOpen((prev) => !prev), []);

    return (
      <>
        <header
          ref={ref}
          className={`fixed top-5 left-1/2 w-[90%] max-w-[1200px] ${className}`.trim()}
          style={{
            zIndex: 1000,
            // GPU-accelerated hide/show — no layout shift, no repaint
            transform: `translateX(-50%) translateY(${shouldShow ? '0' : 'calc(-100% - 2rem)'})`,
            transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          // Keyboard users: ensure navbar is always reachable via Tab (aria-hidden when hidden)
          aria-hidden={!shouldShow}
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
              tabIndex={shouldShow ? undefined : -1}
            >
              <Logo size="md" />
            </Link>

            {/* ── Desktop Nav Links ───────────────────────────────────── */}
            <ul
              className="hidden md:flex items-center gap-5 list-none"
              role="list"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink
                    item={item}
                    isActive={pathname === item.href}
                    className="text-[0.85rem]"
                    tabIndex={shouldShow ? undefined : -1}
                  />
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA + Mobile Hamburger ─────────────────────── */}
            <div className="flex items-center gap-3">
              {/* CTA — hidden on mobile */}
              <Link
                href={NAV_CTA.href}
                tabIndex={shouldShow ? undefined : -1}
                className="hidden md:inline-flex items-center font-medium bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 rounded-full px-5 py-2.5 text-[0.85rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {NAV_CTA.label}
              </Link>

              {/* Hamburger — visible only on mobile */}
              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                tabIndex={shouldShow ? undefined : -1}
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
