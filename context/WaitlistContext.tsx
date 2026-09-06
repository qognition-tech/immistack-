import React, { createContext, useCallback, useContext, useState } from 'react';
import { Modal } from '../components/Modal';
import { WaitlistForm } from '../components/WaitlistForm';

interface OpenOptions {
  /** Lead source tag passed through to Twenty CRM, e.g. "Pricing CTA". */
  source?: string;
}

interface WaitlistContextValue {
  openWaitlist: (opts?: OpenOptions) => void;
  closeWaitlist: () => void;
  isOpen: boolean;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export const useWaitlist = (): WaitlistContextValue => {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error('useWaitlist must be used within <WaitlistProvider>');
  return ctx;
};

export const WaitlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>('Website');

  const openWaitlist = useCallback((opts?: OpenOptions) => {
    setSource(opts?.source ?? 'Website');
    setIsOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist, isOpen }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeWaitlist} labelledBy="waitlist-modal-heading">
        <WaitlistForm source={source} />
      </Modal>
    </WaitlistContext.Provider>
  );
};
