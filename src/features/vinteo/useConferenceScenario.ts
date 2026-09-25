import { useCallback, useRef, useState } from 'react';
import { useEscapeKey } from '../../ui-kit';
import type { Demo } from './model';
/** Owns the selected scenario and mobile focus/scroll handoff, without touching chat inputs. */
export function useConferenceScenario() {
  const [demo, setDemo] = useState<Demo>('call');
  const demoStage = useRef<HTMLDivElement>(null);
  useEscapeKey(useCallback(() => setDemo('call'), []));
  function selectScenario(next: Demo) {
    setDemo(demo === next ? 'call' : next);
    if (window.matchMedia('(max-width: 800px)').matches) {
      demoStage.current?.focus({ preventScroll: true });
      demoStage.current?.scrollIntoView({ block: 'start' });
    }
  }
  return { demo, setDemo, demoStage, selectScenario };
}
