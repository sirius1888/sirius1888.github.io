import { Mic, MicOff, VideoOff } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';

export type CallParticipantsProps = {
  lang: Language;
  mic: boolean;
  camera: boolean;
  viewer: boolean;
  reconnecting: boolean;
};
/** Conference tiles and capture indicators; all state is supplied by the call controller. */
export function CallParticipants({
  lang,
  mic,
  camera,
  viewer,
  reconnecting,
}: CallParticipantsProps) {
  const t = local(lang);
  return (
    <div className="call-tiles">
      <div className={`main-participant ${!camera || viewer ? 'camera-off' : ''}`}>
        {camera || viewer ? (
          <img
            src="./images/sergei.jpg"
            alt={t('Sergei, demo participant', 'Сергей, участник демо')}
          />
        ) : (
          <div className="camera-placeholder">
            <VideoOff size={26} />
            <span>
              {viewer
                ? t('You are watching', 'Вы в режиме зрителя')
                : t('Camera is off', 'Камера выключена')}
            </span>
          </div>
        )}
        <span>
          {t('Sergei', 'Сергей')}
          {mic && !viewer ? <Mic size={12} /> : <MicOff size={12} />}
        </span>
        {mic && !viewer && !reconnecting && (
          <div className="voice-bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="small-participants">
        <div>
          <span className="participant-avatar">A</span>
          <small>{t('Alex', 'Алексей')}</small>
          <MicOff size={10} />
        </div>
        <div>
          <span className="participant-avatar second">M</span>
          <small>{t('Maya', 'Майя')}</small>
          <Mic size={10} />
        </div>
      </div>
    </div>
  );
}
