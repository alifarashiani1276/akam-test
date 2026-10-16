import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export function Layout() {
  const { t } = useTranslation();
  useScrollToTop();
  return (
    <>
      <a className="skip-link" href="#main">
        {t('nav.skip')}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" role="status" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
