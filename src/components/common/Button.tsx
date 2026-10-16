import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'dark' | 'ghost';

interface CommonProps {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

function classes(variant: Variant, className?: string) {
  return `btn btn--${variant}${className ? ` ${className}` : ''}`;
}

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="icon-flip" size={18} aria-hidden="true" />}
    </>
  );
}

export function LinkButton({
  variant = 'primary',
  arrow,
  children,
  className,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

export function Button({
  variant = 'primary',
  arrow,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
