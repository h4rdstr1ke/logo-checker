import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MetadataForm } from './MetadataForm';
import { SiteMetadata } from '@/types';

describe('MetadataForm', () => {
  const initialData: SiteMetadata = {
    siteName: 'МойСтартап',
    domain: 'startup.io',
    pagePath: '/app',
    pageTitle: 'Главная страница стартапа',
    description: 'Описание проекта для поисковиков.',
  };

  it('renders form inputs with initial values', () => {
    const onChange = vi.fn();
    render(<MetadataForm metadata={initialData} onChange={onChange} />);

    expect(screen.getByTestId('input-site-name')).toHaveValue('МойСтартап');
    expect(screen.getByTestId('input-domain')).toHaveValue('startup.io');
    expect(screen.getByTestId('input-page-title')).toHaveValue('Главная страница стартапа');
    expect(screen.getByTestId('input-description')).toHaveValue('Описание проекта для поисковиков.');
  });

  it('calls onChange when user edits inputs', () => {
    const onChange = vi.fn();
    render(<MetadataForm metadata={initialData} onChange={onChange} />);

    const siteNameInput = screen.getByTestId('input-site-name');
    fireEvent.change(siteNameInput, { target: { value: 'НовоеИмя' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        siteName: 'НовоеИмя',
      })
    );
  });

  it('populates SaaS preset when button clicked', () => {
    const onChange = vi.fn();
    render(<MetadataForm metadata={initialData} onChange={onChange} />);

    const saasBtn = screen.getByText('SaaS');
    fireEvent.click(saasBtn);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        siteName: 'CloudMetrics',
        domain: 'cloudmetrics.io',
      })
    );
  });
});
