import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChartNoAxesCombined,
  ChevronRight,
  CirclePlay,
  Disc3,
  FlaskConical,
  Gift,
  Guitar,
  Layers,
  Library,
  Music2,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { localize as local, type Language } from '../content';
import { IPhone } from './Phone';
export type AdConfig = {
  sdk: 'GAM' | 'ironSource';
  adapter: 'A' | 'B';
  analytics: boolean;
  experiments: boolean;
  consent: boolean;
};
export type AdFormat = 'banner' | 'native' | 'interstitial' | 'rewarded';
export type MusicApp = 'ug' | 'musescore';
export const initialAdConfig: AdConfig = {
  sdk: 'GAM',
  adapter: 'A',
  analytics: true,
  experiments: false,
  consent: false,
};
export const musicApps = {
  ug: {
    name: 'Ultimate Guitar',
    icon: './images/ultimate-guitar.jpg',
    url: 'https://apps.apple.com/ru/app/ultimate-guitar-chords-tabs/id357828853',
  },
  musescore: {
    name: 'MuseScore',
    icon: './images/musescore.jpg',
    url: 'https://apps.apple.com/us/app/musescore-sheet-music-chords/id835731296',
  },
};

export function AdsArchitecture({
  lang,
  config,
  onChange,
  events,
  onReset,
}: {
  lang: Language;
  config: AdConfig;
  onChange: (patch: Partial<AdConfig>, event: string) => void;
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
        <button
          className="architecture-reset"
          onClick={onReset}
          aria-label={t('Reset advertising architecture', 'Сбросить рекламную архитектуру')}
        >
          <RotateCcw size={13} />
          {t('Reset', 'Сбросить')}
        </button>
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
              <div
                className="sdk-switch"
                role="group"
                aria-label={t('Advertising SDK', 'Рекламный SDK')}
              >
                {(['GAM', 'ironSource'] as const).map((sdk) => (
                  <button
                    key={sdk}
                    aria-pressed={config.sdk === sdk}
                    onClick={() => onChange({ sdk }, 'sdk.changed')}
                  >
                    <span />
                    {sdk}
                    {config.sdk === sdk && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="control-label">
                {t('02 / ADAPTER VARIANT', '02 / ВАРИАНТ АДАПТЕРА')}
              </span>
              <div
                className="adapter-switch"
                role="group"
                aria-label={t('Adapter variant', 'Вариант адаптера')}
              >
                {(['A', 'B'] as const).map((adapter) => (
                  <button
                    key={adapter}
                    aria-pressed={config.adapter === adapter}
                    onClick={() => onChange({ adapter }, 'adapter.changed')}
                  >
                    {t('Adapter', 'Адаптер')} {adapter}
                    {config.adapter === adapter && <Check size={13} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="architecture-branches" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="architecture-modules">
          <button
            className={config.analytics ? 'enabled' : ''}
            aria-pressed={config.analytics}
            onClick={() => onChange({ analytics: !config.analytics }, 'analytics.connected')}
          >
            <ChartNoAxesCombined size={22} />
            <span>
              <strong>{t('Analytics', 'Аналитика')}</strong>
              <small>{t('Independent event module', 'Независимый модуль событий')}</small>
            </span>
            <span className="toggle" />
          </button>
          <button
            className={config.experiments ? 'enabled' : ''}
            aria-pressed={config.experiments}
            onClick={() => onChange({ experiments: !config.experiments }, 'experiments.changed')}
          >
            <FlaskConical size={22} />
            <span>
              <strong>{t('Experiments', 'Эксперименты')}</strong>
              <small>{t('SDK & adapter configurations', 'Конфигурации SDK и адаптеров')}</small>
            </span>
            <span className="toggle" />
          </button>
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

function DemoCreative({
  lang,
  compact = false,
  onOpen,
}: {
  lang: Language;
  compact?: boolean;
  onOpen: () => void;
}) {
  const t = local(lang);
  return (
    <button className={`demo-creative ${compact ? 'compact' : ''}`} onClick={onOpen}>
      <span className="creative-mark">
        <Sparkles size={compact ? 19 : 26} />
      </span>
      <span>
        <small>{t('AD · DEMO', 'РЕКЛАМА · ДЕМО')}</small>
        <strong>{t('Sample advertisement', 'Пример объявления')}</strong>
        <span>
          {t('View ad', 'Открыть объявление')}
          <ArrowUpRight size={11} />
        </span>
      </span>
    </button>
  );
}
export function AdShowcase({
  lang,
  config,
  onChange,
  onEvent,
  resetVersion,
}: {
  lang: Language;
  config: AdConfig;
  onChange: (patch: Partial<AdConfig>, event: string) => void;
  onEvent: (event: string) => void;
  resetVersion: number;
}) {
  const t = local(lang);
  const [app, setApp] = useState<MusicApp>('ug');
  const [format, setFormat] = useState<AdFormat>('banner');
  const [overlay, setOverlay] = useState<'interstitial' | 'rewarded' | 'creative' | null>(null);
  const [rewardPhase, setRewardPhase] = useState<'idle' | 'playing' | 'complete'>('idle');
  const [seconds, setSeconds] = useState(4);
  const [claimed, setClaimed] = useState(false);
  const emitRef = useRef(onEvent);
  emitRef.current = onEvent;
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
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
  function clearPlacement() {
    setOverlay(null);
    setRewardPhase('idle');
    setSeconds(4);
    setClaimed(false);
  }
  function chooseApp(next: MusicApp) {
    clearPlacement();
    setApp(next);
    onEvent('app.changed');
  }
  function chooseFormat(next: AdFormat) {
    clearPlacement();
    setFormat(next);
    onEvent(`format.${next}.selected`);
  }
  useEffect(() => {
    if (!config.consent) clearPlacement();
  }, [config.consent]);
  useEffect(() => {
    clearPlacement();
    setApp('ug');
    setFormat('banner');
  }, [resetVersion]);
  useEffect(() => {
    if (!overlay) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      returnFocusRef.current?.focus({ preventScroll: true });
    };
  }, [overlay]);
  useEffect(() => {
    if (overlay !== 'rewarded' || rewardPhase !== 'playing' || !config.consent) return;
    const tick = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const finish = setTimeout(() => {
      setRewardPhase('complete');
      emitRef.current('rewarded.completed');
    }, 4000);
    return () => {
      clearInterval(tick);
      clearTimeout(finish);
    };
  }, [overlay, rewardPhase, config.consent]);
  function closeOverlay() {
    setOverlay(null);
    if (rewardPhase === 'playing') {
      setRewardPhase('idle');
      setSeconds(4);
      onEvent('rewarded.cancelled');
    }
  }
  function showAd() {
    if (!config.consent) return;
    setOverlay(format === 'rewarded' ? 'rewarded' : 'interstitial');
    if (format === 'rewarded') {
      setRewardPhase('playing');
      setSeconds(4);
      setClaimed(false);
    }
    onEvent(`${format}.opened`);
  }
  return (
    <div className="ad-showcase">
      <div className="ad-showcase-copy">
        <span className="case-kicker">ULTIMATE GUITAR + MUSESCORE</span>
        <h3>{t('Advertising formats', 'Рекламные форматы')}</h3>
        <p>
          {t(
            'I worked with banners, native, interstitial and rewarded ads in Ultimate Guitar and MuseScore, and optimized the screens around them.',
            'Работал с баннерами, нативной, interstitial- и rewarded-рекламой в Ultimate Guitar и MuseScore, оптимизировал экраны с рекламными размещениями.',
          )}
        </p>
        <div
          className="music-app-picker"
          role="group"
          aria-label={t('Select advertising app', 'Выбрать приложение с рекламой')}
        >
          {Object.entries(musicApps).map(([key, item]) => (
            <button key={key} aria-pressed={app === key} onClick={() => chooseApp(key as MusicApp)}>
              <img src={item.icon} alt="" />
              {item.name}
              {app === key && <Check size={13} />}
            </button>
          ))}
        </div>
        <div
          className="ad-format-picker"
          role="group"
          aria-label={t('Advertising format', 'Рекламный формат')}
        >
          {(['banner', 'native', 'interstitial', 'rewarded'] as AdFormat[]).map((item, index) => (
            <button key={item} aria-pressed={format === item} onClick={() => chooseFormat(item)}>
              <span>0{index + 1}</span>
              <strong>
                {item === 'banner'
                  ? t('Banner', 'Баннер')
                  : item === 'native'
                    ? t('Native ad', 'Нативная реклама')
                    : item === 'interstitial'
                      ? 'Interstitial'
                      : 'Rewarded'}
              </strong>
              <span className="selection-mark" aria-hidden="true">
                {format === item && <Check size={15} />}
              </span>
            </button>
          ))}
        </div>
        <p className="format-description">{t(...descriptions[format])}</p>
        <button
          className={`consent-toggle ${config.consent ? 'enabled' : ''}`}
          aria-pressed={config.consent}
          onClick={() =>
            onChange(
              { consent: !config.consent },
              config.consent ? 'consent.withdrawn' : 'consent.granted',
            )
          }
        >
          <ShieldCheck size={18} />
          <span>
            <strong>
              {config.consent
                ? t('Demo consent granted', 'Демо-согласие получено')
                : t('Allow demo advertising', 'Разрешить демо-рекламу')}
            </strong>
            <small>
              {t('Try granting and withdrawing consent.', 'Попробуйте дать и отозвать согласие.')}
            </small>
          </span>
          <span className="toggle" />
        </button>
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
        <a href={appInfo.url} target="_blank" rel="noreferrer" className="text-link">
          {appInfo.name} {t('on the App Store', 'в App Store')}
          <ArrowUpRight size={14} />
        </a>
      </div>
      <div className={`ad-phone-stage ${app}`}>
        <div className="phone-stage-tag">
          <img src={appInfo.icon} alt="" />
          <span>{appInfo.name}</span>
          <small>{t('AD INTEGRATION', 'РЕКЛАМНАЯ ИНТЕГРАЦИЯ')}</small>
        </div>
        <IPhone
          label={t('Advertising examples in iPhone', 'Примеры рекламы в iPhone')}
          className={`music-device ${app}`}
        >
          <div className={`music-app ${app}`}>
            <div className="music-app-header">
              <img src={appInfo.icon} alt="" />
              <strong>{app === 'ug' ? 'Ultimate Guitar' : 'MuseScore'}</strong>
              <span>
                <Search size={17} />
              </span>
            </div>
            <div className="music-app-body">
              <span className="music-eyebrow">{t('YOUR LIBRARY', 'ВАША БИБЛИОТЕКА')}</span>
              <h4>{app === 'ug' ? t('My tabs', 'Мои табы') : t('My scores', 'Мои ноты')}</h4>
              <div className="library-feature">
                <span>
                  {app === 'ug' ? (
                    <Guitar size={47} strokeWidth={1} />
                  ) : (
                    <Music2 size={47} strokeWidth={1} />
                  )}
                </span>
                <small>
                  {app === 'ug'
                    ? t('GUITAR COLLECTION', 'ПОДБОРКА ДЛЯ ГИТАРЫ')
                    : t('PIANO COLLECTION', 'ПОДБОРКА ДЛЯ ФОРТЕПИАНО')}
                </small>
                <strong>
                  {app === 'ug'
                    ? t('Everyday practice', 'Ежедневная практика')
                    : t('Piano exercises', 'Упражнения для фортепиано')}
                </strong>
              </div>
              <div className="library-section-label">
                <strong>{t('Saved collections', 'Сохранённые подборки')}</strong>
                <span>03</span>
              </div>
              <div className="library-item">
                <span>
                  <Music2 size={18} />
                </span>
                <div>
                  <strong>{t('Morning session', 'Утренняя практика')}</strong>
                  <small>
                    {app === 'ug'
                      ? t('Acoustic · Collection', 'Акустика · Подборка')
                      : t('Piano · Collection', 'Фортепиано · Подборка')}
                  </small>
                </div>
                <ChevronRight size={15} />
              </div>
              {format === 'native' &&
                (config.consent ? (
                  <DemoCreative lang={lang} onOpen={() => setOverlay('creative')} />
                ) : (
                  <div className="native-empty">
                    <ShieldCheck size={16} />
                    {t('Ad space · awaiting consent', 'Рекламное место · ожидает согласия')}
                  </div>
                ))}
              <div className="library-item">
                <span>
                  <Disc3 size={18} />
                </span>
                <div>
                  <strong>{t('Evening practice', 'Вечерняя практика')}</strong>
                  <small>{t('Collection', 'Подборка')}</small>
                </div>
                <ChevronRight size={15} />
              </div>
              {(format === 'interstitial' || format === 'rewarded') && (
                <div className="full-ad-trigger">
                  <button onClick={showAd} disabled={!config.consent}>
                    {format === 'rewarded' ? <Gift size={16} /> : <CirclePlay size={16} />}{' '}
                    {format === 'rewarded'
                      ? t('Watch demo for a reward', 'Демо-просмотр за награду')
                      : t('Show interstitial', 'Показать interstitial')}
                  </button>
                  <small>
                    {config.consent
                      ? claimed
                        ? t('Demo reward received', 'Демо-награда получена')
                        : format === 'rewarded'
                          ? t('Optional · 4-second simulation', 'По желанию · симуляция 4 секунды')
                          : t(
                              'Tap to simulate a screen transition',
                              'Нажмите для имитации перехода',
                            )
                      : t('Grant demo consent to continue', 'Сначала дайте демо-согласие')}
                  </small>
                </div>
              )}
            </div>
            {format === 'banner' && (
              <div className="banner-slot">
                {config.consent ? (
                  <DemoCreative lang={lang} compact onOpen={() => setOverlay('creative')} />
                ) : (
                  <div className="banner-empty">
                    <ShieldCheck size={18} />
                    <span>
                      {t('Ad placement', 'Рекламное место')}
                      <small>{t('Awaiting your consent', 'Ожидает вашего согласия')}</small>
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className="music-bottom-nav">
              <span>
                <Library size={18} />
                {t('Library', 'Библиотека')}
              </span>
              <span>
                <Search size={18} />
                {t('Discover', 'Поиск')}
              </span>
              <span>
                <BookOpen size={18} />
                {t('Practice', 'Практика')}
              </span>
            </div>
            {overlay && (
              <section
                className={`ad-overlay ${overlay}`}
                role="dialog"
                aria-label={
                  overlay === 'rewarded'
                    ? t('Rewarded advertising demo', 'Демонстрация rewarded-рекламы')
                    : overlay === 'interstitial'
                      ? t('Interstitial advertising demo', 'Демонстрация interstitial-рекламы')
                      : t('Demo creative details', 'Описание демо-объявления')
                }
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.stopPropagation();
                    closeOverlay();
                  }
                }}
              >
                <div className="ad-overlay-top">
                  <span>{t('ADVERTISEMENT · DEMO', 'РЕКЛАМА · ДЕМО')}</span>
                  <button
                    ref={closeRef}
                    onClick={closeOverlay}
                    aria-label={t('Close demo ad', 'Закрыть демо-рекламу')}
                  >
                    <X size={18} />
                  </button>
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
                        ? t(
                            'The demo is complete. Collect your reward.',
                            'Демо завершено. Получите награду.',
                          )
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
                      <div style={{ width: `${((4 - seconds) / 4) * 100}%` }} />
                    </div>
                  )}
                  {overlay === 'rewarded' && rewardPhase === 'complete' && (
                    <button
                      className="claim-reward"
                      onClick={() => {
                        setClaimed(true);
                        setOverlay(null);
                        setRewardPhase('idle');
                        onEvent('reward.claimed');
                      }}
                    >
                      <Check size={17} />
                      {t('Collect demo reward', 'Получить демо-награду')}
                    </button>
                  )}
                  {overlay !== 'rewarded' && (
                    <button className="claim-reward" onClick={closeOverlay}>
                      {t('Back to the application', 'Вернуться в приложение')}
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
                <div className="overlay-sdk">
                  {config.sdk} · {t('Adapter', 'Адаптер')} {config.adapter}
                </div>
              </section>
            )}
          </div>
        </IPhone>
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
