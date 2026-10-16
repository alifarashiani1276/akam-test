import { useId } from 'react';

interface BrandPatternProps {
  variant?: 'stroke' | 'fill';
  className?: string;
}

/** Triangle "super graphic" from the brand guidelines, fading out across the container. */
export function BrandPattern({ variant = 'stroke', className = '' }: BrandPatternProps) {
  const id = useId();
  const filled = variant === 'fill';
  return (
    <svg
      className={`brand-pattern ${className}`}
      aria-hidden="true"
      focusable="false"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M3 3 L17 10 L3 17 Z"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M20 21 L25 23.5 L20 26 Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
