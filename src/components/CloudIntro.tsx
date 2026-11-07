import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { audioManager } from '../utils/audio';

interface CloudIntroProps {
  onDisperse: () => void;
}

export const CloudIntro: React.FC<CloudIntroProps> = ({ onDisperse }) => {
  const [isParting, setIsParting] = useState(false);

  const handleInteraction = () => {
    if (isParting) return;
    setIsParting(true);
    audioManager.playAmbient(ASSETS.sounds.ambientMusic);
    // Smooth cinematic parting transition before switching scene
    setTimeout(() => {
      onDisperse();
    }, 1200);
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Background pixel sunset sky */}
      <div
        className="absolute inset-0 bg-cover bg-center pixelated scale-105 filter brightness-95"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.dreamyClouds})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 via-amber-950/20 to-purple-950/40 backdrop-blur-[0.5px]" />

      {/* Floating Center Clouds that part smoothly */}
      {/* Left Cloud Cluster */}
      <motion.div
        animate={isParting ? { x: '-120%', opacity: 0, scale: 0.9 } : { x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[-10%] sm:left-[-5%] top-[20%] w-[65vw] max-w-[500px] pointer-events-none z-10"
      >
        <img
          src={ASSETS.decorations.cloud1}
          alt=""
          className="w-full drop-shadow-2xl animate-cute-bounce opacity-95"
          style={{ animationDuration: '6s' }}
        />
      </motion.div>

      {/* Right Cloud Cluster */}
      <motion.div
        animate={isParting ? { x: '120%', opacity: 0, scale: 0.9 } : { x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-10%] sm:right-[-5%] top-[35%] w-[70vw] max-w-[520px] pointer-events-none z-10"
      >
        <img
          src={ASSETS.decorations.cloud2}
          alt=""
          className="w-full drop-shadow-2xl animate-cute-bounce opacity-95"
          style={{ animationDuration: '7s', animationDelay: '1s' }}
        />
      </motion.div>

      {/* Center Interactive Cloud & Message Prompt */}
      <motion.div
        animate={isParting ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        onClick={handleInteraction}
        className="relative z-20 flex flex-col items-center cursor-pointer group px-6 py-8 rounded-3xl"
      >
        {/* Soft Dreamy Card */}
        <div className="relative px-8 py-7 sm:px-12 sm:py-9 bg-stone-900/60 backdrop-blur-md border-2 border-amber-300/40 rounded-3xl shadow-2xl text-center max-w-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 border border-amber-300/30 rounded-full text-amber-200 text-xs sm:text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>A little surprise</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-amber-100 tracking-tight drop-shadow-md mb-3 font-pixel">
            Heyyy, someone has something for you...
          </h1>

          <p className="text-amber-200/80 text-sm sm:text-base mb-6 font-light">
            Behind these cloudy skies lies a special message just for you.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg group-hover:from-amber-400 group-hover:to-rose-400 transition-all border border-amber-200/40">
            <span>Tap the clouds to reveal</span>
            <span className="text-lg animate-bounce">✨</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
