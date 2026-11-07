/**
 * Robust Audio Controller & Web Audio Synthesizer
 * 
 * Supports:
 * - Real audio playback for URLs configured in ASSETS.sounds
 * - Seamless zero-dependency synthesized fallback (chiptune/music box/chimes)
 * - Autoplay safety policies (unlocks on first user tap)
 * - Master mute / unmute state
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isAmbientPlaying: boolean = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private listeners: Set<(muted: boolean) => void> = new Set();

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public subscribe(cb: (muted: boolean) => void): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
      this.audioCache.forEach((audio) => audio.pause());
    } else {
      this.playAmbient();
    }
    this.notify();
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play an external audio file if valid, or run synth callback
   */
  private playSoundWithFallback(url: string | undefined, synthFallback: () => void) {
    if (this.isMuted) return;

    if (url) {
      let audio = this.audioCache.get(url);
      if (!audio) {
        audio = new Audio(url);
        this.audioCache.set(url, audio);
      }
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.play().catch(() => {
        // If file doesn't exist or failed to load, fall back to synthesized sound
        synthFallback();
      });
    } else {
      synthFallback();
    }
  }

  /**
   * Cute Notification chime for letter reveal
   */
  public playLetterNotification(url?: string) {
    this.playSoundWithFallback(url, () => {
      const ctx = this.getAudioContext();
      if (!ctx || this.isMuted) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (sparkling chime)
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.65);
      });
    });
  }

  /**
   * Crisp envelope open sound (paper slide + pop)
   */
  public playEnvelopeOpen(url?: string) {
    this.playSoundWithFallback(url, () => {
      const ctx = this.getAudioContext();
      if (!ctx || this.isMuted) return;

      // Soft white noise burst for paper sound
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();

      // Soft pop tone
      const osc = ctx.createOscillator();
      const popGain = ctx.createGain();
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.1);
      popGain.gain.setValueAtTime(0.12, ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(popGain);
      popGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    });
  }

  /**
   * Footstep sound when pixel character runs
   */
  public playFootstep(url?: string) {
    this.playSoundWithFallback(url, () => {
      const ctx = this.getAudioContext();
      if (!ctx || this.isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    });
  }

  /**
   * Typewriter / speech blip sound for RPG dialogue
   */
  public playBlip() {
    const ctx = this.getAudioContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    // Gentle warm pitch variation
    const freq = 420 + Math.random() * 80;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  }

  /**
   * Celebration Fanfare when forgiveness is accepted!
   */
  public playCelebration(url?: string) {
    this.playSoundWithFallback(url, () => {
      const ctx = this.getAudioContext();
      if (!ctx || this.isMuted) return;

      // Joyful ascending arpeggio (C - E - G - B - C - E)
      const melody = [
        { f: 261.63, d: 0.12 },
        { f: 329.63, d: 0.12 },
        { f: 392.00, d: 0.12 },
        { f: 493.88, d: 0.12 },
        { f: 523.25, d: 0.18 },
        { f: 659.25, d: 0.35 },
      ];

      let delay = 0;
      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + note.d);

        delay += note.d * 0.85;
      });
    });
  }

  /**
   * Soft ambient music loop (Dreamy music box arpeggios)
   */
  public playAmbient(url?: string) {
    if (this.isMuted || this.isAmbientPlaying) return;

    if (url) {
      let audio = this.audioCache.get(url);
      if (!audio) {
        audio = new Audio(url);
        audio.loop = true;
        this.audioCache.set(url, audio);
      }
      audio.volume = 0.35;
      audio.play().then(() => {
        this.isAmbientPlaying = true;
      }).catch(() => {
        this.startSynthAmbient();
      });
    } else {
      this.startSynthAmbient();
    }
  }

  private startSynthAmbient() {
    const ctx = this.getAudioContext();
    if (!ctx || this.isMuted || this.isAmbientPlaying) return;
    this.isAmbientPlaying = true;

    // Dreamy pentatonic notes (F - A - C - D - G)
    const scale = [349.23, 440.00, 523.25, 587.33, 783.99];
    let noteIdx = 0;

    const interval = setInterval(() => {
      if (!this.isAmbientPlaying || this.isMuted) {
        clearInterval(interval);
        return;
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(scale[noteIdx % scale.length], ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.2);

      noteIdx = (noteIdx + 1 + Math.floor(Math.random() * 2)) % scale.length;
    }, 1200);
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    this.audioCache.forEach((audio) => {
      if (audio.loop) audio.pause();
    });
  }
}

export const audioManager = new AudioManager();
