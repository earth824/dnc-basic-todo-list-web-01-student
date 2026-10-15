import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ThemeProvider from '@/components/layout/ThemeProvider';
import { Toaster } from '@/components/ui/toast';

import './index.css';
import App from './App.jsx';

// สร้างนอก component เพื่อให้มี cache เดียวตลอดอายุของแอป
// ถ้าสร้างใน component ทุกครั้งที่ render ใหม่ cache จะหายไปด้วย
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ค่าเริ่มต้นลองใหม่ 3 ครั้ง ลดเหลือ 1 ครั้ง และไม่ลองใหม่เมื่อได้ 4xx
      // เพราะส่งซ้ำก็ได้ผลเดิม (เช่น TODO_NOT_FOUND) network error มี status 0 จึงยังลองใหม่
      retry: (failureCount, error) => {
        if (error.status >= 400 && error.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
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
