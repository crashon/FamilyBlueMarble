"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/useUiStore';

const navItems = [
  { icon: 'rocket_launch', label: 'Galaxy', href: '/game' },
  { icon: 'storefront', label: 'Bazaar', href: '/game/shop' },
  { icon: 'style', label: 'Deck', href: '/game/assets' },
  { icon: 'account_circle', label: 'Astronaut', href: '/game/profile' },
];

export const BottomNavBar = () => {
  const pathname = usePathname();
  const { panelState, togglePanel, setPanelState } = useUiStore();
  const touchStartYRef = React.useRef<number | null>(null);
  const panelTranslateY = panelState === 'full' ? '0%' : panelState === 'minimized' ? '80%' : '100%';

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartYRef.current === null) return;
    const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
    const deltaY = endY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 40) {
      setPanelState('minimized');
      return;
    }
    if (deltaY < -40) {
      setPanelState('full');
    }
  };

  return (
    <>
      <nav
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed bottom-0 left-0 w-full z-[100] flex justify-around items-center px-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.06)] border-none transition-transform duration-300 ease-out will-change-transform"
        style={{
          height: 'clamp(140px, 20vh, 220px)',
          transform: `translateY(${panelTranslateY})`,
          paddingTop: 16,
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center rounded-full transition-all group active:scale-90 duration-200 ease-out min-w-20 min-h-20",
                panelState === 'full' ? "flex-col px-4 py-2" : "px-4 py-1",
                isActive
                  ? "bg-primary text-white shadow-[0_4px_15px_rgba(0,91,193,0.3)]"
                  : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              )}
            >
              <span className={cn(
                "material-symbols-outlined text-2xl group-hover:scale-110 transition-transform",
                isActive && "fill-icon"
              )}>
                {item.icon}
              </span>
              {panelState === 'full' && (
                <span className="font-headline text-[14px] font-extrabold uppercase mt-1">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={togglePanel}
        className="fixed right-4 bottom-4 z-[110] min-w-20 min-h-20 rounded-full bg-primary text-white shadow-[0_10px_24px_rgba(0,91,193,0.35)] flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Toggle bottom panel"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <span className="material-symbols-outlined text-4xl">
          {panelState === 'full' ? 'keyboard_arrow_down' : panelState === 'minimized' ? 'keyboard_arrow_up' : 'keyboard_double_arrow_up'}
        </span>
      </button>
    </>
  );
};
