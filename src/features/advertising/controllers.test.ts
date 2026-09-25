import { act, renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { useAdConfiguration } from './useAdConfiguration';
import { useAdPlacement } from './useAdPlacement';

it('applies configuration changes atomically and stops collecting events when analytics is off', () => {
  const { result } = renderHook(useAdConfiguration);
  act(() => {
    result.current.update({ analytics: false }, 'analytics.off');
    result.current.emit('not.recorded');
    result.current.update({ sdk: 'ironSource' }, 'sdk.changed');
  });
  expect(result.current.config.sdk).toBe('ironSource');
  expect(result.current.events).toEqual([]);
  act(() => {
    result.current.update({ analytics: true }, 'analytics.on');
    for (let i = 0; i < 35; i++) result.current.emit(`event.${i}`);
  });
  expect(result.current.events).toHaveLength(30);
  expect(result.current.events[0]).toBe('event.5');
  act(() => result.current.reset());
  expect(result.current.events).toEqual([]);
  expect(result.current.config.sdk).toBe('GAM');
  expect(result.current.resetVersion).toBe(1);
});

it('rejects premature rewards and cancels timers when consent is withdrawn or the controller unmounts', () => {
  vi.useFakeTimers();
  const onEvent = vi.fn();
  const { result, rerender, unmount } = renderHook(
    ({ consent }) => useAdPlacement({ consent, resetVersion: 0, onEvent }),
    { initialProps: { consent: true } },
  );
  act(() => result.current.chooseFormat('rewarded'));
  act(() => result.current.showAd());
  act(() => {
    vi.advanceTimersByTime(2000);
    result.current.claimReward();
  });
  expect(result.current.claimed).toBe(false);
  expect(onEvent).not.toHaveBeenCalledWith('reward.claimed');
  rerender({ consent: false });
  expect(vi.getTimerCount()).toBe(0);
  expect(result.current.overlay).toBeNull();
  act(() => result.current.showAd());
  expect(result.current.overlay).toBeNull();
  rerender({ consent: true });
  act(() => result.current.showAd());
  expect(vi.getTimerCount()).toBe(2);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});
