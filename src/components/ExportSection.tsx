'use client';

import React, { useState, useRef } from 'react';
import { LogoSettings, SiteMetadata } from '@/types';
import { generateHtmlFaviconSnippet, generateWebManifestSnippet } from '@/utils/snippets';
import {
  Download,
  Copy,
  Check,
  Code2,
  FileCode,
} from 'lucide-react';

interface ExportSectionProps {
  settings: LogoSettings;
  metadata: SiteMetadata;
}

const EXPORT_SIZES = [
  { name: 'favicon-16x16.png', size: 16, label: '16 × 16 (Вкладка)' },
  { name: 'favicon-32x32.png', size: 32, label: '32 × 32 (Retina)' },
  { name: 'favicon-48x48.png', size: 48, label: '48 × 48 (Закладки)' },
  { name: 'apple-touch-icon.png', size: 180, label: '180 × 180 (iOS)' },
  { name: 'android-chrome-192x192.png', size: 192, label: '192 × 192 (Android)' },
  { name: 'android-chrome-512x512.png', size: 512, label: '512 × 512 (PWA Splash)' },
];

export const ExportSection: React.FC<ExportSectionProps> = ({ settings, metadata }) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'manifest'>('html');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const htmlCode = generateHtmlFaviconSnippet(metadata);
  const manifestCode = generateWebManifestSnippet(metadata);

  const copyToClipboard = async (text: string, type: 'html' | 'manifest') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'html') {
        setCopiedHtml(true);
        setTimeout(() => setCopiedHtml(false), 2000);
      } else {
        setCopiedManifest(true);
        setTimeout(() => setCopiedManifest(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  // Generate and download a specific PNG size using Canvas
  const downloadIcon = (fileName: string, targetSize: number) => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, targetSize, targetSize);

    // Draw background shape if set
    if (settings.bgShape !== 'none') {
      ctx.fillStyle = settings.bgColor;
      if (settings.bgShape === 'circle') {
        ctx.beginPath();
        ctx.arc(targetSize / 2, targetSize / 2, targetSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.clip();
      } else if (settings.bgShape === 'squircle') {
        const radius = Math.max(2, Math.round(targetSize * 0.22));
        ctx.beginPath();
        ctx.roundRect(0, 0, targetSize, targetSize, radius);
        ctx.fill();
        ctx.clip();
      } else {
        ctx.fillRect(0, 0, targetSize, targetSize);
      }
    }

    const img = new Image();
    // Only set crossOrigin for remote http(s) URLs; data URLs fail in Firefox with anonymous crossOrigin
    if (settings.imageUrl.startsWith('http://') || settings.imageUrl.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }

    img.onload = () => {
      const paddingPx =
        settings.bgShape !== 'none' && settings.padding > 0
          ? (settings.padding / 100) * targetSize
          : 0;

      const drawSize = targetSize - paddingPx * 2;
      const x = paddingPx;
      const y = paddingPx;

      ctx.drawImage(img, x, y, drawSize, drawSize);

      // Trigger download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.onerror = () => {
      console.error('Failed to load image for canvas download:', settings.imageUrl);
    };
    img.src = settings.imageUrl;
  };

  return (
    <div
      data-testid="export-section"
      className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Экспорт и код для сайта</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Скачайте фавиконы нужных размеров и скопируйте готовый HTML для &lt;head&gt;
          </p>
        </div>
      </div>

      {/* Download Icons Grid */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1.5">
          <Download className="w-4 h-4 text-blue-500" />
          <span>Скачать иконки во всех стандартных форматах:</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {EXPORT_SIZES.map((item) => (
            <button
              key={item.size}
              type="button"
              data-testid={`download-${item.size}`}
              onClick={() => downloadIcon(item.name, item.size)}
              className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-white dark:hover:bg-neutral-800 transition-all text-center flex flex-col items-center justify-between group shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Download className="w-4 h-4" />
              </div>
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate w-full">
                {item.label}
              </div>
              <div className="text-[10px] text-neutral-400 truncate w-full mt-0.5 font-mono">
                {item.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Snippets Section */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'html'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML &lt;head&gt;</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('manifest')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'manifest'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>site.webmanifest</span>
            </button>
          </div>

          <button
            type="button"
            data-testid="copy-code-btn"
            onClick={() =>
              copyToClipboard(
                activeTab === 'html' ? htmlCode : manifestCode,
                activeTab
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-xs"
          >
            {(activeTab === 'html' ? copiedHtml : copiedManifest) ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать код</span>
              </>
            )}
          </button>
        </div>

        {/* Code display */}
        <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800 select-all">
          {activeTab === 'html' ? htmlCode : manifestCode}
        </pre>
      </div>
    </div>
  );
};
