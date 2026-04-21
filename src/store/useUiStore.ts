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
