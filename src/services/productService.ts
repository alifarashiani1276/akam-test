import { PRODUCTS } from '@/features/catalog/data';
import type { Product } from '@/types';

/**
 * Data access layer.
 *
 * Today the catalog is served from the local sample data module, synchronously.
 * When a real API exists, replace these functions with network calls and wrap them in
 * TanStack Query hooks (see README, "Connecting a real backend"). No network requests are made here.
 */
export const productService = {
  list(): Product[] {
    return PRODUCTS;
  },
  getById(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
  },
  featured(): Product[] {
    return PRODUCTS.filter((p) => p.featured);
  },
  related(product: Product, limit = 3): Product[] {
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
  },
};
