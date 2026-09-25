import { keepWordsTogether } from './typography';

export type Language = 'en' | 'ru';
export type LocalizedText = Readonly<Record<Language, string>>;
export const bi = (en: string, ru: string) => ({
  en: keepWordsTogether(en, 'en'),
  ru: keepWordsTogether(ru, 'ru'),
});
export const localize = (lang: Language) => (en: string, ru: string) =>
  keepWordsTogether(lang === 'en' ? en : ru, lang);
