export type BackgroundShape = 'none' | 'circle' | 'squircle' | 'square';

export type BackgroundColorType = 'transparent' | 'white' | 'dark' | 'custom';

export interface LogoSettings {
  imageUrl: string;
  fileName: string;
  fileSize?: number;
  width?: number;
  height?: number;
  // Appearance adjustments
  bgShape: BackgroundShape;
  bgColor: string;
  padding: number; // percentage 0 to 40
  borderRadius: number; // percentage 0 to 50
}

export interface SiteMetadata {
  siteName: string;
  domain: string;
  pagePath: string;
  pageTitle: string;
  description: string;
}

export type ThemeMode = 'light' | 'dark';

export type TabStyle = 'chrome' | 'safari';

export type SerpEngine = 'google' | 'yandex';

export type DeviceMode = 'desktop' | 'mobile';

export interface ContrastScore {
  backgroundName: string;
  bgColorHex: string;
  contrastRatio: number;
  rating: 'good' | 'warning' | 'poor';
  warningMessage?: string;
}
