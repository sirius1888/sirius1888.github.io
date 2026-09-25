import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { ChoiceGroup, Link, ToggleField } from '../../ui-kit';
import { musicApps, type AdConfig, type AdFormat, type MusicApp } from './model';

export type AdShowcaseControlsProps = {
  lang: Language;
  config: Pick<AdConfig, 'consent'>;
  onConsentChange: (consent: boolean) => void;
  app: MusicApp;
  format: AdFormat;
  onAppChange: (value: MusicApp) => void;
  onFormatChange: (value: AdFormat) => void;
};
/** Plain-language product and format choices for the visual example. */
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
      <span className="case-kicker">{t('SEE IT IN AN APP', 'КАК ЭТО ВЫГЛЯДИТ В ПРИЛОЖЕНИИ')}</span>
      <h3>{t('One approach, different products', 'Общий подход — разные продукты')}</h3>
      <p>
        {t(
          'Choose a product and an ad format to see how advertising fits into the app. Ultimate Guitar and MuseScore are examples of products using the shared module.',
          'Выберите продукт и формат, чтобы увидеть, как реклама встроена в приложение. Ultimate Guitar и MuseScore — примеры продуктов, в которых использовался общий модуль.',
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
                ? t('In-feed ad', 'В ленте')
                : value === 'interstitial'
                  ? t('Full-screen ad', 'На весь экран')
                  : t('With a reward', 'За вознаграждение'),
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
        title={t('Show ads in this example', 'Показывать рекламу в примере')}
        description={t(
          'Compare the screen with and without advertising.',
          'Сравните экран с рекламой и без неё.',
        )}
      />
      <Link href={appInfo.url} target="_blank" rel="noreferrer" className="text-link">
        {appInfo.name} {t('on the App Store', 'в App Store')}
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
