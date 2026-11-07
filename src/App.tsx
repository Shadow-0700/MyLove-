import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CloudIntro } from './components/CloudIntro';
import { LoveLetter } from './components/LoveLetter';
import { CharacterEntrance } from './components/CharacterEntrance';
import { DiwaliFinaleScene } from './components/DiwaliFinaleScene';
import { FloatingEffects } from './components/FloatingEffects';
import { AudioController } from './components/AudioController';

export type Scene = 'intro' | 'letter' | 'entrance' | 'finale';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const crtEnabled = true;

  const handleCloudDisperse = () => {
    setCurrentScene('letter');
  };

  const handleLetterContinue = () => {
    setCurrentScene('entrance');
  };

  const handleDialogueComplete = () => {
    setCurrentScene('finale');
  };

  const handleRevisitLetter = () => {
    setCurrentScene('letter');
  };

  const handleReplay = () => {
    setCurrentScene('intro');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#180e22] text-amber-50 select-none flex items-center justify-center">
      {/* Floating Sparkles & Hearts across all scenes */}
      <FloatingEffects intensity={currentScene === 'finale' ? 'celebration' : 'normal'} />

      {/* Top Controls: Audio */}
      <AudioController />

      {/* Main Canvas Frame with Vintage Storybook / Game Bezel Border */}
      <div className="relative w-full h-full max-w-[1200px] max-h-[900px] sm:m-4 sm:rounded-3xl overflow-hidden shadow-2xl border-0 sm:border-4 sm:border-[#522b2b] flex flex-col justify-center items-center">
        {/* Scene Container with Cinematic Crossfades */}
        <AnimatePresence mode="wait">
          {currentScene === 'intro' && (
            <motion.div
              key="scene-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <CloudIntro onDisperse={handleCloudDisperse} />
            </motion.div>
          )}

          {currentScene === 'letter' && (
            <motion.div
              key="scene-letter"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <LoveLetter onContinue={handleLetterContinue} />
            </motion.div>
          )}

          {currentScene === 'entrance' && (
            <motion.div
              key="scene-entrance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <CharacterEntrance onDialogueComplete={handleDialogueComplete} />
            </motion.div>
          )}

          {currentScene === 'finale' && (
            <motion.div
              key="scene-finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <DiwaliFinaleScene
                onRevisitLetter={handleRevisitLetter}
                onReplay={handleReplay}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CRT Scanline & Curved Glass vignette overlay (Toggleable) */}
        {crtEnabled && (
          <div className="absolute inset-0 crt-overlay pointer-events-none z-40 rounded-none sm:rounded-3xl" />
        )}

        {/* Vintage Pixel Screen Vignette border */}
        <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
};

export default App;
