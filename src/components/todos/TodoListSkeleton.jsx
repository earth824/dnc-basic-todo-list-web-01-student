// รายการ todo ระหว่างรอโหลด ยังไม่ถูก render นักเรียนเลือกเองว่าจะแสดงเมื่อไร
import TodoItemSkeleton from '@/components/todos/TodoItemSkeleton';

export default function TodoListSkeleton() {
  return (
    <ul
      aria-hidden="true"
      className="overflow-hidden rounded-xl border bg-card"
    >
      <TodoItemSkeleton />
      <TodoItemSkeleton />
      <TodoItemSkeleton />
      <TodoItemSkeleton />
      <TodoItemSkeleton />
    </ul>
  );
}
