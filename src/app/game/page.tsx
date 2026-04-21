"use client";

import React, { useEffect, useState } from 'react';
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
  const { players, currentPlayerIndex, propertyOwners, propertyLevels, isSpaceTourActive, landingPulse } = useGameStore();
  const { rotateX, rotateY } = useMouseTilt(5);
  const { startBgm } = useAudioStore();
  const [viewportWidth, setViewportWidth] = useState(0);
  const [selectedTileId, setSelectedTileId] = useState<number | null>(null);

  useEffect(() => {
    startBgm('bgm_main');
  }, [startBgm]);

  useEffect(() => {
    const syncViewport = () => {
      setViewportWidth(window.innerWidth);
    };
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const isTablet = viewportWidth >= 1024;
  const cityFontSize = isTablet ? 20 : 14;
  const metaFontSize = isTablet ? 16 : 14;

  const renderBuildingStatus = (tileId: number, color: string) => {
    const level = propertyLevels[tileId] || 0;
    return <Building3D level={level} color={color} />;
  };

  const getOwnershipVisual = (ownerColor?: string) => {
    if (!ownerColor) {
      return {
        background: undefined,
        borderColor: undefined,
        shadow: undefined,
      };
    }

    return {
      background: `linear-gradient(0deg, ${ownerColor}66, ${ownerColor}66), #ffffff`,
      borderColor: ownerColor,
      shadow: `inset 0 0 0 2px ${ownerColor}88, 0 0 12px ${ownerColor}66`,
    };
  };

  const getTileFocusOffset = (tileId: number) => {
    let col = 6;
    let row = 6;
    if (tileId <= 10) {
      col = 11 - tileId;
      row = 11;
    } else if (tileId <= 20) {
      col = 1;
      row = 11 - (tileId - 10);
    } else if (tileId <= 30) {
      col = 1 + (tileId - 20);
      row = 1;
    } else {
      col = 11;
      row = 1 + (tileId - 30);
    }
    return {
      x: (6 - col) * 10,
      y: (6 - row) * 10,
    };
  };

  const focusedTileId = landingPulse?.tileId ?? selectedTileId;
  const focusedTile = focusedTileId !== null ? BOARD_DATA[focusedTileId] : null;
  const focusedOwnerId = focusedTile ? propertyOwners[focusedTile.id] : undefined;
  const focusedOwner = focusedOwnerId !== undefined ? players.find((p) => p.id === focusedOwnerId) : undefined;
  const focusedLevel = focusedTile ? propertyLevels[focusedTile.id] || 0 : 0;
  const focusOffset = focusedTileId !== null ? getTileFocusOffset(focusedTileId) : { x: 0, y: 0 };

  return (
    <div className="bg-background text-on-background font-body overflow-hidden h-screen w-screen selection:bg-primary-container selection:text-on-primary-container">
      <TopAppBar title="The Tactile Toybox" subtitle="Economy Prototype" />
      
      <main className="relative h-screen pt-24 px-12 flex items-center justify-center bg-surface-container-low overflow-hidden">
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
              <Card
                variant={currentPlayerIndex === player.id ? "hud" : "default"}
                className="transition-all duration-300"
                style={{
                  backgroundColor: player.color,
                  border: '3px solid white',
                  borderRadius: 12,
                  boxShadow: currentPlayerIndex === player.id ? `0 0 15px ${player.color}` : undefined,
                }}
              >
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
              <Card
                variant={currentPlayerIndex === player.id ? "hud" : "default"}
                className="transition-all duration-300"
                style={{
                  backgroundColor: player.color,
                  border: '3px solid white',
                  borderRadius: 12,
                  boxShadow: currentPlayerIndex === player.id ? `0 0 15px ${player.color}` : undefined,
                }}
              >
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
          animate={{ scale: focusedTileId !== null ? 1.03 : 1, x: focusOffset.x, y: focusOffset.y }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative bg-surface-container-highest p-4 rounded-[2.5rem] shadow-[0_40px_80px_rgba(25,28,30,0.2)] max-w-[800px] w-full aspect-square border-8 border-surface-variant z-[1]"
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
                <motion.div 
                  key={tile.id} 
                  onClick={() => {
                    setSelectedTileId(tile.id);
                    window.setTimeout(() => setSelectedTileId((current) => (current === tile.id ? null : current)), 1600);
                    if (isSpaceTourActive) useGameStore.getState().performSpaceTourWarp(tile.id);
                  }}
                  animate={landingPulse?.tileId === tile.id ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={landingPulse?.tileId === tile.id ? { duration: 0.55, ease: "easeInOut" } : { duration: 0.2 }}
                  className={cn(gridPos, "border border-surface-variant/30 p-1 flex flex-col justify-between relative transition-all duration-500", 
                    tile.type === 'corner' ? (tile.id === 0 ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container') : 'bg-white',
                    isSpaceTourActive && "cursor-pointer hover:bg-primary/20 hover:scale-105 z-40 shadow-xl ring-2 ring-primary ring-inset"
                  )}
                  style={{
                    background: tile.type !== 'corner' ? getOwnershipVisual(owner?.color).background : undefined,
                    borderColor: getOwnershipVisual(owner?.color).borderColor,
                    boxShadow: [
                      getOwnershipVisual(owner?.color).shadow,
                      landingPulse?.tileId === tile.id && owner ? `0 0 24px ${owner.color}` : undefined,
                    ].filter(Boolean).join(', '),
                  }}
                >
                  
                  {/* Property Color Bar */}
                  {tile.type === 'property' && (
                    <div className="h-[20%] rounded-sm opacity-95" style={{ backgroundColor: owner?.color || tile.color }}></div>
                  )}

                  <div className="flex flex-col items-center justify-center flex-grow py-0.5 text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                    {tile.icon && <span className="material-symbols-outlined text-lg mb-0.5">{tile.icon}</span>}
                    <p
                      className={cn("font-extrabold text-center leading-none uppercase")}
                      style={{ fontSize: cityFontSize }}
                    >
                      {tile.name}
                    </p>
                    <p className="font-bold" style={{ fontSize: metaFontSize }}>
                      {tile.price ? `₩${tile.price.toLocaleString()}` : tile.type === 'corner' ? 'Corner' : 'Event'}
                    </p>
                    {renderBuildingStatus(tile.id, owner?.color || '#cbd5e1')}
                  </div>

                  {/* Ownership Indicator */}
                  {owner && (
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: owner.color }}></div>
                  )}
                  {owner && (
                    <div className="absolute top-1 right-1">
                      <div className="w-5 h-5 rounded-full shadow-sm flex items-center justify-center text-[10px]" style={{ backgroundColor: owner.color }}>
                        🏳️
                      </div>
                    </div>
                  )}
                  {owner && (
                    <div className="absolute inset-0 pointer-events-none rounded-[4px]" style={{ boxShadow: `inset 0 0 0 2px ${owner.color}` }} />
                  )}
                  {owner && (
                    <div className="absolute top-1 left-1 w-2 h-2 pointer-events-none">
                      <div className="w-full h-full rounded-[1px]" style={{ backgroundColor: owner.color }} />
                    </div>
                  )}
                </motion.div>
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

        {focusedTile && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.4 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white rounded-2xl p-6 min-w-80 shadow-2xl pointer-events-none"
          >
            <p className="text-2xl font-black">{focusedTile.name}</p>
            <p className="text-lg font-semibold mt-1">
              {focusedTile.price ? `Price: ₩${focusedTile.price.toLocaleString()}` : 'No purchase price'}
            </p>
            <p className="text-lg">Owner: {focusedOwner ? focusedOwner.name : 'Unowned'}</p>
            <p className="text-lg">Building Level: {focusedLevel}</p>
          </motion.div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
}
