export type Language = 'fa' | 'en' | 'ar' | 'ru';
export type Direction = 'rtl' | 'ltr';

export type CategoryId = 'excavation' | 'lifting' | 'compaction' | 'power';
export type SpecKey =
  | 'power'
  | 'weight'
  | 'bucketCapacity'
  | 'liftCapacity'
  | 'drumWidth'
  | 'output';
export type UnitKey = 'kw' | 't' | 'm3' | 'm' | 'kva';

export interface ProductSpec {
  key: SpecKey;
  value: number;
  unit: UnitKey;
}

export interface Product {
  /** Stable id, also used as the URL slug and as the translation key under `products.*`. */
  id: string;
  /** Model code shown as-is in every language. */
  model: string;
  category: CategoryId;
  powerKw: number;
  weightT: number;
  specs: ProductSpec[];
  featured?: boolean;
}

export type SortKey = 'name' | 'powerDesc' | 'powerAsc' | 'weightAsc';
