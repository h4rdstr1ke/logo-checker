'use client';

import React, { useState } from 'react';
import { LogoSettings, SiteMetadata } from '@/types';
import { PRESET_LOGOS } from '@/utils/presets';
import { LogoUploader } from '@/components/LogoUploader';
import { MetadataForm } from '@/components/MetadataForm';
import { ChromeDesktopTab } from '@/components/TabsPreview/ChromeDesktopTab';
import { SafariPreview } from '@/components/TabsPreview/SafariPreview';
import { GoogleSerp } from '@/components/SerpPreview/GoogleSerp';
import { YandexSerp } from '@/components/SerpPreview/YandexSerp';
import { ContrastAnalysis } from '@/components/Diagnostics/ContrastAnalysis';
import { ExportSection } from '@/components/ExportSection';
import {
  Layers,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  RotateCcw,
} from 'lucide-react';

export default function Home() {
  // Initial state with TechFlow preset
  const defaultPreset = PRESET_LOGOS[0];

  const [settings, setSettings] = useState<LogoSettings>({
    imageUrl: defaultPreset.imageUrl,
    fileName: `${defaultPreset.id}.svg`,
    bgShape: defaultPreset.defaultBgShape,
    bgColor: defaultPreset.defaultBgColor,
    padding: defaultPreset.defaultPadding,
    borderRadius: 0,
  });

  const [metadata, setMetadata] = useState<SiteMetadata>({
    siteName: 'TechFlow',
    domain: 'techflow.io',
    pagePath: '/product/analytics',
    pageTitle: 'TechFlow — Аналитика и автоматизация для веб-сервисов',
    description:
      'Комплексное решение для мониторинга конверсий, интеграций и аналитики трафика в реальном времени. Попробуйте бесплатно без привязки карты.',
  });

  // Active filter tab: 'all' | 'tabs' | 'serp' | 'diagnostics' | 'export'
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'tabs' | 'serp' | 'diagnostics' | 'export'
  >('all');

  const handleReset = () => {
    setSettings({
      imageUrl: defaultPreset.imageUrl,
      fileName: `${defaultPreset.id}.svg`,
      bgShape: defaultPreset.defaultBgShape,
      bgColor: defaultPreset.defaultBgColor,
      padding: defaultPreset.defaultPadding,
      borderRadius: 0,
    });
    setMetadata({
      siteName: 'TechFlow',
      domain: 'techflow.io',
      pagePath: '/product/analytics',
      pageTitle: 'TechFlow — Аналитика и автоматизация для веб-сервисов',
      description:
        'Комплексное решение для мониторинга конверсий, интеграций и аналитики трафика в реальном времени. Попробуйте бесплатно без привязки карты.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 dark:bg-neutral-900/85 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>LogoScope</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  Preview
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 hidden sm:block">
                Проверка логотипа во вкладках браузера и поисковиках
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs font-medium">
            <button
              type="button"
              data-testid="filter-all"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Все превью
            </button>
            <button
              type="button"
              data-testid="filter-tabs"
              onClick={() => setActiveFilter('tabs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === 'tabs'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Вкладки</span>
            </button>
            <button
              type="button"
              data-testid="filter-serp"
              onClick={() => setActiveFilter('serp')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === 'serp'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Поисковая выдача</span>
            </button>
            <button
              type="button"
              data-testid="filter-diagnostics"
              onClick={() => setActiveFilter('diagnostics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === 'diagnostics'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Контраст</span>
            </button>
            <button
              type="button"
              data-testid="filter-export"
              onClick={() => setActiveFilter('export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === 'export'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Экспорт</span>
            </button>
          </div>

          {/* Reset button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
              title="Сбросить к исходному примеру"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Сбросить</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls & Inputs */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <LogoUploader settings={settings} onChange={setSettings} />
            <MetadataForm metadata={metadata} onChange={setMetadata} />
          </div>

          {/* Right Column: Interactive Previews */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section: Browser Tabs */}
            {(activeFilter === 'all' || activeFilter === 'tabs') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-500" />
                      <span>Вкладки браузеров</span>
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Фавикон во вкладках (Chrome, Safari, светлая и темная темы, закрепленные вкладки и закладки)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <ChromeDesktopTab settings={settings} metadata={metadata} />
                  <SafariPreview settings={settings} metadata={metadata} />
                </div>
              </div>
            )}

            {/* Section: Search Engine Results (SERP) */}
            {(activeFilter === 'all' || activeFilter === 'serp') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Search className="w-5 h-5 text-red-500" />
                      <span>Поисковая выдача (SERP)</span>
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Как ваш логотип и сниппет выглядят в Google и Яндекс (десктоп и мобильный)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <GoogleSerp settings={settings} metadata={metadata} />
                  <YandexSerp settings={settings} metadata={metadata} />
                </div>
              </div>
            )}

            {/* Section: Diagnostics & Contrast */}
            {(activeFilter === 'all' || activeFilter === 'diagnostics') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-indigo-500" />
                      <span>Диагностика и контрастность</span>
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Проверка слияния и читаемости в 16px, 32px и 48px
                    </p>
                  </div>
                </div>

                <ContrastAnalysis settings={settings} />
              </div>
            )}

            {/* Section: Export & Code */}
            {(activeFilter === 'all' || activeFilter === 'export') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-emerald-500" />
                      <span>Скачать фавиконы и код</span>
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Готовые иконки для скачивания и HTML-теги для вставки на сайт
                    </p>
                  </div>
                </div>

                <ExportSection settings={settings} metadata={metadata} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500 bg-white/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>LogoScope — инструмент для проверки фавиконов и логотипов</span>
          <span className="text-neutral-400">100% клиентская обработка — данные не передаются на сервер</span>
        </div>
      </footer>
    </div>
  );
}
