import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/components/common/Button';
import { PageHeader } from '@/components/common/PageHeader';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFoundPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.notFound.title'));
  return (
    <PageHeader kicker="404" title={t('notFound.title')} subtitle={t('notFound.body')}>
      <LinkButton to="/" arrow>
        {t('notFound.home')}
      </LinkButton>
    </PageHeader>
  );
}
