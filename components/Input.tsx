import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

/** Visible `<label>`, never placeholder-as-label (Elena's waitlist-form spec). */
export const Input: React.FC<InputProps> = ({ label, hint, error, id, className = '', ...props }) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className={`input ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && !error && <span id={`${inputId}-hint`} className="hint">{hint}</span>}
      {error && <span id={`${inputId}-err`} className="err" role="alert">{error}</span>}
    </div>
  );
};
