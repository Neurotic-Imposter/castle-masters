import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300',
  secondary: 'bg-bg-card border border-border text-foreground hover:border-border-hover transition-colors duration-200',
  outline: 'bg-transparent border border-border text-foreground hover:border-cyan hover:text-cyan transition-colors duration-200',
  ghost: 'bg-transparent border border-border text-foreground hover:bg-emerald/5 hover:border-emerald transition-colors duration-200',
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-4.5 py-2 text-sm rounded-md',
  md: 'px-7 py-3 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      className = '',
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = variantMap[variant];
    const sizeStyles = sizeMap[size];
    
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`.trim()}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
