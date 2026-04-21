"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Building3DProps {
  level: number;
  color: string;
}

export const Building3D = ({ level, color }: Building3DProps) => {
  if (level === 0) return null;

  return (
    <div className="flex gap-1 mt-1 items-end h-4">
      {Array.from({ length: level }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="relative w-3 h-3 group"
        >
          {/* Base shadow */}
          <div className="absolute -bottom-1 -right-0.5 w-full h-1 bg-black/20 rounded-full blur-[2px]" />
          
          {/* 3D Cube/House using CSS Borders */}
          <div className="absolute inset-0 preserve-3d">
            {/* Front */}
            <div 
              className="absolute inset-0 rounded-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" 
              style={{ backgroundColor: color }} 
            />
            {/* Top Side (Simulated) */}
            <div 
              className="absolute -top-1 left-0 w-full h-1 rounded-t-[1px] opacity-40" 
              style={{ backgroundColor: 'white' }} 
            />
            {/* Right Side (Simulated) */}
            <div 
              className="absolute top-0 -right-0.5 w-0.5 h-full opacity-30" 
              style={{ backgroundColor: 'black' }} 
            />
          </div>

          {/* Roof for level 3 (Hotel) */}
          {level === 3 && i === 2 && (
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-secondary rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};
