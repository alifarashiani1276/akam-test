import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top on route changes, but respects in-page hash links. */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
}
