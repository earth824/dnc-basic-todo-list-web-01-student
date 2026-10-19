// หน้ารายการ task: หัวข้อ, ปุ่มสร้าง, ตัวกรองสถานะ และรายการ
import { Link, useSearchParams } from 'react-router';

import AppHeader from '@/components/AppHeader';
import TodoItem from '@/components/TodoItem';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';

const mapCompletedByStatus = {
  all: undefined,
  pending: false,
  completed: true,
};

export default function TodoListPage() {
  const [searchParams] = useSearchParams();
  // ex. /todos?q=a&age=20: { q: 'a', age: '20' }
  // searchParams.get('abcd') ==> null
  const statusParam = searchParams.get('status'); // /todos?status=
  // possible value: null, pending, completed
  const status =
    statusParam === 'pending' || statusParam === 'completed'
      ? statusParam
      : 'all';

  // mounting: data => undefined
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['todos', { status }], // { key: value } ==> { ["todos"]: data return from queryFn}
    queryFn: async () => {
      const res = await apiClient.get('/todos', {
        params: { completed: mapCompletedByStatus[status] },
      });
      return res.data;
    },
    // staleTime: 60000,
    // gcTime: 15000,
    retry: 0,
  });

  // console.log(todos, isPending);

  let content;
  if (isPending) {
    content = <p>Loading ...</p>;
  } else if (isError) {
    content = <p>Could not load tasks</p>;
  } else {
    content = (
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          // { id, title, completed, createdAt, updatedAt }
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
          <Link to="/todos">All</Link>
          <Link to="/todos?status=pending">Pending</Link>
          <Link to="/todos?status=completed">Completed</Link>
        </nav>
        {content}
      </main>
    </>
  );
}
