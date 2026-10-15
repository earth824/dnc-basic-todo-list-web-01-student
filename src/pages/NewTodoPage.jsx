// หน้าสร้าง todo ใหม่ (/todos/new)
import FormPageHeader from '@/components/layout/FormPageHeader';
import NewTodoForm from '@/components/todos/NewTodoForm';

export default function NewTodoPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <FormPageHeader />
      <main className="mt-9 px-4">
        <NewTodoForm />
      </main>
    </div>
  );
}
