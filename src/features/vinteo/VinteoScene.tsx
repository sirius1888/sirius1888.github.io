import { ArrowRight, Eye, Phone, RotateCcw, WifiOff } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { Button, IconButton } from '../../ui-kit';
import { CallControls } from './CallControls';
import { CallParticipants } from './CallParticipants';
import { ChatPanel } from './ChatPanel';
import type { Demo } from './model';
import { PictureInPicture } from './PictureInPicture';
import { useConferenceCall } from './useConferenceCall';
/** Conference simulation: composes call participants, controls and scenario surfaces. */
export function VinteoScene({
  lang,
  demo,
  onDemo,
}: {
  lang: Language;
  demo: Demo;
  onDemo: (demo: Demo) => void;
}) {
  const t = local(lang);
  const {
    mic,
    camera,
    ended,
    messages,
    draft,
    viewer,
    setMic,
    setCamera,
    setDraft,
    reset,
    sendMessage,
    hangUp,
  } = useConferenceCall({ demo, onDemo });
  return (
    <div className={`vinteo-scene ${demo === 'pip' ? 'pip-mode' : ''}`}>
      {ended ? (
        <div className="call-ended">
          <span className="end-call-icon">
            <Phone size={28} />
          </span>
          <h3>{t('Call ended', 'Звонок завершён')}</h3>
          <p>{t('You can rejoin the demo call.', 'Можно подключиться к демо-звонку снова.')}</p>
          <Button className="phone-primary" onClick={reset}>
            {t('Join again', 'Подключиться снова')} <ArrowRight size={14} />
          </Button>
        </div>
      ) : (
        <>
          <div className="call-header">
            <div>
              <strong>{t('Mobile team', 'Мобильная команда')}</strong>
              <span>
                <i className={demo === 'reconnect' ? 'offline' : ''} />
                {demo === 'reconnect'
                  ? t('Reconnecting…', 'Переподключение…')
                  : viewer
                    ? t('Watching · 3 participants', 'Просмотр · 3 участника')
                    : t('Connected · 3 participants', 'На связи · 3 участника')}
              </span>
            </div>
            <IconButton
              title={t('Reset demo', 'Сбросить демо')}
              onClick={reset}
              label={t('Reset conference demo', 'Сбросить демо конференции')}
              icon={<RotateCcw size={15} />}
            />
          </div>
          {viewer && (
            <div className="viewer-banner">
              <Eye size={12} />
              {t('Viewer mode · camera & mic off', 'Режим зрителя · камера и микрофон выкл.')}
            </div>
          )}
          <CallParticipants
            lang={lang}
            mic={mic}
            camera={camera}
            viewer={viewer}
            reconnecting={demo === 'reconnect'}
          />
          <CallControls
            lang={lang}
            mic={mic}
            camera={camera}
            viewer={viewer}
            onMicChange={setMic}
            onCameraChange={setCamera}
            onOpenChat={() => onDemo('chat')}
            onHangUp={hangUp}
          />
          {demo === 'reconnect' && (
            <div className="reconnect-layer" role="status">
              <span className="reconnect-icon">
                <WifiOff size={27} />
              </span>
              <strong>{t('Reconnecting…', 'Переподключение…')}</strong>
              <p>{t('Your call will resume shortly.', 'Разговор скоро продолжится.')}</p>
              <div className="reconnect-progress" />
            </div>
          )}
          {demo === 'chat' && (
            <ChatPanel
              lang={lang}
              messages={messages}
              draft={draft}
              onDraftChange={setDraft}
              onSend={sendMessage}
              onClose={() => onDemo('call')}
            />
          )}
          {demo === 'pip' && <PictureInPicture lang={lang} onClose={() => onDemo('call')} />}
        </>
      )}
    </div>
  );
}
