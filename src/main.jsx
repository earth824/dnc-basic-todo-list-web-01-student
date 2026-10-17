import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';

// สร้างนอก component เพื่อให้ทั้งแอปใช้ cache ก้อนเดียวกันตลอด
// retry ค่าเริ่มต้นคือ 3 ครั้ง กว่าจะเห็น error ต้องรอหลายวินาที จึงลดเหลือ 1
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
