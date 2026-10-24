import { describe, it, expect } from 'vitest';
import { generateHtmlFaviconSnippet, generateWebManifestSnippet } from './snippets';

describe('snippet generation', () => {
  const metadata = {
    siteName: 'СуперСервис',
    domain: 'superservice.ru',
    pagePath: '/catalog',
    pageTitle: 'Купить товары онлайн | СуперСервис',
    description: 'Официальный магазин с гарантией и быстрой доставкой по РФ.',
  };

  it('generates valid html link tags containing favicon and apple-touch-icon', () => {
    const html = generateHtmlFaviconSnippet(metadata);
    expect(html).toContain('favicon-32x32.png');
    expect(html).toContain('apple-touch-icon.png');
    expect(html).toContain('<title>Купить товары онлайн | СуперСервис</title>');
    expect(html).toContain('https://superservice.ru/catalog');
  });

  it('generates valid json manifest with siteName and icon sizes', () => {
    const jsonStr = generateWebManifestSnippet(metadata);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.name).toBe('СуперСервис');
    expect(parsed.icons).toHaveLength(2);
    expect(parsed.icons[0].sizes).toBe('192x192');
  });
});
