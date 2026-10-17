// หน้าแก้ไข task: ฟอร์มที่มีช่อง Title และ checkbox Completed
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { z } from 'zod';

import { getTodo, updateTodo } from '@/api/todos';
import AppHeader from '@/components/AppHeader';

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters'),
  completed: z.boolean(),
});

export default function EditTodoPage() {
  // useParams คืน id เป็น string เสมอ เช่น '5'
  const { id } = useParams();

  const {
    data: todo,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => getTodo(id),
  });

  // ไม่เจอ task ดูจาก code ของ API ไม่ใช่ message
  // VALIDATION_ERROR คือ id ผิดรูปแบบ เช่น /todos/abc
  const errorCode = error?.response?.data?.code;
  const isNotFound =
    errorCode === 'TODO_NOT_FOUND' || errorCode === 'VALIDATION_ERROR';

  let content;
  if (isPending) {
    content = <p>Loading...</p>;
  } else if (isNotFound) {
    content = (
      <div className="space-y-2">
        <p>Task not found.</p>
        <Link to="/todos" className="text-violet-700">
          Back to tasks
        </Link>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="space-y-2">
        <p className="text-red-600">Could not load task.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-violet-700"
        >
          Try again
        </button>
      </div>
    );
  } else {
    // render ฟอร์มหลังได้ข้อมูลแล้วเท่านั้น defaultValues จึงเป็นค่าจริงตั้งแต่แรก
    content = <EditTodoForm todo={todo} />;
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-xl space-y-4 p-4">
        <Link to="/todos" className="text-violet-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold">Edit task</h1>

        {content}
      </main>
    </>
  );
}

// แยกเป็น component เพราะ useForm อ่าน defaultValues ครั้งเดียวตอนสร้างฟอร์ม
// ถ้าสร้างฟอร์มก่อนข้อมูลมาถึง ช่องจะว่าง
function EditTodoForm({ todo }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: todo.title, completed: todo.completed },
  });

  const updateMutation = useMutation({
    mutationFn: (values) => updateTodo(todo.id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todos');
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => updateMutation.mutate(values))}
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

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('completed')} />
        Completed
      </label>

      {updateMutation.isError && (
        <p className="text-red-600">Could not save task.</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="rounded bg-violet-600 px-3 py-1.5 text-white disabled:opacity-50"
        >
          Save
        </button>
        <Link to="/todos">Cancel</Link>
      </div>
    </form>
  );
}
