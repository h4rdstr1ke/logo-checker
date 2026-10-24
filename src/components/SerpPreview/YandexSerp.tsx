'use client';

import React, { useState } from 'react';
import { DeviceMode, LogoSettings, SiteMetadata, ThemeMode } from '@/types';
import { FaviconImage } from '../FaviconImage';
import {
  Search,
  Sun,
  Moon,
  Smartphone,
  Monitor,
  CheckCircle2,
  Star,
} from 'lucide-react';

interface YandexSerpProps {
  settings: LogoSettings;
  metadata: SiteMetadata;
  initialTheme?: ThemeMode;
  initialDevice?: DeviceMode;
}

export const YandexSerp: React.FC<YandexSerpProps> = ({
  settings,
  metadata,
  initialTheme = 'light',
  initialDevice = 'desktop',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [device, setDevice] = useState<DeviceMode>(initialDevice);

  const isDark = theme === 'dark';
  const isMobile = device === 'mobile';

  const fullUrl = `${metadata.domain || 'example.com'}${
    metadata.pagePath || ''
  }`;

  return (
    <div
      data-testid="yandex-serp-preview"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-colors duration-200 bg-white dark:bg-neutral-900"
    >
      {/* Controls Bar */}
      <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 bg-neutral-50 dark:bg-neutral-900/60 text-xs">
        {/* Yandex Brand Header */}
        <div className="flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center font-bold text-sm tracking-tight">
            <span className="text-[#fc3f1d]">Я</span>
            <span className="text-neutral-900 dark:text-white">ндекс</span>
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
              data-testid="yandex-toggle-desktop"
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
              data-testid="yandex-toggle-mobile"
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
              data-testid="yandex-toggle-light"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                !isDark
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Светлая тема Яндекс"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              type="button"
              data-testid="yandex-toggle-dark"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                isDark
                  ? 'bg-white dark:bg-neutral-700 shadow-xs font-medium text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Темная тема Яндекс"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Yandex SERP Simulated Body */}
      <div
        className={`p-4 md:p-6 transition-colors duration-200 font-sans ${
          isDark ? 'bg-[#18181a] text-[#cacaca]' : 'bg-[#f7f7f7] text-[#333333]'
        }`}
      >
        {/* Simulated Yandex Search Bar (Yellow button) */}
        <div className="mb-6 max-w-2xl flex items-center shadow-xs rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700">
          <div
            className={`flex-1 flex items-center gap-2 px-3 py-2 text-xs ${
              isDark ? 'bg-[#232326] text-white' : 'bg-white text-neutral-800'
            }`}
          >
            <Search className="w-4 h-4 text-neutral-400" />
            <span className="truncate">{metadata.siteName} официальный сайт</span>
          </div>
          <button
            type="button"
            className="bg-[#fc3f1d] hover:bg-[#e03415] text-white font-medium text-xs px-4 py-2 shrink-0 transition-colors"
          >
            Найти
          </button>
        </div>

        {/* The Yandex Card Snippet */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isDark
              ? 'bg-[#222225] border-neutral-800 text-neutral-200'
              : 'bg-white border-neutral-200/90 text-neutral-800'
          } ${isMobile ? 'max-w-sm mx-auto' : 'max-w-2xl'}`}
        >
          {/* Top Domain + 16x16 Favicon + Badges */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap text-xs">
            {/* The 16x16 Favicon */}
            <div className="shrink-0 flex items-center justify-center">
              <FaviconImage
                settings={settings}
                size={16}
                alt="Yandex Favicon Snippet"
              />
            </div>

            {/* Domain text */}
            <span
              className={`font-normal truncate ${
                isDark ? 'text-neutral-400' : 'text-[#333333]'
              }`}
            >
              {fullUrl}
            </span>

            {/* Verified / Official Site Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Официальный сайт</span>
            </span>

            {/* Rating Stars snippet */}
            <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 ml-auto">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold">4.9</span>
              <span className="text-neutral-400">(48)</span>
            </div>
          </div>

          {/* Title Link in Yandex Blue */}
          <h3
            className={`text-[17px] md:text-[18px] font-medium leading-snug cursor-pointer hover:underline mb-1 transition-colors ${
              isDark ? 'text-[#8ab4f8]' : 'text-[#001a9b]'
            }`}
          >
            {metadata.pageTitle}
          </h3>

          {/* Snippet Description */}
          <p
            className={`text-[13px] leading-relaxed line-clamp-2 ${
              isDark ? 'text-neutral-300' : 'text-[#333333]'
            }`}
          >
            {metadata.description}
          </p>

          {/* Yandex Quick links (быстрые ссылки) */}
          <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span
              className={`hover:underline cursor-pointer ${
                isDark ? 'text-[#8ab4f8]' : 'text-[#001a9b]'
              }`}
            >
              Каталог услуг
            </span>
            <span
              className={`hover:underline cursor-pointer ${
                isDark ? 'text-[#8ab4f8]' : 'text-[#001a9b]'
              }`}
            >
              Цены и тарифы
            </span>
            <span
              className={`hover:underline cursor-pointer ${
                isDark ? 'text-[#8ab4f8]' : 'text-[#001a9b]'
              }`}
            >
              Контакты
            </span>
            <span
              className={`hover:underline cursor-pointer ${
                isDark ? 'text-[#8ab4f8]' : 'text-[#001a9b]'
              }`}
            >
              Отзывы
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
