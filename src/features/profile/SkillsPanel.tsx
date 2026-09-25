import { localize, type Language } from '../../i18n';

import { Smartphone } from 'lucide-react';
import { skillGroups } from '../../content';
import { SectionMeta } from '../../ui-kit';
import { SkillIcon } from './SkillIcon';
/** Complete skill taxonomy and experience metrics, localized without owning profile state. */
export function SkillsPanel({ lang }: { lang: Language }) {
  const t = localize(lang);
  return (
    <section
      className="skills-section profile-stack wrap"
      id="toolkit"
      aria-labelledby="skills-title"
    >
      <SectionMeta
        className="stack-heading"
        index="03"
        label={t('SKILLS', 'НАВЫКИ')}
        aside={
          <span className="stack-platforms">
            <Smartphone size={13} /> iOS + Android
          </span>
        }
      />
      <h2 id="skills-title">{t('Technologies I work with', 'Технологии, с которыми работаю')}</h2>
      <div className="all-skills">
        {skillGroups.map((group) => (
          <section
            className={`skill-category skill-category-${group.id}`}
            key={group.id}
            aria-label={group.title[lang]}
          >
            <h3>{group.title[lang]}</h3>
            <ul>
              {group.items.map((name) => (
                <li key={name}>
                  <SkillIcon name={name} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
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
    </section>
  );
}
