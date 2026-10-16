import type { CategoryId, Product } from '@/types';

/**
 * Sample catalog data (fictional specifications, for demonstration only).
 * Human-readable names and summaries live in the locale files under `products.<id>`.
 * To add a product: add an entry here and matching `products.<id>` entries in all four locale files.
 */
export const CATEGORY_IDS: CategoryId[] = ['excavation', 'lifting', 'compaction', 'power'];

export const PRODUCTS: Product[] = [
  {
    id: 'ak-120', model: 'AK-120', category: 'excavation', powerKw: 25, weightT: 2.6,
    specs: [
      { key: 'power', value: 25, unit: 'kw' },
      { key: 'weight', value: 2.6, unit: 't' },
      { key: 'bucketCapacity', value: 0.08, unit: 'm3' },
    ],
  },
  {
    id: 'ak-210', model: 'AK-210', category: 'excavation', powerKw: 110, weightT: 21, featured: true,
    specs: [
      { key: 'power', value: 110, unit: 'kw' },
      { key: 'weight', value: 21, unit: 't' },
      { key: 'bucketCapacity', value: 1, unit: 'm3' },
    ],
  },
  {
    id: 'ak-350', model: 'AK-350', category: 'excavation', powerKw: 205, weightT: 35,
    specs: [
      { key: 'power', value: 205, unit: 'kw' },
      { key: 'weight', value: 35, unit: 't' },
      { key: 'bucketCapacity', value: 1.8, unit: 'm3' },
    ],
  },
  {
    id: 'ak-lf20', model: 'AK-LF20', category: 'lifting', powerKw: 85, weightT: 8.1,
    specs: [
      { key: 'power', value: 85, unit: 'kw' },
      { key: 'weight', value: 8.1, unit: 't' },
      { key: 'liftCapacity', value: 4, unit: 't' },
    ],
  },
  {
    id: 'ak-cr50', model: 'AK-CR50', category: 'lifting', powerKw: 220, weightT: 36, featured: true,
    specs: [
      { key: 'power', value: 220, unit: 'kw' },
      { key: 'weight', value: 36, unit: 't' },
      { key: 'liftCapacity', value: 50, unit: 't' },
    ],
  },
  {
    id: 'ak-fk35', model: 'AK-FK35', category: 'lifting', powerKw: 55, weightT: 6.8,
    specs: [
      { key: 'power', value: 55, unit: 'kw' },
      { key: 'weight', value: 6.8, unit: 't' },
      { key: 'liftCapacity', value: 3.5, unit: 't' },
    ],
  },
  {
    id: 'ak-rl10', model: 'AK-RL10', category: 'compaction', powerKw: 75, weightT: 10,
    specs: [
      { key: 'power', value: 75, unit: 'kw' },
      { key: 'weight', value: 10, unit: 't' },
      { key: 'drumWidth', value: 2.1, unit: 'm' },
    ],
  },
  {
    id: 'ak-rl14', model: 'AK-RL14', category: 'compaction', powerKw: 97, weightT: 14, featured: true,
    specs: [
      { key: 'power', value: 97, unit: 'kw' },
      { key: 'weight', value: 14, unit: 't' },
      { key: 'drumWidth', value: 2.1, unit: 'm' },
    ],
  },
  {
    id: 'ak-pg100', model: 'AK-PG100', category: 'power', powerKw: 80, weightT: 1.4,
    specs: [
      { key: 'power', value: 80, unit: 'kw' },
      { key: 'weight', value: 1.4, unit: 't' },
      { key: 'output', value: 100, unit: 'kva' },
    ],
  },
  {
    id: 'ak-pg500', model: 'AK-PG500', category: 'power', powerKw: 400, weightT: 4.6, featured: true,
    specs: [
      { key: 'power', value: 400, unit: 'kw' },
      { key: 'weight', value: 4.6, unit: 't' },
      { key: 'output', value: 500, unit: 'kva' },
    ],
  },
];
