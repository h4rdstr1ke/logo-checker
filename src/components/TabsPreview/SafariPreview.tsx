'use client';

import React, { useState } from 'react';
import { LogoSettings, SiteMetadata, ThemeMode } from '@/types';
import { FaviconImage } from '../FaviconImage';
import {
  Sidebar,
  Share,
  Plus,
  Shield,
  RotateCw,
  Sun,
  Moon,
  Compass,
} from 'lucide-react';

interface SafariPreviewProps {
  settings: LogoSettings;
  metadata: SiteMetadata;
  initialTheme?: ThemeMode;
}

export const SafariPreview: React.FC<SafariPreviewProps> = ({
  settings,
  metadata,
  initialTheme = 'light',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const isDark = theme === 'dark';

  return (
    <div
      data-testid="safari-preview"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-colors duration-200 bg-white dark:bg-neutral-900"
    >
      {/* Header Toolbar */}
      <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/60 text-xs">
        <div className="flex items-center gap-2 font-medium text-neutral-600 dark:text-neutral-400">
          <Compass className="w-4 h-4 text-sky-500" />
          <span>Apple Safari (macOS)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid="safari-toggle-light"
            onClick={() => setTheme('light')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              !isDark
                ? 'bg-white shadow-xs font-semibold text-neutral-900 border border-neutral-200'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Светлая</span>
          </button>
          <button
            type="button"
            data-testid="safari-toggle-dark"
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
              isDark
                ? 'bg-neutral-800 shadow-xs font-semibold text-white border border-neutral-700'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Темная</span>
          </button>
        </div>
      </div>

      {/* Safari Window Simulation */}
      <div
        className={`w-full font-sans transition-colors duration-200 ${
          isDark ? 'bg-[#1e1e1e] text-[#f5f5f7]' : 'bg-[#e8e8ed] text-[#1d1d1f]'
        }`}
      >
        {/* Safari Top Bar with integrated Tab */}
        <div className="px-3 py-2 flex items-center gap-3">
          {/* macOS controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs border border-[#e0443e]/40" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs border border-[#dea123]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs border border-[#1aab29]/40" />
          </div>

          <button
            type="button"
            className="p-1 rounded-md hover:bg-neutral-500/10 text-neutral-500"
          >
            <Sidebar className="w-4 h-4" />
          </button>

          {/* Safari Tab Pill */}
          <a
            href={`https://${metadata.domain || 'example.com'}${metadata.pagePath || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть сайт по ссылке в новой вкладке"
            className={`flex-1 max-w-lg mx-auto flex items-center justify-between px-3 py-1.5 rounded-lg text-xs shadow-xs transition-colors cursor-pointer hover:ring-1 hover:ring-sky-500/50 ${
              isDark
                ? 'bg-[#2d2d2d] border border-neutral-700/60 text-neutral-200'
                : 'bg-white border border-neutral-300/80 text-neutral-800'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Shield className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <FaviconImage settings={settings} size={16} alt="Safari Favicon" />
              <span className="truncate font-medium text-[12px]">
                {metadata.domain || 'example.com'}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-neutral-400">
              <RotateCw className="w-3.5 h-3.5 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer" />
            </div>
          </a>

          <div className="flex items-center gap-2 shrink-0 text-neutral-500">
            <button
              type="button"
              className="p-1 rounded-md hover:bg-neutral-500/10"
            >
              <Share className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1 rounded-md hover:bg-neutral-500/10"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Safari Content Body */}
        <div
          className={`p-6 text-center border-t transition-colors ${
            isDark
              ? 'bg-[#18181b] border-neutral-800 text-neutral-400'
              : 'bg-[#fafafa] border-neutral-200 text-neutral-500'
          }`}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {metadata.pageTitle}
            </h4>
            <p className="text-xs text-neutral-500">
              В компактной строке Safari логотип стоит прямо перед доменом.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
