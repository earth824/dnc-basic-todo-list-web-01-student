// หน้าสร้าง task: ฟอร์มที่มีช่อง Title
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import { createTodo } from '@/api/todos';
import AppHeader from '@/components/AppHeader';

// กติกาเดียวกับ API: ตัดช่องว่างหัวท้ายก่อน แล้วต้องยาว 1–200 ตัวอักษร
const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters'),
});

export default function NewTodoPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '' },
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    // รอให้รายการโหลดใหม่ก่อน กลับไปแล้วจะเห็น task ใหม่ทันที
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todos');
    },
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <Link to="/todos" className="text-violet-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold">New task</h1>

        {/* handleSubmit ตรวจด้วย zod ก่อน ผ่านแล้วถึงเรียก callback พร้อม title ที่ trim แล้ว */}
        <form
          onSubmit={handleSubmit((values) => createMutation.mutate(values))}
          className="space-y-4"
        >
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {createMutation.isError && (
            <p className="text-red-600">Could not save task.</p>
          )}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded bg-violet-600 px-3 py-1.5 text-white disabled:opacity-50"
            >
              Create
            </button>
            <Link to="/todos">Cancel</Link>
          </div>
        </form>
      </main>
    </>
  );
}
