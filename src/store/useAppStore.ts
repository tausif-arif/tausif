import { create } from 'zustand';

interface AppState {
  hasEntered: boolean;
  setHasEntered: (val: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  activeBlog: string | null;
  setActiveBlog: (val: string | null) => void;
}

const checkEntered = () => {
  if (typeof window === 'undefined') return false;
  if (window.location.pathname.startsWith('/blogs') || window.location.pathname.startsWith('/event-loop') || window.location.pathname.startsWith('/embeddings')) return true;
  return sessionStorage.getItem('hasEntered') === 'true' || localStorage.getItem('hasEntered') === 'true';
};

export const useAppStore = create<AppState>((set) => ({
  hasEntered: checkEntered(),
  setHasEntered: (val) => {
    if (typeof window !== 'undefined' && val) {
      sessionStorage.setItem('hasEntered', 'true');
      localStorage.setItem('hasEntered', 'true');
    }
    set({ hasEntered: val });
  },
  audioEnabled: false,
  setAudioEnabled: (val) => set({ audioEnabled: val }),
  activeBlog: null,
  setActiveBlog: (val) => set({ activeBlog: val }),
}));
