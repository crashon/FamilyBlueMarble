"use client";

import { useState, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export const useMouseTilt = (maxRotation = 8) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxRotation, maxRotation]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative position from center of screen (-0.5 to 0.5)
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;
      
      x.set(xPos);
      y.set(yPos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return { rotateX, rotateY };
};
