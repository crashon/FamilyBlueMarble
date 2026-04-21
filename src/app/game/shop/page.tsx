"use client";

import React from 'react';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNavBar } from '@/components/layout/BottomNavBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const ITEMS = [
  { 
    id: 1, 
    name: 'Cosmic Double Dice', 
    desc: 'Roll two dice this turn and choose the highest result!', 
    price: '800 Credits', 
    icon: 'casino',
    color: 'primary'
  },
  { 
    id: 2, 
    name: 'Stellar Shield', 
    desc: 'Blocks the next negative event or trap you land on.', 
    price: '1,200 Credits', 
    icon: 'shield',
    color: 'secondary'
  },
  { 
    id: 3, 
    name: 'Rocket Ticket', 
    desc: 'Instantly warp to any space within 10 blocks.', 
    price: '2,500 Credits', 
    icon: 'rocket_launch',
    color: 'tertiary'
  },
  { 
    id: 4, 
    name: 'Magic Compass', 
    desc: 'Re-roll once per game when landing on a blank space.', 
    price: '1,500 Credits', 
    icon: 'explore',
    color: 'primary'
  },
  { 
    id: 5, 
    name: 'Gold Key', 
    desc: 'Unlocks any treasure chest without requiring a roll.', 
    price: '3,000 Credits', 
    icon: 'key',
    color: 'secondary',
    rare: true
  },
  { 
    id: 6, 
    name: 'Gravity Boots', 
    desc: 'Prevents you from being moved by other players\' items.', 
    price: '950 Credits', 
    icon: 'steps',
    color: 'outline'
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-surface-container-low pb-32">
      <TopAppBar title="Cosmic Carnival" subtitle="The Bazaar" />
      
      <main className="max-w-7xl mx-auto px-6 pt-12 flex flex-col lg:flex-row gap-8">
        {/* Main Inventory Grid */}
        <section className="flex-grow">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Available Goods</h2>
              <p className="text-on-surface-variant font-medium">Power-ups to dominate the board!</p>
            </div>
            <div className="hidden md:flex bg-surface-container-highest p-1 rounded-full">
              <Button variant="ghost" className="bg-white shadow-sm">Consumables</Button>
              <Button variant="ghost">Perks</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {ITEMS.map((item) => (
              <Card key={item.id} variant="bento" className="relative flex flex-col justify-between">
                {item.rare && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="rare">Rare</Badge>
                  </div>
                )}
                <div>
                  <div className={cn(
                    "w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-sm rotate-[-3deg]",
                    item.color === 'primary' ? 'bg-primary-container' : 
                    item.color === 'secondary' ? 'bg-secondary-container' : 
                    item.color === 'tertiary' ? 'bg-tertiary-container' : 'bg-surface-container-high'
                  )}>
                    <span className={cn(
                      "material-symbols-outlined text-4xl fill-icon",
                      item.color === 'primary' ? 'text-primary' : 
                      item.color === 'secondary' ? 'text-on-secondary-container' : 
                      item.color === 'tertiary' ? 'text-on-tertiary-container' : 'text-outline'
                    )}>
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="font-bold text-primary">{item.price}</span>
                  <Button variant="tactile" size="sm">Buy</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Sidebar: Featured Deal */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-32">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl overflow-hidden relative group">
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              
              <Badge variant="secondary" className="mb-6 shadow-lg">Daily Deal</Badge>
              
              <div className="mb-8 flex justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <span className="material-symbols-outlined text-7xl text-white relative z-10 fill-icon">star</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-headline font-extrabold mb-2 text-center text-white">Supernova Star</h3>
              <p className="text-blue-100 text-sm text-center leading-relaxed mb-8">Triple all credit earnings for the next 5 turns!</p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-blue-200 line-through text-sm">5,000</span>
                  <span className="text-3xl font-black text-secondary-container">3,500</span>
                </div>
                <button className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all">Claim Now</button>
              </div>
            </div>
            
            <div className="mt-8 bg-surface-container-high rounded-xl p-6 border-b-4 border-slate-300/50">
              <h4 className="font-headline font-bold text-on-surface mb-4">Store Rotates In</h4>
              <div className="flex gap-4">
                {[ { v: '04', l: 'Hrs' }, { v: '22', l: 'Min' }, { v: '15', l: 'Sec' } ].map(t => (
                  <div key={t.l} className="flex-1 bg-surface-container-lowest p-3 rounded-lg text-center shadow-sm">
                    <p className="text-xl font-black text-primary">{t.v}</p>
                    <p className="text-[10px] font-bold text-outline uppercase">{t.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      <BottomNavBar />
    </div>
  );
}

// Inline helper for CN if it's not exported properly or just to be safe
import { cn } from '@/lib/utils';
