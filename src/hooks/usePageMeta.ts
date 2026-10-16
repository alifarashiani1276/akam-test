import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '@/config/site';

/** Sets the document title (and meta description) for the current page and language. */
export function usePageMeta(title?: string) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : SITE.name;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = t('meta.description');
  }, [title, t, i18n.language]);
}
