import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LANGUAGES, getLanguageMeta } from '@/config/languages';

interface LanguageSwitcherProps {
  /** `list` renders all languages inline (used in the mobile menu and footer). */
  layout?: 'menu' | 'list';
}

export function LanguageSwitcher({ layout = 'menu' }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = getLanguageMeta(i18n.language);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code: string) => {
    void i18n.changeLanguage(code);
    setOpen(false);
  };

  const options = LANGUAGES.map((lang) => (
    <li key={lang.code}>
      <button
        type="button"
        lang={lang.code}
        dir={lang.dir}
        className="lang-option"
        aria-current={lang.code === current.code ? 'true' : undefined}
        onClick={() => choose(lang.code)}
      >
        {lang.label}
      </button>
    </li>
  ));

  if (layout === 'list') {
    return (
      <ul className="lang-list" aria-label={t('nav.language')}>
        {options}
      </ul>
    );
  }

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switcher__button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('nav.language')}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Globe size={18} aria-hidden="true" />
        <span dir="ltr">{current.code.toUpperCase()}</span>
      </button>
      <ul id={listId} className="lang-switcher__list" hidden={!open}>
        {options}
      </ul>
    </div>
  );
}
