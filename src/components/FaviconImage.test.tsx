import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FaviconImage } from './FaviconImage';
import { LogoSettings } from '@/types';

describe('FaviconImage component', () => {
  const baseSettings: LogoSettings = {
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    fileName: 'logo.svg',
    bgShape: 'circle',
    bgColor: '#ffffff',
    padding: 10,
    borderRadius: 0,
  };

  it('renders with specified dimensions and circle shape', () => {
    render(<FaviconImage settings={baseSettings} size={32} />);
    const container = screen.getByTestId('favicon-container');
    expect(container).toBeInTheDocument();
    expect(container.style.width).toBe('32px');
    expect(container.style.height).toBe('32px');
    expect(container.style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(container.className).toContain('rounded-full');
  });

  it('renders transparent when bgShape is none', () => {
    render(
      <FaviconImage
        settings={{ ...baseSettings, bgShape: 'none', bgColor: '#ff0000' }}
        size={16}
      />
    );
    const container = screen.getByTestId('favicon-container');
    expect(container.style.backgroundColor).toBe('transparent');
  });
});
