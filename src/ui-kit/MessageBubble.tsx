import type { ReactNode } from 'react';

export type MessageBubbleProps = {
  children: ReactNode;
  author?: ReactNode;
  outgoing?: boolean;
  receipt?: ReactNode;
};
/** Presentational chat message; author and delivery mark are supplied as slots. */
export function MessageBubble({ children, author, outgoing = false, receipt }: MessageBubbleProps) {
  return (
    <div className={`chat-message${outgoing ? ' own' : ''}`}>
      {author && <small>{author}</small>}
      <p>
        {children}
        {receipt}
      </p>
    </div>
  );
}
