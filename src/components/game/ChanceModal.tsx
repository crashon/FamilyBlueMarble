"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ChanceModal = () => {
  const { activeModal, applyChanceCard, currentPlayerIndex } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!activeModal || activeModal.type !== 'chance') {
    if (isFlipped) setIsFlipped(false);
    return null;
  }

  const card = activeModal.payload.card;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full max-w-sm perspective-1000"
        >
          <div className="relative w-full h-[400px] preserve-3d transition-transform duration-700 cursor-pointer"
               style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
               onClick={() => !isFlipped && setIsFlipped(true)}>
            
            {/* Front: Card Back */}
            <div className="absolute inset-0 backface-hidden">
              <Card className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center border-4 border-white/20 shadow-2xl">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                  <span className="material-symbols-outlined text-6xl text-white fill-icon">question_mark</span>
                </div>
                <h3 className="text-2xl font-black text-white font-headline tracking-[0.2em]">CHANCE</h3>
                <p className="text-blue-200 text-xs mt-4 uppercase font-bold tracking-widest">Tap to reveal</p>
              </Card>
            </div>

            {/* Back: Card Front */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <Card className={cn(
                "w-full h-full flex flex-col items-center justify-between p-8 border-4 shadow-2xl bg-white",
                card.variant === 'good' ? 'border-primary' : 'border-red-500'
              )}>
                <div className="w-full flex justify-between items-start">
                  <span className={cn(
                    "material-symbols-outlined text-4xl",
                    card.variant === 'good' ? 'text-primary' : 'text-red-500'
                  )}>
                    {card.type === 'money' ? 'payments' : card.type === 'move' ? 'rocket_launch' : 'auto_mode'}
                  </span>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    card.variant === 'good' ? 'bg-primary-container text-primary' : 'bg-red-100 text-red-600'
                  )}>
                    {card.variant === 'good' ? 'Lucky Space' : 'Anomaly Detected'}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className={cn(
                    "text-2xl font-black font-headline mb-4 uppercase",
                    card.variant === 'good' ? 'text-primary' : 'text-red-500'
                  )}>
                    {card.title}
                  </h2>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <Button 
                  variant="tactile" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    applyChanceCard(card, currentPlayerIndex);
                  }}
                >
                  CONFIRM
                </Button>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import { cn } from '@/lib/utils';
