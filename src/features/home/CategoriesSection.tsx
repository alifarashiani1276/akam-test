import { useTranslation } from 'react-i18next';
import { Accordion, type AccordionItem } from '@/components/common/Accordion';
import { LinkButton } from '@/components/common/Button';
import { CategoryIcon } from '@/components/common/CategoryIcon';
import { SectionHeading } from '@/components/common/SectionHeading';
import { CATEGORY_IDS } from '@/features/catalog/data';
import { formatIndex } from '@/utils/format';

const POINTS = ['p1', 'p2', 'p3', 'p4'] as const;

export function CategoriesSection() {
  const { t, i18n } = useTranslation();
  const items: AccordionItem[] = CATEGORY_IDS.map((id, i) => ({
    id,
    index: formatIndex(i + 1, i18n.language),
    title: t(`categories.items.${id}.name`),
    content: (
      <div className="category-detail">
        <CategoryIcon category={id} className="category-detail__icon" size={72} strokeWidth={1} />
        <div className="category-detail__text">
          <p>{t(`categories.items.${id}.desc`)}</p>
          <ul className="check-list">
            {POINTS.map((p) => (
              <li key={p}>{t(`categories.items.${id}.${p}`)}</li>
            ))}
          </ul>
          <LinkButton to={`/catalog?category=${id}`} arrow>
            {t('cta.browseCategory')}
          </LinkButton>
        </div>
      </div>
    ),
  }));

  return (
    <section className="section section--surface" id="categories" aria-labelledby="categories-title">
      <div className="container">
        <SectionHeading kicker={t('categories.kicker')} title={t('categories.title')} id="categories-title" />
        <Accordion items={items} defaultOpen={CATEGORY_IDS[0]} variant="large" />
      </div>
    </section>
  );
}
