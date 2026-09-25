import { useEffect, useState } from 'react';
import {
  browserPreferenceStore,
  type Preferences,
  type PreferenceStore,
} from '../services/preferences';

/** Owns language/theme preferences, SSR-safe restoration and document metadata synchronization. */
export function usePreferences(store: PreferenceStore = browserPreferenceStore) {
  const [preferences, setPreferences] = useState<Preferences>({ lang: 'en', theme: 'dark' });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const restored = store.read();
      setPreferences((value) => ({
        lang: restored.lang === 'en' || restored.lang === 'ru' ? restored.lang : value.lang,
        theme:
          restored.theme === 'dark' || restored.theme === 'light' ? restored.theme : value.theme,
      }));
    } catch {}
    setLoaded(true);
  }, [store]);
  useEffect(() => {
    if (!loaded) return;
    const { lang, theme } = preferences;
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    document.title =
      lang === 'en'
        ? 'Sergei Karukes — Senior / Lead React Native Engineer'
        : 'Сергей Карукес — Senior / Lead React Native Engineer';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa');
    try {
      store.write(preferences);
    } catch {}
  }, [preferences, loaded, store]);
  return {
    ...preferences,
    toggleLanguage: () =>
      setPreferences((value) => ({ ...value, lang: value.lang === 'en' ? 'ru' : 'en' })),
    toggleTheme: () =>
      setPreferences((value) => ({ ...value, theme: value.theme === 'dark' ? 'light' : 'dark' })),
  };
}
