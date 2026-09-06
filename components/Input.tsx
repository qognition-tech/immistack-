import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-navy/70 mb-1 pl-1">
        {label}
      </label>
      <input
        className={`appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold sm:text-sm bg-white/50 backdrop-blur-sm ${className}`}
        {...props}
      />
    </div>
  );
};