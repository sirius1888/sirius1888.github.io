import { useCallback, useReducer } from 'react';
import { initialAdConfig, MAX_ANALYTICS_EVENTS, type AdConfig } from './model';

type State = { config: AdConfig; events: string[]; resetVersion: number };
type Action =
  | { type: 'update'; patch: Partial<AdConfig>; event: string }
  | { type: 'event'; event: string }
  | { type: 'reset' };
function reduce(state: State, action: Action): State {
  if (action.type === 'reset')
    return { config: { ...initialAdConfig }, events: [], resetVersion: state.resetVersion + 1 };
  if (action.type === 'event')
    return state.config.analytics
      ? { ...state, events: [...state.events, action.event].slice(-MAX_ANALYTICS_EVENTS) }
      : state;
  const config = { ...state.config, ...action.patch };
  return {
    ...state,
    config,
    events: config.analytics ? [...state.events, action.event].slice(-MAX_ANALYTICS_EVENTS) : [],
  };
}
/** Atomic shared ad configuration, bounded demo analytics and reset generation. */
export function useAdConfiguration() {
  const [state, dispatch] = useReducer(reduce, {
    config: { ...initialAdConfig },
    events: [],
    resetVersion: 0,
  });
  const update = useCallback(
    (patch: Partial<AdConfig>, event: string) => dispatch({ type: 'update', patch, event }),
    [],
  );
  const emit = useCallback((event: string) => dispatch({ type: 'event', event }), []);
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);
  return { ...state, update, emit, reset };
}
