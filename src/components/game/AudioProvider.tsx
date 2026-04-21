"use client";

import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '@/store/useAudioStore';

export const AudioProvider = () => {
  const { masterVolume, bgmVolume, isMuted, currentBgm } = useAudioStore();
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  // Sync BGM Volume and Mute state with the background <audio> element
  useEffect(() => {
    const bgmPlayer = document.getElementById('bgm-player') as HTMLAudioElement;
    if (bgmPlayer) {
      bgmPlayer.volume = isMuted ? 0 : masterVolume * bgmVolume;
      bgmRef.current = bgmPlayer;
    }
  }, [masterVolume, bgmVolume, isMuted, currentBgm]);

  // Handle first interaction for autoplay compliance
  useEffect(() => {
    const startInitialAudio = () => {
      // Re-trigger current BGM if it was blocked
      if (bgmRef.current && bgmRef.current.paused && currentBgm) {
        bgmRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', startInitialAudio);
    };

    window.addEventListener('click', startInitialAudio);
    return () => window.removeEventListener('click', startInitialAudio);
  }, [currentBgm]);

  return null; // This is a headless logic provider
};
