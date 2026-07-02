import React from 'react';

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize;
}

const sizeMap: Record<SpacerSize, string> = {
  xs: 'h-2 w-2',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
  '2xl': 'h-16 w-16',
};

/**
 * NOTE: Spacer is intended only for exceptional layout cases (micro-adjustments). 
 * Preferred spacing should remain handled globally via:
 * - gap (Stack / Grid)
 * - padding (Section)
 * - margin
 */
export const Spacer = ({ size = 'md', className = '', ...props }: SpacerProps) => {
  return <div aria-hidden="true" className={`shrink-0 ${sizeMap[size]} ${className}`} {...props} />;
};
