// แสดงแทนรายการเมื่อยังไม่มี todo เลย ยังไม่ถูก render นักเรียนเลือกเองว่าจะแสดงเมื่อไร
import { ClipboardListIcon, PlusIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { cn } from '@/lib/utils';

export default function TodoListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ClipboardListIcon />
        </EmptyMedia>
        <EmptyTitle>No tasks yet</EmptyTitle>
        <EmptyDescription>
          Create your first task to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <a href="#" className={cn(buttonVariants())}>
          <PlusIcon data-icon="inline-start" />
          New task
        </a>
      </EmptyContent>
    </Empty>
  );
}
