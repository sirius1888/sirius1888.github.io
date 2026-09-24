// Keep short function words with the word that follows them, in SSR and in the browser.
// Match whole words at a text boundary, leaving URLs and hyphenated words alone.
const shortWords = {
  en: /(?<=^|[\s([{«“"'])(a|an|the|and|or|at|by|for|from|in|of|on|to|with)[ \t]+(?=\S)/giu,
  ru: /(?<=^|[\s([{«„“"'])(а|и|но|в|во|на|с|со|к|ко|у|о|об|обо|от|до|из|изо|за|по|под|подо|над|надо|для|при|без|безо|про|через)[ \t]+(?=\S)/giu,
};

export function keepWordsTogether(text: string, lang: 'en' | 'ru'): string {
  return text.replace(shortWords[lang], '$1\u00a0');
}
