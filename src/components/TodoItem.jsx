// หนึ่งแถวในรายการ: checkbox สลับสถานะ, ชื่อ task ที่กดแล้วไปหน้าแก้ไข และปุ่มลบ
import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';

export default function TodoItem({ todo }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/todos/${todo.id}`);
    }, // this function will call: deleteMutation.mutate()
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      await apiClient.patch(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return (
    <li className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateMutation.mutate()}
      />
      <Link to={`/todos/${todo.id}`} className="flex-1">
        {todo.title}
      </Link>
      <button
        type="button"
        className="text-red-600 disabled:opacity-50"
        onClick={() => {
          deleteMutation.mutate();
        }}
      >
        Delete
      </button>
    </li>
  );
}
