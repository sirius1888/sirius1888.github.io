import { localize, type Language } from '../../i18n';

import { Download, Send } from 'lucide-react';
import { SocialLinks } from '../../components/shared/SocialLinks';
import { contactLinks } from '../../data/contacts';
import { Link, SectionMeta } from '../../ui-kit';
/** Contact destinations and the two downloadable resume versions. */
export function ContactSection({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <section className="contact-section wrap" id="contact" aria-labelledby="contact-title">
      <SectionMeta
        className="contact-top"
        index="05"
        label={t('CONTACT', 'КОНТАКТЫ')}
        aside={<span>React Native · Team Lead</span>}
      />
      <h2 id="contact-title">{t('Get in touch', 'Связаться')}</h2>
      <div className="contact-bottom">
        <div>
          <p>
            {t(
              'For work enquiries, reach me on Telegram or by email.',
              'По вопросам работы — в Telegram или на почту.',
            )}
          </p>
          <Link
            className="button button-accent"
            href={contactLinks.telegram}
            target="_blank"
            rel="noreferrer"
          >
            {t('Message on Telegram', 'Написать в Telegram')}
            <Send size={17} />
          </Link>
        </div>
        <div>
          <SocialLinks lang={lang} />
          <div className="footer-cv">
            <Download size={14} />
            <span>{t('Resume', 'Резюме')}</span>
            <Link href="./cv/Sergei_Karukes_EN.pdf" download>
              English PDF
            </Link>
            <span>/</span>
            <Link href="./cv/Sergei_Karukes_RU.pdf" download>
              Русский PDF
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
