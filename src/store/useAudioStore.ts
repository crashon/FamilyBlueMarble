import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  masterVolume: number;
  bgmVolume: number;
  sfxVolume: number;
  isMuted: boolean;
  currentBgm: string | null;

  // Actions
  setVolume: (type: 'master' | 'bgm' | 'sfx', value: number) => void;
  toggleMute: () => void;
  playSfx: (id: string) => void;
  startBgm: (id: string, loop?: boolean) => void;
  stopBgm: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      masterVolume: 0.7,
      bgmVolume: 0.5,
      sfxVolume: 0.8,
      isMuted: false,
      currentBgm: null,

      setVolume: (type, value) => set({ [`${type}Volume`]: value }),
      
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      playSfx: (id) => {
        const { isMuted, masterVolume, sfxVolume } = get();
        if (isMuted) return;

        const audio = new Audio(`/sounds/${id}.mp3`);
        audio.volume = masterVolume * sfxVolume;
        audio.play().catch(e => console.warn(`Audio play blocked: ${id}`, e));
      },

      startBgm: (id, loop = true) => {
        const { currentBgm, stopBgm } = get();
        if (currentBgm === id) return;
        
        stopBgm();
        
        const audio = new Audio(`/sounds/${id}.mp3`);
        audio.id = 'bgm-player';
        audio.loop = loop;
        audio.volume = get().masterVolume * get().bgmVolume;
        
        document.body.appendChild(audio);
        audio.play().catch(e => console.warn("BGM autoplay blocked:", e));
        
        set({ currentBgm: id });
      },

      stopBgm: () => {
        const player = document.getElementById('bgm-player') as HTMLAudioElement;
        if (player) {
          player.pause();
          player.remove();
        }
        set({ currentBgm: null });
      }
    }),
    {
      name: 'family-blue-marble-audio',
      partialize: (state) => ({ 
        masterVolume: state.masterVolume, 
        bgmVolume: state.bgmVolume, 
        sfxVolume: state.sfxVolume, 
        isMuted: state.isMuted 
      }),
    }
  )
);
