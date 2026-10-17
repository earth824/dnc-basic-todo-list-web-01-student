// หน้าแก้ไข task: ฟอร์มที่มีช่อง Title และ checkbox Completed
import { Link } from 'react-router';

import AppHeader from '@/components/AppHeader';

export default function EditTodoPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <Link to="/todos" className="text-violet-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold">Edit task</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Completed
          </label>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded bg-violet-600 px-3 py-1.5 text-white disabled:opacity-50"
            >
              Save
            </button>
            <Link to="/todos">Cancel</Link>
          </div>
        </form>
      </main>
    </>
  );
}
