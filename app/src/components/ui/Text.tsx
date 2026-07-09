import React from 'react';

/**
 * CM008 — Typography System
 *
 * Text is a primitive component.
 * All future components (Navbar, Hero, Stats, TournamentCard, ProgramCard,
 * Footer, Chess Puzzle cards, feature sections) must consume this primitive
 * instead of directly rendering p, span, or div text elements.
 */

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextColor = 'default' | 'muted';
export type TextAs = 'p' | 'span' | 'div' | 'li';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The rendered semantic HTML element.
   * Defaults to 'p'.
   */
  as?: TextAs;
  /**
   * Visual text size scale.
   * 'xs'   → 0.78rem — labels, meta, captions
   * 'sm'   → 0.88rem — card descriptions, compact copy
   * 'base' → 0.95rem — standard body text
   * 'lg'   → 1.05rem — section subtitles, intro copy
   * 'xl'   → 1.15rem — hero body, prominent descriptions
   */
  size?: TextSize;
  /**
   * Text color intent.
   * 'default' → foreground (--text)
   * 'muted'   → subdued text (--text-muted)
   */
  color?: TextColor;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<TextSize, string> = {
  xs:   'text-[0.78rem]',
  sm:   'text-[0.88rem]',
  base: 'text-[0.95rem]',
  lg:   'text-[1.05rem]',
  xl:   'text-[1.15rem]',
};

const colorMap: Record<TextColor, string> = {
  default: 'text-foreground',
  muted:   'text-text-muted',
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = 'p',
      size = 'base',
      color = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-sans leading-body';
    const sizeStyles = sizeMap[size];
    const colorStyles = colorMap[color];

    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={`${baseStyles} ${sizeStyles} ${colorStyles} ${className}`.trim()}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default Text;
