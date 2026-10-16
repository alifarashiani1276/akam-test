import { useTranslation } from 'react-i18next';
import { usePageMeta } from '@/hooks/usePageMeta';
import { PageHeader } from '@/components/common/PageHeader';
import { AboutSection } from '@/features/home/AboutSection';
import { StatsSection } from '@/features/home/StatsSection';
import { ProcessSection } from '@/features/home/ProcessSection';
import { FaqSection } from '@/features/home/FaqSection';

export default function AboutPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.about.title'));
  return (
    <>
      <PageHeader kicker={t('about.kicker')} title={t('pages.about.title')} />
      <AboutSection showCta={false} />
      <StatsSection />
      <ProcessSection />
      <FaqSection />
    </>
  );
}
