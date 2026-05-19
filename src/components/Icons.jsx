export const FolderIcon = ({ color = "var(--yellow)" }) => (
  <svg viewBox="0 0 64 56" fill="none">
    <path d="M3 12 L24 12 L29 6 L40 6 L40 14 L3 14 Z" fill={color} stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M3 13 L61 13 L61 51 L3 51 Z" fill={color} stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M3 18 L61 18" stroke="var(--ink)" strokeWidth="1.5" opacity="0.5"/>
    <path d="M40 6 L40 14" stroke="var(--ink)" strokeWidth="2.5"/>
  </svg>
)

export const DocIcon = ({ color = "var(--paper-2)", glyph = null }) => (
  <svg viewBox="0 0 52 64" fill="none">
    <path d="M5 3 L36 3 L48 15 L48 60 L5 60 Z" fill={color} stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M36 3 L36 15 L48 15" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    {glyph || (
      <>
        <line x1="11" y1="25" x2="40" y2="25" stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1="11" y1="32" x2="42" y2="32" stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1="11" y1="39" x2="38" y2="39" stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1="11" y1="46" x2="42" y2="46" stroke="var(--ink)" strokeWidth="1.5"/>
        <line x1="11" y1="53" x2="32" y2="53" stroke="var(--ink)" strokeWidth="1.5"/>
      </>
    )}
  </svg>
)

export const AppIcon = ({ color = "var(--blue)", glyph = "★" }) => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" rx="12" fill={color} stroke="var(--ink)" strokeWidth="2.5"/>
    <text x="32" y="44" textAnchor="middle" fontFamily="var(--f-display)" fontSize="34" fontWeight="700" fill="var(--ink)">{glyph}</text>
  </svg>
)

export const MeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="6" y="4" width="52" height="56" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5"/>
    <rect x="11" y="9" width="42" height="40" fill="var(--blue)" stroke="var(--ink)" strokeWidth="2"/>
    <path d="M11 49 L11 41 Q 18 32 32 32 Q 46 32 53 41 L53 49 Z" fill="var(--ink)"/>
    <circle cx="32" cy="26" r="9" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2"/>
    <path d="M23 24 Q 24 17 32 16 Q 40 17 41 24" fill="var(--ink)"/>
    <text x="32" y="57" textAnchor="middle" fontFamily="var(--f-hand)" fontSize="10" fill="var(--ink)">akshay</text>
  </svg>
)

export const TrashIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="14" y="14" width="36" height="10" rx="2" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5"/>
    <path d="M16 24 L48 24 L45 56 L19 56 Z" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <line x1="24" y1="32" x2="24" y2="50" stroke="var(--ink)" strokeWidth="1.8"/>
    <line x1="32" y1="32" x2="32" y2="50" stroke="var(--ink)" strokeWidth="1.8"/>
    <line x1="40" y1="32" x2="40" y2="50" stroke="var(--ink)" strokeWidth="1.8"/>
    <path d="M26 14 L26 10 L38 10 L38 14" stroke="var(--ink)" strokeWidth="2"/>
  </svg>
)

export const MailIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="6" y="14" width="52" height="38" rx="4" fill="var(--red)" stroke="var(--ink)" strokeWidth="2.5"/>
    <path d="M6 18 L32 38 L58 18" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <rect x="22" y="6" width="20" height="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2"/>
  </svg>
)

export const MusicIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="4" y="4" width="56" height="56" rx="12" fill="var(--pink)" stroke="var(--ink)" strokeWidth="2.5"/>
    <circle cx="32" cy="32" r="18" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2"/>
    <circle cx="32" cy="32" r="4" fill="var(--ink)"/>
    <path d="M40 18 L40 32" stroke="var(--ink)" strokeWidth="3"/>
    <ellipse cx="38" cy="33" rx="4" ry="3" fill="var(--ink)"/>
  </svg>
)

export const ReadmeIcon = () => (
  <svg viewBox="0 0 52 64" fill="none">
    <path d="M5 3 L36 3 L48 15 L48 60 L5 60 Z" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M36 3 L36 15 L48 15" fill="none" stroke="var(--ink)" strokeWidth="2.5"/>
    <rect x="11" y="22" width="32" height="32" fill="var(--ink)" rx="2"/>
    <text x="27" y="44" textAnchor="middle" fontFamily="var(--f-display)" fontSize="12" fontWeight="700" fill="var(--paper)">README</text>
  </svg>
)

export const StickyIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="8" y="8" width="48" height="48" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" transform="rotate(-3 32 32)"/>
    <line x1="16" y1="22" x2="44" y2="22" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-3 32 32)"/>
    <line x1="16" y1="30" x2="46" y2="30" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-3 32 32)"/>
    <line x1="16" y1="38" x2="40" y2="38" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-3 32 32)"/>
  </svg>
)

export const HddIcon = () => (
  <svg viewBox="0 0 64 64" fill="none">
    <rect x="6" y="10" width="52" height="44" rx="4" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="2.5"/>
    <rect x="12" y="16" width="40" height="22" fill="var(--ink)" rx="2"/>
    <text x="32" y="30" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fontWeight="700" fill="var(--mint)">akshay.OS</text>
    <circle cx="14" cy="46" r="2" fill="var(--mint)"/>
    <circle cx="22" cy="46" r="2" fill="var(--red)"/>
    <circle cx="30" cy="46" r="2" fill="var(--yellow)"/>
  </svg>
)
