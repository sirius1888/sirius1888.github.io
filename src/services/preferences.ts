import type { Language } from '../i18n';
export type Theme = 'dark' | 'light';
export type Preferences = { lang: Language; theme: Theme };
export interface PreferenceStore {
  read: () => Partial<Preferences>;
  write: (preferences: Preferences) => void;
}
/** Browser adapter; storage is accessed only when called from a client effect. */
export const browserPreferenceStore: PreferenceStore = {
  read: () => ({
    lang: localStorage.getItem('sk-language') === 'ru' ? 'ru' : 'en',
    theme: localStorage.getItem('sk-theme') === 'light' ? 'light' : 'dark',
  }),
  write: ({ lang, theme }) => {
    localStorage.setItem('sk-language', lang);
    localStorage.setItem('sk-theme', theme);
  },
};
