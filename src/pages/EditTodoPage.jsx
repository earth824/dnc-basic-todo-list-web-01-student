// หน้าแก้ไข todo (/todos/:id)
import { apiClient } from '@/api/client';
import FormPageHeader from '@/components/layout/FormPageHeader';
import EditTodoForm from '@/components/todos/EditTodoForm';
import TodoListError from '@/components/todos/TodoListError';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import z from 'zod';

const positiveIntSchema = z.coerce.number().int().positive();

export default function EditTodoPage() {
  const { id } = useParams();

  // { success, data, error }
  const parsed = positiveIntSchema.safeParse(id);

  const {
    data: todo,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['todos', id],
    queryFn: async () => {
      const res = await apiClient.get(`/todos/${id}`);
      return res.data;
    },
    enabled: parsed.success,
    retry: false,
  });

  console.log(isError, isPending);
  const isNotFound = !parsed.success || isError || !todo;

  return (
    <div className="flex min-h-svh flex-col">
      <FormPageHeader />
      <main className="mt-9 px-4">
        {isNotFound ? <TodoListError /> : <EditTodoForm todo={todo} />}
      </main>
    </div>
  );
}
