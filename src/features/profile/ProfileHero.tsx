import { localize, type Language } from '../../i18n';

import { ArrowDown, Download, MapPin } from 'lucide-react';
import { SocialLinks } from '../../components/shared/SocialLinks';
import { Link } from '../../ui-kit';
import { SkillsPanel } from './SkillsPanel';
/** Personal introduction, skills and links to the product chapters. */
export function ProfileHero({ lang }: { lang: Language }) {
  const t = localize(lang);
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
          <Link
            className="button button-accent"
            href={`./cv/Sergei_Karukes_${lang.toUpperCase()}.pdf`}
            download
          >
            {t('Download CV', 'Скачать резюме')}
            <Download size={16} />
          </Link>
          <Link className="text-link" href="#vinteo">
            {t('Work experience', 'Опыт работы')}
            <ArrowDown size={16} />
          </Link>
        </div>
        <SocialLinks lang={lang} />
      </div>
      <SkillsPanel lang={lang} />
      <div className="profile-bottom">
        <span>{t('Apps I’ve worked on', 'Мои проекты')}</span>
        <div>
          <Link href="#vinteo-mobile">
            <img src="./images/vinteo.jpg" alt="" />
            Vinteo Mobile
          </Link>
          <Link href="#muse-group">
            <img src="./images/ultimate-guitar.jpg" alt="" />
            Ultimate Guitar
          </Link>
          <Link href="#muse-group">
            <img src="./images/musescore.jpg" alt="" />
            MuseScore
          </Link>
          <Link href="#experience">
            <span className="o-wordmark" aria-hidden="true">
              O!
            </span>
            {t('My O!', 'Мой О!')}
          </Link>
        </div>
      </div>
    </section>
  );
}
