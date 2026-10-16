import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { LinkButton } from '@/components/common/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { formatIndex } from '@/utils/format';

const NAV = [
  { to: '/catalog', key: 'nav.products' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  // The menu is tied to the route it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const menuOpen = openAt === pathname;
  const setMenuOpen = (open: boolean | ((v: boolean) => boolean)) => {
    const next = typeof open === 'function' ? open(menuOpen) : open;
    setOpenAt(next ? pathname : null);
  };

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenAt(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link to="/" className="site-header__logo" aria-label={t('nav.home')}>
          <Logo variant="dark" />
        </Link>

        <nav className="site-header__nav" aria-label={t('nav.label')}>
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{t(item.key)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <LinkButton to="/contact" className="site-header__cta">
            {t('cta.quote')}
          </LinkButton>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label={t('nav.label')} className="container mobile-menu__inner">
          <ul className="mobile-menu__links">
            {NAV.map((item, i) => (
              <li key={item.to}>
                <NavLink to={item.to}>
                  <span className="mobile-menu__num">{formatIndex(i + 1, i18n.language)}</span>
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__footer">
            <LanguageSwitcher layout="list" />
            <LinkButton to="/contact" arrow>
              {t('cta.quote')}
            </LinkButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
