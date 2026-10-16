import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ThemeProvider from '@/components/layout/ThemeProvider';
import { Toaster } from '@/components/ui/toast';

import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: { staleTime: 5000 },
  // },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster>
          <App />
        </Toaster>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
