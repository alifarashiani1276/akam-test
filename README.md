# AKAM Machine — Product Showcase & Catalog

A responsive, frontend-only product showcase and catalog for **AKAM Machine** (industrial machinery), built with
React, Vite and TypeScript. The page structure and visual language follow the reference site
<https://movora.framer.website/> (giant wordmark hero, numbered category list, stats band, process steps, FAQ),
styled with the **AKAM Machine brand guidelines (June 2024)**: yellow `#FFCF05` / amber `#FAB732` / black / gray `#B3B3B2`,
Bebas Neue titles, the angular triangle "super graphic", and the official logo.

Available in **Persian (fa, default), English (en), Arabic (ar) and Russian (ru)** with automatic RTL/LTR switching.

> **Sample content.** There is no backend or live API. Product names, specifications, FAQ answers and marketing copy
> are *sample content* written for this showcase — they are not verified real-world product data. Company contact
> details in `src/config/site.ts` are placeholders. Replace both before publishing.

## Technology stack

- React 19, Vite, TypeScript (strict)
- React Router (routing, URL-based catalog filters), TanStack React Query (provider configured, see below)
- i18next + react-i18next (4 languages), Lucide React (icons)
- Plain, organized CSS with design tokens and logical properties (no UI framework)
- ESLint (typescript-eslint, react-hooks)

## Prerequisites (Windows 10/11)

1. [Node.js LTS](https://nodejs.org/) (v20.19+ or v22+). Check in PowerShell: `node -v`
2. [Visual Studio Code](https://code.visualstudio.com/)

## Getting started (VS Code + PowerShell)

1. Extract the ZIP.
2. In VS Code: **File → Open Folder…** and choose the extracted `akam-machine-catalog` folder.
3. Open the terminal: **Terminal → New Terminal** (PowerShell).
4. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

5. Open the URL printed in the terminal (usually <http://localhost:5173>).

### Other commands

| Command             | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `npm run build`     | Type-check and create a production build in `dist/` |
| `npm run preview`   | Serve the production build locally        |
| `npm run typecheck` | TypeScript check only                     |
| `npm run lint`      | ESLint                                    |

If PowerShell blocks npm scripts ("running scripts is disabled"), run once:
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

## Folder structure

```text
public/
  assets/logo-dark.svg, logo-light.svg   Official logo (vector, from the brand guide)
  favicon.svg
src/
  app/            App routes, providers (i18n, React Query, router)
  components/
    common/       Logo, Button, Accordion, BrandPattern, ProductVisual, MachineIllustration, ...
    layout/       Header, Footer, Layout, LanguageSwitcher
    product/      ProductCard, SpecList
  config/         languages.ts (codes, direction, locale), site.ts (contact placeholders)
  features/
    catalog/      data.ts (sample products), filtering/sorting logic, URL-state hook
    home/         Home page sections (Hero, About, Categories, Featured, Stats, Process, FAQ)
  hooks/          useFormatNumber, usePageMeta, useScrollToTop
  i18n/           i18next setup + locales/{fa,en,ar,ru}.json
  pages/          Home, Catalog, Product, About, Contact, NotFound
  services/       productService (data access), queryClient (React Query)
  styles/         tokens.css, globals.css, layout.css, components.css, sections.css, pages.css
  types/          Shared TypeScript types
  utils/          Number formatting helpers
```

## Localization

- Translations live only in `src/i18n/locales/*.json`; components use `t('key')`.
- `src/i18n/index.ts` initializes i18next, restores the saved language from `localStorage` (key `akam.language`,
  default `fa`), and on every change updates `<html lang>` and `<html dir>` (RTL for `fa`/`ar`, LTR for `en`/`ru`).
- Layout uses CSS logical properties (`margin-inline-start`, `inset-inline-end`, …); directional icons are mirrored
  with the `.icon-flip` class.
- Numbers use `Intl.NumberFormat` per language (Persian/Arabic-Indic digits for `fa`/`ar`).
- Plurals use i18next plural suffixes (`results_one`, `_few`, `_many`, …) — Arabic has six forms, Russian four.
- Brand and model names (AKAM, AK-210, …) are intentionally not translated.

**Edit a translation:** change the value in each of the four JSON files, keeping the same key.
**Add a language:** create `locales/xx.json`, register it in `src/i18n/index.ts` and `src/config/languages.ts`.

## Products

Products are defined in `src/features/catalog/data.ts` (id, model code, category, numeric specs). Their names and
summaries are translated under `products.<id>` in every locale file.

**Add a product:** (1) add an entry to `PRODUCTS`; (2) add `products.<id>.name` and `.summary` to all four locale files.
**Add a category:** add its id to `CATEGORY_IDS` and the `CategoryId` type, an icon in `CategoryIcon.tsx`, and
`categories.items.<id>` in every locale file.

Product imagery is an intentional local placeholder (`ProductVisual`: brand pattern + category icon + model code).
To use real photos, put images in `public/assets/products/` and render an `<img>` in `ProductCard` / `ProductPage`.

## Design tokens

All colors, fonts, spacing, radii, shadows and motion values are CSS custom properties in `src/styles/tokens.css`.
Change the brand yellow, spacing scale or typography there and the whole site follows.

### Fonts

The guidelines specify **Bebas Neue** (titles) and **Peyda** (text). Bebas Neue is bundled. Peyda is not available
through npm, so the site uses it automatically if it is installed on the visitor's system and otherwise falls back
to **Vazirmatn** (fa/ar) or **Inter** (en/ru). Bebas Neue has no Cyrillic glyphs, so Russian headings use heavy Inter.
To ship Peyda, add its licensed `.woff2` files to `public/fonts/` and add `@font-face` rules for them in `tokens.css`.

### Logo

`public/assets/logo-*.svg` were extracted as vector paths from the supplied brand-guide PDF (dark-background and
light-background colorways). Follow the guide's usage rules: do not crop, distort, recolor, outline or add effects.

## Contact form

There is no backend. Submitting the form validates the fields and opens the visitor's email app with a prefilled
message addressed to `SITE.email` (`src/config/site.ts`) via a `mailto:` link.

## Connecting a real backend (future)

`src/services/queryClient.ts` already provides a configured `QueryClient` (mounted in `src/app/providers.tsx`) and
central `queryKeys`. Today, `src/services/productService.ts` returns the local sample data synchronously and makes no
network requests. To switch to an API:

1. Make the `productService` functions `async` and call your API (e.g. with `fetch`).
2. Add hooks such as `useQuery({ queryKey: queryKeys.products.all, queryFn: productService.list })` and use them in
   `CatalogPage`, `ProductPage` and the home sections instead of calling the service directly.
3. Add loading and error states to those components.

## Deployment notes

`npm run build` outputs static files to `dist/`. Because the site uses client-side routing, configure your host to
serve `index.html` for unknown paths (SPA fallback). For a sub-path deployment, set `base` in `vite.config.ts`.

## Known limitations

- Sample product data and copy (see note above); contact details are placeholders.
- Peyda font not bundled (see Fonts). Product photos are placeholders.
- Pricing and blog pages from the reference site are not included, and testimonials were omitted on purpose to avoid
  inventing quotes from people.
- No automated test suite is included; the app was verified with type-checking, linting, a production build and
  manual browser checks.
