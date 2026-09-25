import { Check, Send, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { localize as local, type Language } from '../../i18n';
import { IconButton, MessageBubble } from '../../ui-kit';

export type ChatPanelProps = {
  lang: Language;
  messages: readonly string[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onClose: () => void;
};
/** Controlled chat form and message history. Opening the panel never focuses its text input. */
export function ChatPanel({
  lang,
  messages,
  draft,
  onDraftChange,
  onSend,
  onClose,
}: ChatPanelProps) {
  const t = local(lang);
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  return (
    <section className="chat-sheet" aria-label={t('Conference chat', 'Чат конференции')}>
      <header>
        <strong>{t('Conference chat', 'Чат конференции')}</strong>
        <IconButton
          onClick={onClose}
          label={t('Close chat', 'Закрыть чат')}
          icon={<X size={15} />}
        />
      </header>
      <div className="chat-messages" ref={chatRef} aria-live="polite">
        <MessageBubble author={<>{t('Alex', 'Алексей')} · 9:41</>}>
          {t('Ready for the demo?', 'Готовы к демо?')}
        </MessageBubble>
        <MessageBubble outgoing receipt={<Check size={10} />}>
          {t('Yes, let’s start.', 'Да, начинаем.')}
        </MessageBubble>
        {messages.map((text, index) => (
          <MessageBubble key={index} outgoing receipt={<Check size={10} />}>
            {text}
          </MessageBubble>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <input
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          maxLength={180}
          placeholder={t('Write a message…', 'Напишите сообщение…')}
          aria-label={t('Chat message', 'Сообщение в чате')}
        />
        <IconButton
          type="submit"
          disabled={!draft.trim()}
          label={t('Send message', 'Отправить сообщение')}
          icon={<Send size={15} />}
        />
      </form>
    </section>
  );
}
