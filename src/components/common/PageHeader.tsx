import type { ReactNode } from 'react';
import { BrandPattern } from './BrandPattern';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHeader({ kicker, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="page-header">
      <BrandPattern className="page-header__pattern" />
      <div className="container page-header__inner">
        {kicker && <p className="kicker">{kicker}</p>}
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
