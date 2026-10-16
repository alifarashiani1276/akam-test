import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/common/SectionHeading';
import { LANGUAGES } from '@/config/languages';
import { CATEGORY_IDS } from '@/features/catalog/data';
import { useFormatNumber } from '@/hooks/useFormatNumber';
import { productService } from '@/services/productService';

/** All figures are computed from the real data in this project — nothing is invented. */
export function StatsSection() {
  const { t } = useTranslation();
  const formatNumber = useFormatNumber();
  const products = productService.list();
  const maxPower = Math.max(...products.map((p) => p.powerKw));
  const stats = [
    { key: 'models', value: formatNumber(products.length) },
    { key: 'categories', value: formatNumber(CATEGORY_IDS.length) },
    { key: 'languages', value: formatNumber(LANGUAGES.length) },
    { key: 'maxPower', value: `${formatNumber(maxPower)} ${t('units.kw')}` },
  ];
  return (
    <section className="section section--yellow" aria-labelledby="stats-title">
      <div className="container">
        <SectionHeading kicker={t('stats.kicker')} title={t('stats.title')} id="stats-title" />
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.key} className="stats__item">
              <dd className="stats__value">{s.value}</dd>
              <dt className="stats__label">{t(`stats.${s.key}`)}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
