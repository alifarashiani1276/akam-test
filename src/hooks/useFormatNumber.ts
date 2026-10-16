import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/utils/format';

/** Returns a number formatter bound to the active language (e.g. Persian or Arabic-Indic digits). */
export function useFormatNumber() {
  const { i18n } = useTranslation();
  return (value: number) => formatNumber(value, i18n.language);
}
