import React, { createContext, useCallback, useContext, useState } from 'react';
import { Persona } from '../types';
import { WaitlistModal } from '../components/WaitlistModal';
import { WaitlistForm } from '../components/WaitlistForm';

interface OpenOptions {
  /** Lead source tag passed through to Zoho, e.g. "Exit Intent Popup". */
  source?: string;
  /** Preselect the persona segment. */
  persona?: Persona;
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
  const [persona, setPersona] = useState<Persona | undefined>(undefined);

  const openWaitlist = useCallback((opts?: OpenOptions) => {
    setSource(opts?.source ?? 'Website');
    setPersona(opts?.persona);
    setIsOpen(true);
  }, []);

  const closeWaitlist = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist, isOpen }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={closeWaitlist}>
        <WaitlistForm source={source} defaultPersona={persona} />
      </WaitlistModal>
    </WaitlistContext.Provider>
  );
};
