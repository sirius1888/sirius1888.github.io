import {
  BookOpen,
  ChevronRight,
  CirclePlay,
  Disc3,
  Gift,
  Guitar,
  Library,
  Music2,
  Search,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { localize as local, type Language } from '../../i18n';
import { Button, ListRow } from '../../ui-kit';
import { DemoCreative } from './DemoCreative';
import { musicApps, type AdFormat, type MusicApp } from './model';

export type MusicAppScreenProps = {
  lang: Language;
  app: MusicApp;
  format: AdFormat;
  consent: boolean;
  claimed: boolean;
  onShowAd: () => void;
  onOpenCreative: () => void;
  overlayContent: ReactNode;
};
/** Reconstructed music-library UI with controlled ad placements and an overlay slot. */
export function MusicAppScreen({
  lang,
  app,
  format,
  consent,
  claimed,
  onShowAd,
  onOpenCreative,
  overlayContent,
}: MusicAppScreenProps) {
  const t = local(lang);
  const appInfo = musicApps[app];
  return (
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
        <ListRow
          className="library-item"
          leading={<Music2 size={18} />}
          title={t('Morning session', 'Утренняя практика')}
          description={
            app === 'ug'
              ? t('Acoustic · Collection', 'Акустика · Подборка')
              : t('Piano · Collection', 'Фортепиано · Подборка')
          }
          trailing={<ChevronRight size={15} />}
        />
        {format === 'native' &&
          (consent ? (
            <DemoCreative lang={lang} onOpen={onOpenCreative} />
          ) : (
            <div className="native-empty">
              <ShieldCheck size={16} />
              {t('Ad space · awaiting consent', 'Рекламное место · ожидает согласия')}
            </div>
          ))}
        <ListRow
          className="library-item"
          leading={<Disc3 size={18} />}
          title={t('Evening practice', 'Вечерняя практика')}
          description={t('Collection', 'Подборка')}
          trailing={<ChevronRight size={15} />}
        />
        {(format === 'interstitial' || format === 'rewarded') && (
          <div className="full-ad-trigger">
            <Button onClick={onShowAd} disabled={!consent}>
              {format === 'rewarded' ? <Gift size={16} /> : <CirclePlay size={16} />}{' '}
              {format === 'rewarded'
                ? t('Watch demo for a reward', 'Демо-просмотр за награду')
                : t('Show interstitial', 'Показать interstitial')}
            </Button>
            <small>
              {consent
                ? claimed
                  ? t('Demo reward received', 'Демо-награда получена')
                  : format === 'rewarded'
                    ? t('Optional · 4-second simulation', 'По желанию · симуляция 4 секунды')
                    : t('Tap to simulate a screen transition', 'Нажмите для имитации перехода')
                : t('Grant demo consent to continue', 'Сначала дайте демо-согласие')}
            </small>
          </div>
        )}
      </div>
      {format === 'banner' && (
        <div className="banner-slot">
          {consent ? (
            <DemoCreative lang={lang} compact onOpen={onOpenCreative} />
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
      {overlayContent}
    </div>
  );
}
