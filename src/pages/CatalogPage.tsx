import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SearchX } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryIcon } from '@/components/common/CategoryIcon';
import { CATEGORY_IDS } from '@/features/catalog/data';
import { SORT_KEYS, applyCatalogQuery } from '@/features/catalog/catalogUtils';
import { useCatalogFilters } from '@/features/catalog/useCatalogFilters';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { usePageMeta } from '@/hooks/usePageMeta';
import { productService } from '@/services/productService';
import type { CategoryId } from '@/types';

export default function CatalogPage() {
  const { t, i18n } = useTranslation();
  const formatNumber = useFormatNumber();
  usePageMeta(t('pages.catalog.title'));
  const { query, update, reset, visible, showMore, isFiltered } = useCatalogFilters();

  const results = useMemo(
    () =>
      applyCatalogQuery(productService.list(), query, (p) => `${t(`products.${p.id}.name`)} ${t(`products.${p.id}.summary`)}`),
    // i18n.language makes sure the localized text is re-evaluated when the language changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, t, i18n.language],
  );
  const shown = results.slice(0, visible);

  const tabs: Array<CategoryId | 'all'> = ['all', ...CATEGORY_IDS];

  return (
    <>
      <PageHeader kicker={t('nav.products')} title={t('catalog.title')} subtitle={t('catalog.subtitle')} />
      <section className="section section--tight" aria-label={t('catalog.title')}>
        <div className="container">
          <div className="catalog-toolbar">
            <div className="field catalog-toolbar__search">
              <label htmlFor="catalog-search">{t('catalog.search')}</label>
              <div className="input-icon">
                <Search size={18} aria-hidden="true" />
                <input
                  id="catalog-search"
                  type="search"
                  value={query.search}
                  placeholder={t('catalog.searchPlaceholder')}
                  onChange={(e) => update({ q: e.target.value })}
                />
              </div>
            </div>
            <div className="field catalog-toolbar__sort">
              <label htmlFor="catalog-sort">{t('catalog.sort.label')}</label>
              <select id="catalog-sort" value={query.sort} onChange={(e) => update({ sort: e.target.value })}>
                {SORT_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(`catalog.sort.${key}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="chips" role="group" aria-label={t('catalog.categoryFilter')}>
            {tabs.map((id) => (
              <button
                key={id}
                type="button"
                className="chip"
                aria-pressed={query.category === id}
                onClick={() => update({ category: id })}
              >
                {id !== 'all' && <CategoryIcon category={id} size={16} />}
                {id === 'all' ? t('catalog.all') : t(`categories.items.${id}.name`)}
              </button>
            ))}
          </div>

          <p className="catalog-count" role="status" aria-live="polite">
            {t('catalog.results', { count: results.length, formatted: formatNumber(results.length) })}
          </p>

          {results.length === 0 ? (
            <div className="empty-state">
              <SearchX size={48} strokeWidth={1.25} aria-hidden="true" />
              <h2>{t('catalog.noResults.title')}</h2>
              <p>{t('catalog.noResults.body')}</p>
              {isFiltered && <Button onClick={reset}>{t('catalog.reset')}</Button>}
            </div>
          ) : (
            <>
              <ul className="product-grid">
                {shown.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
              {shown.length < results.length && (
                <div className="load-more">
                  <Button variant="ghost" onClick={showMore}>
                    {t('catalog.loadMore')}
                  </Button>
                </div>
              )}
            </>
          )}
          <p className="note">{t('catalog.sampleNote')}</p>
        </div>
      </section>
    </>
  );
}
