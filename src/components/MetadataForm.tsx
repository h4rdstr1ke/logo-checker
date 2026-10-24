'use client';

import React from 'react';
import { SiteMetadata } from '@/types';
import { Globe, Type, FileText, Sparkles } from 'lucide-react';

interface MetadataFormProps {
  metadata: SiteMetadata;
  onChange: (updated: SiteMetadata) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({ metadata, onChange }) => {
  const handlePreset = (type: 'saas' | 'ecommerce' | 'agency') => {
    if (type === 'saas') {
      onChange({
        siteName: 'CloudMetrics',
        domain: 'cloudmetrics.io',
        pagePath: '/features/analytics',
        pageTitle: 'Аналитика и мониторинг в реальном времени — CloudMetrics',
        description: 'Платформа для сбора метрик и аналитики веб-приложений. Быстрый запуск за 5 минут, интеграции и удобный дашборд.',
      });
    } else if (type === 'ecommerce') {
      onChange({
        siteName: 'NordicShop',
        domain: 'nordicshop.ru',
        pagePath: '/catalog/smartphones',
        pageTitle: 'Купить смартфоны и гаджеты с быстрой доставкой — NordicShop',
        description: 'Широкий каталог оригинальной электроники с официальной гарантией. Скидки постоянным клиентам и доставка по всей стране.',
      });
    } else if (type === 'agency') {
      onChange({
        siteName: 'Apex Studio',
        domain: 'apexstudio.dev',
        pagePath: '/cases/fintech',
        pageTitle: 'Кейсы разработки мобильных и веб-сервисов | Apex Studio',
        description: 'Создаем масштабируемые цифровые продукты, дизайн-системы и мобильные приложения для лидеров рынка.',
      });
    }
  };

  return (
    <div
      data-testid="metadata-form"
      className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Данные для поиска и вкладок</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Настройте сниппет поисковой выдачи и заголовок вкладки
          </p>
        </div>

        {/* Quick Fill presets */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-400 hidden sm:inline flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Шаблоны:
          </span>
          <button
            type="button"
            onClick={() => handlePreset('saas')}
            className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            SaaS
          </button>
          <button
            type="button"
            onClick={() => handlePreset('ecommerce')}
            className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            Магазин
          </button>
          <button
            type="button"
            onClick={() => handlePreset('agency')}
            className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            Студия
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Site Name */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-blue-500" />
            <span>Название сайта (Site Name)</span>
          </label>
          <input
            type="text"
            data-testid="input-site-name"
            value={metadata.siteName}
            onChange={(e) => onChange({ ...metadata, siteName: e.target.value })}
            placeholder="Например: Яндекс, МойСервис, Avito"
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Domain & Path */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-blue-500" />
            <span>Домен и путь</span>
          </label>
          <div className="flex rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
            <input
              type="text"
              data-testid="input-domain"
              value={metadata.domain}
              onChange={(e) => onChange({ ...metadata, domain: e.target.value })}
              placeholder="example.com"
              className="w-1/2 px-3 py-2 text-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
            />
            <input
              type="text"
              data-testid="input-path"
              value={metadata.pagePath}
              onChange={(e) => onChange({ ...metadata, pagePath: e.target.value })}
              placeholder="/catalog/item"
              className="w-1/2 px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-850 text-neutral-700 dark:text-neutral-300 border-l border-neutral-300 dark:border-neutral-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Page Title */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-blue-500" />
              <span>Заголовок страницы (Title & Вкладка)</span>
            </label>
            <span
              className={`text-[11px] ${
                metadata.pageTitle.length > 60 ? 'text-amber-500' : 'text-neutral-400'
              }`}
            >
              {metadata.pageTitle.length}/60 символов
            </span>
          </div>
          <input
            type="text"
            data-testid="input-page-title"
            value={metadata.pageTitle}
            onChange={(e) => onChange({ ...metadata, pageTitle: e.target.value })}
            placeholder="Заголовок для браузерной вкладки и кликабельной ссылки в выдаче..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Мета-описание (Сниппет в поиске)</span>
            </label>
            <span
              className={`text-[11px] ${
                metadata.description.length > 160 ? 'text-amber-500' : 'text-neutral-400'
              }`}
            >
              {metadata.description.length}/160 символов
            </span>
          </div>
          <textarea
            rows={2}
            data-testid="input-description"
            value={metadata.description}
            onChange={(e) => onChange({ ...metadata, description: e.target.value })}
            placeholder="Краткое описание страницы для вывода в Google и Яндексе..."
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
