// หน้ารายการ task: หัวข้อ, ปุ่มสร้าง, ตัวกรองสถานะ และรายการ
import { Link } from 'react-router';

import AppHeader from '@/components/AppHeader';
import TodoItem from '@/components/TodoItem';

export default function TodoListPage() {
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

        <ul className="divide-y divide-gray-200">
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </ul>
      </main>
    </>
  );
}
