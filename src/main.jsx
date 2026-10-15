import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ThemeProvider from '@/components/layout/ThemeProvider';
import { Toaster } from '@/components/ui/toast';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster>
        <App />
      </Toaster>
    </ThemeProvider>
  </StrictMode>,
);
