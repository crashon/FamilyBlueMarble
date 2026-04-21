"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: 'rocket_launch', label: 'Galaxy', href: '/game' },
  { icon: 'storefront', label: 'Bazaar', href: '/game/shop' },
  { icon: 'style', label: 'Deck', href: '/game/assets' },
  { icon: 'account_circle', label: 'Astronaut', href: '/game/profile' },
];

export const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.06)] border-none">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all group active:scale-90 duration-200 ease-out",
              isActive 
                ? "bg-primary text-white shadow-[0_4px_15px_rgba(0,91,193,0.3)]" 
                : "text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
          >
            <span className={cn(
              "material-symbols-outlined text-2xl group-hover:scale-110 transition-transform",
              isActive && "fill-icon"
            )}>
              {item.icon}
            </span>
            <span className="font-headline text-[10px] font-extrabold uppercase mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
