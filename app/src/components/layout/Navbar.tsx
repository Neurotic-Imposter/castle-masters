'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/ui/logo/Logo';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';
import { NAV_ITEMS, NAV_CTA } from '@/lib/navigation';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from '@/components/ui/Heading';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

function useNavbarVisible(): boolean {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const HIDE_THRESHOLD = 8;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 60) {
          setVisible(true);
        } else if (delta > HIDE_THRESHOLD) {
          setVisible(false);
        } else if (delta < -HIDE_THRESHOLD) {
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

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className = '', ...props }, ref) => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const navVisible = useNavbarVisible();
    const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalItems, totalPrice } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }, []);

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
      setIsCartOpen(false);
    }, [pathname, setIsCartOpen]);

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
            transform: `translateX(-50%) translateY(${shouldShow ? '0' : 'calc(-100% - 2rem)'})`,
            transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
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
              transition-colors duration-[300ms]
              hover:border-emerald/20
              shadow-nav
            "
            style={{ 
              background: 'var(--glass-nav)',
              backdropFilter: 'blur(var(--blur-nav))',
              WebkitBackdropFilter: 'blur(var(--blur-nav))',
            }}
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
              {/* Cart Toggle Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(!isCartOpen)}
                tabIndex={shouldShow ? undefined : -1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white/[0.03] text-foreground hover:bg-emerald/5 hover:border-emerald transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg text-[0.85rem] cursor-pointer"
                aria-label={`Shopping Cart, contains ${mounted ? totalItems : 0} items`}
              >
                <span>🛒</span>
                <span className={`
                  flex items-center justify-center 
                  min-w-[18px] h-[18px] px-1 
                  rounded-full bg-emerald text-[0.65rem] font-bold text-bg
                  transition-all duration-300
                  ${mounted && totalItems > 0 ? "scale-100 opacity-100 animate-pulse" : "scale-100"}
                `}>
                  {mounted ? totalItems : 0}
                </span>
              </button>

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

        {/* ── Cart Dropdown Overlay ─────────────────────────────────────── */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-24 right-[5%] w-[320px] max-w-[90vw] rounded-2xl border border-border bg-bg-card backdrop-blur-card shadow-2xl z-[999] p-5 flex flex-col gap-4 text-left"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <Heading as="h3" size="title" className="text-base font-semibold">
                  Your Cart
                </Heading>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-text-muted hover:text-foreground transition-colors p-1 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 max-h-[250px] scrollbar-none">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-sm">
                    Your cart is empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <div>
                          <p className="font-medium text-foreground leading-tight">{item.title}</p>
                          <p className="text-xs text-text-muted mt-0.5">
                            {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-rose-500 hover:text-rose-400 font-medium transition-colors p-1 cursor-pointer"
                        aria-label={`Remove ${item.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Totals & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-border pt-3 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-text-muted">Total:</span>
                    <span className="text-foreground">₹{totalPrice}</span>
                  </div>
                  <button
                    disabled
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-center text-sm font-medium bg-emerald/10 text-emerald/40 cursor-not-allowed select-none border border-emerald/5"
                  >
                    Checkout (Coming Soon)
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
