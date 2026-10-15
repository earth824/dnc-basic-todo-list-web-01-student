// แสดงแทนรายการเมื่อค้นหรือกรองแล้วไม่เจอ todo ยังไม่ถูก render นักเรียนเลือกเองว่าจะแสดงเมื่อไร
import { SearchXIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function TodoListNoResults() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No tasks match</EmptyTitle>
        <EmptyDescription>Try a different search or status.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear filters</Button>
      </EmptyContent>
    </Empty>
  );
}
