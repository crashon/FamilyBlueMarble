"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNavBar } from '@/components/layout/BottomNavBar';
import { Card } from '@/components/ui/Card';
import { Dice } from '@/components/game/Dice';
import { PlayerPawn } from '@/components/game/PlayerPawn';
import { PropertyModal } from '@/components/game/PropertyModal';
import { ChanceModal } from '@/components/game/ChanceModal';
import { DesertModal } from '@/components/game/DesertModal';
import { GameOverModal } from '@/components/game/GameOverModal';
import { GameLogs } from '@/components/game/GameLogs';
import { ActiveSkillButton } from '@/components/game/ActiveSkillButton';
import { VfxManager } from '@/components/game/VfxManager';
import { AudioProvider } from '@/components/game/AudioProvider';
import { useGameStore } from '@/store/useGameStore';
import { useAudioStore } from '@/store/useAudioStore';
import { BOARD_DATA } from '@/config/board-data';
import { motion } from 'framer-motion';
import { useMouseTilt } from '@/hooks/useMouseTilt';
import { Building3D } from '@/components/game/Building3D';
import { asset_5 } from '@/assets';
import { cn } from '@/lib/utils';

export default function GamePage() {
  const { players, currentPlayerIndex, propertyOwners, propertyLevels } = useGameStore();
  const { rotateX, rotateY } = useMouseTilt(5);
  const { startBgm } = useAudioStore();

  useEffect(() => {
    startBgm('bgm_main');
  }, [startBgm]);

  const renderBuildingStatus = (tileId: number, color: string) => {
    const level = propertyLevels[tileId] || 0;
    return <Building3D level={level} color={color} />;
  };

  return (
    <div className="bg-background text-on-background font-body overflow-hidden h-screen w-screen selection:bg-primary-container selection:text-on-primary-container">
      <TopAppBar title="The Tactile Toybox" subtitle="Economy Prototype" />
      
      <main className="relative h-screen pt-24 pb-32 px-12 flex items-center justify-center bg-surface-container-low overflow-hidden">
        <PropertyModal />
        <ChanceModal />
        <DesertModal />
        <GameOverModal />
        <GameLogs />
        <ActiveSkillButton />
        <VfxManager />
        <AudioProvider />

        {/* Dynamic Player HUDs */}
        <div className="absolute top-32 left-12 z-10 flex flex-col gap-4">
          {players.slice(0, 2).map((player) => (
            <div key={player.id} className={cn("w-64 transform transition-all duration-500", 
              player.isBankrupt ? "grayscale opacity-30 scale-90" :
              currentPlayerIndex === player.id ? "-rotate-1 scale-105" : "opacity-60 scale-95 rotate-1")}>
              <Card variant={currentPlayerIndex === player.id ? "hud" : "default"} className={currentPlayerIndex === player.id ? "active-glow" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-4 border-primary-container relative" style={{ backgroundColor: player.color }}>
                    <Image src={player.avatar} alt={player.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-on-surface font-headline font-bold text-lg">{player.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={cn("text-[10px]", i < player.level ? "text-primary" : "text-slate-200")}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className={cn("font-bold text-sm tracking-tighter uppercase flex items-center gap-1", 
                      currentPlayerIndex === player.id ? "text-primary" : "text-slate-400")}>
                      {player.trappedTurns > 0 && <span className="material-symbols-outlined text-xs text-amber-500">lock</span>}
                      {player.isBankrupt ? "Bankrupt" : currentPlayerIndex === player.id ? "Your Turn" : "Waiting..."}
                    </p>
                  </div>
                </div>
                <div className={cn("py-3 px-4 rounded-lg flex justify-between items-center transition-colors", 
                  currentPlayerIndex === player.id ? "bg-primary text-white" : "bg-surface-container text-on-surface")}>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">Balance</span>
                  <span className="font-headline font-extrabold text-xl">₩{(player.balance / 10000).toLocaleString()}만</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Right HUDs */}
        <div className="absolute top-32 right-12 z-10 flex flex-col gap-4">
          {players.slice(2, 4).map((player) => (
            <div key={player.id} className={cn("w-64 transform transition-all duration-500", 
              player.isBankrupt ? "grayscale opacity-30 scale-90" :
              currentPlayerIndex === player.id ? "rotate-2 scale-105" : "opacity-60 scale-95 -rotate-1")}>
              <Card variant={currentPlayerIndex === player.id ? "hud" : "default"} className={currentPlayerIndex === player.id ? "active-glow" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-4 border-primary-container relative" style={{ backgroundColor: player.color }}>
                    <Image src={player.avatar} alt={player.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-on-surface font-headline font-bold text-lg">{player.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span key={i} className={cn("text-[10px]", i < player.level ? "text-primary" : "text-slate-200")}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className={cn("font-bold text-sm tracking-tighter uppercase flex items-center gap-1", 
                      currentPlayerIndex === player.id ? "text-primary" : "text-slate-400")}>
                      {player.trappedTurns > 0 && <span className="material-symbols-outlined text-xs text-amber-500">lock</span>}
                      {player.isBankrupt ? "Bankrupt" : currentPlayerIndex === player.id ? "Your Turn" : "Waiting..."}
                    </p>
                  </div>
                </div>
                <div className={cn("py-3 px-4 rounded-lg flex justify-between items-center transition-colors", 
                  currentPlayerIndex === player.id ? "bg-primary text-white" : "bg-surface-container text-on-surface")}>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">Balance</span>
                  <span className="font-headline font-extrabold text-xl">₩{(player.balance / 10000).toLocaleString()}만</span>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Board Tiles Layout */}
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
          className="relative bg-surface-container-highest p-4 rounded-[2.5rem] shadow-[0_40px_80px_rgba(25,28,30,0.2)] max-w-[800px] w-full aspect-square border-8 border-surface-variant z-0"
        >
          <div className="grid grid-cols-11 grid-rows-11 w-full h-full bg-white rounded-[2rem] overflow-hidden relative shadow-inner">
            
            {/* Player Pawns Layer */}
            <div className="absolute inset-0 grid grid-cols-11 grid-rows-11 pointer-events-none z-10">
              {players.map((p) => (
                <PlayerPawn key={p.id} playerId={p.id} />
              ))}
            </div>

            {/* Render Tiles */}
            {BOARD_DATA.map((tile) => {
              const ownerId = propertyOwners[tile.id];
              const owner = players.find(p => p.id === ownerId);
              
              // Bottom: 0-10
              let gridPos = "";
              if (tile.id <= 10) gridPos = `col-start-${11-tile.id} row-start-11`;
              else if (tile.id <= 20) gridPos = `col-start-1 row-start-${11-(tile.id-10)}`;
              else if (tile.id <= 30) gridPos = `col-start-${1+(tile.id-20)} row-start-1`;
              else gridPos = `col-start-11 row-start-${1+(tile.id-30)}`;

              return (
                <div 
                  key={tile.id} 
                  onClick={() => useGameStore.getState().isSpaceTourActive && useGameStore.getState().performSpaceTourWarp(tile.id)}
                  className={cn(gridPos, "border border-surface-variant/30 p-1 flex flex-col justify-between relative transition-all duration-500", 
                    tile.type === 'corner' ? (tile.id === 0 ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container') : 'bg-white',
                    useGameStore.getState().isSpaceTourActive && "cursor-pointer hover:bg-primary/20 hover:scale-105 z-40 shadow-xl ring-2 ring-primary ring-inset"
                  )}
                >
                  
                  {/* Property Color Bar */}
                  {tile.type === 'property' && (
                    <div className="h-1/5 rounded-sm opacity-80" style={{ backgroundColor: tile.color }}></div>
                  )}

                  <div className="flex flex-col items-center justify-center flex-grow py-0.5">
                    {tile.icon && <span className="material-symbols-outlined text-lg mb-0.5">{tile.icon}</span>}
                    <p className={cn("font-bold text-center leading-none", 
                      tile.type === 'corner' ? 'text-[9px]' : 'text-[7px] uppercase')}>
                      {tile.name}
                    </p>
                    {renderBuildingStatus(tile.id, owner?.color || '#cbd5e1')}
                  </div>

                  {/* Ownership Indicator */}
                  {owner && (
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: owner.color }}></div>
                  )}
                  {owner && (
                    <div className="absolute top-1 right-1">
                      <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: owner.color }} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Center Area */}
            <div className="col-start-2 col-end-11 row-start-2 row-end-11 bg-surface-container-low relative flex flex-col items-center justify-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <Image src={asset_5} alt="Pattern" fill className="object-cover" />
              </div>
              <Dice />
            </div>
          </div>
        </motion.div>
      </main>

      <BottomNavBar />
    </div>
  );
}
