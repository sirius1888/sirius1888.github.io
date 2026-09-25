import {
  ArrowDown,
  ChartNoAxesCombined,
  Check,
  FlaskConical,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { Button, ChoiceGroup, ToggleField } from '../../ui-kit';
import { musicApps, type AdConfig } from './model';
/** Controlled visual model of SDKs, adapters and independent advertising modules. */
export function AdsArchitecture({
  lang,
  config,
  onChange,
  events,
  onReset,
}: {
  lang: Language;
  config: Omit<AdConfig, 'consent'>;
  onChange: (patch: Partial<Omit<AdConfig, 'consent'>>, event: string) => void;
  events: string[];
  onReset: () => void;
}) {
  const t = local(lang);
  return (
    <div className="ads-architecture">
      <div className="architecture-chrome">
        <span>
          <span className="live-dot" /> {t('SHARED ADVERTISING MODULE', 'ОБЩИЙ РЕКЛАМНЫЙ МОДУЛЬ')}
        </span>
        <Button
          className="architecture-reset"
          onClick={onReset}
          aria-label={t('Reset advertising architecture', 'Сбросить рекламную архитектуру')}
        >
          <RotateCcw size={13} />
          {t('Reset', 'Сбросить')}
        </Button>
      </div>
      <div className="architecture-flow">
        <div className="architecture-products">
          {Object.entries(musicApps).map(([key, app]) => (
            <div key={key}>
              <img src={app.icon} alt="" />
              <span>{app.name}</span>
              <small>React Native</small>
            </div>
          ))}
        </div>
        <div className="architecture-join" aria-hidden="true">
          <span />
          <span />
          <ArrowDown size={17} />
        </div>
        <div className="shared-module">
          <div className="shared-module-heading">
            <Layers size={24} />
            <div>
              <h3>{t('Advertising module', 'Рекламный модуль')}</h3>
              <p>
                {t(
                  'Product code stays independent of the ad vendor.',
                  'Код продукта не привязан к рекламному вендору.',
                )}
              </p>
            </div>
            <span className="module-badge">{t('MY CONTRIBUTION', 'МОЙ ВКЛАД')}</span>
          </div>
          <div className="integration-controls">
            <div>
              <span className="control-label">
                {t('01 / SDK CONFIGURATION', '01 / КОНФИГУРАЦИЯ SDK')}
              </span>
              <ChoiceGroup
                className="sdk-switch"
                label={t('Advertising SDK', 'Рекламный SDK')}
                value={config.sdk}
                options={(['GAM', 'ironSource'] as const).map((value) => ({ value, label: value }))}
                onValueChange={(sdk) => onChange({ sdk }, 'sdk.changed')}
                renderOption={(option, selected) => (
                  <>
                    <span />
                    {option.label}
                    {selected && <Check size={13} />}
                  </>
                )}
              />
            </div>
            <div>
              <span className="control-label">
                {t('02 / ADAPTER VARIANT', '02 / ВАРИАНТ АДАПТЕРА')}
              </span>
              <ChoiceGroup
                className="adapter-switch"
                label={t('Adapter variant', 'Вариант адаптера')}
                value={config.adapter}
                options={(['A', 'B'] as const).map((value) => ({
                  value,
                  label: `${t('Adapter', 'Адаптер')} ${value}`,
                }))}
                onValueChange={(adapter) => onChange({ adapter }, 'adapter.changed')}
                renderOption={(option, selected) => (
                  <>
                    {option.label}
                    {selected && <Check size={13} />}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className="architecture-branches" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="architecture-modules">
          <ToggleField
            pressed={config.analytics}
            onPressedChange={(analytics) => onChange({ analytics }, 'analytics.connected')}
            icon={<ChartNoAxesCombined size={22} />}
            title={t('Analytics', 'Аналитика')}
            description={t('Independent event module', 'Независимый модуль событий')}
          />
          <ToggleField
            pressed={config.experiments}
            onPressedChange={(experiments) => onChange({ experiments }, 'experiments.changed')}
            icon={<FlaskConical size={22} />}
            title={t('Experiments', 'Эксперименты')}
            description={t('SDK & adapter configurations', 'Конфигурации SDK и адаптеров')}
          />
        </div>
        {config.experiments && (
          <div className="experiment-preview">
            <span>{t('EXPERIMENT PREVIEW', 'ПРИМЕР ЭКСПЕРИМЕНТА')}</span>
            <div>
              <b>A</b> {config.sdk} / {t('Adapter', 'Адаптер')} A
            </div>
            <div>
              <b>B</b> {config.sdk} / {t('Adapter', 'Адаптер')} B
            </div>
          </div>
        )}
      </div>
      <div
        className="event-console"
        role="status"
        aria-label={t('Demo analytics events', 'События демо-аналитики')}
      >
        <span className={config.analytics ? 'event-light active' : 'event-light'} />
        <strong>
          {config.analytics
            ? t('ANALYTICS ONLINE', 'АНАЛИТИКА ПОДКЛЮЧЕНА')
            : t('ANALYTICS OFFLINE', 'АНАЛИТИКА ОТКЛЮЧЕНА')}
        </strong>
        <code>
          {config.analytics
            ? events.at(-1) || t('Waiting for an interaction…', 'Ожидание действия…')
            : t('Demo events are not recorded', 'События демо не записываются')}
        </code>
        <span>{config.analytics ? String(events.length).padStart(2, '0') : '—'}</span>
      </div>
    </div>
  );
}
