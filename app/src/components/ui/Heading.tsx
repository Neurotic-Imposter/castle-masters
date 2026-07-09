import React from 'react';

/**
 * CM008 — Typography System
 *
 * Heading is a primitive component.
 * All future components (Navbar, Hero, Stats, TournamentCard, ProgramCard,
 * Footer, Chess Puzzle cards, feature sections) must consume this primitive
 * instead of directly rendering h1, h2, h3, h4, h5, or h6 elements.
 */

export type HeadingSize = 'hero' | 'display' | 'title' | 'section' | 'sub';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * The rendered semantic HTML element.
   * Visual scale is controlled independently via `size`.
   * Defaults to 'h2'.
   */
  as?: HeadingLevel;
  /**
   * Visual scale of the heading, independent of the semantic level.
   * 'hero'    → clamp(2.5rem, 5.5vw, 4.25rem) — full-viewport hero titles
   * 'display' → clamp(2rem, 4vw, 2.75rem)     — page/section display heads
   * 'title'   → 1.75rem                        — category/sub-section titles
   * 'section' → 1.25rem                        — card headings, panel titles
   * 'sub'     → 1.15rem                        — supporting headings, h4 level
   */
  size?: HeadingSize;
  /**
   * Applies the emerald→cyan gradient fill from the design system.
   * Used for the accent span within hero and section headings.
   */
  gradient?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<HeadingSize, string> = {
  hero:    'text-[clamp(2.5rem,5.5vw,4.25rem)] leading-hero',
  display: 'text-[clamp(2rem,4vw,2.75rem)] leading-title',
  title:   'text-[1.75rem] leading-title',
  section: 'text-[1.25rem] leading-normal',
  sub:     'text-[1.15rem] leading-normal',
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Tag = 'h2',
      size = 'display',
      gradient = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-heading font-bold tracking-heading';
    const sizeStyles = sizeMap[size];
    const colorStyles = gradient
      ? 'bg-gradient-to-r from-emerald to-cyan bg-clip-text text-transparent'
      : 'text-foreground';

    return (
      <Tag
        ref={ref}
        className={`${baseStyles} ${sizeStyles} ${colorStyles} ${className}`.trim()}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
