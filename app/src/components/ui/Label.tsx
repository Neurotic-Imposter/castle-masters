import React from 'react';

/**
 * CM008 — Typography System
 *
 * Label is a primitive component.
 * All future components (Navbar, Hero, Stats, TournamentCard, ProgramCard,
 * Footer, Chess Puzzle cards, feature sections) must consume this primitive
 * instead of directly rendering section label markup.
 */

export type LabelColor = 'default' | 'cyan' | 'emerald' | 'muted';
export type LabelAs = 'p' | 'span' | 'div';

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The rendered semantic HTML element.
   * Defaults to 'p'.
   */
  as?: LabelAs;
  /**
   * Color intent for the label.
   * 'default'  → cyan (matches prototype section-label pattern)
   * 'cyan'     → accent-cyan
   * 'emerald'  → accent-emerald
   * 'muted'    → text-muted
   */
  color?: LabelColor;
  className?: string;
  children: React.ReactNode;
}

const colorMap: Record<LabelColor, string> = {
  default: 'text-cyan',
  cyan:    'text-cyan',
  emerald: 'text-emerald',
  muted:   'text-text-muted',
};

const Label = React.forwardRef<HTMLElement, LabelProps>(
  (
    {
      as: Tag = 'p',
      color = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'text-[0.78rem] font-semibold tracking-label uppercase font-sans';
    const colorStyles = colorMap[color];

    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={`${baseStyles} ${colorStyles} ${className}`.trim()}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    );
  }
);

Label.displayName = 'Label';

export default Label;
