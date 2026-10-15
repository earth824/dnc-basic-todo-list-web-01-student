// รายการ todo ระหว่างรอโหลดครั้งแรก
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
