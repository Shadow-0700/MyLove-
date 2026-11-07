import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

export const AudioController: React.FC = () => {
  const [muted, setMuted] = useState(audioManager.getMuted());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((isMuted) => {
      setMuted(isMuted);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    audioManager.toggleMute();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-950/70 hover:bg-amber-900/80 text-amber-200 border-2 border-amber-600/50 shadow-lg backdrop-blur-md transition-all active:scale-95 text-xs sm:text-sm font-medium tracking-wide cursor-pointer"
        aria-label={muted ? 'Unmute sound' : 'Mute sound'}
        title={muted ? 'Unmute sound' : 'Mute sound'}
      >
        {muted ? (
          <>
            <VolumeX className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline text-rose-300">Sound Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline text-amber-200">Music Playing</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        )}
      </button>
    </div>
  );
};
