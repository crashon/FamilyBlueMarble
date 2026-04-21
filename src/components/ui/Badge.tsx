import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'outline' | 'rare' | 'success';
}

export const Badge = ({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: BadgeProps) => {
  const variants = {
    default: 'bg-surface-container-highest text-outline',
    primary: 'bg-primary-container text-on-primary-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
    tertiary: 'bg-tertiary-container text-on-tertiary-container',
    outline: 'bg-transparent border border-outline/20 text-on-surface-variant font-medium',
    rare: 'bg-secondary text-secondary-container font-black uppercase text-[10px]',
    success: 'bg-green-100 text-green-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold leading-none ring-1 ring-inset ring-transparent',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
