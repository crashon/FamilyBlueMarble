"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useAudioStore } from '@/store/useAudioStore';
import { Button } from '@/components/ui/Button';

export const Dice = () => {
  const { isRolling, rollDice, setDiceResult, currentPlayerIndex, players, updatePlayerPosition, setIsMoving, isMoving, nextTurn } = useGameStore();
  const [localFaces, setLocalFaces] = useState<[number, number]>([1, 1]);
  const controls = useAnimation();

  const handleRoll = async () => {
    if (isRolling || isMoving) return;
    
    useAudioStore.getState().playSfx('sfx_dice_roll');
    rollDice();
    
    // Animation: Randomize faces rapidly
    const startTime = Date.now();
    const duration = 1200;
    
    const interval = setInterval(() => {
      setLocalFaces([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 100);

    await controls.start({
      rotate: [0, 90, -90, 180, 0],
      scale: [1, 1.2, 0.8, 1.1, 1],
      transition: { duration: 1.2 }
    });

    clearInterval(interval);
    
    // Final results
    const r1 = Math.floor(Math.random() * 6) + 1;
    const r2 = Math.floor(Math.random() * 6) + 1;
    const total = r1 + r2;
    
    setLocalFaces([r1, r2]);
    setDiceResult(r1, r2);
    useAudioStore.getState().playSfx('sfx_dice_hit');
    
    // Sequential Movement logic
    setIsMoving(true);
    const currentPlayer = players[currentPlayerIndex];
    let currentPos = currentPlayer.position;
    
    for (let i = 1; i <= total; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      currentPos = (currentPos + 1) % 40;
      updatePlayerPosition(currentPlayer.id, currentPos);
      useAudioStore.getState().playSfx('sfx_step');
    }
    
    setIsMoving(false);
    
    // Trigger tile action (Purchase, Rent, Event)
    setTimeout(() => {
      useGameStore.getState().handleTileAction(currentPlayer.id, currentPos);
    }, 500);
  };

  const renderFace = (val: number) => {
    const dots = Array(9).fill(0);
    const patterns: Record<number, number[]> = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    patterns[val].forEach(idx => dots[idx] = 1);

    return (
      <div className="grid grid-cols-3 gap-1.5 w-full h-full p-2">
        {dots.map((dot, i) => (
          <div key={i} className={dot ? "bg-on-surface rounded-full w-3 h-3" : "w-3 h-3"} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 z-10">
      <div className="flex gap-8">
        {[0, 1].map((idx) => (
          <motion.div
            key={idx}
            animate={controls}
            className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl border-b-4 border-slate-200 cursor-default"
          >
            {renderFace(localFaces[idx])}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          variant="tactile"
          size="xl"
          onClick={handleRoll}
          disabled={isRolling || isMoving}
          icon="casino"
          className={isRolling ? "opacity-70" : ""}
        >
          {isRolling ? "ROLLING..." : "ROLL DICE"}
        </Button>
        
        <p className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm">
          {isMoving ? `${players[currentPlayerIndex].name} is moving...` : 
           isRolling ? "Rolling dice..." : 
           `${players[currentPlayerIndex].name}'s Turn`}
        </p>
      </div>
    </div>
  );
};
