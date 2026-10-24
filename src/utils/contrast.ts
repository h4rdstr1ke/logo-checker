export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts a 3 or 6 hex string to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleaned.length !== 6) return null;

  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Calculates relative luminance for WCAG contrast
 */
export function getRelativeLuminance({ r, g, b }: RGB): number {
  const sRGB = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculates WCAG contrast ratio between two hex colors (returns 1.00 to 21.00)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Number(ratio.toFixed(2));
}

/**
 * Analyzes contrast against standard browser UI backgrounds
 */
export function evaluateContrastAgainstStandardThemes(foregroundHex: string) {
  const themes = [
    { name: 'Chrome Вкладка (Светлая)', hex: '#dee1e6' },
    { name: 'Chrome Вкладка (Темная)', hex: '#292a2d' },
    { name: 'Google / Yandex (Светлая)', hex: '#ffffff' },
    { name: 'Google SERP (Темная)', hex: '#202124' },
  ];

  return themes.map((theme) => {
    const ratio = getContrastRatio(foregroundHex, theme.hex);
    let rating: 'good' | 'warning' | 'poor' = 'good';
    let warningMessage = 'Отличная видимость и читаемость';

    if (ratio < 2.0) {
      rating = 'poor';
      warningMessage = 'Очень низкий контраст: логотип сливается с фоном!';
    } else if (ratio < 3.5) {
      rating = 'warning';
      warningMessage = 'Умеренный контраст: мелкие детали могут теряться.';
    }

    return {
      backgroundName: theme.name,
      bgColorHex: theme.hex,
      contrastRatio: ratio,
      rating,
      warningMessage,
    };
  });
}
