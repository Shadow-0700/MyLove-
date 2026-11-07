/**
 * Central Asset Configuration & Character Emotion System
 * 
 * Includes the 12 handcrafted pixel-art character poses and emotional mappings.
 * All images and audio paths can be customized independently.
 */

export type CharacterEmotion =
  | 'celebrating' // Top 1: pose_01.png (extremely excited / fists raised)
  | 'walking'     // Top 2: pose_02.png (walking / casual movement)
  | 'explaining'  // Top 3: pose_03.png (speaking / explaining / belly laugh)
  | 'embarrassed' // Top 4: pose_04.png (surprised / embarrassed / blush)
  | 'greeting'    // Top 5: pose_05.png (waving / hello greeting)
  | 'jumping'     // Top 6: pose_06.png (jumping with joy in the air)
  | 'thumbsUp'    // Bottom 1: pose_07.png (happy / double thumbs up)
  | 'determined'  // Bottom 2: pose_08.png (determined / enthusiastic fist)
  | 'clapping'    // Bottom 3: pose_09.png (clapping / celebrating)
  | 'confused'    // Bottom 4: pose_10.png (confused / shrugging / patient)
  | 'playful'     // Bottom 5: pose_11.png (playful / peace signs / pointing)
  | 'affectionate'; // Bottom 6: pose_12.png (welcoming / affectionate open arms)

export const CHARACTER_POSES: Record<CharacterEmotion, string> = {
  celebrating: '/assets/characters/poses/pose_01.png',
  walking: '/assets/characters/poses/pose_02.png',
  explaining: '/assets/characters/poses/pose_03.png',
  embarrassed: '/assets/characters/poses/pose_04.png',
  greeting: '/assets/characters/poses/pose_05.png',
  jumping: '/assets/characters/poses/pose_06.png',
  thumbsUp: '/assets/characters/poses/pose_07.png',
  determined: '/assets/characters/poses/pose_08.png',
  clapping: '/assets/characters/poses/pose_09.png',
  confused: '/assets/characters/poses/pose_10.png',
  playful: '/assets/characters/poses/pose_11.png',
  affectionate: '/assets/characters/poses/pose_12.png',
};

export interface CharacterSpriteConfig {
  idle: string;
  walkFrames: string[];
  dance: string;
  sad: string;
  poses: Record<CharacterEmotion, string>;
  baseWidth: number;
  baseHeight: number;
  scale: number;
  walkIntervalMs: number;
  danceIntervalMs: number;
}

export interface AssetConfig {
  backgrounds: {
    dreamyClouds: string;
    walkingPath: string;
    celebrationSky?: string;
  };
  portraits: {
    framedBoyfriend: string;
  };
  character: CharacterSpriteConfig;
  decorations: {
    envelope: string;
    parchmentLetter: string;
    cloud1: string;
    cloud2: string;
    thoughtCloud: string;
    diya: string;
  };
  story: {
    girlfriendSolo: string;
    girlfriendSoloPixel: string;
    panelForeheadKiss: string;
    panelFuljhadi: string;
    panelHoldingHands: string;
    panelHug: string;
  };
  effects: {
    heart: string;
    balloon: string;
    sparkle: string;
  };
  sounds: {
    ambientMusic?: string;
    letterAppear?: string;
    envelopeOpen?: string;
    footstep?: string;
    celebrationMusic?: string;
    click?: string;
  };
}

export const ASSETS: AssetConfig = {
  backgrounds: {
    dreamyClouds: '/assets/backgrounds/sky_clouds_sun.jpg',
    walkingPath: '/assets/backgrounds/walking_path_clean.jpg',
    celebrationSky: '/assets/backgrounds/sky_clouds_sun.jpg',
  },
  portraits: {
    framedBoyfriend: '/assets/characters/portrait_framed.jpg',
  },
  character: {
    idle: CHARACTER_POSES.greeting,
    walkFrames: [
      CHARACTER_POSES.walking,
      '/assets/sprites/exact_walk1.png',
      CHARACTER_POSES.walking,
      '/assets/sprites/exact_walk3.png',
    ],
    dance: CHARACTER_POSES.celebrating,
    sad: CHARACTER_POSES.embarrassed,
    poses: CHARACTER_POSES,
    baseWidth: 140,
    baseHeight: 280,
    scale: 0.9,
    walkIntervalMs: 160,
    danceIntervalMs: 220,
  },
  decorations: {
    envelope: '/assets/decorations/envelope.svg',
    parchmentLetter: '/assets/decorations/parchment_letter.jpg',
    cloud1: '/assets/decorations/cloud1.svg',
    cloud2: '/assets/decorations/cloud2.svg',
    thoughtCloud: '/assets/decorations/thought_cloud_clean.png',
    diya: '/assets/decorations/pixel_diya.svg',
  },
  story: {
    girlfriendSolo: '/assets/story/girlfriend_solo.png',
    girlfriendSoloPixel: '/assets/story/girlfriend_solo_pixel.png',
    panelForeheadKiss: '/assets/story/panel_forehead_kiss.png',
    panelFuljhadi: '/assets/story/panel_fuljhadi.png',
    panelHoldingHands: '/assets/story/panel_holding_hands.png',
    panelHug: '/assets/story/panel_hug.png',
  },
  effects: {
    heart: '/assets/effects/pixel_heart.svg',
    balloon: '/assets/effects/balloon.svg',
    sparkle: '/assets/effects/sparkle.svg',
  },
  sounds: {
    ambientMusic: '/assets/sounds/ambient.mp3',
    letterAppear: '/assets/sounds/letter_chime.mp3',
    envelopeOpen: '/assets/sounds/envelope_open.mp3',
    footstep: '/assets/sounds/footstep.mp3',
    celebrationMusic: '/assets/sounds/celebration.mp3',
    click: '/assets/sounds/click.mp3',
  },
};
