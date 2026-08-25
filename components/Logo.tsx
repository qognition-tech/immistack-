import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  
  // Dimensions map
  const dimensions = {
    small: { w: 'w-6', h: 'h-6', text: 'text-lg', barW: 'w-1.5' },
    medium: { w: 'w-8', h: 'h-8', text: 'text-xl', barW: 'w-2' },
    large: { w: 'w-12', h: 'h-12', text: 'text-3xl', barW: 'w-3' },
  };

  const { w, h, text, barW } = dimensions[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Abstract "Stack" Icon - 3 bars of varying height forming a wing/check */}
      <div className={`relative shrink-0 ${w} ${h} flex items-end justify-between`}>
        <div className={`${barW} bg-navy rounded-t-sm h-[40%]`} style={{ opacity: 0.8 }}></div>
        <div className={`${barW} bg-navy rounded-t-sm h-[70%]`} style={{ opacity: 0.9 }}></div>
        <div className={`${barW} bg-gradient-to-t from-goldDark to-goldVivid rounded-t-sm h-[100%] shadow-[0_0_15px_rgba(251,191,36,0.5)]`}></div>
      </div>
      <span className={`font-heading font-bold ${text} tracking-tight text-navy whitespace-nowrap`}>
        Immi<span className="text-goldDark">stack</span>
      </span>
    </div>
  );
};