import type { Direction, Language } from '@/types';

export interface LanguageMeta {
  code: Language;
  /** Endonym: shown in the language's own name, never translated. */
  label: string;
  dir: Direction;
  /** BCP 47 tag used for number formatting. */
  locale: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'fa', label: 'فارسی', dir: 'rtl', locale: 'fa-IR' },
  { code: 'en', label: 'English', dir: 'ltr', locale: 'en-US' },
  { code: 'ar', label: 'العربية', dir: 'rtl', locale: 'ar-EG' },
  { code: 'ru', label: 'Русский', dir: 'ltr', locale: 'ru-RU' },
];

export const DEFAULT_LANGUAGE: Language = 'fa';
export const LANGUAGE_STORAGE_KEY = 'akam.language';

export function getLanguageMeta(code: string): LanguageMeta {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.some((l) => l.code === value);
}
