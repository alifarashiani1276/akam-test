import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/bebas-neue/400.css';
import '@fontsource-variable/inter';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/900.css';
import '@/styles/tokens.css';
import '@/styles/globals.css';
import '@/styles/layout.css';
import '@/styles/components.css';
import '@/styles/sections.css';
import '@/styles/pages.css';
import { Providers } from '@/app/providers';
import { App } from '@/app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
