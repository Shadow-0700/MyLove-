import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { audioManager } from '../utils/audio';

interface DialogueBoxProps {
  speakerName?: string;
  text: string;
  onNext?: () => void;
  showNextButton?: boolean;
  nextButtonText?: string;
  avatarSrc?: string;
  avatarMood?: 'happy' | 'pleading' | 'excited' | 'tender';
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speakerName = 'Your Idiot ❤️',
  text,
  onNext,
  showNextButton = true,
  nextButtonText = 'Next',
  avatarSrc = ASSETS.portraits.framedBoyfriend,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        if (index % 2 === 0) {
          audioManager.playBlip();
        }
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [text]);

  const handleSkipOrNext = () => {
    if (isTyping) {
      // Complete text instantly
      setDisplayedText(text);
      setIsTyping(false);
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto px-4 z-30"
    >
      <div
        onClick={handleSkipOrNext}
        className="relative bg-gradient-to-b from-[#2b162f]/95 via-[#231227]/95 to-[#1a0c1e]/95 border-4 border-[#d97706] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md cursor-pointer hover:border-amber-400 transition-colors duration-200"
        style={{
          boxShadow: '0 0 0 2px #78350f, 0 10px 30px rgba(0,0,0,0.6), inset 0 0 15px rgba(245, 158, 11, 0.15)',
        }}
      >
        {/* Name Tag */}
        <div className="absolute -top-4 left-6 px-3.5 py-1 bg-gradient-to-r from-amber-600 to-amber-700 border-2 border-amber-300 rounded-lg text-amber-50 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 font-pixel">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>{speakerName}</span>
        </div>

        <div className="flex items-start gap-3 sm:gap-4 mt-2">
          {/* Pixel Avatar Frame */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md bg-stone-900 relative">
              <img
                src={avatarSrc}
                alt={speakerName}
                className="w-full h-full object-cover pixelated scale-110"
                onError={(e) => {
                  // Fallback to idle sprite if image isn't available
                  (e.currentTarget as HTMLImageElement).src = ASSETS.character.idle;
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 text-sm bg-rose-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
              ❤️
            </div>
          </div>

          {/* Dialogue Text Content */}
          <div className="flex-1 min-h-[70px] sm:min-h-[85px] flex flex-col justify-between">
            <p className="text-stone-100 text-lg sm:text-2xl font-pixel leading-relaxed tracking-wide select-none">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
              )}
            </p>

            {/* Next Action Indicator */}
            {showNextButton && (
              <div className="flex justify-end items-center mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkipOrNext();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/50 rounded-full text-amber-300 text-xs sm:text-sm font-pixel font-bold tracking-wider hover:text-white transition-all active:scale-95 animate-cute-bounce"
                >
                  <span>{isTyping ? 'Fast-Forward' : nextButtonText}</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
