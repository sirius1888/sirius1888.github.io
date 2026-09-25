import { act, renderHook } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import type { PreferenceStore } from '../services/preferences';
import { usePreferences } from './usePreferences';

it('uses an injected preference store and writes the updated pair atomically', () => {
  const store: PreferenceStore = { read: () => ({ lang: 'ru', theme: 'light' }), write: vi.fn() };
  const { result } = renderHook(() => usePreferences(store));
  expect(result.current.lang).toBe('ru');
  expect(result.current.theme).toBe('light');
  act(() => {
    result.current.toggleLanguage();
    result.current.toggleTheme();
  });
  expect(store.write).toHaveBeenLastCalledWith({ lang: 'en', theme: 'dark' });
  expect(document.documentElement.lang).toBe('en');
});

it('keeps preference controls working if both reading and writing storage fail', () => {
  const store: PreferenceStore = {
    read: () => {
      throw new Error('blocked');
    },
    write: () => {
      throw new Error('blocked');
    },
  };
  const { result } = renderHook(() => usePreferences(store));
  act(() => result.current.toggleTheme());
  expect(result.current.theme).toBe('light');
  expect(document.documentElement.dataset.theme).toBe('light');
});
