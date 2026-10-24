import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LogoScope — Проверка логотипа во вкладках и поисковиках (Google & Яндекс)',
  description:
    'Интерактивный инструмент проверки логотипа и фавикона: как они выглядят во вкладках браузера Chrome и Safari, а также в поисковой выдаче Google и Яндекс (светлая и темная темы).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col bg-neutral-100/70 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
