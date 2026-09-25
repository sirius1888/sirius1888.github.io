import { localize, type Language } from '../../i18n';

import { earlier } from '../../content';
import { SectionMeta } from '../../ui-kit';
import { ExperienceItem } from './ExperienceItem';
/** Chronological, text-only history of the earlier roles. */
export function ExperienceSection({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <section className="earlier-section wrap" id="experience" aria-labelledby="earlier-title">
      <SectionMeta
        className="chapter-overline"
        index="04"
        label={t('EARLIER EXPERIENCE', 'ПРЕДЫДУЩИЙ ОПЫТ')}
        aside={<span>2018 — 2021</span>}
      />
      <div className="earlier-heading" data-reveal>
        <h2 id="earlier-title">
          {t('Android & iOS', 'Разработка')}
          <br />
          <span>{t('development', 'под Android и iOS')}</span>
        </h2>
        <p>
          {t(
            'Before Muse Group, I worked on payment, warehouse and sports applications.',
            'До Muse Group работал над платёжным и складским приложениями, а также проектом для Olympic Council of Asia.',
          )}
        </p>
      </div>
      <div className="previous-jobs">
        {earlier.map((item) => (
          <ExperienceItem key={item.company} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
