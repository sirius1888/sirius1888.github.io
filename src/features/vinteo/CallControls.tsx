import { MessageCircle, Mic, MicOff, Phone, Video, VideoOff } from 'lucide-react';
import { localize as local, type Language } from '../../i18n';
import { IconButton, ToggleButton } from '../../ui-kit';

export type CallControlsProps = {
  lang: Language;
  mic: boolean;
  camera: boolean;
  viewer: boolean;
  onMicChange: (value: boolean) => void;
  onCameraChange: (value: boolean) => void;
  onOpenChat: () => void;
  onHangUp: () => void;
};
/** Accessible call actions, including disabled capture controls in viewer mode. */
export function CallControls({
  lang,
  mic,
  camera,
  viewer,
  onMicChange,
  onCameraChange,
  onOpenChat,
  onHangUp,
}: CallControlsProps) {
  const t = local(lang);
  return (
    <div className="call-bottom">
      <p>
        {viewer
          ? t('Watch-only access', 'Доступ только для просмотра')
          : t('Demo conference', 'Демо-конференция')}
      </p>
      <div className="call-controls">
        <ToggleButton
          aria-label={t(
            mic ? 'Mute microphone' : 'Unmute microphone',
            mic ? 'Выключить микрофон' : 'Включить микрофон',
          )}
          pressed={mic && !viewer}
          disabled={viewer}
          onPressedChange={onMicChange}
        >
          {mic && !viewer ? <Mic size={17} /> : <MicOff size={17} />}
        </ToggleButton>
        <ToggleButton
          aria-label={t(
            camera ? 'Turn camera off' : 'Turn camera on',
            camera ? 'Выключить камеру' : 'Включить камеру',
          )}
          pressed={camera && !viewer}
          disabled={viewer}
          onPressedChange={onCameraChange}
        >
          {camera && !viewer ? <Video size={17} /> : <VideoOff size={17} />}
        </ToggleButton>
        <IconButton
          onClick={onOpenChat}
          label={t('Open conference chat', 'Открыть чат конференции')}
          icon={<MessageCircle size={17} />}
        />
        <IconButton
          className="hangup"
          onClick={onHangUp}
          label={t('End demo call', 'Завершить демо-звонок')}
          icon={<Phone size={17} />}
        />
      </div>
    </div>
  );
}
