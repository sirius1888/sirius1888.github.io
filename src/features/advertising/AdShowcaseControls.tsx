import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { ChoiceGroup, Link, ToggleField } from '../../ui-kit';
import { musicApps, type AdConfig, type AdFormat, type MusicApp } from './model';

export type AdShowcaseControlsProps = {
  lang: Language;
  config: Pick<AdConfig, 'sdk' | 'adapter' | 'analytics' | 'consent'>;
  onConsentChange: (consent: boolean) => void;
  app: MusicApp;
  format: AdFormat;
  onAppChange: (value: MusicApp) => void;
  onFormatChange: (value: AdFormat) => void;
};
/** Controlled product, format and consent selectors with the current configuration summary. */
export function AdShowcaseControls({
  lang,
  config,
  onConsentChange,
  app,
  format,
  onAppChange,
  onFormatChange,
}: AdShowcaseControlsProps) {
  const t = local(lang);
  const appInfo = musicApps[app];
  const descriptions: Record<AdFormat, [string, string]> = {
    banner: [
      'A dedicated placement in the screen layout.',
      'Отдельное рекламное место в компоновке экрана.',
    ],
    native: [
      'A sponsored item styled for the surrounding content.',
      'Рекламный элемент, оформленный в контексте списка.',
    ],
    interstitial: [
      'A full-screen placement shown at a transition.',
      'Полноэкранное размещение в точке перехода.',
    ],
    rewarded: [
      'An optional ad with a reward after completion.',
      'Добровольный просмотр с наградой после завершения.',
    ],
  };
  return (
    <div className="ad-showcase-copy">
      <span className="case-kicker">ULTIMATE GUITAR + MUSESCORE</span>
      <h3>{t('Advertising formats', 'Рекламные форматы')}</h3>
      <p>
        {t(
          'I worked with banners, native, interstitial and rewarded ads in Ultimate Guitar and MuseScore, and optimized the screens around them.',
          'Работал с баннерами, нативной, interstitial- и rewarded-рекламой в Ultimate Guitar и MuseScore, оптимизировал экраны с рекламными размещениями.',
        )}
      </p>
      <ChoiceGroup
        className="music-app-picker"
        label={t('Select advertising app', 'Выбрать приложение с рекламой')}
        value={app}
        onValueChange={onAppChange}
        options={(['ug', 'musescore'] as const).map((value) => ({
          value,
          label: musicApps[value].name,
          image: musicApps[value].icon,
        }))}
        renderOption={(option, selected) => (
          <>
            <img src={option.image} alt="" />
            {option.label}
            {selected && <Check size={13} />}
          </>
        )}
      />
      <ChoiceGroup
        className="ad-format-picker"
        label={t('Advertising format', 'Рекламный формат')}
        value={format}
        onValueChange={onFormatChange}
        options={(['banner', 'native', 'interstitial', 'rewarded'] as const).map((value) => ({
          value,
          label:
            value === 'banner'
              ? t('Banner', 'Баннер')
              : value === 'native'
                ? t('Native ad', 'Нативная реклама')
                : value === 'interstitial'
                  ? 'Interstitial'
                  : 'Rewarded',
        }))}
        renderOption={(option, selected, index) => (
          <>
            <span>0{index + 1}</span>
            <strong>{option.label}</strong>
            <span className="selection-mark" aria-hidden="true">
              {selected && <Check size={15} />}
            </span>
          </>
        )}
      />
      <p className="format-description">{t(...descriptions[format])}</p>
      <ToggleField
        className="consent-toggle"
        pressed={config.consent}
        onPressedChange={onConsentChange}
        icon={<ShieldCheck size={18} />}
        title={
          config.consent
            ? t('Demo consent granted', 'Демо-согласие получено')
            : t('Allow demo advertising', 'Разрешить демо-рекламу')
        }
        description={t(
          'Try granting and withdrawing consent.',
          'Попробуйте дать и отозвать согласие.',
        )}
      />
      <div className="active-ad-config">
        <span>{config.sdk}</span>
        <span>
          {t('Adapter', 'Адаптер')} {config.adapter}
        </span>
        <span>
          {config.analytics
            ? t('Analytics on', 'Аналитика вкл.')
            : t('Analytics off', 'Аналитика выкл.')}
        </span>
      </div>
      <Link href={appInfo.url} target="_blank" rel="noreferrer" className="text-link">
        {appInfo.name} {t('on the App Store', 'в App Store')}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
