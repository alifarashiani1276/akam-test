import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/common/SectionHeading';
import { formatIndex } from '@/utils/format';

const STEPS = ['s1', 's2', 's3'] as const;

export function ProcessSection() {
  const { t, i18n } = useTranslation();
  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading kicker={t('process.kicker')} title={t('process.title')} id="process-title" />
        <ol className="process">
          {STEPS.map((s, i) => (
            <li key={s} className="process__step">
              <span className="process__num">{formatIndex(i + 1, i18n.language)}</span>
              <h3>{t(`process.${s}.title`)}</h3>
              <p>{t(`process.${s}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
