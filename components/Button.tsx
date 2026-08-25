import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  // `max-w-full` keeps a long label from widening its flex parent past a 320px
  // screen, `text-center` handles the label once it wraps, and `min-h-[44px]`
  // holds the touch-target floor even when a caller overrides the padding.
  const baseStyles = "inline-flex max-w-full items-center justify-center min-h-[44px] px-6 py-3 border text-base font-medium text-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "border-transparent text-white bg-navy hover:bg-slate-900 focus:ring-navy shadow-lg shadow-navy/20 hover:shadow-xl hover:shadow-navy/30",
    secondary: "border-transparent text-white bg-techBlue hover:bg-blue-600 focus:ring-techBlue shadow-md hover:shadow-lg",
    gold: "border-transparent text-navy bg-gold hover:bg-yellow-600 focus:ring-gold font-bold shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30",
    outline: "border-navy/20 text-navy bg-transparent hover:bg-navy/5 focus:ring-navy hover:shadow-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};