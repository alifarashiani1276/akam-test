import { getLanguageMeta } from '@/config/languages';

export function formatNumber(value: number, language: string): string {
  return new Intl.NumberFormat(getLanguageMeta(language).locale, {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPlain(value: number, language: string): string {
  return new Intl.NumberFormat(getLanguageMeta(language).locale, { useGrouping: false }).format(value);
}

/** Two-digit ordinal like "01" rendered with the language's digits. */
export function formatIndex(value: number, language: string): string {
  return new Intl.NumberFormat(getLanguageMeta(language).locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(value);
}
