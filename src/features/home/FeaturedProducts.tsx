import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/components/common/Button';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProductCard } from '@/components/product/ProductCard';
import { productService } from '@/services/productService';

export function FeaturedProducts() {
  const { t } = useTranslation();
  const products = productService.featured();
  return (
    <section className="section" id="featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-row">
          <SectionHeading kicker={t('featured.kicker')} title={t('featured.title')} id="featured-title" />
          <LinkButton to="/catalog" variant="ghost" arrow>
            {t('cta.viewAll')}
          </LinkButton>
        </div>
        <ul className="product-grid">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
