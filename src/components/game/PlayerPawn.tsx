"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getPositionCoordinates } from '@/lib/grid-utils';
import { useGameStore } from '@/store/useGameStore';

interface PlayerPawnProps {
  playerId: number;
}

export const PlayerPawn = ({ playerId }: PlayerPawnProps) => {
  const player = useGameStore((state) => state.players.find(p => p.id === playerId));
  const isCurrent = useGameStore((state) => state.currentPlayerIndex === playerId);
  
  if (!player) return null;

  const { row, col } = getPositionCoordinates(player.position);

  return (
    <motion.div
      layout
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        layout: { duration: 0.3 } 
      }}
      style={{ 
        gridRowStart: row, 
        gridColumnStart: col,
        zIndex: isCurrent ? 30 : 20
      }}
      className="flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        animate={isCurrent ? { 
          scale: [1, 1.1, 1],
          y: [0, -10, 0]
        } : { scale: 1, y: 0 }}
        transition={isCurrent ? { 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut"
        } : {}}
        className="w-10 h-10 rounded-full border-4 shadow-lg overflow-hidden bg-white"
        style={{ borderColor: player.color }}
      >
        <Image 
          src={player.avatar} 
          alt={player.name} 
          width={40} 
          height={40} 
          className="object-cover"
        />
      </motion.div>
      
      {/* Floating Name Tag for current player */}
      <AnimatePresence>
        {isCurrent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm"
          >
            {player.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
