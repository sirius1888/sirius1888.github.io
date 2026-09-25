import { localize, type Language } from '../../i18n';
import { ConferenceShowcase } from './ConferenceShowcase';
import { LeadershipSummary } from './LeadershipSummary';

import { SectionMeta, SplitHeading } from '../../ui-kit';
/** Current role, leadership responsibilities and the independent conference demonstration. */
export function VinteoSection({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <section
      className="employer-section wrap vinteo-chapter"
      id="vinteo"
      aria-labelledby="vinteo-heading"
    >
      <SectionMeta
        className="chapter-overline"
        index="01"
        label={t('CURRENT ROLE', 'ТЕКУЩАЯ РАБОТА')}
        aside={
          <span className="current-badge">
            <span />
            {t('SEP 2024 — PRESENT', 'СЕНТЯБРЬ 2024 — СЕЙЧАС')}
          </span>
        }
      />
      <SplitHeading
        titleId="vinteo-heading"
        title="Vinteo"
        leading={
          <span className="employer-brand vinteo-brand">
            <img src="./images/vinteo.jpg" alt="" />
          </span>
        }
        subtitle="Team Lead React Native Engineer"
        detail={t('Senior → Team Lead since October 2025', 'Senior → Team Lead с октября 2025')}
      />
      <LeadershipSummary lang={lang} />
      <ConferenceShowcase lang={lang} />
    </section>
  );
}
