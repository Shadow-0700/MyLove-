import React, { useMemo } from 'react';
import { ASSETS } from '../config/assets';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'star';
}

export const FloatingEffects: React.FC<{ intensity?: 'normal' | 'celebration' }> = ({
  intensity = 'normal',
}) => {
  const count = intensity === 'celebration' ? 40 : 18;

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 8 + (intensity === 'celebration' ? 6 : 10),
      delay: Math.random() * 6,
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'star',
    }));
  }, [count, intensity]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-particle will-change-transform"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          {p.type === 'heart' ? (
            <img
              src={ASSETS.effects.heart}
              alt=""
              className="w-full h-full pixelated opacity-70 glow-heart drop-shadow-md"
            />
          ) : p.type === 'sparkle' ? (
            <img
              src={ASSETS.effects.sparkle}
              alt=""
              className="w-full h-full pixelated opacity-60 drop-shadow-sm"
            />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-amber-200 opacity-60 blur-[1px] animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};
