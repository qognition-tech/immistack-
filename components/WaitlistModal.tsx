import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalProps } from '../types';

export const WaitlistModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  /*
   * The panel used to be `overflow-hidden` with no height cap, so on a short
   * viewport — a landscape phone, or the taller "Professional" branch of the
   * waitlist form on a 320x568 screen — the submit button was clipped off the
   * bottom with nothing to scroll. The shell now scrolls, the panel caps at the
   * visible height, and the content inside it scrolls on its own.
   */
  return (
    <div className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain px-3 py-6 sm:px-4 sm:py-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[calc(100dvh_-_3rem)] sm:max-h-[calc(100dvh_-_4rem)] overflow-y-auto overscroll-contain animate-fade-in-up">
        <div className="sticky top-0 z-10 h-0">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};