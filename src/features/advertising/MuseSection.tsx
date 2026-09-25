import { localize, type Language } from '../../i18n';

import { Check } from 'lucide-react';
import { SectionMeta, SplitHeading } from '../../ui-kit';
import { AdsArchitecture } from './AdsArchitecture';
import { AdShowcase } from './AdShowcase';
import { useAdConfiguration } from './useAdConfiguration';
/** Advertising career chapter; coordinates a shared configuration for its two demonstrations. */
export function MuseSection({ lang }: { lang: Language }) {
  const t = localize(lang);
  const {
    config: adConfig,
    events: adEvents,
    resetVersion: adResetVersion,
    update: updateAdConfig,
    emit: emitAdEvent,
    reset: resetAds,
  } = useAdConfiguration();
  return (
    <section
      className="employer-section wrap muse-chapter"
      id="muse-group"
      aria-labelledby="muse-heading"
    >
      <SectionMeta
        className="chapter-overline"
        index="03"
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
          <span className="case-kicker">
            {t('ULTIMATE GUITAR + MUSESCORE', 'ULTIMATE GUITAR + MUSESCORE')}
          </span>
          <h3>{t('Reusable advertising module', 'Общий рекламный модуль')}</h3>
        </div>
        <div>
          <p>
            {t(
              'I built an advertising module reused in Ultimate Guitar and MuseScore. Replaceable SDKs and adapters let the team test different integrations and avoid dependence on a single vendor.',
              'Создал рекламный модуль, который переиспользовался в Ultimate Guitar и MuseScore. Сменные SDK и адаптеры позволяли проверять разные интеграции и не зависеть от одного вендора.',
            )}
          </p>
          <ul className="muse-contributions">
            <li>
              <Check size={15} />
              {t(
                'Analytics and experiment modules written from scratch.',
                'Модули аналитики и экспериментов, написанные с нуля.',
              )}
            </li>
            <li>
              <Check size={15} />
              {t(
                'Modules that can be connected and disconnected independently.',
                'Независимое подключение и отключение модулей.',
              )}
            </li>
            <li>
              <Check size={15} />
              {t(
                'Ad screen optimization, consent and regional requirements.',
                'Оптимизация экранов с рекламой, consent и региональные требования.',
              )}
            </li>
          </ul>
        </div>
      </div>
      <AdsArchitecture
        lang={lang}
        config={adConfig}
        onChange={updateAdConfig}
        events={adEvents}
        onReset={resetAds}
      />
      <p className="architecture-footnote">
        {t(
          'A simplified interactive model of my work. GAM and ironSource are historical integration examples; SDK and adapter changes illustrate configuration choices. Consent work covered the EU, the US and other regions.',
          'Упрощённая интерактивная модель моей работы. GAM и ironSource — примеры интеграций того периода; смена SDK и адаптера иллюстрирует выбор конфигурации. Работа с consent учитывала требования ЕС, США и других регионов.',
        )}
      </p>
      <AdShowcase
        lang={lang}
        config={adConfig}
        onChange={updateAdConfig}
        onEvent={emitAdEvent}
        resetVersion={adResetVersion}
      />
    </section>
  );
}
