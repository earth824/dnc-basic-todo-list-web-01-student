// โครงร่างของ todo หนึ่งแถวระหว่างรอโหลด วางตำแหน่งเดียวกับ TodoItem
import { Skeleton } from '@/components/ui/skeleton';

export default function TodoItemSkeleton() {
  return (
    <li className="flex items-center gap-3.5 border-b px-3.5 py-2 last:border-b-0">
      <Skeleton className="size-4 rounded-sm" />
      <Skeleton className="h-4 max-w-60 flex-1" />
      <Skeleton className="ml-auto h-3 w-12" />
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="size-8" />
    </li>
  );
}
