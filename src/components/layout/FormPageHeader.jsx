// header ของหน้า New / Edit: โลโก้, ลิงก์กลับหน้ารายการ และปุ่มสลับธีม
import { ArrowLeftIcon } from 'lucide-react';

import AppLogo from '@/components/layout/AppLogo';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Link } from 'react-router';

export default function FormPageHeader() {
  return (
    <header className="flex h-15 items-center gap-4 border-b bg-surface px-5">
      <AppLogo />
      <div className="ml-auto flex items-center gap-2">
        <Link
          to="/todo"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to tasks
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
