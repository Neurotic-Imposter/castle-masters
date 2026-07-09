import React from 'react';

/**
 * CM008 — Typography System
 *
 * Badge is a primitive component.
 * All future components (Navbar, Coaching cards, TournamentCard, Chess Puzzle
 * cards, status indicators) must consume this primitive instead of directly
 * rendering badge/chip markup. This covers all badge use cases across the
 * product — program level badges, tournament tags, status chips, and labels.
 */

export type BadgeVariant = 'default' | 'emerald' | 'cyan' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the badge.
   * 'default' → Emerald tint background with emerald text (matches prototype .badge)
   * 'emerald' → Emerald tint background with emerald text (explicit alias)
   * 'cyan'    → Cyan tint background with cyan text (tournament tab tags)
   * 'outline' → Transparent with border, muted text (neutral/secondary tags)
   */
  variant?: BadgeVariant;
  /**
   * Shows an animated pulsing dot before the text.
   * Used for live/active status indicators.
   */
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
  default: 'bg-emerald/[0.08] border border-emerald/[0.15] text-emerald',
  emerald: 'bg-emerald/[0.08] border border-emerald/[0.15] text-emerald',
  cyan:    'bg-cyan/[0.08]    border border-cyan/[0.15]    text-cyan',
  outline: 'bg-transparent    border border-border          text-text-muted',
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      pulse = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-badge uppercase';
    const variantStyles = variantMap[variant];

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`.trim()}
        {...props}
      >
        {pulse && (
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-current animate-[badgePulse_2s_ease-in-out_infinite]"
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
