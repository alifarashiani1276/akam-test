import type { ReactNode } from 'react';

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  id?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({ kicker, title, id, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="kicker">{kicker}</p>
      <Tag className="section-heading__title" id={id}>
        {title}
      </Tag>
    </header>
  );
}
