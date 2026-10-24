import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  evaluateContrastAgainstStandardThemes,
} from './contrast';

describe('contrast utils', () => {
  it('converts 6-digit and 3-digit hex colors to RGB', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('invalid')).toBeNull();
  });

  it('calculates relative luminance correctly', () => {
    expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 2);
    expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 2);
  });

  it('calculates contrast ratio between black and white as 21:1', () => {
    const ratio = getContrastRatio('#ffffff', '#000000');
    expect(ratio).toBe(21);
  });

  it('calculates contrast ratio between identical colors as 1:1', () => {
    const ratio = getContrastRatio('#333333', '#333333');
    expect(ratio).toBe(1);
  });

  it('warns when dark logo is placed against dark chrome tab', () => {
    const results = evaluateContrastAgainstStandardThemes('#252525');
    const darkTab = results.find((r) => r.backgroundName.includes('Chrome Вкладка (Темная)'));
    expect(darkTab).toBeDefined();
    expect(darkTab?.rating).toBe('poor');
  });

  it('reports good visibility for white logo on dark chrome tab', () => {
    const results = evaluateContrastAgainstStandardThemes('#ffffff');
    const darkTab = results.find((r) => r.backgroundName.includes('Chrome Вкладка (Темная)'));
    expect(darkTab?.rating).toBe('good');
  });
});
