import { create } from 'zustand';

interface AppState {
  hasEntered: boolean;
  setHasEntered: (val: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hasEntered: false,
  setHasEntered: (val) => set({ hasEntered: val }),
  audioEnabled: false,
  setAudioEnabled: (val) => set({ audioEnabled: val }),
}));
