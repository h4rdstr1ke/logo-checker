import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExportSection } from './ExportSection';
import { LogoSettings, SiteMetadata } from '@/types';

describe('ExportSection', () => {
  const settings: LogoSettings = {
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    fileName: 'logo.svg',
    bgShape: 'circle',
    bgColor: '#ffffff',
    padding: 10,
    borderRadius: 0,
  };

  const metadata: SiteMetadata = {
    siteName: 'MyProduct',
    domain: 'myproduct.io',
    pagePath: '/landing',
    pageTitle: 'MyProduct — Лучший продукт',
    description: 'Описание проекта для поисковика.',
  };

  it('renders download buttons for standard sizes', () => {
    render(<ExportSection settings={settings} metadata={metadata} />);

    expect(screen.getByTestId('download-16')).toBeInTheDocument();
    expect(screen.getByTestId('download-32')).toBeInTheDocument();
    expect(screen.getByTestId('download-180')).toBeInTheDocument();
    expect(screen.getByTestId('download-512')).toBeInTheDocument();
  });

  it('displays HTML code snippet containing meta title and favicon links', () => {
    render(<ExportSection settings={settings} metadata={metadata} />);

    expect(screen.getByText(/<link rel="icon" type="image\/png" sizes="16x16"/)).toBeInTheDocument();
    expect(screen.getByText(/<title>MyProduct — Лучший продукт<\/title>/)).toBeInTheDocument();
  });

  it('switches to manifest tab when clicked', () => {
    render(<ExportSection settings={settings} metadata={metadata} />);

    const manifestTab = screen.getByText('site.webmanifest');
    fireEvent.click(manifestTab);

    expect(screen.getByText(/"short_name": "MyProduct"/)).toBeInTheDocument();
  });
});
