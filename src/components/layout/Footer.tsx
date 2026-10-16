import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/common/Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CATEGORY_IDS } from '@/features/catalog/data';
import { formatPlain } from '@/utils/format';

export function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo variant="dark" />
          <p>{t('footer.tagline')}</p>
        </div>
        <nav aria-label={t('footer.quick')}>
          <h2 className="site-footer__title">{t('footer.quick')}</h2>
          <ul>
            <li><Link to="/catalog">{t('nav.products')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </nav>
        <nav aria-label={t('footer.categories')}>
          <h2 className="site-footer__title">{t('footer.categories')}</h2>
          <ul>
            {CATEGORY_IDS.map((id) => (
              <li key={id}>
                <Link to={`/catalog?category=${id}`}>{t(`categories.items.${id}.name`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="site-footer__title">{t('footer.language')}</h2>
          <LanguageSwitcher layout="list" />
        </div>
      </div>
      <div className="container site-footer__legal">
        <small>{t('footer.rights', { year: formatPlain(year, i18n.language) })}</small>
      </div>
    </footer>
  );
}
