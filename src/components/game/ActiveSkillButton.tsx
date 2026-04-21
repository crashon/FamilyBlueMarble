"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const ActiveSkillButton = () => {
  const { players, currentPlayerIndex, triggerActiveSkill, isMoving, isRolling } = useGameStore();
  const player = players[currentPlayerIndex];

  if (player.isSkillUsed || isMoving || isRolling) return null;

  const getSkillInfo = (id: number) => {
    switch (id) {
      case 0: return { name: "Architect's Will", icon: "architecture", desc: "Instantly upgrade current property for free." };
      case 1: return { name: "Time Warp", icon: "history", desc: "Roll the dice again right now." };
      case 2: return { name: "Market Crash", icon: "trending_down", desc: "Collect 10% tax from all competitors." };
      case 3: return { name: "Explorer's Dash", icon: "explore", desc: "Warp to the nearst unowned land." };
      default: return { name: "Skill", icon: "bolt", desc: "" };
    }
  };

  const info = getSkillInfo(player.id);

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="fixed right-12 bottom-36 z-50 group"
    >
      <div className="absolute bottom-full right-0 mb-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl">
          <p className="text-primary font-black text-[10px] uppercase tracking-widest mb-1">{info.name}</p>
          <p className="text-white/70 text-[10px] leading-tight">{info.desc}</p>
        </div>
      </div>

      <Button
        variant="tactile"
        size="xl"
        className="w-20 h-20 rounded-full bg-primary border-primary-container shadow-[0_8px_0px_#003c82] flex items-center justify-center relative overflow-hidden"
        onClick={() => triggerActiveSkill(player.id)}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent)] opacity-20"
        />
        <span className="material-symbols-outlined text-4xl text-white drop-shadow-md">
          {info.icon}
        </span>
      </Button>
    </motion.div>
  );
};
