import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Check } from 'lucide-react';
import { LinkButton } from '@/components/common/Button';
import { PageHeader } from '@/components/common/PageHeader';
import { ProductVisual } from '@/components/common/ProductVisual';
import { ProductCard } from '@/components/product/ProductCard';
import { SpecList } from '@/components/product/SpecList';
import { usePageMeta } from '@/hooks/usePageMeta';
import { productService } from '@/services/productService';

const POINTS = ['p1', 'p2', 'p3', 'p4'] as const;

export default function ProductPage() {
  const { productId = '' } = useParams();
  const { t } = useTranslation();
  const product = productService.getById(productId);
  usePageMeta(product ? `${product.model} — ${t(`products.${product.id}.name`)}` : t('product.notFound.title'));

  if (!product) {
    return (
      <PageHeader title={t('product.notFound.title')} subtitle={t('product.notFound.body')}>
        <LinkButton to="/catalog" arrow>
          {t('cta.back')}
        </LinkButton>
      </PageHeader>
    );
  }

  const related = productService.related(product);

  return (
    <>
      <section className="section section--tight product-page">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li>
                <Link to="/catalog">{t('product.breadcrumb')}</Link>
                <ChevronRight className="icon-flip" size={14} aria-hidden="true" />
              </li>
              <li>
                <Link to={`/catalog?category=${product.category}`}>{t(`categories.items.${product.category}.name`)}</Link>
                <ChevronRight className="icon-flip" size={14} aria-hidden="true" />
              </li>
              <li aria-current="page" dir="ltr">
                {product.model}
              </li>
            </ol>
          </nav>

          <div className="product-page__layout">
            <ProductVisual category={product.category} model={product.model} large />
            <div className="product-page__info">
              <p className="kicker">{t(`categories.items.${product.category}.name`)}</p>
              <h1 className="product-page__title">
                <span dir="ltr">{product.model}</span> {t(`products.${product.id}.name`)}
              </h1>
              <p className="lead">{t(`products.${product.id}.summary`)}</p>

              <h2 className="product-page__subtitle">{t('product.specs')}</h2>
              <SpecList specs={product.specs} />

              <h2 className="product-page__subtitle">{t('product.features')}</h2>
              <ul className="check-list">
                {POINTS.map((p) => (
                  <li key={p}>
                    <Check size={18} aria-hidden="true" />
                    {t(`categories.items.${product.category}.${p}`)}
                  </li>
                ))}
              </ul>

              <div className="product-page__actions">
                <LinkButton to={`/contact?product=${product.id}`} arrow>
                  {t('cta.requestQuote')}
                </LinkButton>
                <LinkButton to="/catalog" variant="ghost">
                  {t('cta.back')}
                </LinkButton>
              </div>
              <p className="note">{t('catalog.sampleNote')}</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface" aria-labelledby="related-title">
          <div className="container">
            <h2 className="section-heading__title" id="related-title">
              {t('product.related')}
            </h2>
            <ul className="product-grid product-grid--three">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
