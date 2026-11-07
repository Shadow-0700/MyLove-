import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw } from 'lucide-react';
import { ASSETS, type CharacterEmotion } from '../config/assets';
import { PixelCharacter } from './PixelCharacter';
import { DialogueBox } from './DialogueBox';
import { audioManager } from '../utils/audio';

interface CelebrationSceneProps {
  onReplay: () => void;
}

const CELEBRATION_DIALOGUES: { text: string; emotion: CharacterEmotion }[] = [
  {
    text: 'YAYYYYYYYYY!!! 🎉',
    emotion: 'celebrating', // Top 1: fists raised celebration
  },
  {
    text: 'MY KUCHUUUU FORGAVE ME!!! 😭❤️',
    emotion: 'jumping', // Top 6: jumping high with joy
  },
  {
    text: 'I LOVE YOUUUUU SO MUCHHHH!! ✨',
    emotion: 'clapping', // Bottom 3: clapping with joy
  },
  {
    text: 'MWAHHHHHHHH 💋❤️',
    emotion: 'affectionate', // Bottom 6: affectionate open arms
  },
];

const CELEBRATION_ROTATION: CharacterEmotion[] = [
  'celebrating',
  'jumping',
  'clapping',
  'thumbsUp',
  'playful',
];

export const CelebrationScene: React.FC<CelebrationSceneProps> = ({ onReplay }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [characterSide, setCharacterSide] = useState<'left' | 'right' | 'center'>('center');
  const [showFinalCard, setShowFinalCard] = useState(false);
  const [rotationIdx, setRotationIdx] = useState(0);

  // Trigger celebration audio and confetti showers
  useEffect(() => {
    audioManager.playCelebration(ASSETS.sounds.celebrationMusic);

    // Initial big confetti blast
    const count = 150;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7'],
    };

    confetti({
      ...defaults,
      particleCount: count,
      spread: 70,
    });

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fbbf24', '#ec4899'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#a855f7', '#fbbf24'],
      });
    }, 1800);

    // Character playful dance left-right loop & emotion cycling
    const danceInterval = setInterval(() => {
      setCharacterSide((prev) => (prev === 'center' ? 'left' : prev === 'left' ? 'right' : 'center'));
      setRotationIdx((prev) => (prev + 1) % CELEBRATION_ROTATION.length);
    }, 1400);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(danceInterval);
    };
  }, []);

  const handleNextDialogue = () => {
    if (dialogueIndex < CELEBRATION_DIALOGUES.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      setShowFinalCard(true);
    }
  };

  const currentEmotion: CharacterEmotion = !showFinalCard
    ? CELEBRATION_DIALOGUES[dialogueIndex].emotion
    : CELEBRATION_ROTATION[rotationIdx];

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between items-center select-none pb-6">
      {/* Radiant Bright & Warm Sunset Sky Background */}
      <div
        className="absolute inset-0 bg-cover bg-center pixelated filter brightness-110 saturate-125 transition-all duration-1000"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.celebrationSky || ASSETS.backgrounds.dreamyClouds})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 via-amber-900/10 to-rose-900/20 pointer-events-none" />

      {/* Floating Balloons upward */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {[10, 25, 45, 65, 85].map((left, idx) => (
          <motion.div
            key={idx}
            initial={{ y: '110vh', opacity: 0.9 }}
            animate={{ y: '-20vh', opacity: 1 }}
            transition={{
              duration: 7 + idx * 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: idx * 1.2,
            }}
            className="absolute"
            style={{ left: `${left}%` }}
          >
            <img
              src={ASSETS.effects.balloon}
              alt=""
              className="w-12 h-auto pixelated drop-shadow-lg"
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Kisses & Hearts near character */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 z-20 flex gap-12">
        <motion.div
          animate={{ y: [-10, -40, -10], opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          💋
        </motion.div>
        <motion.div
          animate={{ y: [-20, -50, -20], opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.5 }}
          className="text-4xl"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{ y: [-15, -45, -15], opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}
          className="text-3xl"
        >
          💋
        </motion.div>
      </div>

      {/* Top spacer */}
      <div className="h-10 sm:h-14" />

      {/* Jumping & Dancing Pixel Character */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-end pb-8 w-full max-w-md">
        <motion.div
          animate={{
            x: characterSide === 'left' ? -70 : characterSide === 'right' ? 70 : 0,
            y: [0, -20, 0],
          }}
          transition={{
            x: { duration: 0.8, ease: 'easeInOut' },
            y: { duration: 0.45, repeat: Infinity, ease: 'easeOut' },
          }}
          className="flex flex-col items-center"
        >
          <PixelCharacter
            emotion={currentEmotion}
            isFlipped={characterSide === 'left'}
          />
        </motion.div>
      </div>

      {/* Bottom Area: Dialogue or Final Message Card */}
      <div className="w-full relative z-30 min-h-[170px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!showFinalCard ? (
            <DialogueBox
              key="celebration-dialogue"
              speakerName="Your Happiest Idiot 🥰"
              text={CELEBRATION_DIALOGUES[dialogueIndex].text}
              onNext={handleNextDialogue}
              nextButtonText={dialogueIndex === CELEBRATION_DIALOGUES.length - 1 ? 'Forever ❤️' : 'Next ❯'}
            />
          ) : (
            /* Final romantic climax love card */
            <motion.div
              key="final-card"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 18 }}
              className="w-full max-w-lg bg-[#27102e]/95 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md flex flex-col items-center"
              style={{
                boxShadow: '0 0 30px rgba(244, 63, 94, 0.4), inset 0 0 20px rgba(245, 158, 11, 0.2)',
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/30 border border-rose-400 rounded-full text-rose-200 text-xs font-pixel mb-4">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>My Promise</span>
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              </div>

              <h2 className="text-xl sm:text-3xl font-bold text-amber-100 font-pixel leading-snug drop-shadow-md mb-6">
                "You're my favourite person, my little happiness, and my kuchuu puchuu forever."
              </h2>

              <p className="text-amber-200/80 text-sm sm:text-base font-handwriting mb-6">
                Thank you for your love, your patience, and your big heart. Mwahhh! 💋
              </p>

              {/* Replay Button */}
              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold font-pixel text-base sm:text-lg rounded-2xl shadow-xl border-2 border-amber-300 transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Experience Story Again ↺</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
