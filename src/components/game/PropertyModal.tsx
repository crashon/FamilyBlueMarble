"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { BOARD_DATA } from '@/config/board-data';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const PropertyModal = () => {
  const { activeModal, closeModal, purchaseProperty, buildBuilding, players, currentPlayerIndex } = useGameStore();
  
  if (!activeModal || (activeModal.type !== 'purchase' && activeModal.type !== 'upgrade')) return null;

  const tile = BOARD_DATA[activeModal.tileId!];
  const player = players[currentPlayerIndex];
  const currentLevel = useGameStore.getState().propertyLevels[activeModal.tileId!] || 0;
  
  const isAffordable = activeModal.type === 'purchase' 
    ? player.balance >= (tile.price || 0)
    : player.balance >= (tile.buildingCost || 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-sm"
        >
          <Card className="relative overflow-visible p-0 border-none shadow-2xl bg-white">
            {/* Header Color Strip */}
            <div 
              className="h-24 rounded-t-xl flex flex-col items-center justify-center text-white relative overflow-hidden"
              style={{ backgroundColor: tile.color || '#cbd5e1' }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,1),transparent)]"></div>
              <span className="material-symbols-outlined text-4xl mb-1 drop-shadow-md">
                {tile.type === 'property' ? 'location_city' : tile.icon}
              </span>
              <h2 className="text-2xl font-black font-headline uppercase tracking-tight drop-shadow-md">
                {tile.name}
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Type</span>
                  <Badge variant="secondary">{tile.group === 'utility' ? 'Utility' : 'Land'}</Badge>
                </div>

                {activeModal.type === 'purchase' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cost</span>
                      <span className="text-2xl font-black text-primary">₩{(tile.price! / 10000).toLocaleString()}만</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Estimated Rent</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">Base</span>
                        <span className="text-sm font-black text-slate-700">₩{(tile.baseRent! / 10000).toLocaleString()}만</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Upgrade Cost</span>
                      <span className="text-2xl font-black text-secondary">₩{(tile.buildingCost! / 10000).toLocaleString()}만</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase">Level Up</p>
                        <p className="font-bold text-blue-700">{currentLevel} → {currentLevel + 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-blue-400 uppercase">New Rent</p>
                        <p className="font-black text-blue-700">
                          ₩{((tile.baseRent! * (tile.rentMultipliers?.[currentLevel + 1] || 1)) / 10000).toLocaleString()}만
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  variant="tactile" 
                  size="lg"
                  className="w-full"
                  disabled={!isAffordable}
                  onClick={() => {
                    if (activeModal.type === 'purchase') purchaseProperty(player.id, tile.id);
                    else buildBuilding(player.id, tile.id);
                  }}
                >
                  {activeModal.type === 'purchase' ? 'PURCHASE LAND' : 'BUILD STRUCTURE'}
                </Button>
                <button 
                  onClick={() => useGameStore.getState().nextTurn()}
                  className="py-3 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  Skip for now
                </button>
              </div>
            </div>
            
            {!isAffordable && (
              <div className="px-8 pb-4">
                <p className="text-[10px] text-center font-bold text-red-500 bg-red-50 py-2 rounded-md">
                  INSUFFICIENT BALANCE
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
