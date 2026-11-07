import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, type CharacterEmotion } from '../config/assets';
import { audioManager } from '../utils/audio';

export type CharacterState = 'idle' | 'walking' | 'sad' | 'dancing';

interface PixelCharacterProps {
  state?: CharacterState;
  emotion?: CharacterEmotion;
  scaleOverride?: number;
  className?: string;
  isFlipped?: boolean;
}

export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  state = 'idle',
  emotion,
  scaleOverride,
  className = '',
  isFlipped = false,
}) => {
  const config = ASSETS.character;
  const scale = scaleOverride ?? config.scale;
  const [walkIndex, setWalkIndex] = useState(0);

  // Map state to emotion if emotion is not explicitly provided
  let activeEmotion: CharacterEmotion = emotion || 'greeting';
  if (!emotion) {
    if (state === 'walking') activeEmotion = 'walking';
    else if (state === 'sad') activeEmotion = 'embarrassed';
    else if (state === 'dancing') activeEmotion = 'celebrating';
    else activeEmotion = 'greeting';
  }

  // Walk animation frame cycler for walking state
  useEffect(() => {
    if (activeEmotion !== 'walking') return;

    const interval = setInterval(() => {
      setWalkIndex((prev) => {
        const next = (prev + 1) % config.walkFrames.length;
        audioManager.playFootstep(ASSETS.sounds.footstep);
        return next;
      });
    }, config.walkIntervalMs);

    return () => clearInterval(interval);
  }, [activeEmotion, config.walkFrames.length, config.walkIntervalMs]);

  // Determine sprite source from the 12 poses
  let spriteSrc = config.poses[activeEmotion] || config.poses.greeting;
  let animationClass = 'animate-pixel-bob';

  if (activeEmotion === 'walking') {
    spriteSrc = config.walkFrames[walkIndex] || config.poses.walking;
    animationClass = 'animate-walk-bob';
  } else if (activeEmotion === 'celebrating') {
    animationClass = 'animate-pixel-dance';
  } else if (activeEmotion === 'jumping') {
    animationClass = 'animate-bounce';
  } else if (activeEmotion === 'embarrassed') {
    animationClass = 'animate-pulse';
  }

  const width = config.baseWidth * scale;
  const height = config.baseHeight * scale;

  return (
    <div
      className={`relative inline-block select-none transition-all duration-300 ${className} ${animationClass}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: isFlipped ? 'scaleX(-1)' : undefined,
      }}
    >
      {/* Ground subtle natural shadow */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-stone-950/35 rounded-full blur-[2px] pointer-events-none"
      />

      {/* Smooth crossfade container */}
      <AnimatePresence mode="wait">
        <motion.img
          key={spriteSrc}
          src={spriteSrc}
          alt={`Character pose ${activeEmotion}`}
          initial={{ opacity: 0.85, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.85 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full object-contain pixelated drop-shadow-md select-none pointer-events-none"
          draggable={false}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = config.poses.greeting;
          }}
        />
      </AnimatePresence>
    </div>
  );
};
