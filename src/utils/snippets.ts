import { SiteMetadata } from '@/types';

export function generateHtmlFaviconSnippet(metadata: SiteMetadata): string {
  const title = metadata.pageTitle || 'Мой сайт';
  return `<!-- Favicon & Icons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#ffffff" />

<!-- SERP & SEO Preview Tags -->
<title>${title}</title>
<meta name="description" content="${metadata.description}" />
<link rel="canonical" href="https://${metadata.domain}${metadata.pagePath.startsWith('/') ? '' : '/'}${metadata.pagePath}" />
<meta property="og:site_name" content="${metadata.siteName}" />`;
}

export function generateWebManifestSnippet(metadata: SiteMetadata): string {
  const manifest = {
    name: metadata.siteName || 'App',
    short_name: metadata.siteName || 'App',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  };

  return JSON.stringify(manifest, null, 2);
}
