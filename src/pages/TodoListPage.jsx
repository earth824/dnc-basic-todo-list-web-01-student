// หน้ารายการ task: หัวข้อ, ปุ่มสร้าง, ตัวกรองสถานะ และรายการ
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';

import { getTodos } from '@/api/todos';
import AppHeader from '@/components/AppHeader';
import TodoItem from '@/components/TodoItem';

// ค่า completed ที่ส่งให้ API ของแต่ละตัวกรอง (all ไม่ส่ง เพราะ axios ตัดค่า undefined ทิ้ง)
const completedByStatus = {
  all: undefined,
  pending: false,
  completed: true,
};

export default function TodoListPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  // ไม่มี status หรือเป็นค่าที่ไม่รู้จัก (เช่น ?status=abc) ถือเป็น all
  const status =
    statusParam === 'pending' || statusParam === 'completed'
      ? statusParam
      : 'all';

  const {
    data: todos,
    isPending,
    isError,
    refetch,
  } = useQuery({
    // status อยู่ใน key แต่ละตัวกรองจึงมี cache ของตัวเอง
    queryKey: ['todos', { status }],
    queryFn: () => getTodos({ completed: completedByStatus[status] }),
  });

  // เลือกว่าจะแสดงอะไรแทนรายการ ตามสถานะของ query
  let content;
  if (isPending) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <div className="space-y-2">
        <p className="text-red-600">Could not load tasks.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-violet-700"
        >
          Try again
        </button>
      </div>
    );
  } else if (todos.length === 0) {
    content = <p>No tasks.</p>;
  } else {
    content = (
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <Link
            to="/todos/new"
            className="rounded bg-violet-600 px-3 py-1.5 text-white"
          >
            New task
          </Link>
        </div>

        <nav className="flex gap-4 text-violet-700">
          <Link
            to="/todos"
            className={status === 'all' ? 'font-semibold' : undefined}
          >
            All
          </Link>
          <Link
            to="/todos?status=pending"
            className={status === 'pending' ? 'font-semibold' : undefined}
          >
            Pending
          </Link>
          <Link
            to="/todos?status=completed"
            className={status === 'completed' ? 'font-semibold' : undefined}
          >
            Completed
          </Link>
        </nav>

        {content}
      </main>
    </>
  );
}
