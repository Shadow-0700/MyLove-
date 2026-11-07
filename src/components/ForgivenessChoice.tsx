import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCcw, Mail } from 'lucide-react';
import { ASSETS, type CharacterEmotion } from '../config/assets';
import { PixelCharacter } from './PixelCharacter';
import { DialogueBox } from './DialogueBox';

interface ForgivenessChoiceProps {
  onForgive: () => void;
  onRevisitLetter: () => void;
}

const NOT_YET_DIALOGUES: { text: string; emotion: CharacterEmotion }[] = [
  {
    text: "It's okay, kuchuu. Take your time.",
    emotion: 'confused', // shrugging / understanding patiently
  },
  {
    text: "I'll always be ready to listen.",
    emotion: 'embarrassed', // tender / hands on cheeks
  },
  {
    text: "You don't have to forgive me immediately. ❤️",
    emotion: 'affectionate', // affectionate open arms
  },
];

export const ForgivenessChoice: React.FC<ForgivenessChoiceProps> = ({
  onForgive,
  onRevisitLetter,
}) => {
  const [choseNotYet, setChoseNotYet] = useState(false);
  const [sadDialogueIndex, setSadDialogueIndex] = useState(0);

  const handleNotYet = () => {
    setChoseNotYet(true);
    setSadDialogueIndex(0);
  };

  const handleResetDecision = () => {
    setChoseNotYet(false);
  };

  const handleNextSadDialogue = () => {
    if (sadDialogueIndex < NOT_YET_DIALOGUES.length - 1) {
      setSadDialogueIndex((prev) => prev + 1);
    }
  };

  const currentEmotion: CharacterEmotion = choseNotYet
    ? NOT_YET_DIALOGUES[sadDialogueIndex].emotion
    : 'thumbsUp';

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between items-center select-none pb-6">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center pixelated"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.walkingPath})` }}
      />
      <div className="absolute inset-0 bg-stone-900/30 pointer-events-none" />

      {/* Top spacer */}
      <div className="h-10 sm:h-14" />

      {/* Pixel Character Stage */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-end pb-8">
        <div className="relative flex flex-col items-center">
          {choseNotYet && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-[160px] sm:-top-[190px] left-[15px] sm:left-[35px] w-[215px] sm:w-[260px] z-30 pointer-events-none select-none animate-cute-bounce"
              style={{ animationDuration: '4s' }}
            >
              <div className="relative w-full">
                <img
                  src={ASSETS.decorations.thoughtCloud}
                  alt="Thought Cloud"
                  className="w-full h-auto pixelated drop-shadow-md select-none pointer-events-none"
                  draggable={false}
                />
                <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[34%] flex items-center justify-center p-2 text-center">
                  <p className="font-pixel text-stone-900 text-xs sm:text-sm font-bold leading-tight select-none">
                    {NOT_YET_DIALOGUES[sadDialogueIndex].text}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <PixelCharacter
            emotion={currentEmotion}
          />
        </div>
      </div>

      {/* Decision or Sad Sequence Area */}
      <div className="w-full relative z-30 min-h-[160px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!choseNotYet ? (
            /* Two Big Interactive Choices */
            <motion.div
              key="decision-buttons"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg bg-[#24132b]/95 border-4 border-amber-500/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col items-center gap-5"
            >
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-pixel">
                  Decision Time
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-100 font-pixel mt-1">
                  What does your heart say?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Option A: I forgive you */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onForgive}
                  className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-rose-600 hover:from-emerald-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-xl border-2 border-amber-300 flex items-center justify-center gap-3 text-lg font-pixel tracking-wide cursor-pointer group"
                >
                  <Heart className="w-5 h-5 fill-rose-200 text-rose-200 group-hover:animate-ping" />
                  <span>I forgive you ❤️</span>
                </motion.button>

                {/* Option B: Not yet */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNotYet}
                  className="px-6 py-4 bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 font-medium rounded-xl shadow-lg border-2 border-stone-600 flex items-center justify-center gap-2 text-lg font-pixel tracking-wide cursor-pointer"
                >
                  <span>Not yet 🥺</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Not Yet Branch Dialogue & Return Options */
            <motion.div
              key="sad-dialogue"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-xl flex flex-col items-center gap-3"
            >
              <DialogueBox
                text={NOT_YET_DIALOGUES[sadDialogueIndex].text}
                onNext={handleNextSadDialogue}
                showNextButton={sadDialogueIndex < NOT_YET_DIALOGUES.length - 1}
                nextButtonText="Next ❯"
              />

              {/* Action buttons allowing her to return to decision or read letter again */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleResetDecision}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/80 hover:bg-amber-500 text-white font-pixel text-sm rounded-xl border border-amber-300 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>Think about it again</span>
                </button>

                <button
                  type="button"
                  onClick={onRevisitLetter}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/90 hover:bg-stone-700 text-amber-200 font-pixel text-sm rounded-xl border border-stone-600 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>Revisit the love letter</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
