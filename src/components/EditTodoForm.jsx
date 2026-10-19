import { apiClient } from '@/api/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import z from 'zod';

const updateTodoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  completed: z.boolean(),
});

export default function EditTodoForm({ todo }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed,
    },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateMutation = useMutation({
    mutationFn: (input) => apiClient.patch(`/todos/${todo.id}`, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todos');
    },
  });

  // data => { title, completed }
  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          {...register('title')}
          id="title"
          type="text"
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
  );
}
