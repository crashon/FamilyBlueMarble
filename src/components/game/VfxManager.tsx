"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useAudioStore } from '@/store/useAudioStore';

export const VfxManager = () => {
  const { isGameOver, winner, activeModal } = useGameStore();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    if (isGameOver && winner) {
      // Play victory sound
      useAudioStore.getState().playSfx('sfx_victory');
      
      // Generate confetti
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: ['#005bc1', '#ba1a1a', '#006e1c', '#705d00'][Math.floor(Math.random() * 4)]
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isGameOver, winner]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
            animate={{ 
              y: '110vh', 
              x: `${p.x + (Math.random() * 20 - 10)}vw`,
              rotate: 360,
              opacity: 0 
            }}
            transition={{ duration: 3 + Math.random() * 2, ease: "linear" }}
            className="absolute w-3 h-3 rounded-sm shadow-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>

      {/* Screen Flash for Big Events */}
      <AnimatePresence>
        {activeModal?.type === 'chance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
