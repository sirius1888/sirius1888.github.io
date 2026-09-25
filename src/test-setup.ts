import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = 'en';
  document.documentElement.dataset.theme = 'dark';
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
