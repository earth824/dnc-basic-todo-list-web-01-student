// หน้าแก้ไข task: ฟอร์มที่มีช่อง Title และ checkbox Completed
import { Link, useParams } from 'react-router';

import AppHeader from '@/components/AppHeader';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import EditTodoForm from '@/components/EditTodoForm';

export default function EditTodoPage() {
  const { id } = useParams(); // /todos/14  { id: '14' }

  const {
    error,
    isPending,
    isFetching,
    isError,
    data: todo, // { id, title, completed, createdAt, updatedAt }
  } = useQuery({
    queryKey: ['todos', id], // ["todos", "14"]
    queryFn: async () => {
      const res = await apiClient.get(`/todos/${id}`);
      return res.data; // success: res.data
    },
    // staleTime: 30000,
  });

  // status: success, error
  // console.log(isPending, isFetching);

  // axios error: error.response.data
  const errorCode = error?.response?.data?.code;
  const isNotFound =
    errorCode === 'TODO_NOT_FOUND' || errorCode === 'VALIDATION_ERROR';

  let content;
  if (isPending || isFetching) {
    content = <p>Loading ...</p>;
  } else if (isNotFound) {
    content = <p>Task not found</p>;
  } else if (isError) {
    content = <p>Could not load task</p>;
  } else {
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
