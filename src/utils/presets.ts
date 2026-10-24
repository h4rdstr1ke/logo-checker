export interface PresetLogo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  defaultBgShape: 'none' | 'circle' | 'squircle' | 'square';
  defaultBgColor: string;
  defaultPadding: number;
}

// Inline SVGs encoded as Data URIs for instant, reliable loading without external network
export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'tech-gradient',
    name: 'TechFlow (Градиент)',
    description: 'Современный градиентный знак (синий / фиолетовый)',
    imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="24" fill="url(#grad1)" />
        <path d="M30 50 L45 35 L70 60 L55 75 Z" fill="#ffffff" opacity="0.9" />
        <circle cx="65" cy="35" r="8" fill="#ffffff" />
      </svg>`
    )}`,
    defaultBgShape: 'none',
    defaultBgColor: '#ffffff',
    defaultPadding: 0,
  },
  {
    id: 'dark-minimal',
    name: 'Monochrome (Черный на прозрачном)',
    description: 'Проверка видимости на темной теме Chrome/Yandex',
    imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M50 15 L85 80 L15 80 Z" fill="#18181b" />
        <circle cx="50" cy="55" r="14" fill="none" stroke="#ffffff" stroke-width="6" />
      </svg>`
    )}`,
    defaultBgShape: 'none',
    defaultBgColor: '#ffffff',
    defaultPadding: 0,
  },
  {
    id: 'eco-leaf',
    name: 'EcoBio (Зеленый лист)',
    description: 'Яркий органический знак на прозрачном фоне',
    imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M50 10 C75 10 90 35 90 60 C90 85 65 90 50 90 C25 90 10 75 10 50 C10 25 30 10 50 10 Z" fill="#10b981" />
        <path d="M30 65 Q50 45 70 30" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none" />
      </svg>`
    )}`,
    defaultBgShape: 'none',
    defaultBgColor: '#ffffff',
    defaultPadding: 0,
  },
  {
    id: 'solaris-orange',
    name: 'Solaris (Огненный круг)',
    description: 'Контрастный теплый логотип для маркетплейса',
    imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#f97316" />
        <polygon points="50,22 59,40 78,41 63,54 68,73 50,61 32,73 37,54 22,41 41,40" fill="#ffffff" />
      </svg>`
    )}`,
    defaultBgShape: 'none',
    defaultBgColor: '#ffffff',
    defaultPadding: 0,
  },
  {
    id: 'telegram-style',
    name: 'SkyPlane (Сфера)',
    description: 'Круглая иконка со светлым символом',
    imageUrl: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#0284c7" />
        <path d="M26 48 L72 30 L58 72 L47 57 L44 64 L41 53 Z" fill="#ffffff" />
      </svg>`
    )}`,
    defaultBgShape: 'none',
    defaultBgColor: '#ffffff',
    defaultPadding: 0,
  },
];
