import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

/**
 * `.btn`/`.btn-primary`/`.btn-secondary` (styles/globals.css) carry the
 * physical press-state (translateY + shadow deepen/flatten) specified in
 * Elena's brief §3 — no `scale()` bounce, no gradient.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button
      className={`btn ${variantClass} max-w-full text-center ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
