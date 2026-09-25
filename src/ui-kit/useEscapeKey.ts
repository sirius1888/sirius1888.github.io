import { useEffect } from 'react';

/** Subscribes to unhandled document-level Escape presses and cleans up on unmount. */
export function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [onEscape]);
}
