import type { CategoryId, Product, SortKey } from '@/types';

export interface CatalogQuery {
  search: string;
  category: CategoryId | 'all';
  sort: SortKey;
}

/** `labelOf` returns the localized searchable text for a product (name + summary). */
export function applyCatalogQuery(
  products: Product[],
  query: CatalogQuery,
  labelOf: (p: Product) => string,
): Product[] {
  const needle = query.search.trim().toLocaleLowerCase();
  const filtered = products.filter((p) => {
    if (query.category !== 'all' && p.category !== query.category) return false;
    if (!needle) return true;
    return `${p.model} ${labelOf(p)}`.toLocaleLowerCase().includes(needle);
  });
  const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
    name: (a, b) => a.model.localeCompare(b.model),
    powerDesc: (a, b) => b.powerKw - a.powerKw,
    powerAsc: (a, b) => a.powerKw - b.powerKw,
    weightAsc: (a, b) => a.weightT - b.weightT,
  };
  return [...filtered].sort(sorters[query.sort]);
}

export const SORT_KEYS: SortKey[] = ['name', 'powerDesc', 'powerAsc', 'weightAsc'];
