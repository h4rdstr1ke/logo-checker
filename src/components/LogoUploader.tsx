'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { BackgroundShape, LogoSettings } from '@/types';
import { PRESET_LOGOS } from '@/utils/presets';
import {
  UploadCloud,
  Layers,
  Palette,
  Sliders,
  Sparkles,
  Clipboard,
  Square,
  Circle,
  FileImage,
} from 'lucide-react';

interface LogoUploaderProps {
  settings: LogoSettings;
  onChange: (updated: LogoSettings) => void;
}

const PRESET_COLORS = [
  { name: 'Белый', hex: '#ffffff' },
  { name: 'Черный', hex: '#18181b' },
  { name: 'Chrome Темный', hex: '#292a2d' },
  { name: 'Синий', hex: '#3b82f6' },
  { name: 'Яндекс Красный', hex: '#fc3f1d' },
];

export const LogoUploader: React.FC<LogoUploaderProps> = ({ settings, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File processing handler
  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение (PNG, SVG, JPG, WEBP, ICO)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) return;

        // Extract image dimensions
        const img = new Image();
        img.onload = () => {
          onChange({
            ...settings,
            imageUrl: result,
            fileName: file.name,
            fileSize: file.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    },
    [onChange, settings]
  );

  // Drag and drop events
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Clipboard paste listener (Ctrl+V anywhere on page)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          handleFile(file);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFile]);

  const selectPreset = (presetId: string) => {
    const preset = PRESET_LOGOS.find((p) => p.id === presetId);
    if (!preset) return;

    onChange({
      ...settings,
      imageUrl: preset.imageUrl,
      fileName: `${preset.id}.svg`,
      bgShape: preset.defaultBgShape,
      bgColor: preset.defaultBgColor,
      padding: preset.defaultPadding,
    });
  };

  return (
    <div
      data-testid="logo-uploader"
      className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
            <span>Загрузка и форма логотипа</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Загрузите SVG/PNG или вставьте из буфера (Ctrl+V)
          </p>
        </div>
      </div>

      {/* Dropzone */}
      <div
        data-testid="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="group relative cursor-pointer border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-6 text-center transition-all bg-neutral-50/50 dark:bg-neutral-800/30 hover:bg-blue-50/30 dark:hover:bg-blue-950/20"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,.png,.jpg,.jpeg,.webp,.ico"
          className="hidden"
          data-testid="file-input"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Перетащите файл или <span className="text-blue-500 underline">выберите на диске</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1 flex items-center justify-center gap-2">
              <span>Поддержка SVG, PNG, JPG, WEBP, ICO</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clipboard className="w-3 h-3" /> Вставка Ctrl+V
              </span>
            </div>
          </div>

          {settings.fileName && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-200/80 dark:bg-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 mt-2">
              <FileImage className="w-3.5 h-3.5 text-blue-500" />
              <span>{settings.fileName}</span>
              {settings.width && settings.height && (
                <span className="text-neutral-400">
                  ({settings.width}×{settings.height}px)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preset Logos */}
      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Готовые примеры для быстрого тестирования:</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESET_LOGOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset.id)}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-neutral-800/80 flex flex-col items-center gap-1.5 transition-all text-center group"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 group-hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preset.imageUrl}
                  alt={preset.name}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 truncate w-full">
                {preset.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shape & Background Adjustment */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shape Picker */}
        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Подложка / Форма иконки</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(
              [
                { id: 'none', label: 'Оригинал', icon: Layers },
                { id: 'circle', label: 'Круг', icon: Circle },
                { id: 'squircle', label: 'Скруглен.', icon: Square },
                { id: 'square', label: 'Квадрат', icon: Square },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                data-testid={`shape-${item.id}`}
                onClick={() =>
                  onChange({ ...settings, bgShape: item.id as BackgroundShape })
                }
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border flex flex-col items-center justify-center gap-1 transition-all ${
                  settings.bgShape === item.id
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Background Color (if shape is not none) */}
        {settings.bgShape !== 'none' ? (
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-blue-500" />
              <span>Цвет подложки</span>
            </label>
            <div className="flex items-center gap-2">
              {/* Quick swatches */}
              <div className="flex items-center gap-1.5">
                {PRESET_COLORS.map((col) => (
                  <button
                    key={col.hex}
                    type="button"
                    title={col.name}
                    onClick={() => onChange({ ...settings, bgColor: col.hex })}
                    className={`w-6 h-6 rounded-full border shadow-xs transition-transform ${
                      settings.bgColor === col.hex ? 'scale-115 ring-2 ring-blue-500' : ''
                    } ${
                      col.hex === '#ffffff'
                        ? 'border-neutral-300'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
              </div>

              {/* Color picker input */}
              <input
                type="color"
                data-testid="color-picker"
                value={settings.bgColor}
                onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
                className="w-7 h-7 rounded border border-neutral-300 dark:border-neutral-700 cursor-pointer p-0 bg-transparent"
              />
              <span className="text-xs font-mono text-neutral-500">
                {settings.bgColor}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center text-xs text-neutral-400 dark:text-neutral-500 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40">
            Логотип используется на прозрачном фоне без дополнительной плашки.
          </div>
        )}

        {/* Padding Slider */}
        {settings.bgShape !== 'none' && (
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-blue-500" />
                <span>Внутренний отступ (Padding): {settings.padding}%</span>
              </label>
              <span className="text-[11px] text-neutral-400">
                Позволяет логотипу не упираться в края иконки
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="1"
              data-testid="padding-slider"
              value={settings.padding}
              onChange={(e) =>
                onChange({ ...settings, padding: parseInt(e.target.value, 10) })
              }
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};
