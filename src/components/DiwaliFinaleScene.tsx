import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Mail } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { PixelCharacter } from './PixelCharacter';
import { DialogueBox } from './DialogueBox';
import { audioManager } from '../utils/audio';

interface DiwaliFinaleSceneProps {
  onRevisitLetter: () => void;
  onReplay: () => void;
}

type FinaleStep =
  | 'surprise'
  | 'her_arrival'
  | 'holding_hands'
  | 'hug'
  | 'diwali_fuljhadi'
  | 'forehead_kiss'
  | 'review';

export const DiwaliFinaleScene: React.FC<DiwaliFinaleSceneProps> = ({
  onRevisitLetter,
  onReplay,
}) => {
  const [step, setStep] = useState<FinaleStep>('surprise');
  const [isFadingOutKiss, setIsFadingOutKiss] = useState(false);

  // Trigger continuous festive fireworks during Diwali & Forehead Kiss steps
  useEffect(() => {
    if (step === 'diwali_fuljhadi' || step === 'forehead_kiss') {
      audioManager.playCelebration(ASSETS.sounds.celebrationMusic);

      const fireworkInterval = setInterval(() => {
        // Left firework
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#38bdf8', '#a855f7'],
        });
        // Right firework
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#ec4899', '#fbbf24', '#10b981', '#f97316'],
        });
      }, 1600);

      return () => clearInterval(fireworkInterval);
    }
  }, [step]);

  // When forehead kiss step is reached, hold for a few moments, then cinematic fade to review
  useEffect(() => {
    if (step === 'forehead_kiss') {
      const timer = setTimeout(() => {
        setIsFadingOutKiss(true);
        setTimeout(() => {
          setStep('review');
        }, 1800); // 1.8s gradual zoom-out & fade away
      }, 7000); // Hold final scene for 7s

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-between items-center select-none pb-6">
      {/* Dynamic Background */}
      {/* Autumn landscape for surprise & her arrival */}
      {(step === 'surprise' || step === 'her_arrival') && (
        <div
          className="absolute inset-0 bg-cover bg-center pixelated transition-all duration-700"
          style={{ backgroundImage: `url(${ASSETS.backgrounds.walkingPath})` }}
        />
      )}

      {/* Warm Diwali Night Sky for holding hands, hug, fuljhadi & forehead kiss */}
      {(step !== 'surprise' && step !== 'her_arrival') && (
        <div
          className="absolute inset-0 bg-cover bg-center pixelated transition-all duration-1000 filter brightness-95"
          style={{
            backgroundImage: `url(${ASSETS.backgrounds.celebrationSky || ASSETS.backgrounds.dreamyClouds})`,
          }}
        />
      )}

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-amber-950/20 to-purple-950/40 pointer-events-none" />

      {/* Glowing Diyas during Diwali celebrations */}
      {(step === 'diwali_fuljhadi' || step === 'forehead_kiss') && (
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-30 flex justify-between px-4 sm:px-12 items-end">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="animate-flame-flicker"
              style={{ animationDelay: `${i * 350}ms` }}
            >
              <img
                src={ASSETS.decorations.diya}
                alt="Glowing Diya"
                className="w-10 sm:w-14 h-auto pixelated drop-shadow-xl"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Top spacer */}
      <div className="h-8 sm:h-12" />

      {/* Main Story Visual Stage */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4">
        <AnimatePresence mode="wait">
          {/* STEP 1: Surprise — "Waittt... someone is here! 👀" */}
          {step === 'surprise' && (
            <motion.div
              key="step-surprise"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-end h-full pb-8"
            >
              {/* Thought cloud */}
              <div
                className="relative w-[215px] sm:w-[260px] mb-2 animate-cute-bounce select-none pointer-events-none"
                style={{ animationDuration: '3.5s' }}
              >
                <img
                  src={ASSETS.decorations.thoughtCloud}
                  alt="Thought Cloud"
                  className="w-full h-auto pixelated drop-shadow-md select-none pointer-events-none"
                />
                <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[34%] flex items-center justify-center p-2 text-center">
                  <p className="font-pixel text-stone-900 text-xs sm:text-sm font-bold leading-tight select-none">
                    Waittt... someone is here! 👀
                  </p>
                </div>
              </div>

              <PixelCharacter emotion="playful" />
            </motion.div>
          )}

          {/* STEP 2: Her Arrival — Solo Girlfriend enters */}
          {step === 'her_arrival' && (
            <motion.div
              key="step-her-arrival"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-center gap-6 sm:gap-10 pb-8 h-full"
            >
              {/* Boyfriend looking affectionately */}
              <div className="flex flex-col items-center">
                <div
                  className="relative w-[190px] sm:w-[230px] mb-2 animate-cute-bounce select-none pointer-events-none"
                  style={{ animationDuration: '3.5s' }}
                >
                  <img
                    src={ASSETS.decorations.thoughtCloud}
                    alt="Thought Cloud"
                    className="w-full h-auto pixelated drop-shadow-md"
                  />
                  <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[34%] flex items-center justify-center p-2 text-center">
                    <p className="font-pixel text-stone-900 text-xs font-bold leading-tight select-none">
                      My favourite girl... 🥰❤️
                    </p>
                  </div>
                </div>
                <PixelCharacter emotion="affectionate" />
              </div>

              {/* Girlfriend entering with gentle slide & bounce */}
              <motion.div
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="flex flex-col items-center animate-cute-bounce"
                style={{ animationDuration: '4s' }}
              >
                {/* Floating hearts above her */}
                <div className="text-xl sm:text-2xl mb-1 animate-pulse">💕✨</div>
                <div className="relative">
                  {/* Subtle ground shadow */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-stone-950/35 rounded-full blur-[2px] pointer-events-none" />
                  <img
                    src={ASSETS.story.girlfriendSolo}
                    alt="Her pixel-art character"
                    className="h-[235px] sm:h-[265px] w-auto object-contain pixelated drop-shadow-md"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 3: Holding Hands (Image A, Panel 3) */}
          {step === 'holding_hands' && (
            <motion.div
              key="step-holding-hands"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center max-w-md text-center"
            >
              <img
                src={ASSETS.story.panelHoldingHands}
                alt="Holding hands"
                className="max-h-[300px] sm:max-h-[340px] w-auto object-contain pixelated drop-shadow-md animate-cute-bounce select-none pointer-events-none"
                style={{ animationDuration: '4.5s' }}
              />
            </motion.div>
          )}

          {/* STEP 4: Our Hug (Image A, Panel 4) */}
          {step === 'hug' && (
            <motion.div
              key="step-hug"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center max-w-md text-center"
            >
              <img
                src={ASSETS.story.panelHug}
                alt="Hugging tightly"
                className="max-h-[300px] sm:max-h-[340px] w-auto object-contain pixelated drop-shadow-md animate-cute-bounce select-none pointer-events-none"
                style={{ animationDuration: '4s' }}
              />
            </motion.div>
          )}

          {/* STEP 5: Diwali Celebration with Fuljhadi (Image A, Panel 2) */}
          {step === 'diwali_fuljhadi' && (
            <motion.div
              key="step-fuljhadi"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center max-w-lg text-center"
            >
              <img
                src={ASSETS.story.panelFuljhadi}
                alt="Celebrating Diwali with Fuljhadi"
                className="max-h-[290px] sm:max-h-[330px] w-auto object-contain pixelated drop-shadow-lg animate-cute-bounce select-none pointer-events-none"
                style={{ animationDuration: '3.5s' }}
              />
            </motion.div>
          )}

          {/* STEP 6: Final Forehead Kiss & Cinematic HAPPY DIWALI Title (Image A, Panel 1) */}
          {step === 'forehead_kiss' && (
            <motion.div
              key="step-forehead-kiss"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                isFadingOutKiss
                  ? { opacity: 0, scale: 0.88, filter: 'blur(4px)' }
                  : { opacity: 1, scale: 1.04 }
              }
              transition={{
                duration: isFadingOutKiss ? 1.6 : 1.2,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center justify-center text-center max-w-xl"
            >
              <img
                src={ASSETS.story.panelForeheadKiss}
                alt="Forehead kiss"
                className="max-h-[280px] sm:max-h-[330px] w-auto object-contain pixelated drop-shadow-xl select-none pointer-events-none"
              />

              {/* Large Cinematic HAPPY DIWALI MERI JAAN Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-4 px-2"
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-pixel tracking-wider text-amber-200 glow-diwali-title drop-shadow-2xl uppercase">
                  HAPPY DIWALI MERI JAAN ❤️
                </h1>
                <p className="text-amber-300/90 text-sm sm:text-base font-handwriting mt-1 tracking-wide">
                  May our lives always be full of love and light ✨
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 7: Review the Journey Final Card */}
          {step === 'review' && (
            <motion.div
              key="step-review"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
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

              <div className="font-pixel text-center leading-relaxed drop-shadow-md mb-6 space-y-2">
                <p className="text-base sm:text-xl font-bold text-amber-100">
                  "Meri jaan ho tum babbyyy,
                </p>
                <p className="text-base sm:text-xl font-bold text-amber-100">
                  Tum hi saans ho, tum hi praan hooo,
                </p>
                <p className="text-base sm:text-xl font-bold text-amber-100">
                  Meri subeh bhi tum hi,
                </p>
                <p className="text-lg sm:text-2xl font-bold text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]">
                  Tum hi meri shaam hooo heheh! ❤️"
                </p>
              </div>

              <p className="text-amber-200/80 text-sm sm:text-base font-handwriting mb-6">
                Thank you for your love, your patience, and your big heart. Mwahhh! 💋
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                <button
                  type="button"
                  onClick={onReplay}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold font-pixel text-sm sm:text-base rounded-2xl shadow-xl border-2 border-amber-300 transition-all active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Experience Story Again ↺</span>
                </button>

                <button
                  type="button"
                  onClick={onRevisitLetter}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800/90 hover:bg-stone-700 text-amber-200 font-pixel text-sm sm:text-base rounded-2xl border border-stone-600 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span>Revisit Love Letter 💌</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls / Dialogue Bar */}
      {step !== 'review' && step !== 'forehead_kiss' && (
        <div className="w-full relative z-30 min-h-[120px] flex items-center justify-center px-4">
          {step === 'surprise' && (
            <DialogueBox
              speakerName="Your Idiot 👀"
              text="Waittt... someone is here! 👀"
              onNext={() => setStep('her_arrival')}
              nextButtonText="Look who's here ❯"
            />
          )}

          {step === 'her_arrival' && (
            <DialogueBox
              speakerName="Your Idiot 🥰"
              text="Hehehe... look who decided to show up! My prettiest girl! ❤️"
              onNext={() => setStep('holding_hands')}
              nextButtonText="Take her hand ❤️ ❯"
            />
          )}

          {step === 'holding_hands' && (
            <DialogueBox
              speakerName="Together Always ❤️"
              text="Holding your hand is where I belong, today and every day. ✨"
              onNext={() => setStep('hug')}
              nextButtonText="Hold her close 🤗 ❯"
            />
          )}

          {step === 'hug' && (
            <DialogueBox
              speakerName="Our Warm Hug 🤗"
              text="Safe in your arms... I'm so lucky to have you in my life. ❤️"
              onNext={() => setStep('diwali_fuljhadi')}
              nextButtonText="Celebrate Diwali! 🪔✨ ❯"
            />
          )}

          {step === 'diwali_fuljhadi' && (
            <DialogueBox
              speakerName="Diwali Celebration 🪔"
              text="Lighting up fuljhadis and celebrating our happiness together! ✨"
              onNext={() => setStep('forehead_kiss')}
              nextButtonText="Our special moment 💖 ❯"
            />
          )}
        </div>
      )}
    </div>
  );
};
