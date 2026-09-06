import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ModalProps } from '../types';

/** Generic modal shell — used for the waitlist / lead-capture form. */
export const Modal: React.FC<ModalProps & { labelledBy: string }> = ({ isOpen, onClose, children, labelledBy }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain px-3 py-6 sm:px-4 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="fixed inset-0" style={{ background: 'rgba(23,27,33,0.5)' }} onClick={onClose} aria-hidden="true" />
      <div
        className="relative w-full max-h-[calc(100dvh_-_3rem)] sm:max-h-[calc(100dvh_-_4rem)] overflow-y-auto overscroll-contain reveal-1"
        style={{ maxWidth: '32rem', background: 'var(--s-bg)', border: '1px solid var(--s-line)', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}
      >
        <div className="sticky top-0 z-10 h-0">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center"
            style={{ background: 'var(--s-soft)', color: 'var(--s-muted)', border: '1px solid var(--s-line)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
