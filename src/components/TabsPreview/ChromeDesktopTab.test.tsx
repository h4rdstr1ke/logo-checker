import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChromeDesktopTab } from './ChromeDesktopTab';
import { LogoSettings, SiteMetadata } from '@/types';

describe('ChromeDesktopTab', () => {
  const settings: LogoSettings = {
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    fileName: 'logo.svg',
    bgShape: 'none',
    bgColor: '#ffffff',
    padding: 0,
    borderRadius: 0,
  };

  const metadata: SiteMetadata = {
    siteName: 'ТестПроект',
    domain: 'test.ru',
    pagePath: '/about',
    pageTitle: 'О компании | ТестПроект',
    description: 'Описание тестового проекта',
  };

  it('renders tab title and domain', () => {
    render(<ChromeDesktopTab settings={settings} metadata={metadata} />);
    expect(screen.getAllByText('О компании | ТестПроект').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('test.ru')).toBeInTheDocument();
    expect(screen.getByText('ТестПроект')).toBeInTheDocument();
  });

  it('switches between light and dark themes', () => {
    render(<ChromeDesktopTab settings={settings} metadata={metadata} initialTheme="light" />);
    const darkBtn = screen.getByTestId('toggle-dark-theme');
    fireEvent.click(darkBtn);
    expect(darkBtn.className).toContain('font-semibold');
  });

  it('toggles active tab when clicked', () => {
    render(<ChromeDesktopTab settings={settings} metadata={metadata} />);
    const userTab = screen.getByTestId('user-tab');
    fireEvent.click(userTab);
    expect(userTab.className).toContain('font-medium');
  });
});
