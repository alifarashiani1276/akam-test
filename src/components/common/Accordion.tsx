import { useId, useState, type ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  /** Optional leading label such as "01". */
  index?: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | null;
  variant?: 'faq' | 'large';
}

/** Single-open accessible accordion (button + region pattern). */
export function Accordion({ items, defaultOpen = null, variant = 'faq' }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const base = useId();
  return (
    <div className={`accordion accordion--${variant}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${base}-${item.id}-panel`;
        const buttonId = `${base}-${item.id}-button`;
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <h3 className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                {item.index && <span className="accordion__index">{item.index}</span>}
                <span className="accordion__title">{item.title}</span>
                {isOpen ? <Minus size={22} aria-hidden="true" /> : <Plus size={22} aria-hidden="true" />}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="accordion__panel">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
