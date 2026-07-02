import React from 'react';

export type StackSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic vertical gap */
  spacing?: StackSpacing;
}

const spacingMap: Record<StackSpacing, string> = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const Stack = ({ spacing = 'md', className = '', children, ...props }: StackProps) => {
  return (
    <div className={`flex flex-col ${spacingMap[spacing]} ${className}`} {...props}>
      {children}
    </div>
  );
};
