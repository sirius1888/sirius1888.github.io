import { ArrowDown, Download, MapPin, Send } from 'lucide-react';
import { SocialLinks } from '../../components/shared/SocialLinks';
import { contactLinks } from '../../data/contacts';
import { localize, type Language } from '../../i18n';
import { Link } from '../../ui-kit';

/** Lead positioning, a direct contact action and concise product context. */
export function ProfileHero({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <section className="profile-section wrap" id="home" aria-labelledby="profile-title">
      <div className="profile-main">
        <h1 id="profile-title">{t('Sergei Karukes', 'Сергей Карукес')}</h1>
        <p className="profile-role">
          {t('Team Lead React Native Developer', 'Team Lead React Native разработчик')}
        </p>
        <div className="profile-bio">
          <p>
            {t(
              'I develop iOS and Android apps with React Native.',
              'Разработчик для iOS и Android на react-native.',
            )}
          </p>
          <p>
            {t(
              'At Vinteo, I also lead the team, organize development and manage processes.',
              'В Vinteo также руковожу командой и организую разработку и оперирую процессами.',
            )}
          </p>
        </div>
        <div className="profile-actions">
          <Link
            className="button button-accent"
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer"
          >
            {t('Message me', 'Написать мне')}
            <Send size={16} />
          </Link>
          <Link
            className="text-link"
            href={`./cv/Sergei_Karukes_${lang.toUpperCase()}.pdf`}
            download
          >
            {t('Download CV', 'Скачать резюме')}
            <Download size={16} />
          </Link>
        </div>
        <p className="profile-core" aria-label={t('Core technologies', 'Основные технологии')}>
          React Native · TypeScript · Swift · Kotlin
        </p>
        <SocialLinks lang={lang} />
      </div>
      <div className="profile-portrait">
        <img
          src="./images/sergei.jpg"
          alt={t('Sergei Karukes', 'Сергей Карукес')}
          width="240"
          height="240"
          fetchPriority="high"
        />
        <span className="portrait-caption">
          <MapPin size={12} aria-hidden="true" /> {t('Kazan, Russia', 'Казань, Россия')}
        </span>
      </div>
      <div className="profile-bottom">
        <span>{t('Products I’ve worked on', 'Продукты, над которыми работал')}</span>
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
        <Link className="profile-scroll" href="#vinteo">
          {t('Scroll to explore', 'Листайте ниже')}
          <ArrowDown size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
