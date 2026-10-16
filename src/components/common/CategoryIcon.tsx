import { Forklift, Layers, Shovel, Zap, type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import type { CategoryId } from '@/types';

const ICONS: Record<CategoryId, ComponentType<LucideProps>> = {
  excavation: Shovel,
  lifting: Forklift,
  compaction: Layers,
  power: Zap,
};

export function CategoryIcon({ category, ...props }: { category: CategoryId } & LucideProps) {
  const Icon = ICONS[category];
  return <Icon aria-hidden="true" {...props} />;
}
