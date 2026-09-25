import {
  Bell,
  Boxes,
  Braces,
  CheckCheck,
  Code2,
  Database,
  FlaskConical,
  KeyRound,
  Layers,
  Link2,
  Megaphone,
  Network,
  Phone,
  PictureInPicture2,
  Radio,
  Rocket,
  ShieldCheck,
  TestTube2,
  Video,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const logos: Record<string, string> = {
  'React Native': 'react',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  'Redux Toolkit': 'redux',
  'RTK Query': 'redux',
  'React Navigation': 'reactnavigation',
  Swift: 'swift',
  'Objective-C': 'apple',
  Kotlin: 'kotlin',
  Java: 'java',
  iOS: 'apple',
  Android: 'android',
  Realm: 'realm',
  SQLite: 'sqlite',
  Electron: 'electron',
  Jest: 'jest',
  'React Native Testing Library': 'react',
  ESLint: 'eslint',
  Gradle: 'gradle',
  Xcode: 'xcode',
  Git: 'git',
  'Google Play': 'googleplay',
  'App Store': 'appstore',
  RuStore: 'rustore',
  'Huawei AppGallery': 'appgallery',
};
// These logos need tonal differences to retain their lettering and internal detail.
const multitoneLogos = new Set([
  'typescript',
  'javascript',
  'swift',
  'android',
  'realm',
  'sqlite',
  'xcode',
  'eslint',
  'kotlin',
  'rustore',
]);
const symbols: Record<string, LucideIcon> = {
  Reanimated: Zap,
  Hermes: Zap,
  AIDL: Network,
  'Android Services': Boxes,
  Broadcasts: Radio,
  'APNs / FCM': Bell,
  'VoIP Push': Phone,
  'iOS PiP': PictureInPicture2,
  'Deep & universal links': Link2,
  WebRTC: Video,
  WebSocket: Radio,
  REST: Braces,
  Room: Database,
  'Offline-first': Database,
  'OIDC / OAuth 2.0': ShieldCheck,
  PKCE: KeyRound,
  Keychain: KeyRound,
  safeStorage: ShieldCheck,
  'Modular architecture': Boxes,
  'Clean Architecture': Layers,
  'MVVM / MVP': Workflow,
  'Platform adapters': Network,
  'Unit / E2E testing': TestTube2,
  'A/B testing': FlaskConical,
  'Code review': CheckCheck,
  'Alpha / Beta / Release': Rocket,
  AdMob: Megaphone,
  'Google Ad Manager': Layers,
  AppLovin: Megaphone,
  'Unity Ads': Megaphone,
  ironSource: Layers,
  'Meta Audience Network': Megaphone,
  Mintegral: Megaphone,
  'Liftoff Monetize (Vungle)': Megaphone,
  Pangle: Megaphone,
  InMobi: Megaphone,
};
/** Resolves a skill name to its monochrome logo or fallback symbol. */
export function SkillIcon({ name }: { name: string }) {
  if (logos[name])
    return (
      <img
        className={
          multitoneLogos.has(logos[name]) ? 'skill-logo' : 'skill-logo skill-logo-monochrome'
        }
        src={`./icons/${logos[name]}.svg`}
        alt=""
        width="15"
        height="15"
      />
    );
  const Icon = symbols[name] || Code2;
  return <Icon className="skill-symbol" size={15} aria-hidden="true" />;
}
