import { useEffect, useState } from 'react';
import type { Demo } from './model';
export type ConferenceCallOptions = { demo: Demo; onDemo: (demo: Demo) => void };
/** Owns capture state, chat draft/history, call lifecycle and the cancellable reconnection timer. */
export function useConferenceCall({ demo, onDemo }: ConferenceCallOptions) {
  const [mic, setMic] = useState(true),
    [camera, setCamera] = useState(true),
    [ended, setEnded] = useState(false);
  const [messages, setMessages] = useState<string[]>([]),
    [draft, setDraft] = useState('');
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
  const reset = () => {
    setMic(true);
    setCamera(true);
    setEnded(false);
    setMessages([]);
    setDraft('');
    onDemo('call');
  };
  function sendMessage() {
    const value = draft.trim();
    if (!value) return;
    setMessages((previous) => [...previous, value.slice(0, 180)]);
    setDraft('');
  }
  return {
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
    hangUp: () => {
      setEnded(true);
      onDemo('call');
    },
  };
}
