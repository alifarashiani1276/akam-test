import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProductVisual } from '@/components/common/ProductVisual';
import { SpecList } from './SpecList';
import type { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  return (
    <article className="product-card">
      <Link to={`/catalog/${product.id}`} className="product-card__link">
        <ProductVisual category={product.category} model={product.model} />
        <div className="product-card__body">
          <p className="product-card__category">{t(`categories.items.${product.category}.name`)}</p>
          <h3 className="product-card__title">
            <span dir="ltr" className="product-card__model">
              {product.model}
            </span>{' '}
            <span className="product-card__name">{t(`products.${product.id}.name`)}</span>
          </h3>
          <SpecList specs={product.specs.slice(0, 2)} compact />
          <span className="product-card__cta">
            {t('cta.viewDetails')}
            <ArrowRight className="icon-flip" size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
