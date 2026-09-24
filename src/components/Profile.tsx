import {
  ArrowDown,
  ArrowUpRight,
  Bell,
  Boxes,
  Braces,
  CheckCheck,
  Code2,
  Database,
  Download,
  FlaskConical,
  KeyRound,
  Layers,
  Link2,
  Network,
  Phone,
  PictureInPicture2,
  Radio,
  ShieldCheck,
  Smartphone,
  TestTube2,
  Video,
  Workflow,
  Zap,
  Github,
  Linkedin,
  Send,
  Mail,
  MapPin,
  Megaphone,
  type LucideIcon,
} from 'lucide-react';
import { skillGroups, type Language } from '../content';

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
};
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
export function SkillIcon({ name }: { name: string }) {
  if (logos[name])
    return (
      <img
        className={
          ['apple', 'gradle'].includes(logos[name]) ? 'skill-logo apple-logo' : 'skill-logo'
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
export const contactLinks = {
  telegram: 'https://t.me/ser1888',
  github: 'https://github.com/sirius1888',
  linkedin: 'https://www.linkedin.com/in/sirius1888/',
  email: 'mailto:ser1888kg@gmail.com',
};
export function SocialLinks({ lang }: { lang: Language }) {
  return (
    <div className="profile-socials">
      <a href={contactLinks.github} target="_blank" rel="noreferrer">
        <Github size={15} />
        GitHub
        <ArrowUpRight size={12} />
      </a>
      <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">
        <Linkedin size={15} />
        LinkedIn
        <ArrowUpRight size={12} />
      </a>
      <a href={contactLinks.telegram} target="_blank" rel="noreferrer">
        <Send size={15} />
        Telegram
        <ArrowUpRight size={12} />
      </a>
      <a href={contactLinks.email}>
        <Mail size={15} />
        {lang === 'en' ? 'Email' : 'Почта'}
        <ArrowUpRight size={12} />
      </a>
    </div>
  );
}
export function ProfileHero({ lang }: { lang: Language }) {
  const t = (en: string, ru: string) => (lang === 'en' ? en : ru);
  return (
    <section className="profile-section wrap" id="home" aria-labelledby="profile-title">
      <div className="profile-main">
        <div className="profile-portrait">
          <img
            src="./images/sergei.jpg"
            alt={t('Sergei Karukes', 'Сергей Карукес')}
            width="210"
            height="210"
            fetchPriority="high"
          />
          <span className="portrait-caption">
            <MapPin size={12} aria-hidden="true" /> {t('Kazan, Russia', 'Казань, Россия')}
          </span>
        </div>
        <p className="profile-role">SENIOR / LEAD REACT NATIVE ENGINEER</p>
        <h1 id="profile-title">
          {t('Sergei', 'Сергей')}
          <br />
          <span>{t('Karukes', 'Карукес')}</span>
        </h1>
        <p className="profile-bio">
          {t(
            'I develop iOS and Android apps with React Native, Swift and Kotlin. At Vinteo, I also lead the team and organize development and testing.',
            'Разрабатываю приложения для iOS и Android на React Native, Swift и Kotlin. В Vinteo также руковожу командой и организую разработку и тестирование.',
          )}
        </p>
        <div className="profile-actions">
          <a
            className="button button-accent"
            href={`./cv/Sergei_Karukes_${lang.toUpperCase()}.pdf`}
            download
          >
            {t('Download CV', 'Скачать резюме')}
            <Download size={16} />
          </a>
          <a className="text-link" href="#vinteo">
            {t('Work experience', 'Опыт работы')}
            <ArrowDown size={16} />
          </a>
        </div>
        <SocialLinks lang={lang} />
      </div>
      <div className="profile-stack" id="toolkit">
        <div className="stack-heading">
          <span className="section-index">01 / {t('SKILLS', 'НАВЫКИ')}</span>
          <span className="stack-platforms">
            <Smartphone size={13} /> iOS + Android
          </span>
        </div>
        <h2>{t('Technologies I work with', 'Технологии, с которыми работаю')}</h2>
        <div className="all-skills">
          {skillGroups.map((group) => (
            <section className="skill-category" key={group.id} aria-label={group.title[lang]}>
              <h3>{group.title[lang]}</h3>
              <ul>
                {group.items.map((name) => (
                  <li key={name}>
                    <SkillIcon name={name} />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
              {group.description && <p className="skill-description">{group.description[lang]}</p>}
            </section>
          ))}
        </div>
        <div className="profile-numbers">
          <div>
            <strong>
              8<span>+</span>
            </strong>
            <span>{t('years in software', 'лет в разработке')}</span>
          </div>
          <div>
            <strong>
              5<span>+</span>
            </strong>
            <span>{t('years of React Native', 'лет с React Native')}</span>
          </div>
          <div>
            <strong>
              iOS <span>&</span> Android
            </strong>
            <span>{t('native & cross-platform', 'нативно и кроссплатформенно')}</span>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <span>{t('Apps I’ve worked on', 'Мои проекты')}</span>
        <div>
          <a href="#vinteo-mobile">
            <img src="./images/vinteo.jpg" alt="" />
            Vinteo Mobile
          </a>
          <a href="#muse-group">
            <img src="./images/ultimate-guitar.jpg" alt="" />
            Ultimate Guitar
          </a>
          <a href="#muse-group">
            <img src="./images/musescore.jpg" alt="" />
            MuseScore
          </a>
          <a href="#experience">
            <span className="o-wordmark" aria-hidden="true">
              O!
            </span>
            {t('My O!', 'Мой О!')}
          </a>
        </div>
      </div>
    </section>
  );
}
