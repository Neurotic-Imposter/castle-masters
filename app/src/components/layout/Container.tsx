import React from 'react';

export type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the semantic maximum width intent for the layout.
   * 'default' -> Standard centered content (max-w-6xl).
   * 'narrow' -> Reading or focused content (max-w-3xl).
   * 'wide' -> Expanded grid content (max-w-7xl).
   * 'full' -> Full viewport width.
   */
  size?: ContainerSize;
}

const sizeMap: Record<ContainerSize, string> = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = ({ size = 'default', className = '', children, ...props }: ContainerProps) => {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`} {...props}>
      {children}
    </div>
  );
};
