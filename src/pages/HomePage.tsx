import { useTranslation } from 'react-i18next';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Hero } from '@/features/home/Hero';
import { AboutSection } from '@/features/home/AboutSection';
import { CategoriesSection } from '@/features/home/CategoriesSection';
import { FeaturedProducts } from '@/features/home/FeaturedProducts';
import { StatsSection } from '@/features/home/StatsSection';
import { ProcessSection } from '@/features/home/ProcessSection';
import { FaqSection } from '@/features/home/FaqSection';

export function HomePage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.home.title'));
  return (
    <>
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProducts />
      <StatsSection />
      <ProcessSection />
      <FaqSection />
    </>
  );
}
