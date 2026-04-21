"use client";

import React from 'react';
import Image from 'next/image';
import { asset_0 } from '@/assets';
import { useGameStore } from '@/store/useGameStore';

export const TopAppBar = ({ title = "Cosmic Carnival", subtitle = "The Bazaar" }) => {
  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-b-[3rem] shadow-[0_10px_30px_rgba(0,91,193,0.08)] flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm relative">
          <Image 
            src={asset_0} 
            alt="Merchant" 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-black text-primary italic font-headline tracking-tight">
            {title}
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="bg-primary-container px-6 py-2 rounded-full flex items-center gap-2 shadow-inner border-b-2 border-white/50">
          <span className="material-symbols-outlined text-primary font-bold">payments</span>
          <span className="font-headline font-bold text-blue-700">5,400 Credits</span>
        </div>
        <button 
          onClick={() => useGameStore.getState().resetGame()}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Reset Game"
        >
          <span className="material-symbols-outlined">restart_alt</span>
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
};
