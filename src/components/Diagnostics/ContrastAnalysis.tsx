'use client';

import React from 'react';
import { LogoSettings } from '@/types';
import { FaviconImage } from '../FaviconImage';
import { evaluateContrastAgainstStandardThemes } from '@/utils/contrast';
import { AlertTriangle, CheckCircle, ShieldAlert, ZoomIn } from 'lucide-react';

interface ContrastAnalysisProps {
  settings: LogoSettings;
}

export const ContrastAnalysis: React.FC<ContrastAnalysisProps> = ({ settings }) => {
  // If the user has a background color set (e.g. circle with white or dark), evaluate against that.
  // Otherwise evaluate default contrast
  const effectiveColor = settings.bgShape !== 'none' ? settings.bgColor : '#18181b';
  const checks = evaluateContrastAgainstStandardThemes(effectiveColor);

  return (
    <div
      data-testid="contrast-analysis"
      className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Диагностика видимости и контраста</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Проверка слияния фавикона с фоном темных и светлых тем браузера
          </p>
        </div>
      </div>

      {/* Grid of Background Themes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {checks.map((item, idx) => {
          const isGood = item.rating === 'good';
          const isWarning = item.rating === 'warning';

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-3"
              style={{ backgroundColor: item.bgColorHex }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded shadow-2xs"
                  style={{
                    backgroundColor: item.bgColorHex === '#ffffff' || item.bgColorHex === '#dee1e6' ? '#00000010' : '#ffffff20',
                    color: item.bgColorHex === '#ffffff' || item.bgColorHex === '#dee1e6' ? '#18181b' : '#ffffff',
                  }}
                >
                  {item.backgroundName}
                </span>

                {isGood && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                {isWarning && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                {!isGood && !isWarning && <ShieldAlert className="w-4 h-4 text-rose-500" />}
              </div>

              {/* Favicon in context */}
              <div className="py-2 flex items-center justify-center">
                <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-white/10 flex items-center justify-center">
                  <FaviconImage settings={settings} size={28} />
                </div>
              </div>

              {/* Status Note */}
              <div
                className="text-[11px] leading-tight font-medium"
                style={{
                  color: item.bgColorHex === '#ffffff' || item.bgColorHex === '#dee1e6' ? '#374151' : '#d1d5db',
                }}
              >
                {item.warningMessage}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pixel Scale & Legibility Inspector */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
          <ZoomIn className="w-4 h-4 text-blue-500" />
          <span>Проверка читаемости в разных разрешениях (16px, 32px, 48px, Zoom 6x)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {/* 16x16 */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex flex-col items-center justify-center">
            <div className="h-10 flex items-center justify-center mb-1">
              <FaviconImage settings={settings} size={16} />
            </div>
            <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">16 × 16 px</div>
            <div className="text-[10px] text-neutral-400">Вкладка браузера</div>
          </div>

          {/* 32x32 */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex flex-col items-center justify-center">
            <div className="h-10 flex items-center justify-center mb-1">
              <FaviconImage settings={settings} size={32} />
            </div>
            <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">32 × 32 px</div>
            <div className="text-[10px] text-neutral-400">Retina / HD экраны</div>
          </div>

          {/* 48x48 */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex flex-col items-center justify-center">
            <div className="h-10 flex items-center justify-center mb-1">
              <FaviconImage settings={settings} size={48} />
            </div>
            <div className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200">48 × 48 px</div>
            <div className="text-[10px] text-neutral-400">Закладки / Меню</div>
          </div>

          {/* 6x Magnified Inspector */}
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/60 flex flex-col items-center justify-center">
            <div className="h-10 flex items-center justify-center mb-1 scale-150 transform-gpu">
              <div className="border border-dashed border-blue-400/60 p-0.5 rounded">
                <FaviconImage settings={settings} size={16} />
              </div>
            </div>
            <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">Увеличение 16px</div>
            <div className="text-[10px] text-neutral-400">Четкость краев</div>
          </div>
        </div>
      </div>
    </div>
  );
};
