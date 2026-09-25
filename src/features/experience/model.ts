import type { LocalizedText } from '../../i18n';

/** Historical role data: either a contribution list or a short description. */
export type ExperienceEntry = {
  company: string;
  role: string;
  period: LocalizedText;
  duration: LocalizedText;
  project?: LocalizedText;
  location?: LocalizedText;
} & (
  | { contributions: readonly LocalizedText[]; desc?: never }
  | { desc: LocalizedText; contributions?: never }
);
