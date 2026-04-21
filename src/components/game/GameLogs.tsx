"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

export const GameLogs = () => {
  const { gameLogs } = useGameStore();

  return (
    <div className="absolute bottom-32 left-12 z-20 w-80 h-48 overflow-hidden pointer-events-none">
      <div className="flex flex-col-reverse justify-end h-full gap-2 px-2 pb-2">
        <AnimatePresence initial={false}>
          {gameLogs.slice(0, 5).map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1 - i * 0.2, x: 0, scale: 1 - i * 0.05 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-lg"
            >
              <p className="text-[10px] font-bold text-white leading-tight">
                {log}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Label */}
      <div className="absolute top-0 left-4 bg-primary px-3 py-0.5 rounded-full shadow-sm">
        <p className="text-[8px] font-black text-white uppercase tracking-widest">LOGS</p>
      </div>
    </div>
  );
};
