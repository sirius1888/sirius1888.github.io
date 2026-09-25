import { ChevronRight, PictureInPicture2, Video } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { IconButton, ListRow } from '../../ui-kit';

/** Visual PiP scene with a controlled return action; it does not invoke system PiP APIs. */
export function PictureInPicture({ lang, onClose }: { lang: Language; onClose: () => void }) {
  const t = local(lang);
  return (
    <div className="pip-background">
      <div className="pip-page-head">
        <img src="./images/vinteo.jpg" alt="" />
        <strong>Vinteo</strong>
      </div>
      <h3>{t('Conferences', 'Конференции')}</h3>
      <p>{t('The video call continues in PiP.', 'Видеозвонок продолжается в PiP.')}</p>
      {['Product sync', 'Mobile team', 'Design review'].map((name, index) => (
        <ListRow
          key={name}
          className="pip-list"
          leading={<Video size={16} />}
          title={
            lang === 'ru'
              ? ['Встреча продукта', 'Мобильная команда', 'Обсуждение дизайна'][index]
              : name
          }
          description={index === 1 ? t('In progress', 'Идёт сейчас') : t('Today', 'Сегодня')}
          trailing={<ChevronRight size={14} />}
        />
      ))}
      <div className="pip-window">
        <img
          src="./images/sergei.jpg"
          alt={t('Picture in Picture demonstration', 'Демонстрация Picture in Picture')}
        />
        <IconButton
          onClick={onClose}
          label={t('Return to full call', 'Вернуться к звонку')}
          icon={<PictureInPicture2 size={16} />}
        />
        <span>{t('Mobile team', 'Мобильная команда')}</span>
      </div>
      <div className="pip-note">
        {t('iOS PiP · visual demonstration', 'PiP на iOS · визуальная демонстрация')}
      </div>
    </div>
  );
}
