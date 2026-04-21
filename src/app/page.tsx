"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { asset_5 } from '@/assets';
import { useGameStore } from '@/store/useGameStore';
import { useAudioStore } from '@/store/useAudioStore';
import { AudioProvider } from '@/components/game/AudioProvider';

export default function LobbyPage() {
  const { players } = useGameStore();
  const { startBgm, playSfx } = useAudioStore();

  useEffect(() => {
    startBgm('bgm_lobby');
  }, [startBgm]);

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-12 relative overflow-hidden">
      <AudioProvider />
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image src={asset_5} alt="Pattern" fill className="object-cover" />
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-6xl text-center"
      >
        <header className="mb-16">
          <Badge variant="tertiary" className="mb-4">NEW VERSION 2.4.0</Badge>
          <h1 className="text-7xl font-black text-on-surface italic font-headline tracking-tighter mb-4">
            Family <span className="text-primary italic">Blue Marble</span>
          </h1>
          <p className="text-xl text-on-surface-variant font-medium tracking-wide">
            Select your architect and build the solar system.
          </p>
        </header>

        {/* Character Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {players.map((player) => (
            <motion.div
              key={player.id}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <Card 
                variant="hud" 
                className="h-full border-b-4 border-slate-200 transition-all group-hover:border-primary group-hover:shadow-2xl bg-white"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-surface-container shadow-inner relative" style={{ backgroundColor: player.color }}>
                    <Image src={player.avatar} alt={player.name} fill className="object-cover" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-on-surface mb-2">{player.name}</h3>
                    <Badge variant="outline" className="mb-4">
                      {player.id === 0 ? "Architect" : 
                       player.id === 1 ? "Luck Seeker" : 
                       player.id === 2 ? "Tycoon" : "Explorer"}
                    </Badge>
                    
                    <div className="space-y-3 text-left bg-surface-container-low p-4 rounded-xl text-sm">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                        <p className="text-on-surface-variant font-medium">
                          <span className="text-primary font-bold">Passive:</span> {
                            player.id === 0 ? "Building costs reduced by 10-20%" :
                            player.id === 1 ? "Chance card luck bonus (20-60%)" :
                            player.id === 2 ? "START bonus increased by 50%" :
                            "Property purchase discount (5-15%)"
                          }
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">star</span>
                        <p className="text-on-surface-variant font-medium">
                          <span className="text-secondary font-bold">Ultimate:</span> {
                            player.id === 0 ? "Instantly upgrade current tile" :
                            player.id === 1 ? "Extra roll this turn" :
                            player.id === 2 ? "Tax all players 10%" :
                            "Warp to nearest unowned land"
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href="/game" className="w-full">
                    <Button 
                      variant={player.id % 2 === 0 ? "primary" : "secondary"} 
                      className="w-full font-black py-4"
                      onClick={() => playSfx('sfx_click')}
                    >
                      CHOOSE ARCHITECT
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <footer className="text-on-surface-variant text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-8 opacity-40">
          <span>Stitch Design System</span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span>Next.js 16.2</span>
          <span className="w-2 h-2 rounded-full bg-slate-300"></span>
          <span>Vercel Turbopack</span>
        </footer>
      </motion.div>
    </div>
  );
}
