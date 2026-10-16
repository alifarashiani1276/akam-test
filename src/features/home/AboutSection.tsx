import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/components/common/Button';
import { SectionHeading } from '@/components/common/SectionHeading';
import { formatIndex } from '@/utils/format';

const POINTS = ['p1', 'p2', 'p3', 'p4'] as const;

export function AboutSection({ showCta = true }: { showCta?: boolean }) {
  const { t, i18n } = useTranslation();
  const n = (i: number) => formatIndex(i + 1, i18n.language);
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__intro">
          <SectionHeading kicker={t('about.kicker')} title={t('about.title')} id="about-title" />
          <p className="lead">{t('about.body')}</p>
          {showCta && (
            <LinkButton to="/about" variant="ghost" arrow>
              {t('cta.learnMore')}
            </LinkButton>
          )}
        </div>
        <div className="about__cards">
          <article className="panel panel--yellow">
            <h3 className="panel__title">{t('about.card1.title')}</h3>
            <ol className="numbered-list">
              {POINTS.map((p, i) => (
                <li key={p}>
                  <span className="numbered-list__num">({n(i)})</span>
                  {t(`about.card1.${p}`)}
                </li>
              ))}
            </ol>
          </article>
          <article className="panel">
            <h3 className="panel__title">{t('about.card2.title')}</h3>
            <p>{t('about.card2.body')}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
