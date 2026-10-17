// หนึ่งแถวในรายการ: checkbox สลับสถานะ, ชื่อ task ที่กดแล้วไปหน้าแก้ไข และปุ่มลบ
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

import { deleteTodo, updateTodo } from '@/api/todos';

export default function TodoItem({ todo }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (completed) => updateTodo(todo.id, { completed }),
    // return promise ของ invalidate ไว้ mutation จะยัง pending จนรายการโหลดใหม่เสร็จ
    // checkbox จึงถูกปิดจนกว่าจะเห็นค่าใหม่ ไม่เด้งกลับค่าเดิมแวบหนึ่ง
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const isBusy = toggleMutation.isPending || deleteMutation.isPending;
  const isError = toggleMutation.isError || deleteMutation.isError;

  return (
    <li className="py-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => toggleMutation.mutate(e.target.checked)}
          disabled={isBusy}
        />
        <Link
          to={`/todos/${todo.id}`}
          className={todo.completed ? 'flex-1 line-through' : 'flex-1'}
        >
          {todo.title}
        </Link>
        <button
          type="button"
          onClick={() => deleteMutation.mutate()}
          disabled={isBusy}
          className="text-red-600 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
      {isError && <p className="text-sm text-red-600">Something went wrong.</p>}
    </li>
  );
}
