import { type Language } from '../../i18n';

import type { ExperienceEntry } from './model';
export type ExperienceItemProps = { item: ExperienceEntry; lang: Language };
/** One historical role: dates, employer metadata and confirmed contributions. */
export function ExperienceItem({ item, lang }: ExperienceItemProps) {
  return (
    <article className="previous-job">
      <div className="previous-period">
        {item.period[lang]}
        <span className="previous-duration">{item.duration[lang]}</span>
      </div>
      <div className="previous-company">
        <h3>{item.company}</h3>
        <span>{item.role}</span>
        {item.project && <small>{item.project[lang]}</small>}
        {item.location && <small>{item.location[lang]}</small>}
      </div>
      {item.contributions ? (
        <ul>
          {item.contributions.map((contribution, index) => (
            <li key={index}>{contribution[lang]}</li>
          ))}
        </ul>
      ) : (
        <p>{item.desc[lang]}</p>
      )}
    </article>
  );
}
