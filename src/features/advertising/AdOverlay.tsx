import { ArrowRight, Check, Gift, Sparkles, X } from 'lucide-react';
import { useRef } from 'react';
import { localize as local, type Language } from '../../i18n';
import { Button, DialogSurface, IconButton } from '../../ui-kit';
import {
  REWARD_DURATION_SECONDS,
  type AdConfig,
  type AdOverlayKind,
  type RewardPhase,
} from './model';

export type AdOverlayProps = {
  lang: Language;
  overlay: AdOverlayKind;
  rewardPhase: RewardPhase;
  seconds: number;
  sdk: AdConfig['sdk'];
  adapter: AdConfig['adapter'];
  onDismiss: () => void;
  onClaim: () => void;
};
/** Presentational ad/reward screen. Lifecycle and reward eligibility remain in the placement controller. */
export function AdOverlay({
  lang,
  overlay,
  rewardPhase,
  seconds,
  sdk,
  adapter,
  onDismiss,
  onClaim,
}: AdOverlayProps) {
  const t = local(lang);
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <DialogSurface
      className={`ad-overlay ${overlay}`}
      initialFocusRef={closeRef}
      onDismiss={onDismiss}
      label={
        overlay === 'rewarded'
          ? t('Rewarded advertising demo', 'Демонстрация rewarded-рекламы')
          : overlay === 'interstitial'
            ? t('Interstitial advertising demo', 'Демонстрация interstitial-рекламы')
            : t('Demo creative details', 'Описание демо-объявления')
      }
    >
      <div className="ad-overlay-top">
        <span>{t('ADVERTISEMENT · DEMO', 'РЕКЛАМА · ДЕМО')}</span>
        <IconButton
          ref={closeRef}
          onClick={onDismiss}
          label={t('Close demo ad', 'Закрыть демо-рекламу')}
          icon={<X size={18} />}
        />
      </div>
      <div className="full-creative">
        <span className="full-creative-icon">
          {overlay === 'rewarded' ? (
            <Gift size={56} strokeWidth={1} />
          ) : (
            <Sparkles size={56} strokeWidth={1} />
          )}
        </span>
        <span className="full-creative-kicker">
          {overlay === 'rewarded' ? 'REWARDED' : 'DEMO CAMPAIGN'}
        </span>
        <h4>
          {overlay === 'rewarded' && rewardPhase === 'complete'
            ? t('Reward ready', 'Награда доступна')
            : t('Sample\nadvertisement', 'Пример\nобъявления')}
        </h4>
        <p>
          {overlay === 'rewarded'
            ? rewardPhase === 'complete'
              ? t('The demo is complete. Collect your reward.', 'Демо завершено. Получите награду.')
              : t(
                  'Watch the short simulation to complete the flow.',
                  'Дождитесь завершения короткой симуляции.',
                )
            : t(
                'A local example of an advertising placement.',
                'Локальный пример рекламного размещения.',
              )}
        </p>
        {overlay === 'rewarded' && rewardPhase === 'playing' && (
          <div className="reward-countdown" role="status">
            <span>{seconds}</span>
            {t('seconds remaining', 'секунд осталось')}
            <div
              style={{
                width: `${((REWARD_DURATION_SECONDS - seconds) / REWARD_DURATION_SECONDS) * 100}%`,
              }}
            />
          </div>
        )}
        {overlay === 'rewarded' && rewardPhase === 'complete' && (
          <Button className="claim-reward" onClick={onClaim}>
            <Check size={17} />
            {t('Collect demo reward', 'Получить демо-награду')}
          </Button>
        )}
        {overlay !== 'rewarded' && (
          <Button className="claim-reward" onClick={onDismiss}>
            {t('Back to the application', 'Вернуться в приложение')}
            <ArrowRight size={15} />
          </Button>
        )}
      </div>
      <div className="overlay-sdk">
        {sdk} · {t('Adapter', 'Адаптер')} {adapter}
      </div>
    </DialogSurface>
  );
}
