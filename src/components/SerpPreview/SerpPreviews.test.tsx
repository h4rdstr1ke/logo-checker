import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GoogleSerp } from './GoogleSerp';
import { YandexSerp } from './YandexSerp';
import { LogoSettings, SiteMetadata } from '@/types';

describe('SERP Previews', () => {
  const settings: LogoSettings = {
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    fileName: 'logo.svg',
    bgShape: 'circle',
    bgColor: '#ffffff',
    padding: 0,
    borderRadius: 0,
  };

  const metadata: SiteMetadata = {
    siteName: 'МойСервис',
    domain: 'myservice.ru',
    pagePath: '/services/audit',
    pageTitle: 'Комплексный аудит сайта онлайн | МойСервис',
    description: 'Быстрый и надежный аудит всех параметров вашего веб-сайта.',
  };

  describe('GoogleSerp', () => {
    it('renders site title, domain breadcrumbs, and snippet', () => {
      render(<GoogleSerp settings={settings} metadata={metadata} />);
      expect(screen.getByText('МойСервис')).toBeInTheDocument();
      expect(screen.getByText('Комплексный аудит сайта онлайн | МойСервис')).toBeInTheDocument();
      expect(screen.getByText(/Быстрый и надежный аудит/)).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/myservice.ru › services › audit/)).toBeInTheDocument();
    });

    it('toggles mobile and desktop views', () => {
      render(<GoogleSerp settings={settings} metadata={metadata} />);
      const mobileBtn = screen.getByTestId('google-toggle-mobile');
      fireEvent.click(mobileBtn);
      expect(mobileBtn.className).toContain('font-medium');
    });

    it('toggles dark mode', () => {
      render(<GoogleSerp settings={settings} metadata={metadata} initialTheme="light" />);
      const darkBtn = screen.getByTestId('google-toggle-dark');
      fireEvent.click(darkBtn);
      expect(darkBtn.className).toContain('shadow-xs');
    });
  });

  describe('YandexSerp', () => {
    it('renders yandex official site badge and title', () => {
      render(<YandexSerp settings={settings} metadata={metadata} />);
      expect(screen.getByText('Официальный сайт')).toBeInTheDocument();
      expect(screen.getByText('myservice.ru/services/audit')).toBeInTheDocument();
      expect(screen.getByText('Комплексный аудит сайта онлайн | МойСервис')).toBeInTheDocument();
    });

    it('switches between light and dark mode in Yandex', () => {
      render(<YandexSerp settings={settings} metadata={metadata} initialTheme="light" />);
      const darkBtn = screen.getByTestId('yandex-toggle-dark');
      fireEvent.click(darkBtn);
      expect(darkBtn.className).toContain('shadow-xs');
    });
  });
});
