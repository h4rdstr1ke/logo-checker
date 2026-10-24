import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

describe('Home Page', () => {
  it('renders app logo and main title', () => {
    render(<Home />);
    expect(screen.getByText('LogoScope')).toBeInTheDocument();
    expect(screen.getByText('Проверка логотипа во вкладках браузера и поисковиках')).toBeInTheDocument();
  });

  it('renders all sections in default "all" view', () => {
    render(<Home />);
    expect(screen.getByTestId('chrome-desktop-preview')).toBeInTheDocument();
    expect(screen.getByTestId('safari-preview')).toBeInTheDocument();
    expect(screen.getByTestId('google-serp-preview')).toBeInTheDocument();
    expect(screen.getByTestId('yandex-serp-preview')).toBeInTheDocument();
    expect(screen.getByTestId('contrast-analysis')).toBeInTheDocument();
    expect(screen.getByTestId('export-section')).toBeInTheDocument();
  });

  it('filters to tabs view when tabs filter is clicked', () => {
    render(<Home />);
    const tabsFilter = screen.getByTestId('filter-tabs');
    fireEvent.click(tabsFilter);

    expect(screen.getByTestId('chrome-desktop-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('google-serp-preview')).not.toBeInTheDocument();
  });

  it('filters to SERP view when SERP filter is clicked', () => {
    render(<Home />);
    const serpFilter = screen.getByTestId('filter-serp');
    fireEvent.click(serpFilter);

    expect(screen.getByTestId('google-serp-preview')).toBeInTheDocument();
    expect(screen.getByTestId('yandex-serp-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('chrome-desktop-preview')).not.toBeInTheDocument();
  });
});
