import { create } from 'zustand';

export type BottomPanelMode = 'full' | 'minimized' | 'hidden';

interface UiState {
  isBottomPanelVisible: boolean;
  bottomPanelMode: BottomPanelMode;
  toggleBottomPanel: () => void;
  showBottomPanel: () => void;
  hideBottomPanel: () => void;
  minimizeBottomPanel: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  isBottomPanelVisible: true,
  bottomPanelMode: 'full',
  toggleBottomPanel: () => {
    const mode = get().bottomPanelMode;
    if (mode === 'full') {
      set({ bottomPanelMode: 'minimized', isBottomPanelVisible: true });
      return;
    }
    if (mode === 'minimized') {
      set({ bottomPanelMode: 'hidden', isBottomPanelVisible: false });
      return;
    }
    set({ bottomPanelMode: 'full', isBottomPanelVisible: true });
  },
  showBottomPanel: () => set({ bottomPanelMode: 'full', isBottomPanelVisible: true }),
  hideBottomPanel: () => set({ bottomPanelMode: 'hidden', isBottomPanelVisible: false }),
  minimizeBottomPanel: () => set({ bottomPanelMode: 'minimized', isBottomPanelVisible: true }),
}));
