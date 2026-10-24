'use client';

import React from 'react';
import { LogoSettings } from '@/types';

interface FaviconImageProps {
  settings: LogoSettings;
  size?: number; // width & height in px
  className?: string;
  alt?: string;
}

export const FaviconImage: React.FC<FaviconImageProps> = ({
  settings,
  size = 16,
  className = '',
  alt = 'Favicon',
}) => {
  const { imageUrl, bgShape, bgColor, padding, borderRadius } = settings;

  // Determine container styling based on bgShape
  let shapeClass = 'overflow-hidden';
  let dynamicRadius = '0px';

  if (bgShape === 'circle') {
    shapeClass += ' rounded-full';
  } else if (bgShape === 'squircle') {
    // Squircle approximate border-radius
    dynamicRadius = `${Math.max(2, Math.round(size * 0.22))}px`;
  } else if (bgShape === 'square') {
    dynamicRadius = `${borderRadius > 0 ? (borderRadius / 100) * size : 0}px`;
  }

  const containerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgShape !== 'none' ? bgColor : 'transparent',
    padding: bgShape !== 'none' && padding > 0 ? `${(padding / 100) * size}px` : 0,
    borderRadius: bgShape === 'circle' ? '9999px' : dynamicRadius,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxSizing: 'border-box',
  };

  return (
    <div
      data-testid="favicon-container"
      className={`relative select-none ${shapeClass} ${className}`}
      style={containerStyle}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none"
        style={{
          imageRendering: size <= 32 ? 'auto' : 'auto',
        }}
      />
    </div>
  );
};
