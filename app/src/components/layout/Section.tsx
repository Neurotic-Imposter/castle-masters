import React from 'react';

export type SectionSpacing = 'default' | 'compact' | 'large';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic vertical spacing mapped from the prototype */
  spacing?: SectionSpacing;
}

const spacingMap: Record<SectionSpacing, string> = {
  compact: 'py-12',
  default: 'py-20',
  large: 'py-32',
};

export const Section = ({ spacing = 'default', className = '', children, ...props }: SectionProps) => {
  return (
    <section className={`relative ${spacingMap[spacing]} ${className}`} {...props}>
      {children}
    </section>
  );
};
