import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_IDS } from './data';
import { SORT_KEYS, type CatalogQuery } from './catalogUtils';
import type { CategoryId, SortKey } from '@/types';

export const PAGE_SIZE = 6;

/** Catalog filter state kept in the URL (?q=&category=&sort=) so views are shareable. */
export function useCatalogFilters() {
  const [params, setParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const query: CatalogQuery = useMemo(() => {
    const category = params.get('category');
    const sort = params.get('sort');
    return {
      search: params.get('q') ?? '',
      category: CATEGORY_IDS.includes(category as CategoryId) ? (category as CategoryId) : 'all',
      sort: SORT_KEYS.includes(sort as SortKey) ? (sort as SortKey) : 'name',
    };
  }, [params]);

  const update = useCallback(
    (patch: Partial<Record<'q' | 'category' | 'sort', string>>) => {
      const next = new URLSearchParams(params);
      for (const [key, value] of Object.entries(patch)) {
        if (!value || value === 'all' || (key === 'sort' && value === 'name')) next.delete(key);
        else next.set(key, value);
      }
      setParams(next, { replace: true });
      setVisible(PAGE_SIZE);
    },
    [params, setParams],
  );

  const reset = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true });
    setVisible(PAGE_SIZE);
  }, [setParams]);

  const showMore = useCallback(() => setVisible((v) => v + PAGE_SIZE), []);

  const isFiltered = query.search !== '' || query.category !== 'all' || query.sort !== 'name';

  return { query, update, reset, visible, showMore, isFiltered };
}
