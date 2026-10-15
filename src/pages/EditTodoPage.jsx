// หน้าแก้ไข todo (/todos/:id)
import FormPageHeader from '@/components/layout/FormPageHeader';
import EditTodoForm from '@/components/todos/EditTodoForm';

export default function EditTodoPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <FormPageHeader />
      <main className="mt-9 px-4">
        <EditTodoForm />
      </main>
    </div>
  );
}
