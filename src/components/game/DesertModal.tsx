"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const DesertModal = () => {
  const { activeModal, handleDesertEscape, currentPlayerIndex, players } = useGameStore();
  const player = players[currentPlayerIndex];

  if (!activeModal || activeModal.type !== 'desert') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-sm"
        >
          <Card className="p-8 bg-white border-none shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 border-4 border-amber-200">
                <span className="material-symbols-outlined text-4xl text-amber-600">cactus</span>
              </div>
              <h2 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tighter">Stranded!</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Remaining: {player.trappedTurns} Turns</p>
            </div>

            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 text-center px-4">
              You are stuck in the shifting sands. Choose your escape route before the sun sets.
            </p>

            <div className="flex flex-col gap-3">
              <Button 
                variant="tactile" 
                size="lg"
                className="w-full bg-slate-900 shadow-[0_4px_0_#000]"
                onClick={() => handleDesertEscape(player.id, 'roll')}
              >
                ROLL FOR DOUBLES
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full"
                disabled={player.balance < 200000}
                onClick={() => handleDesertEscape(player.id, 'pay')}
              >
                PAY ₩200,000 FINE
              </Button>
              
              <button 
                onClick={() => useGameStore.getState().nextTurn()}
                className="py-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
              >
                End Turn and Wait
              </button>
            </div>
            
            {player.balance < 200000 && (
              <p className="mt-4 text-[9px] text-center font-bold text-red-400 bg-red-50 py-1 rounded">
                NOT ENOUGH FUNDS TO PAY FINE
              </p>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
