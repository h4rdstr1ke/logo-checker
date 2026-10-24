<div align="center">

# 👁️ LogoScope

**Pixel-perfect live previewer for logos and favicons across browser tabs and search engine results.**

Stop shipping blurry favicons or watching your dark logo vanish into Chrome Dark Mode.

[![English](https://img.shields.io/badge/Language-English-blue.svg)](#)
[![Русский](https://img.shields.io/badge/Язык-Русский-red.svg)](README.ru.md)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-31%20Passed-4CAF50?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[**Live Demo**](#quick-start) • [**Features**](#features) • [**Architecture**](#architecture) • [**Diagnostics**](#contrast--visibility-diagnostics) • [**Contributing**](#contributing)

</div>

---

## 💡 The Problem Every Developer Faces

When launching a web application, developers spend hours crafting the perfect UI and logo, only to encounter unexpected rendering issues:

- **The Dark Mode Trap**: A sleek dark logo with a transparent background looks great on a white canvas, but becomes completely invisible on Chrome or Arc Dark Mode tabs (`#202124`).
- **SERP Clipping**: Google SERP wraps favicons in a circular badge (28×28 with an 18×18 inner area), cutting off square icons or making text illegible.
- **Micro-scale Legibility**: Icons designed at 512×512 look stunning, but turn into an unreadable blur when rendered at native 16×16 px in browser tabs.
- **Format Chaos**: Manually generating `.ico`, `16x16`, `32x32`, `180x180` Apple Touch Icons, and `manifest.json` configurations is tedious.

**LogoScope** solves this instantly by giving you a live, reactive sandbox to preview, test, adjust, and export your brand assets before deploying.

---

## ✨ Features

### 1. 🗂️ Browser Tabs Simulation
- **Google Chrome (Desktop)**:
  - **Active Tab**: Realistic Chrome top bar styling, title truncation, close and audio indicator icons.
  - **Inactive Tab**: Test how your favicon stands out when surrounded by other tabs.
  - **Pinned Tab (16×16)**: Compact view showing only the icon.
  - **Bookmarks Bar**: Instant look at how your site appears in user bookmarks.
  - **Light & Dark Theme toggles**: Check contrast against both `#dfe1e5` and `#202124`.
- **Apple Safari (macOS)**:
  - Unified address pill bar with security padlock and domain rendering.
  - Safari light and dark color schemes.

### 2. 🔍 Search Engine Results (SERP)
- **Google SERP (Desktop & Mobile)**:
  - Exact Google circular badge representation (28×28 container).
  - Breadcrumb URL formatting (`https://domain.com › section › page`).
  - Page title rendering in Google Blue (`#1a0dab` / `#8ab4f8`).
  - 2-line snippet preview and sitelinks layout.
- **Yandex SERP (Desktop & Mobile)**:
  - Characteristic Yandex 16×16 favicon placement next to the green/gray domain.
  - Official site verified badge and star rating snippet.
  - Quicklinks grid.

### 3. 🎨 Shape, Padding & Background Controls
- **Shapes**: None (original transparent), Circle, Squircle (iOS rounded), or Square.
- **Custom Backplate**: Add a subtle light or dark background to save dark logos from disappearing on dark tabs.
- **Dynamic Padding Slider (0% - 35%)**: Give your logo breathing room so it doesn't touch the edges of the favicon container.
- **Interactive Drag & Drop + Clipboard Paste**: Drop any `.svg`, `.png`, `.jpg`, `.webp`, or `.ico`, or just press **`Ctrl+V` / `Cmd+V`** anywhere!

### 4. 🩺 Contrast & Visibility Diagnostics (WCAG)
- Automated calculation of relative luminance and contrast ratio.
- Real-time rating (`Good`, `Warning`, `Poor`) against:
  - Chrome Light Tab (`#dee1e6`)
  - Chrome Dark Tab (`#292a2d`)
  - Google / Yandex Light (`#ffffff`)
  - Google SERP Dark (`#202124`)
- Warns developers immediately if a transparent dark logo is placed against dark browser bars.
- **Pixel Grid Inspector**: View at 100% scale (16×16 px), 200% (32×32), 400% (48×48), and 6× magnification.

### 5. 📦 Client-Side Export & Code Generator
- **Zero Server Uploads**: 100% private, local client-side generation using HTML5 Canvas.
- **1-Click Icon Pack Download**:
  - `favicon-16x16.png` (Standard tab)
  - `favicon-32x32.png` (Retina / High-DPI tab)
  - `favicon-48x48.png` (Desktop shortcut / Bookmarks)
  - `apple-touch-icon.png` (180×180 iOS home screen)
  - `android-chrome-192x192.png` (Android / PWA)
  - `android-chrome-512x512.png` (PWA splash screen)
- **Copyable Code**: Ready `<link>` tags for HTML `<head>` and a complete `site.webmanifest`.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest 5](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/)

```
logo-checker/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # App wrapper with SEO metadata
│   │   ├── page.tsx           # Main reactive dashboard & view filters
│   │   └── page.test.tsx      # Integration tests for filters & state
│   ├── components/
│   │   ├── FaviconImage.tsx   # Core pixel-crisp favicon renderer
│   │   ├── LogoUploader.tsx   # Drag & drop, presets, paste listener, shape controls
│   │   ├── MetadataForm.tsx   # Domain, title, description with SaaS/ecom presets
│   │   ├── ExportSection.tsx  # Canvas multi-size exporter & HTML generator
│   │   ├── TabsPreview/
│   │   │   ├── ChromeDesktopTab.tsx  # Chrome tabs (active/inactive/pinned)
│   │   │   └── SafariPreview.tsx     # Safari unified pill tab
│   │   ├── SerpPreview/
│   │   │   ├── GoogleSerp.tsx # Google SERP desktop + mobile
│   │   │   └── YandexSerp.tsx # Yandex SERP desktop + mobile
│   │   └── Diagnostics/
│   │       └── ContrastAnalysis.tsx # WCAG contrast matrix & pixel zoom
│   ├── types/                 # Shared TypeScript models & contracts
│   └── utils/
│       ├── contrast.ts        # WCAG luminance & contrast algorithms
│       ├── presets.ts         # Embedded SVG sample logos
│       └── snippets.ts        # HTML <link> tags & webmanifest generator
├── vitest.config.mts          # Vitest configuration with JSDOM
└── vitest.setup.ts            # @testing-library/jest-dom/vitest matchers
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js `20.x` or `22.x`
- npm `9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/h4rdstr1ke/logo-checker.git
cd logo-checker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

The project is thoroughly tested using **Vitest** and **React Testing Library** (31 tests across utilities, components, and integration):

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Build for production
npm run build
```

---

## 🤝 Contributing

Contributions are warmly welcome! Whether it's adding new browser previews (Firefox, Arc, Edge), improving contrast algorithms, or suggesting UI enhancements:

1. Fork the Project (`git checkout -b feature/cool-feature`)
2. Commit your Changes (`git commit -m 'feat: add Edge browser preview'`)
3. Ensure tests pass (`npm test && npm run lint`)
4. Push to the Branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <sub>Created with ❤️ by <a href="https://github.com/h4rdstr1ke">h4rdstr1ke</a></sub>
</div>
