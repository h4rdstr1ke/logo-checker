'use client';

import React, { useState } from 'react';
import { LogoSettings, SiteMetadata, ThemeMode } from '@/types';
import { FaviconImage } from '../FaviconImage';
import {
  Globe,
  Plus,
  X,
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Star,
  Pin,
  Volume2,
  Moon,
  Sun,
  Laptop,
} from 'lucide-react';

interface ChromeDesktopTabProps {
  settings: LogoSettings;
  metadata: SiteMetadata;
  initialTheme?: ThemeMode;
}

export const ChromeDesktopTab: React.FC<ChromeDesktopTabProps> = ({
  settings,
  metadata,
  initialTheme = 'light',
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [activeTabId, setActiveTabId] = useState<'custom' | 'tab2'>('custom');

  const isDark = theme === 'dark';

  return (
    <div
      data-testid="chrome-desktop-preview"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-colors duration-200 bg-white dark:bg-neutral-900"
    >
      {/* Header Toolbar & Theme Switcher */}
      <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/60 text-xs">
        <div className="flex items-center gap-2 font-medium text-neutral-600 dark:text-neutral-400">
          <Laptop className="w-4 h-4 text-blue-500" />
          <span>Google Chrome (Desktop)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid="toggle-light-theme"
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
            data-testid="toggle-dark-theme"
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

      {/* Chrome Window Simulation */}
      <div
        className={`w-full font-sans transition-colors duration-200 ${
          isDark ? 'bg-[#202124] text-[#e8eaed]' : 'bg-[#dfe1e5] text-[#3c4043]'
        }`}
      >
        {/* Chrome Tab Bar */}
        <div className="pt-2 px-2 flex items-end gap-1 select-none overflow-x-auto scrollbar-none">
          {/* macOS window action dots */}
          <div className="flex items-center gap-1.5 px-2 pb-2.5 mr-1 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs border border-[#e0443e]/40" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs border border-[#dea123]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs border border-[#1aab29]/40" />
          </div>

          {/* Pinned Tab 1: Google Docs / Github */}
          <div
            className={`h-8 px-2.5 flex items-center justify-center rounded-t-lg text-xs cursor-pointer transition-colors ${
              isDark
                ? 'hover:bg-[#2c2d30] text-neutral-400'
                : 'hover:bg-neutral-200/80 text-neutral-600'
            }`}
            title="Закрепленная вкладка: GitHub"
          >
            <Pin className="w-3 h-3 rotate-45 mr-1 opacity-50" />
            {/* Small sample pinned icon */}
            <svg
              className="w-4 h-4 fill-current opacity-80"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>

          {/* User's Tab (Active or Inactive) */}
          <div
            onClick={() => setActiveTabId('custom')}
            data-testid="user-tab"
            className={`group relative h-9 min-w-[160px] max-w-[240px] flex-1 flex items-center gap-2 px-3 rounded-t-lg text-xs font-normal cursor-pointer select-none transition-all shadow-xs ${
              activeTabId === 'custom'
                ? isDark
                  ? 'bg-[#323639] text-[#e8eaed] font-medium'
                  : 'bg-white text-[#1f1f1f] font-medium'
                : isDark
                ? 'bg-transparent hover:bg-[#28292c] text-neutral-400'
                : 'bg-transparent hover:bg-neutral-200/70 text-neutral-600'
            }`}
          >
            {/* The Favicon under test */}
            <div className="shrink-0 flex items-center justify-center">
              <FaviconImage settings={settings} size={16} alt="Tab Favicon" />
            </div>

            {/* Title */}
            <span className="truncate flex-1 text-[13px] leading-tight">
              {metadata.pageTitle || metadata.siteName || 'Новая вкладка'}
            </span>

            {/* Speaker / Close icon */}
            <div className="flex items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
              <Volume2 className="w-3 h-3 hidden group-hover:block text-neutral-400" />
              <button
                type="button"
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-neutral-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Neighbor Inactive Tab (Google Search / Documentation) */}
          <div
            onClick={() => setActiveTabId('tab2')}
            className={`group relative h-9 min-w-[150px] max-w-[220px] flex-1 flex items-center gap-2 px-3 rounded-t-lg text-xs cursor-pointer select-none transition-all ${
              activeTabId === 'tab2'
                ? isDark
                  ? 'bg-[#323639] text-[#e8eaed] font-medium shadow-xs'
                  : 'bg-white text-[#1f1f1f] font-medium shadow-xs'
                : isDark
                ? 'bg-transparent hover:bg-[#28292c] text-neutral-400'
                : 'bg-transparent hover:bg-neutral-200/70 text-neutral-600'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
              G
            </div>
            <span className="truncate flex-1 text-[13px] leading-tight">
              Google Поиск
            </span>
            <button
              type="button"
              className="w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-neutral-500/20 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* New Tab (+) Button */}
          <button
            type="button"
            className={`w-7 h-7 mb-1 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isDark
                ? 'hover:bg-[#28292c] text-neutral-400'
                : 'hover:bg-neutral-300 text-neutral-600'
            }`}
            title="Новая вкладка"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Chrome Navigation & Omnibox Bar */}
        <div
          className={`px-3 py-1.5 flex items-center gap-2 text-xs border-t ${
            isDark
              ? 'bg-[#323639] border-[#292a2d] text-neutral-300'
              : 'bg-white border-neutral-200 text-neutral-600'
          }`}
        >
          {/* Back, Forward, Refresh */}
          <div className="flex items-center gap-1 shrink-0 opacity-70">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-neutral-500/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-neutral-500/15"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-neutral-500/15"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Omnibox (Address input) */}
          <div
            className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
              isDark
                ? 'bg-[#202124] text-neutral-200 border border-transparent focus-within:border-blue-500'
                : 'bg-[#f1f3f4] text-neutral-800 border border-transparent focus-within:border-blue-500'
            }`}
          >
            <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              https://
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {metadata.domain || 'example.com'}
            </span>
            <span className="text-neutral-400 dark:text-neutral-500 truncate">
              {metadata.pagePath || ''}
            </span>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <Star className="w-3.5 h-3.5 text-neutral-400 hover:text-amber-500 cursor-pointer" />
            </div>
          </div>

          {/* Profile / Extension Icons */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center font-bold text-[10px]">
              U
            </div>
          </div>
        </div>

        {/* Chrome Bookmarks Bar */}
        <div
          className={`px-3 py-1 flex items-center gap-4 text-[12px] border-t select-none overflow-x-auto scrollbar-none ${
            isDark
              ? 'bg-[#323639] border-[#292a2d] text-neutral-300'
              : 'bg-white border-neutral-100 text-neutral-700'
          }`}
        >
          {/* User site bookmark */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-500/15 cursor-pointer shrink-0">
            <FaviconImage settings={settings} size={14} alt="Bookmark" />
            <span className="font-medium">
              {metadata.siteName || 'Мой проект'}
            </span>
          </div>

          {/* Reference Bookmarks */}
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-500/15 cursor-pointer opacity-70 shrink-0">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube</span>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-500/15 cursor-pointer opacity-70 shrink-0">
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span>VK</span>
          </div>
          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-neutral-500/15 cursor-pointer opacity-70 shrink-0">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Habr</span>
          </div>
        </div>

        {/* Webpage Content placeholder */}
        <div
          className={`p-8 text-center border-t transition-colors ${
            isDark
              ? 'bg-[#202124] border-[#292a2d] text-neutral-400'
              : 'bg-white border-neutral-200 text-neutral-500'
          }`}
        >
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
              {metadata.pageTitle || 'Заголовок веб-страницы'}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {metadata.description || 'Описание страницы вашего проекта.'}
            </p>
            <div className="pt-2 text-[11px] text-neutral-400 dark:text-neutral-500">
              Вкладка активна: логотип отображается в реальном масштабе 16×16 px
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
