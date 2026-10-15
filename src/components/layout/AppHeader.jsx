// header ของหน้ารายการ todo: โลโก้, ช่องค้นหา, ปุ่ม New task และปุ่มสลับธีม
import { PlusIcon } from 'lucide-react';

import AppLogo from '@/components/layout/AppLogo';
import ThemeToggle from '@/components/layout/ThemeToggle';
import TodoSearch from '@/components/todos/TodoSearch';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  return (
    <header className="flex h-15 items-center gap-4 border-b bg-surface px-5">
      <AppLogo />
      <TodoSearch />
      <div className="ml-auto flex items-center gap-2">
        <a href="#" className={cn(buttonVariants())}>
          <PlusIcon data-icon="inline-start" />
          New task
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
