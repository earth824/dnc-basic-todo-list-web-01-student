// เก็บธีมที่เลือก (light / dark / system) และใส่ class ธีมที่ <html> ยังไม่ต้องอ่านไฟล์นี้ในบทแรก ๆ
import { useState } from 'react';

import { ThemeContext } from '@/hooks/use-theme';

// ต้องตรงกับ key ใน inline script ของ index.html ซึ่งใส่ธีมตอนโหลดหน้าให้แล้ว
const STORAGE_KEY = 'vite-ui-theme';

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(theme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved =
    theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme);

  function setTheme(nextTheme) {
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // บันทึกไม่ได้ ธีมจะกลับเป็นค่าเดิมเมื่อ refresh
    }
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  }

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
