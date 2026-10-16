import { useTranslation } from 'react-i18next';
import { LinkButton } from '@/components/common/Button';
import { BrandPattern } from '@/components/common/BrandPattern';
import { MachineIllustration } from '@/components/common/MachineIllustration';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <BrandPattern className="hero__pattern" />
      <span className="hero__wordmark" aria-hidden="true" dir="ltr">
        AKAM
      </span>
      <MachineIllustration className="hero__machine" />
      <div className="container hero__content">
        <div>
          <h1 className="hero__title" id="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
        </div>
        <LinkButton to="/catalog" arrow>
          {t('cta.viewCatalog')}
        </LinkButton>
      </div>
    </section>
  );
}
