// แสดงแทนรายการเมื่อโหลด todo ไม่สำเร็จ พร้อมปุ่ม Retry
import { CircleAlertIcon, RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function TodoListError({ onRetry }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleAlertIcon />
        </EmptyMedia>
        <EmptyTitle>Couldn't load tasks</EmptyTitle>
        <EmptyDescription>
          Check that the API is running, then try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRetry}>
          <RefreshCwIcon data-icon="inline-start" />
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
}
