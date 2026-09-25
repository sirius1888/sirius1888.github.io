export type AdConfig = {
  sdk: 'GAM' | 'ironSource';
  adapter: 'A' | 'B';
  analytics: boolean;
  experiments: boolean;
  consent: boolean;
};
export type AdFormat = 'banner' | 'native' | 'interstitial' | 'rewarded';
export type MusicApp = 'ug' | 'musescore';
export const initialAdConfig: AdConfig = {
  sdk: 'GAM',
  adapter: 'A',
  analytics: true,
  experiments: false,
  consent: false,
};
export const musicApps = {
  ug: {
    name: 'Ultimate Guitar',
    icon: './images/ultimate-guitar.jpg',
    url: 'https://apps.apple.com/ru/app/ultimate-guitar-chords-tabs/id357828853',
  },
  musescore: {
    name: 'MuseScore',
    icon: './images/musescore.jpg',
    url: 'https://apps.apple.com/us/app/musescore-sheet-music-chords/id835731296',
  },
};

export type AdOverlayKind = 'interstitial' | 'rewarded' | 'creative';
export type RewardPhase = 'idle' | 'playing' | 'complete';

export const REWARD_DURATION_SECONDS = 4;
export const MAX_ANALYTICS_EVENTS = 30;
