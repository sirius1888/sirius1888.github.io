import { Check, ChevronDown } from 'lucide-react';
import { localize, type Language } from '../../i18n';
import { SectionMeta, SplitHeading } from '../../ui-kit';
import { AdsArchitecture } from './AdsArchitecture';
import { AdShowcase } from './AdShowcase';
import { useAdConfiguration } from './useAdConfiguration';

/** Responsibilities and product value first; technical configuration is optional. */
export function MuseSection({ lang }: { lang: Language }) {
  const t = localize(lang);
  const { config, events, resetVersion, update, emit, reset } = useAdConfiguration();
  return (
    <section
      className="employer-section wrap muse-chapter"
      id="muse-group"
      aria-labelledby="muse-heading"
    >
      <SectionMeta
        className="chapter-overline"
        index="02"
        label={t('ADVERTISING', 'РЕКЛАМА')}
        aside={<span>{t('MAY 2021 — SEP 2024', 'МАЙ 2021 — СЕНТЯБРЬ 2024')}</span>}
      />
      <SplitHeading
        titleId="muse-heading"
        title="Muse Group"
        leading={
          <span className="employer-apps" aria-hidden="true">
            <img src="./images/ultimate-guitar.jpg" alt="" />
            <img src="./images/musescore.jpg" alt="" />
          </span>
        }
        subtitle="React Native Developer"
        detail={t('Advertising Department', 'Рекламный департамент')}
      />
      <div className="muse-intro">
        <div>
          <span className="case-kicker">{t('MY RESPONSIBILITIES', 'МОИ ЗАДАЧИ')}</span>
          <h3>
            {t('Advertising for company products', 'Рекламные интеграции для продуктов компании')}
          </h3>
          <p>
            {t(
              'I developed advertising integrations for Muse Group products, including Ultimate Guitar and MuseScore.',
              'Разрабатывал рекламные интеграции для продуктов Muse Group, в том числе Ultimate Guitar и MuseScore.',
            )}
          </p>
        </div>
        <ul className="muse-contributions">
          {[
            t(
              'Built a shared advertising module for company products.',
              'Создал общий рекламный модуль для продуктов компании.',
            ),
            t(
              'Implemented replaceable advertising service integrations.',
              'Реализовал сменные интеграции рекламных сервисов.',
            ),
            t(
              'Wrote independent analytics and experiment modules from scratch.',
              'С нуля написал независимые модули аналитики и экспериментов.',
            ),
            t(
              'Optimized ad screens and worked on user consent and regional requirements.',
              'Оптимизировал экраны с рекламой, работал с пользовательским согласием и региональными требованиями.',
            ),
          ].map((contribution) => (
            <li key={contribution}>
              <Check size={15} aria-hidden="true" />
              {contribution}
            </li>
          ))}
        </ul>
      </div>
      <div className="muse-outcome">
        <span className="case-kicker">{t('VALUE FOR THE TEAM', 'РЕЗУЛЬТАТ ДЛЯ КОМАНДЫ')}</span>
        <p>
          {t(
            'A shared module let the team reuse advertising integrations across products, work with different ad providers and test integration options. Analytics and experiments could be connected independently.',
            'Общий модуль позволял переиспользовать рекламные интеграции в продуктах, подключать разных поставщиков рекламы и проверять варианты интеграции. Аналитику и эксперименты можно было подключать независимо.',
          )}
        </p>
      </div>
      <AdShowcase
        lang={lang}
        config={config}
        onChange={update}
        onEvent={emit}
        resetVersion={resetVersion}
      />
      <details className="technical-details">
        <summary>
          {t('How it works technically', 'Как устроено технически')}
          <ChevronDown size={20} aria-hidden="true" />
        </summary>
        <AdsArchitecture
          lang={lang}
          config={config}
          onChange={update}
          events={events}
          onReset={reset}
        />
        <p className="architecture-footnote">
          {t(
            'A simplified model of the shared module for company products. Ultimate Guitar and MuseScore illustrate its reuse; GAM and ironSource are historical integration examples. Consent work covered the EU, the US and other regions.',
            'Упрощённая модель общего модуля для продуктов компании. Ultimate Guitar и MuseScore показывают пример переиспользования; GAM и ironSource — примеры интеграций того периода. Работа с пользовательским согласием учитывала требования ЕС, США и других регионов.',
          )}
        </p>
      </details>
    </section>
  );
}
