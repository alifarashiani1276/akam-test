import { useTranslation } from 'react-i18next';

interface LogoProps {
  /** `dark` = logo for dark backgrounds, `light` = logo for light backgrounds. */
  variant?: 'dark' | 'light';
  className?: string;
}

/** Official AKAM Machine logo (vector extracted from the brand guidelines). Never recolor or distort. */
export function Logo({ variant = 'dark', className }: LogoProps) {
  const { t } = useTranslation();
  return (
    <img
      className={className}
      src={`/assets/logo-${variant}.svg`}
      alt={t('nav.home')}
      width={420}
      height={160}
      decoding="async"
    />
  );
}
