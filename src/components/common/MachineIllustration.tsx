import { useTranslation } from 'react-i18next';

/** Stylized crawler-excavator illustration drawn in brand colors (original artwork, no external assets). */
export function MachineIllustration({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <svg
      className={className}
      viewBox="0 0 800 470"
      role="img"
      aria-label={t('hero.visualLabel')}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="340" cy="445" rx="330" ry="16" fill="#000" opacity=".55" />
      {/* tracks */}
      <rect x="120" y="360" width="440" height="78" rx="39" fill="#1b1b1b" stroke="#444" strokeWidth="3" />
      <circle cx="165" cy="399" r="24" fill="#2b2b2b" stroke="#555" strokeWidth="3" />
      <circle cx="515" cy="399" r="24" fill="#2b2b2b" stroke="#555" strokeWidth="3" />
      <circle cx="260" cy="410" r="13" fill="#2b2b2b" stroke="#555" strokeWidth="2" />
      <circle cx="340" cy="410" r="13" fill="#2b2b2b" stroke="#555" strokeWidth="2" />
      <circle cx="420" cy="410" r="13" fill="#2b2b2b" stroke="#555" strokeWidth="2" />
      {/* body */}
      <rect x="150" y="300" width="360" height="66" rx="6" fill="#FFCF05" />
      <rect x="130" y="290" width="70" height="76" rx="8" fill="#FAB732" />
      <rect x="150" y="345" width="360" height="9" fill="#000" opacity=".18" />
      {/* cab */}
      <path d="M300 300 V228 H392 L428 300 Z" fill="#FFCF05" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M316 244 H382 L408 296 H316 Z" fill="#0d0d0d" />
      <path d="M326 252 H370 L360 272 H326 Z" fill="#fff" opacity=".12" />
      {/* boom, arm, bucket */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <line x1="450" y1="312" x2="590" y2="160" stroke="#000" strokeWidth="38" />
        <line x1="450" y1="312" x2="590" y2="160" stroke="#FFCF05" strokeWidth="28" />
        <line x1="590" y1="160" x2="700" y2="296" stroke="#000" strokeWidth="30" />
        <line x1="590" y1="160" x2="700" y2="296" stroke="#FAB732" strokeWidth="20" />
        <line x1="470" y1="300" x2="560" y2="215" stroke="#8a8a8a" strokeWidth="9" />
        <line x1="600" y1="150" x2="672" y2="214" stroke="#8a8a8a" strokeWidth="8" />
      </g>
      <path d="M676 286 L748 300 L732 354 L668 338 Z" fill="#FAB732" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <path d="M732 354 L748 300 L760 318 L746 362 Z" fill="#c98a12" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="590" cy="160" r="12" fill="#1b1b1b" stroke="#000" strokeWidth="3" />
      <circle cx="700" cy="296" r="9" fill="#1b1b1b" />
      <rect x="140" y="326" width="40" height="12" fill="#000" opacity=".5" />
    </svg>
  );
}
