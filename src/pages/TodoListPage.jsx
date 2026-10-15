// หน้ารายการ todo (/todos): header, sidebar กรองสถานะ และรายการ todo
import { useSearchParams } from 'react-router';

import AppHeader from '@/components/layout/AppHeader';
import SortMenu from '@/components/todos/SortMenu';
import StatusFilter from '@/components/todos/StatusFilter';
import TodoList from '@/components/todos/TodoList';
import TodoListEmpty from '@/components/todos/TodoListEmpty';
import TodoListError from '@/components/todos/TodoListError';
import TodoListNoResults from '@/components/todos/TodoListNoResults';
import TodoListSkeleton from '@/components/todos/TodoListSkeleton';
import { useTodoCounts, useTodos } from '@/hooks/use-todos';
import {
  DEFAULT_SORT,
  parseQuery,
  parseSort,
  parseStatus,
  readStoredSort,
  sortToParams,
  STATUS_OPTIONS,
  statusToCompleted,
  storeSort,
} from '@/lib/todo-filters';

export default function TodoListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = parseStatus(searchParams.get('status'));
  const q = parseQuery(searchParams.get('q'));
  // sort ใน URL ก่อน ถ้าไม่มีใช้ค่าล่าสุดที่จำไว้ ถ้าไม่มีอีกใช้ค่าเริ่มต้น
  const sort =
    parseSort(searchParams.get('sort')) ?? readStoredSort() ?? DEFAULT_SORT;
  const { sortBy, order } = sortToParams(sort);

  const {
    data: todos,
    isError,
    refetch,
  } = useTodos({ completed: statusToCompleted(status), q, sortBy, order });
  // ตัวเลขใช้คำค้นแต่ไม่สน status จึงไม่เปลี่ยนตอนกดสลับ filter
  const {
    data: counts,
    isPending: isCountsPending,
    isPlaceholderData: isCountsPlaceholder,
  } = useTodoCounts(q);

  const title = STATUS_OPTIONS.find((option) => option.value === status).title;

  // จำ sort ล่าสุดไว้ใน localStorage ครั้งหน้าที่เปิดโดยไม่มี sort ใน URL จะได้ค่าเดิม
  function changeSort(value) {
    // Base UI เรียก onValueChange แม้เลือกตัวเดิม ถ้าไม่เช็ค history จะยาวขึ้นทุกครั้ง
    if (value === sort) {
      return;
    }
    storeSort(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('sort', value);
      return next;
    });
  }

  // ล้างคำค้นและ status แต่คง sort ไว้
  function clearFilters() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('q');
      next.delete('status');
      return next;
    });
  }

  // เช็ค data ก่อน error: ถ้าเคยโหลดได้แล้วแต่ refetch ทีหลังพัง ยังแสดงรายการเดิมต่อ
  // กด Retry ตอนยังไม่มี data แล้ว status จะกลับเป็น pending จึงเห็น skeleton ระหว่างรอ
  let content;
  if (todos) {
    if (todos.length > 0) {
      content = <TodoList todos={todos} dateField={sortBy} />;
    } else if (isCountsPending || isCountsPlaceholder) {
      // รายการว่าง แต่ยังไม่รู้ว่าเพราะไม่มี todo เลยหรือเพราะกรองแล้วไม่เจอ รอตัวเลขก่อน
      // ตัวเลขที่เป็น placeholder (ของคำค้นก่อนหน้า) ก็ยังใช้ตัดสินไม่ได้
      // เช่น ล้างคำค้นที่ไม่เจออะไร ตัวเลขเดิม all = 0 จะทำให้ "No tasks yet" แวบขึ้นมา
      content = <TodoListSkeleton />;
    } else if (!q && counts?.all === 0) {
      // ไม่มี todo เลยสักตัว ไม่ใช่แค่กรองแล้วไม่เจอ
      content = <TodoListEmpty />;
    } else {
      content = <TodoListNoResults onClearFilters={clearFilters} />;
    }
  } else if (isError) {
    content = <TodoListError onRetry={() => refetch()} />;
  } else {
    content = <TodoListSkeleton />;
  }

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <aside className="w-47.5 shrink-0 border-r bg-surface px-3 py-4">
          <StatusFilter status={status} counts={counts} />
        </aside>
        <main className="flex-1 px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold">
              {title}
              {counts && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {counts[status]}
                </span>
              )}
            </h1>
            <SortMenu value={sort} onValueChange={changeSort} />
          </div>
          {content}
        </main>
      </div>
    </div>
  );
}
