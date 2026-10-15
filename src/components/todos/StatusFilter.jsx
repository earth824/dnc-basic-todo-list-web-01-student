// sidebar กรองสถานะ: All / Pending / Completed พร้อมจำนวน todo ของแต่ละสถานะ
import { Link, useSearchParams } from 'react-router';

import { buttonVariants } from '@/components/ui/button';
import { STATUS_OPTIONS } from '@/lib/todo-filters';
import { cn } from '@/lib/utils';

const DOT_CLASS_NAMES = {
  pending: 'bg-pending-dot',
  completed: 'bg-primary',
};

// counts เป็น undefined ระหว่างโหลดครั้งแรก จึงยังไม่แสดงตัวเลข
export default function StatusFilter({ status, counts }) {
  const [searchParams] = useSearchParams();

  // เปลี่ยนแค่ status และคง q กับ sort ไว้ ส่วน All ลบ status ออกจาก URL ไปเลย
  function getSearch(value) {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') {
      next.delete('status');
    } else {
      next.set('status', value);
    }
    return `?${next}`;
  }

  return (
    <nav aria-labelledby="status-filter-label">
      <h2
        id="status-filter-label"
        className="mb-2 px-2.5 text-xs tracking-widest text-muted-foreground uppercase"
      >
        Status
      </h2>
      <ul className="flex flex-col gap-1">
        {STATUS_OPTIONS.map((option) => {
          const isActive = option.value === status;
          const dotClassName = DOT_CLASS_NAMES[option.value];

          return (
            <li key={option.value}>
              <Link
                to={{ search: getSearch(option.value) }}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  buttonVariants({ variant: 'filter', size: 'sm' }),
                  'w-full gap-2',
                )}
              >
                {dotClassName && (
                  <span
                    className={cn('size-2 shrink-0 rounded-full', dotClassName)}
                  />
                )}
                {option.label}
                <span
                  className={cn(
                    'ml-auto tabular-nums',
                    !isActive && 'text-muted-foreground',
                  )}
                >
                  {counts?.[option.value]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
