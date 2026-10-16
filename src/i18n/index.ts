import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fa from './locales/fa.json';
import ar from './locales/ar.json';
import ru from './locales/ru.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  getLanguageMeta,
  isLanguage,
} from '@/config/languages';
import type { Language } from '@/types';

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    /* storage unavailable (private mode, etc.) — fall back to default */
  }
  return DEFAULT_LANGUAGE;
}

/** Keeps <html lang> and <html dir> in sync with the active language. */
function applyDocumentLanguage(code: string): void {
  const { dir } = getLanguageMeta(code);
  document.documentElement.lang = code;
  document.documentElement.dir = dir;
}

void i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    en: { translation: en },
    ar: { translation: ar },
    ru: { translation: ru },
  },
  lng: readStoredLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['fa', 'en', 'ar', 'ru'],
  interpolation: { escapeValue: false },
});

applyDocumentLanguage(i18n.language);

i18n.on('languageChanged', (code) => {
  applyDocumentLanguage(code);
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
});

export default i18n;
