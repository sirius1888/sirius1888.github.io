import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BatteryFull,
  Check,
  ChevronRight,
  Eye,
  MessageCircle,
  Mic,
  MicOff,
  Phone,
  PictureInPicture2,
  RotateCcw,
  Send,
  Signal,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react';
import { type Demo, type Language } from '../content';
import type { ReactNode } from 'react';

const local = (lang: Language) => (en: string, ru: string) => (lang === 'en' ? en : ru);

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
  const [mic, setMic] = useState(true),
    [camera, setCamera] = useState(true),
    [ended, setEnded] = useState(false);
  const [messages, setMessages] = useState<string[]>([]),
    [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const viewer = demo === 'viewer';
  useEffect(() => {
    if (demo !== 'call') setEnded(false);
  }, [demo]);
  useEffect(() => {
    if (demo === 'reconnect') {
      const timeout = setTimeout(() => onDemo('call'), 2800);
      return () => clearTimeout(timeout);
    }
  }, [demo, onDemo]);
  useEffect(() => {
    if (demo === 'chat') inputRef.current?.focus({ preventScroll: true });
  }, [demo]);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  const reset = () => {
    setMic(true);
    setCamera(true);
    setEnded(false);
    setMessages([]);
    setDraft('');
    onDemo('call');
  };
  function send(event: React.FormEvent) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setMessages((previous) => [...previous, value.slice(0, 180)]);
    setDraft('');
  }
  return (
    <div className={`vinteo-scene ${demo === 'pip' ? 'pip-mode' : ''}`}>
      {ended ? (
        <div className="call-ended">
          <span className="end-call-icon">
            <Phone size={28} />
          </span>
          <h3>{t('Call ended', 'Звонок завершён')}</h3>
          <p>{t('You can rejoin the demo call.', 'Можно подключиться к демо-звонку снова.')}</p>
          <button className="phone-primary" onClick={reset}>
            {t('Join again', 'Подключиться снова')} <ArrowRight size={14} />
          </button>
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
            <button
              aria-label={t('Reset conference demo', 'Сбросить демо конференции')}
              title={t('Reset demo', 'Сбросить демо')}
              onClick={reset}
            >
              <RotateCcw size={15} />
            </button>
          </div>
          {viewer && (
            <div className="viewer-banner">
              <Eye size={12} />
              {t('Viewer mode · camera & mic off', 'Режим зрителя · камера и микрофон выкл.')}
            </div>
          )}
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
              {mic && !viewer && demo !== 'reconnect' && (
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
          <div className="call-bottom">
            <p>
              {viewer
                ? t('Watch-only access', 'Доступ только для просмотра')
                : t('Demo conference', 'Демо-конференция')}
            </p>
            <div className="call-controls">
              <button
                aria-label={t(
                  mic ? 'Mute microphone' : 'Unmute microphone',
                  mic ? 'Выключить микрофон' : 'Включить микрофон',
                )}
                aria-pressed={mic && !viewer}
                disabled={viewer}
                onClick={() => setMic((v) => !v)}
              >
                {mic && !viewer ? <Mic size={17} /> : <MicOff size={17} />}
              </button>
              <button
                aria-label={t(
                  camera ? 'Turn camera off' : 'Turn camera on',
                  camera ? 'Выключить камеру' : 'Включить камеру',
                )}
                aria-pressed={camera && !viewer}
                disabled={viewer}
                onClick={() => setCamera((v) => !v)}
              >
                {camera && !viewer ? <Video size={17} /> : <VideoOff size={17} />}
              </button>
              <button
                aria-label={t('Open conference chat', 'Открыть чат конференции')}
                onClick={() => onDemo('chat')}
              >
                <MessageCircle size={17} />
              </button>
              <button
                className="hangup"
                aria-label={t('End demo call', 'Завершить демо-звонок')}
                onClick={() => {
                  setEnded(true);
                  onDemo('call');
                }}
              >
                <Phone size={17} />
              </button>
            </div>
          </div>
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
            <section className="chat-sheet" aria-label={t('Conference chat', 'Чат конференции')}>
              <header>
                <strong>{t('Conference chat', 'Чат конференции')}</strong>
                <button aria-label={t('Close chat', 'Закрыть чат')} onClick={() => onDemo('call')}>
                  <X size={15} />
                </button>
              </header>
              <div className="chat-messages" ref={chatRef} aria-live="polite">
                <div className="chat-message">
                  <small>{t('Alex', 'Алексей')} · 9:41</small>
                  <p>{t('Ready for the demo?', 'Готовы к демо?')}</p>
                </div>
                <div className="chat-message own">
                  <p>
                    {t('Yes, let’s start.', 'Да, начинаем.')}
                    <Check size={10} />
                  </p>
                </div>
                {messages.map((text, index) => (
                  <div className="chat-message own" key={index}>
                    <p>
                      {text}
                      <Check size={10} />
                    </p>
                  </div>
                ))}
              </div>
              <form onSubmit={send}>
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={180}
                  placeholder={t('Write a message…', 'Напишите сообщение…')}
                  aria-label={t('Chat message', 'Сообщение в чате')}
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label={t('Send message', 'Отправить сообщение')}
                >
                  <Send size={15} />
                </button>
              </form>
            </section>
          )}
          {demo === 'pip' && (
            <div className="pip-background">
              <div className="pip-page-head">
                <img src="./images/vinteo.jpg" alt="" />
                <strong>Vinteo</strong>
              </div>
              <h3>{t('Conferences', 'Конференции')}</h3>
              <p>{t('The video call continues in PiP.', 'Видеозвонок продолжается в PiP.')}</p>
              {['Product sync', 'Mobile team', 'Design review'].map((name, index) => (
                <div className="pip-list" key={name}>
                  <span>
                    <Video size={16} />
                  </span>
                  <div>
                    <strong>
                      {lang === 'ru'
                        ? ['Встреча продукта', 'Мобильная команда', 'Обсуждение дизайна'][index]
                        : name}
                    </strong>
                    <small>
                      {index === 1 ? t('In progress', 'Идёт сейчас') : t('Today', 'Сегодня')}
                    </small>
                  </div>
                  <ChevronRight size={14} />
                </div>
              ))}
              <div className="pip-window">
                <img
                  src="./images/sergei.jpg"
                  alt={t('Picture in Picture demonstration', 'Демонстрация Picture in Picture')}
                />
                <button
                  onClick={() => onDemo('call')}
                  aria-label={t('Return to full call', 'Вернуться к звонку')}
                >
                  <PictureInPicture2 size={16} />
                </button>
                <span>{t('Mobile team', 'Мобильная команда')}</span>
              </div>
              <div className="pip-note">
                {t('iOS PiP · visual demonstration', 'PiP на iOS · визуальная демонстрация')}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function IPhone({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`iphone-shell ${className}`} role="group" aria-label={label}>
      <span className="iphone-action" aria-hidden="true" />
      <span className="iphone-volume volume-up" aria-hidden="true" />
      <span className="iphone-volume volume-down" aria-hidden="true" />
      <span className="iphone-power" aria-hidden="true" />
      <div className="iphone-screen">
        <div className="iphone-status" aria-hidden="true">
          <span>9:41</span>
          <div className="iphone-island">
            <i />
          </div>
          <div>
            <Signal size={13} />
            <Wifi size={13} />
            <BatteryFull size={18} />
          </div>
        </div>
        <div className="phone-app">{children}</div>
        <div className="iphone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
