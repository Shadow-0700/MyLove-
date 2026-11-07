# 💌 A Little Apology — An Interactive Romantic Story

A handcrafted, animated storybook and pixel-art romantic interactive experience built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## 🎮 Live Local Preview

The development server is running locally at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 🌟 Interactive Story Flow

1. **Scene 1: Dreamy Cloudy Entrance**
   - Soft pastel sunset sky with layered fluffy clouds.
   - Text: *"Heyyy, someone has something for you..."*
   - Interactive clouds smoothly part away upon tap/click with ambient harp/music box audio.

2. **Scene 2: The Mysterious Letter**
   - Floating envelope with a heart-shaped seal and glowing sparkles.
   - Notification toast: *"You've got something special waiting for you! 💌"*
   - Envelope unfolds with an authentic romantic parchment letter and smooth paper sound effects.
   - Continue button to meet the character.

3. **Scene 3: Character Entrance & Apology Dialogue**
   - Custom pixel-art character runs in from the meadow pathway into the foreground.
   - RPG-style dialogue box with typewriter sound blips and framed portrait avatar.
   - Progressive emotional story dialogues.

4. **Scene 4: The Decision**
   - **Option A:** *"I forgive you ❤️"*
   - **Option B:** *"Not yet 🥺"*
   - If she chooses *"Not yet"*, the character assumes a gentle, apologetic sad pose, reassures her that she can take all the time she needs, and provides options to think again or revisit the letter.

5. **Scene 5: Celebration Climax!**
   - Joyful confetti blasts, upward-floating balloons, hearts and kiss animations.
   - Character jumps and dances left and right with excitement.
   - Victory fanfare sound.
   - Climax message card: *"You're my favourite person, my little happiness, and my kuchuu puchuu forever."*
   - Replay button to experience the magic again.

---

## 🎨 Asset Configuration & Customization

All assets and sprites are centrally configured in:
`src/config/assets.ts`

### Folder Layout:
```
public/assets/
  ├── backgrounds/    # sky_clouds_sun.jpg, walking_path.jpg
  ├── characters/     # portrait_framed.jpg (RPG avatar portrait)
  ├── sprites/        # character_idle, walk1, walk2, dance, sad (transparent PNG/SVG)
  ├── decorations/    # envelope, cloud1, cloud2
  ├── effects/        # pixel_heart, balloon, sparkle
  └── sounds/         # ambient, footstep, envelope_open, letter_chime, celebration
```

To replace any character sprite or spritesheet, simply drop your files into `public/assets/sprites/` and update `src/config/assets.ts`.

---

## 🎵 Sound & Autoplay

- Web Audio API synthesizer automatically provides ambient music, letter chimes, footsteps, typewriter blips, and celebration fanfare out of the box with zero external dependencies.
- You can place your own MP3 files in `public/assets/sounds/` to override the synth audio.
- An interactive Mute/Unmute toggle is available at the top-right corner.
- A CRT scanline overlay filter toggle is available at the top-left corner.
