import { useTranslation } from 'react-i18next';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import type { ProductSpec } from '@/types';

interface SpecListProps {
  specs: ProductSpec[];
  compact?: boolean;
}

export function SpecList({ specs, compact = false }: SpecListProps) {
  const { t } = useTranslation();
  const formatNumber = useFormatNumber();
  return (
    <dl className={`spec-list${compact ? ' spec-list--compact' : ''}`}>
      {specs.map((spec) => (
        <div key={spec.key} className="spec-list__row">
          <dt>{t(`specs.${spec.key}`)}</dt>
          <dd>
            {formatNumber(spec.value)} {t(`units.${spec.unit}`)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
