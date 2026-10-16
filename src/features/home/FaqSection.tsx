import { useTranslation } from 'react-i18next';
import { Accordion, type AccordionItem } from '@/components/common/Accordion';
import { LinkButton } from '@/components/common/Button';
import { SectionHeading } from '@/components/common/SectionHeading';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export function FaqSection() {
  const { t } = useTranslation();
  const items: AccordionItem[] = QUESTIONS.map((q) => ({
    id: q,
    title: t(`faq.${q}.q`),
    content: <p>{t(`faq.${q}.a`)}</p>,
  }));
  return (
    <section className="section section--surface" id="faq" aria-labelledby="faq-title">
      <div className="container faq">
        <div className="faq__aside">
          <SectionHeading kicker={t('faq.kicker')} title={t('faq.title')} id="faq-title" />
          <div className="panel panel--yellow">
            <h3 className="panel__title">{t('faq.helpTitle')}</h3>
            <p>{t('faq.helpBody')}</p>
            <LinkButton to="/contact" variant="dark" arrow>
              {t('cta.reachOut')}
            </LinkButton>
          </div>
        </div>
        <Accordion items={items} defaultOpen="q1" />
      </div>
    </section>
  );
}
