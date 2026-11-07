import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Bell } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { audioManager } from '../utils/audio';

interface LoveLetterProps {
  onContinue: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    // Play notification sound
    audioManager.playLetterNotification(ASSETS.sounds.letterAppear);
    setShowToast(true);

    setTimeout(() => {
      audioManager.playEnvelopeOpen(ASSETS.sounds.envelopeOpen);
      setIsOpen(true);
    }, 600);

    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center pixelated filter brightness-90"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.dreamyClouds})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-amber-950/40 to-stone-950/70 backdrop-blur-[1px]" />

      {/* Cute Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-8 z-50 px-5 py-3 bg-amber-500/90 text-amber-950 font-bold rounded-2xl border-2 border-amber-200 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-sm sm:text-base animate-bounce"
          >
            <Bell className="w-5 h-5 text-amber-950 fill-amber-950" />
            <span>You've got something special waiting for you! 💌</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Envelope View */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            onClick={handleOpenEnvelope}
            className="relative z-20 flex flex-col items-center cursor-pointer group"
          >
            {/* Pulsing Aura */}
            <div className="absolute -inset-4 rounded-3xl bg-amber-400/20 blur-xl group-hover:bg-rose-400/30 transition-all duration-500" />

            <div className="relative animate-cute-bounce" style={{ animationDuration: '3.5s' }}>
              <div className="w-56 sm:w-72 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                <img
                  src={ASSETS.decorations.envelope}
                  alt="Love letter envelope"
                  className="w-full h-auto drop-shadow-xl select-none pointer-events-none"
                />
              </div>

              {/* Little Sparkles around envelope */}
              <div
                className="absolute -top-3 -right-3 text-amber-300 animate-spin"
                style={{ animationDuration: '6s' }}
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-2 -left-2 text-rose-400 animate-pulse">
                <Heart className="w-5 h-5 fill-rose-400" />
              </div>
            </div>

            <div className="mt-8 px-6 py-2 rounded-full bg-stone-900/70 border border-amber-300/40 text-amber-200 text-sm font-pixel font-bold tracking-wider group-hover:bg-amber-600/60 group-hover:text-white transition-all shadow-lg flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Click the envelope to open 💌</span>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Parchment Letter View */
          <motion.div
            key="unfolded-letter"
            initial={{ scale: 0.7, opacity: 0, rotateX: 30 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="relative z-20 w-full max-w-xl mx-auto px-4 max-h-[85vh] flex flex-col justify-between"
          >
            {/* Parchment Container */}
            <div
              className="bg-[#fef9ee] text-stone-800 p-6 sm:p-8 rounded-2xl shadow-2xl border-4 border-[#e6b87d] relative overflow-hidden flex flex-col max-h-[75vh]"
              style={{
                backgroundImage: 'radial-gradient(#f7e8ce 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(217, 119, 6, 0.1)',
              }}
            >
              {/* Decorative Corner Seals */}
              <div className="absolute top-2 left-2 text-amber-700/30 text-xs">❦</div>
              <div className="absolute top-2 right-2 text-amber-700/30 text-xs">❦</div>
              <div className="absolute bottom-2 left-2 text-amber-700/30 text-xs">❦</div>
              <div className="absolute bottom-2 right-2 text-amber-700/30 text-xs">❦</div>

              {/* Scrollable Letter Body */}
              <div className="overflow-y-auto pr-2 space-y-3.5 text-base sm:text-lg leading-relaxed font-handwriting select-text max-h-[58vh]">
                <div className="flex items-center justify-between border-b border-amber-300/60 pb-2 mb-3">
                  <h2 className="text-lg sm:text-2xl font-bold text-amber-900 tracking-wide font-pixel flex items-center gap-1.5">
                    <span>Hello meriii jannnn...</span>
                    <span className="text-rose-600">❤️</span>
                  </h2>
                  <span className="text-xs text-amber-800 font-pixel bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-300/80 shadow-sm">
                    From my heart 💌
                  </span>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-stone-800"
                >
                  Maine socha bebbuu ki hum logon ne bachpan mein games bahut khele purani theme waale, toh kyun na ek website banayi jaaye hehehee, jisme purani emotions ke saath thodi story bhi ho aur interactive bhi heheh! 🥹
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-amber-950 font-medium"
                >
                  Toh wahaan se ye idea aaya!
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-stone-800"
                >
                  Bebbbuuu zyada mai creative hun nhii, toh yahi socha ki kuch bana lun hehehee! 🥹❤️
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="text-stone-800"
                >
                  Maine bubbuuu tumhari photo bhi use kar li bas, kyunki tumhara design bhi toh chahiye tha babbyyy! Sorry uske liyeee hehehee, warna main adhura lagta na isme! 😂❤️
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="text-stone-800"
                >
                  Mai jaanta hoon babbyyy, 2-3 dino se hum logon ki ekdum lagataar ladai hui jaa rahi hai. Na-na chahte hue bhi kuch kaaranon ki wajah se ho hi jaa raha hai.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                  className="text-rose-700 font-bold text-lg sm:text-xl font-handwriting drop-shadow-sm py-1"
                >
                  But love youuu meri goluuu poluuu! Tum meri jaan ho hehehee! 🥹❤️
                </motion.p>

                {/* Final Festive Diwali Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                  className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-rose-100/90 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] text-center relative overflow-hidden"
                >
                  <div className="text-lg sm:text-2xl font-bold font-pixel text-amber-950 tracking-wide drop-shadow-sm flex items-center justify-center gap-2">
                    <span>🪔</span>
                    <span className="text-rose-700">Happy Diwali meri jaannn!</span>
                    <span>✨</span>
                  </div>
                  <p className="text-stone-800 font-handwriting text-base sm:text-lg mt-2">
                    Ye Diwali tumhari best Diwali ho babbyyy, aur jo tum chaho woh tumhe mileee! Hehehe! ❤️
                  </p>
                </motion.div>
              </div>

              {/* Continue Button */}
              <div className="mt-5 pt-3 border-t-2 border-dashed border-amber-400/60 flex justify-end">
                <button
                  type="button"
                  onClick={onContinue}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-lg border border-amber-200/50 transition-all active:scale-95 text-base sm:text-lg cursor-pointer"
                >
                  <span>Listen to what he has to say...</span>
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
