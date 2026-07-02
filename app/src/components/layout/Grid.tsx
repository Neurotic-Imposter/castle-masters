import React from 'react';

export type GridCols = 1 | 2 | 3 | 4 | 12;
export type GridGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: GridCols;
  gap?: GridGap;
}

const colsMap: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  12: 'grid-cols-12',
};

const gapMap: Record<GridGap, string> = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

export const Grid = ({ columns = 1, gap = 'md', className = '', children, ...props }: GridProps) => {
  return (
    <div className={`grid ${colsMap[columns]} ${gapMap[gap]} ${className}`} {...props}>
      {children}
    </div>
  );
};
