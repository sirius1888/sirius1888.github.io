import { localize as local, type Language } from '../../i18n';
import { DeviceFrame, ProductLabel } from '../../ui-kit';
import { AdOverlay } from './AdOverlay';
import { AdShowcaseControls } from './AdShowcaseControls';
import { musicApps, type AdConfig } from './model';
import { MusicAppScreen } from './MusicAppScreen';
import { useAdPlacement } from './useAdPlacement';
/** Advertising format demonstration, composed from controlled configuration and local placement state. */
export function AdShowcase({
  lang,
  config,
  onChange,
  onEvent,
  resetVersion,
}: {
  lang: Language;
  config: Pick<AdConfig, 'sdk' | 'adapter' | 'analytics' | 'consent'>;
  onChange: (patch: Partial<AdConfig>, event: string) => void;
  onEvent: (event: string) => void;
  resetVersion: number;
}) {
  const t = local(lang);
  const placement = useAdPlacement({ consent: config.consent, resetVersion, onEvent });
  const {
    app,
    format,
    overlay,
    rewardPhase,
    seconds,
    claimed,
    chooseApp,
    chooseFormat,
    showAd,
    closeOverlay,
    claimReward,
    openCreative,
  } = placement;
  const appInfo = musicApps[app];
  return (
    <div className="ad-showcase" data-reveal>
      <AdShowcaseControls
        lang={lang}
        config={config}
        onConsentChange={(consent) =>
          onChange({ consent }, consent ? 'consent.granted' : 'consent.withdrawn')
        }
        app={app}
        format={format}
        onAppChange={chooseApp}
        onFormatChange={chooseFormat}
      />
      <div className={`ad-phone-stage ${app}`}>
        <ProductLabel
          image={appInfo.icon}
          title={appInfo.name}
          detail={t('AD INTEGRATION', 'РЕКЛАМНАЯ ИНТЕГРАЦИЯ')}
        />
        <DeviceFrame
          label={t('Advertising examples in iPhone', 'Примеры рекламы в iPhone')}
          className={`music-device ${app}`}
        >
          <MusicAppScreen
            lang={lang}
            app={app}
            format={format}
            consent={config.consent}
            claimed={claimed}
            onShowAd={showAd}
            onOpenCreative={openCreative}
            overlayContent={
              overlay && (
                <AdOverlay
                  key={overlay}
                  lang={lang}
                  overlay={overlay}
                  rewardPhase={rewardPhase}
                  seconds={seconds}
                  sdk={config.sdk}
                  adapter={config.adapter}
                  onDismiss={closeOverlay}
                  onClaim={claimReward}
                />
              )
            }
          />
        </DeviceFrame>
        <p className="device-caption">
          {t(
            'Reconstructed UI · demo ads · no tracking',
            'Реконструкция интерфейса · демо-реклама · без отслеживания',
          )}
        </p>
      </div>
    </div>
  );
}
