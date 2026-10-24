import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LogoUploader } from './LogoUploader';
import { LogoSettings } from '@/types';

describe('LogoUploader', () => {
  const settings: LogoSettings = {
    imageUrl: 'data:image/svg+xml;utf8,<svg></svg>',
    fileName: 'my-logo.svg',
    width: 64,
    height: 64,
    bgShape: 'none',
    bgColor: '#ffffff',
    padding: 0,
    borderRadius: 0,
  };

  it('renders drop zone and current file name', () => {
    const onChange = vi.fn();
    render(<LogoUploader settings={settings} onChange={onChange} />);

    expect(screen.getByTestId('drop-zone')).toBeInTheDocument();
    expect(screen.getByText('my-logo.svg')).toBeInTheDocument();
    expect(screen.getByText('(64×64px)')).toBeInTheDocument();
  });

  it('changes shape to circle when clicked', () => {
    const onChange = vi.fn();
    render(<LogoUploader settings={settings} onChange={onChange} />);

    const circleBtn = screen.getByTestId('shape-circle');
    fireEvent.click(circleBtn);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        bgShape: 'circle',
      })
    );
  });

  it('renders padding slider when shape is not none', () => {
    const onChange = vi.fn();
    render(
      <LogoUploader
        settings={{ ...settings, bgShape: 'circle', padding: 10 }}
        onChange={onChange}
      />
    );

    const slider = screen.getByTestId('padding-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue('10');

    fireEvent.change(slider, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        padding: 20,
      })
    );
  });
});
