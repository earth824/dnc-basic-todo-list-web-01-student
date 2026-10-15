// แสดงแทนรายการเมื่อโหลด todo ไม่สำเร็จ พร้อมปุ่ม Retry ยังไม่ถูก render นักเรียนเลือกเองว่าจะแสดงเมื่อไร
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

export default function TodoListError() {
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
        <Button variant="outline">
          <RefreshCwIcon data-icon="inline-start" />
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  );
}
