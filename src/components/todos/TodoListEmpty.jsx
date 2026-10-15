// แสดงแทนรายการเมื่อยังไม่มี todo เลย
import { ClipboardListIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

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
        <Link to="/todos/new" className={cn(buttonVariants())}>
          <PlusIcon data-icon="inline-start" />
          New task
        </Link>
      </EmptyContent>
    </Empty>
  );
}
