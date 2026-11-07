import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ASSETS, type CharacterEmotion } from '../config/assets';
import { PixelCharacter } from './PixelCharacter';
import { DialogueBox } from './DialogueBox';

interface CharacterEntranceProps {
  onDialogueComplete: () => void;
}

const DIALOGUES: { text: string; emotion: CharacterEmotion }[] = [
  {
    text: 'HEYYYY KUCHUUUU PUCHUUUU!!',
    emotion: 'greeting', // Top 5 (waving hello)
  },
  {
    text: 'Okay okay, before you say anything... let me speak first. 🥺',
    emotion: 'explaining', // Top 3 (speaking / explaining)
  },
  {
    text: "I know I've been a little silly these past few days.",
    emotion: 'confused', // Bottom 4 (shrugging / bashful / confused)
  },
  {
    text: 'Sometimes I mess things up, and I might not always understand things immediately.',
    emotion: 'embarrassed', // Top 4 (embarrassed / hands on cheeks)
  },
  {
    text: 'But I never want a small argument to make you forget how much I love you.',
    emotion: 'affectionate', // Bottom 6 (welcoming / affectionate open arms)
  },
  {
    text: "I'm genuinely sorry, babyyyy.",
    emotion: 'determined', // Bottom 2 (earnest / sincere)
  },
  {
    text: 'Can your idiot get a little forgiveness?',
    emotion: 'thumbsUp', // Bottom 1 (hopeful double thumbs up)
  },
];

export const CharacterEntrance: React.FC<CharacterEntranceProps> = ({ onDialogueComplete }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Character entrance animation sequence:
  // Starts running from the path towards the foreground
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 2400); // 2.4s entrance run

    return () => clearTimeout(timer);
  }, []);

  const handleNextDialogue = () => {
    if (dialogueIndex < DIALOGUES.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      // Completed all dialogues, proceed to decision scene
      onDialogueComplete();
    }
  };

  const currentEmotion: CharacterEmotion = !hasEntered
    ? 'walking'
    : DIALOGUES[dialogueIndex].emotion;

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between items-center select-none pb-6">
      {/* Background walking path scene */}
      <div
        className="absolute inset-0 bg-cover bg-center pixelated scale-100"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.walkingPath})` }}
      />
      <div className="absolute inset-0 bg-stone-900/25 pointer-events-none" />

      {/* Top spacer */}
      <div className="h-10 sm:h-16" />

      {/* Pixel Character Stage */}
      <div className="relative z-20 flex-1 flex items-end justify-center w-full pb-8 sm:pb-12">
        <motion.div
          initial={{ x: '120vw', y: 40, scale: 0.7 }}
          animate={{ x: 0, y: 0, scale: 1 }}
          transition={{
            duration: 2.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex flex-col items-center"
        >
          {/* Restored Original Pixel Thought Cloud */}
          {hasEntered && (
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
                {/* Text centered inside the upper main cloud body */}
                <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[34%] flex items-center justify-center p-2 text-center">
                  <p className="font-pixel text-stone-900 text-xs sm:text-sm font-bold leading-tight select-none">
                    {DIALOGUES[dialogueIndex].text}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <PixelCharacter
            emotion={currentEmotion}
          />
        </motion.div>
      </div>

      {/* Dialogue System (revealed once character arrives) */}
      <div className="w-full relative z-30 min-h-[140px] flex items-center justify-center">
        {hasEntered && (
          <DialogueBox
            text={DIALOGUES[dialogueIndex].text}
            onNext={handleNextDialogue}
            nextButtonText={dialogueIndex === DIALOGUES.length - 1 ? 'Answer him 💬' : 'Next ❯'}
          />
        )}
      </div>
    </div>
  );
};
