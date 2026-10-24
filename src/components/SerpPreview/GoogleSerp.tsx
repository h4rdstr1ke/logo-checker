'use client';

import React, { useState } from 'react';
import { DeviceMode, LogoSettings, SiteMetadata, ThemeMode } from '@/types';
import { FaviconImage } from '../FaviconImage';
import {
  MoreVertical,
  Search,
  Sun,
  Moon,
  Smartphone,
  Monitor,
} from 'lucide-react';

interface GoogleSerpProps {
  settings: LogoSettings;
  metadata: SiteMetadata;
  initialTheme?: ThemeMode;
  initialDevice?: DeviceMode;
}

export const GoogleSerp: React.FC<GoogleSerpProps> = ({
  settings,
  metadata,
  initialTheme = 'light',
  initialDevice = 'desktop',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [device, setDevice] = useState<DeviceMode>(initialDevice);

  const isDark = theme === 'dark';
  const isMobile = device === 'mobile';

  // Format breadcrumbs: https://domain.com > page > ...
  const pathParts = metadata.pagePath
    ? metadata.pagePath.split('/').filter(Boolean)
    : [];
  const breadcrumb = `https://${metadata.domain || 'example.com'}${
    pathParts.length > 0 ? ' › ' + pathParts.join(' › ') : ''
  }`;

  return (
    <div
      data-testid="google-serp-preview"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-colors duration-200 bg-white dark:bg-neutral-900"
    >
      {/* Controls Bar */}
      <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 bg-neutral-50 dark:bg-neutral-900/60 text-xs">
        {/* Search Engine Label */}
        <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-1 font-bold text-sm tracking-tight">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          <span className="text-neutral-400">|</span>
          <span className="text-neutral-500">Поисковая выдача</span>
        </div>

        {/* Device & Theme Toggles */}
        <div className="flex items-center gap-2">
          {/* Device switch */}
          <div className="flex items-center bg-neutral-200/70 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              data-testid="google-toggle-desktop"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                !isMobile
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Десктоп</span>
            </button>
            <button
              type="button"
              data-testid="google-toggle-mobile"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                isMobile
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Смартфон</span>
            </button>
          </div>

          {/* Theme switch */}
          <div className="flex items-center bg-neutral-200/70 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              data-testid="google-toggle-light"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                !isDark
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Светлая тема Google"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              type="button"
              data-testid="google-toggle-dark"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                isDark
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Темная тема Google"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Google SERP Simulated Body */}
      <div
        className={`p-4 md:p-6 transition-colors duration-200 font-sans ${
          isDark ? 'bg-[#202124] text-[#bdc1c6]' : 'bg-[#ffffff] text-[#4d5156]'
        }`}
      >
        {/* Interactive Google Search Box */}
        <div
          className={`mb-6 max-w-2xl flex items-center gap-3 px-4 py-2 rounded-full text-xs shadow-xs border ${
            isDark
              ? 'bg-[#303134] border-[#5f6368] text-white'
              : 'bg-white border-neutral-200 shadow-sm text-neutral-800'
          }`}
        >
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            defaultValue={`site:${metadata.domain || 'example.com'} ${metadata.siteName}`}
            className="bg-transparent w-full focus:outline-none text-inherit text-xs"
            placeholder="Поиск в Google..."
          />
        </div>

        {/* The Google Snippet Box */}
        <div
          className={`transition-all ${
            isMobile
              ? 'max-w-sm mx-auto p-4 rounded-2xl border' +
                (isDark
                  ? ' bg-[#303134]/40 border-neutral-800'
                  : ' bg-neutral-50/70 border-neutral-200')
              : 'max-w-2xl'
          }`}
        >
          {/* Header Line: Favicon Circle Badge + Site Name & Breadcrumb */}
          <div className="flex items-center gap-3 mb-1">
            {/* Google Favicon Circular Badge: 28x28 circle containing 18x18 icon */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs border ${
                isDark
                  ? 'bg-[#303134] border-[#3c4043]'
                  : 'bg-[#f1f3f4] border-neutral-200/80'
              }`}
            >
              <FaviconImage
                settings={settings}
                size={18}
                alt="Google Favicon Snippet"
              />
            </div>

            {/* Site Name and Breadcrumb */}
            <div className="min-w-0 flex-1 leading-tight">
              <div
                className={`text-[14px] font-medium leading-none mb-0.5 truncate ${
                  isDark ? 'text-[#e8eaed]' : 'text-[#202124]'
                }`}
              >
                {metadata.siteName || 'Название сайта'}
              </div>
              <div
                className={`text-[12px] truncate ${
                  isDark ? 'text-[#bdc1c6]' : 'text-[#4d5156]'
                }`}
              >
                {breadcrumb}
              </div>
            </div>

            {/* Google Three-dot Options Menu */}
            <button
              type="button"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 shrink-0 p-1 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Clickable Page Title (link) */}
          <a
            href={`https://${metadata.domain || 'example.com'}${metadata.pagePath || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть сайт по ссылке"
            className={`block text-[18px] md:text-[20px] font-normal leading-snug hover:underline mb-1 transition-colors cursor-pointer ${
              isDark ? 'text-[#8ab4f8]' : 'text-[#1a0dab]'
            }`}
          >
            <h3>{metadata.pageTitle || 'Заголовок веб-страницы в поисковой выдаче'}</h3>
          </a>

          {/* Meta Description Snippet */}
          <p
            className={`text-[13px] md:text-[14px] leading-relaxed line-clamp-2 ${
              isDark ? 'text-[#bdc1c6]' : 'text-[#4d5156]'
            }`}
          >
            {metadata.description ||
              'Краткое мета-описание страницы, которое пользователи видят под заголовком в результатах поиска Google.'}
          </p>

          {/* Optional Google Sitelinks (Desktop only) */}
          {!isMobile && (
            <div className="mt-3 pt-3 border-t border-neutral-200/50 dark:border-neutral-800/80 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span
                  className={`font-medium hover:underline cursor-pointer ${
                    isDark ? 'text-[#8ab4f8]' : 'text-[#1a0dab]'
                  }`}
                >
                  О компании
                </span>
                <p className="text-[12px] text-neutral-500 truncate mt-0.5">
                  Узнайте больше о нашей миссии и команде.
                </p>
              </div>
              <div>
                <span
                  className={`font-medium hover:underline cursor-pointer ${
                    isDark ? 'text-[#8ab4f8]' : 'text-[#1a0dab]'
                  }`}
                >
                  Тарифы и цены
                </span>
                <p className="text-[12px] text-neutral-500 truncate mt-0.5">
                  Планы подписки и стоимость услуг.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
