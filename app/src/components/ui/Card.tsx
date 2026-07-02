import React from 'react';

type CardVariant = 'glass' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card.
   * 'glass' -> Standard glassmorphic card with backdrop blur.
   * 'elevated' -> Glass card with additional shadow-glow for prominence.
   */
  variant?: CardVariant;
  /**
   * Internal padding size.
   * 'none' -> No padding (for custom content layouts).
   * 'sm' -> Compact padding (16px).
   * 'md' -> Standard padding (24px).
   * 'lg' -> Large padding (32px mobile, 36px desktop).
   */
  padding?: CardPadding;
  /**
   * Enable visual hover effects (lift, border glow, shadow).
   * Does NOT imply clickability. Consumers add onClick separately.
   */
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<CardVariant, string> = {
  glass: 'bg-bg-card border border-border backdrop-blur-[12px]',
  elevated: 'bg-bg-card border border-border backdrop-blur-[12px] shadow-glow',
};

const paddingMap: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-9',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'glass',
      padding = 'md',
      hoverable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative overflow-hidden rounded-2xl';
    const variantStyles = variantMap[variant];
    const paddingStyles = paddingMap[padding];
    const hoverableStyles = hoverable
      ? 'transition-all duration-[400ms] ease-spring hover:-translate-y-1.5 hover:border-border-hover hover:shadow-glow'
      : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${paddingStyles} ${hoverableStyles} ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
