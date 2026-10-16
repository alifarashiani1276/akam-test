import type { CategoryId } from '@/types';
import { BrandPattern } from './BrandPattern';
import { CategoryIcon } from './CategoryIcon';

interface ProductVisualProps {
  category: CategoryId;
  model: string;
  large?: boolean;
}

/**
 * Intentional local placeholder for product imagery: brand pattern + category icon + model code.
 * Replace with real photos by rendering an <img> in ProductCard / ProductPage when assets are available.
 */
export function ProductVisual({ category, model, large = false }: ProductVisualProps) {
  return (
    <div className={`product-visual${large ? ' product-visual--large' : ''}`} aria-hidden="true">
      <BrandPattern className="product-visual__pattern" />
      <CategoryIcon category={category} className="product-visual__icon" strokeWidth={1} />
      <span className="product-visual__model" dir="ltr">
        {model}
      </span>
    </div>
  );
}
