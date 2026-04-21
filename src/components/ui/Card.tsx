import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bento' | 'hud';
  noPadding?: boolean;
}

export const Card = ({ 
  className, 
  variant = 'default', 
  noPadding = false,
  children, 
  ...props 
}: CardProps) => {
  const variants = {
    default: 'bg-surface-container-lowest shadow-[0_20px_40px_rgba(25,28,30,0.06)]',
    bento: 'bg-surface-container-lowest bento-card shadow-[0_20px_40px_rgba(25,28,30,0.06)] border border-surface-variant/20',
    hud: 'bg-surface-container-lowest bouncy-shadow border-2 border-primary transform',
  };

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        !noPadding && 'p-6',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
