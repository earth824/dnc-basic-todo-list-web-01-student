// หน้ารายการ todo (/todos): header, sidebar กรองสถานะ และรายการ todo
import AppHeader from '@/components/layout/AppHeader';
import SortMenu from '@/components/todos/SortMenu';
import StatusFilter from '@/components/todos/StatusFilter';
import TodoList from '@/components/todos/TodoList';

export default function TodoListPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <aside className="w-47.5 shrink-0 border-r bg-surface px-3 py-4">
          <StatusFilter />
        </aside>
        <main className="flex-1 px-5 py-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold">
              All tasks
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                8
              </span>
            </h1>
            <SortMenu />
          </div>
          <TodoList />
        </main>
      </div>
    </div>
  );
}
