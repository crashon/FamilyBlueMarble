"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const GameOverModal = () => {
  const { isGameOver, winner } = useGameStore();

  if (!isGameOver || !winner) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center -z-10"
          >
            <div className="w-64 h-64 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="w-48 h-48 bg-secondary/20 blur-2xl rounded-full translate-x-12 translate-y-12"></div>
          </motion.div>
          
          <div className="w-32 h-32 rounded-full border-8 border-primary shadow-2xl mx-auto overflow-hidden bg-white mb-6">
            <Image src={winner.avatar} alt={winner.name} width={128} height={128} className="object-cover" />
          </div>
          
          <h2 className="text-5xl font-black text-white italic font-headline mb-2 tracking-tighter">VICTORY!</h2>
          <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">Winner: {winner.name}</p>
        </div>

        <Card variant="bento" className="p-8 mb-8 bg-white/5 border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Final Balance</p>
              <p className="text-2xl font-black text-white">₩{(winner.balance / 10000).toLocaleString()}만</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
              <p className="text-2xl font-black text-secondary">SURVIVOR</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <Button variant="tactile" size="xl" className="w-full">
              RETURN TO LOBBY
            </Button>
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="text-white/60 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
          >
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};
