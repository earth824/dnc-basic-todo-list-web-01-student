// sidebar กรองสถานะ: All / Pending / Completed พร้อมจำนวน todo ของแต่ละสถานะ
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function StatusFilter() {
  return (
    <nav aria-labelledby="status-filter-label">
      <h2
        id="status-filter-label"
        className="mb-2 px-2.5 text-xs tracking-widest text-muted-foreground uppercase"
      >
        Status
      </h2>
      <ul className="flex flex-col gap-1">
        <li>
          <a
            href="#"
            aria-current="page"
            className={cn(
              buttonVariants({ variant: 'filter', size: 'sm' }),
              'w-full gap-2',
            )}
          >
            All
            <span className="ml-auto tabular-nums">8</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'filter', size: 'sm' }),
              'w-full gap-2',
            )}
          >
            <span className="size-2 shrink-0 rounded-full bg-pending-dot" />
            Pending
            <span className="ml-auto text-muted-foreground tabular-nums">
              5
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className={cn(
              buttonVariants({ variant: 'filter', size: 'sm' }),
              'w-full gap-2',
            )}
          >
            <span className="size-2 shrink-0 rounded-full bg-primary" />
            Completed
            <span className="ml-auto text-muted-foreground tabular-nums">
              3
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
