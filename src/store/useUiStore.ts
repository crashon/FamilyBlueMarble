import { create } from 'zustand';

export type PanelState = 'full' | 'minimized' | 'hidden';

interface UiState {
  isBottomPanelVisible: boolean;
  panelState: PanelState;
  togglePanel: () => void;
  setPanelState: (state: PanelState) => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  isBottomPanelVisible: false,
  panelState: 'hidden',
  togglePanel: () => {
    const current = get().panelState;
    if (current === 'hidden') {
      set({ panelState: 'minimized', isBottomPanelVisible: true });
      return;
    }
    if (current === 'minimized') {
      set({ panelState: 'full', isBottomPanelVisible: true });
      return;
    }
    set({ panelState: 'hidden', isBottomPanelVisible: false });
  },
  setPanelState: (state) => set({ panelState: state, isBottomPanelVisible: state !== 'hidden' }),
}));
