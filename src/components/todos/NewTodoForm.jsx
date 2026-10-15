// การ์ดฟอร์มสร้าง todo ใหม่: ช่อง Title, ตัวเลือก Status และปุ่ม Cancel / Create task
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import StatusSelect from '@/components/todos/StatusSelect';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { useCreateTodo } from '@/hooks/use-todo-mutations';
import { todoFormSchema } from '@/lib/todo-schema';
import { cn } from '@/lib/utils';

export default function NewTodoForm() {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: '', completed: false },
  });
  // ใช้ปิดปุ่ม Create ตอนชื่อยังว่าง
  const title = useWatch({ control, name: 'title' });

  const createMutation = useCreateTodo({
    onSuccess: ({ todo, statusError }) => {
      if (statusError) {
        // todo ถูกสร้างแล้วแต่ยังเป็น Pending ส่งไปหน้า edit ให้ตั้งสถานะเอง
        // ถ้าค้างอยู่หน้านี้ กด Create ซ้ำจะได้ todo ซ้ำ
        navigate(`/todos/${todo.id}`);
        toast.add({
          type: 'error',
          title: 'Task created, but its status could not be set',
          description: statusError.message,
        });
        return;
      }
      navigate('/todos');
      toast.add({ type: 'success', title: 'Task created' });
    },
    onError: (error) => {
      // API ตรวจ title อีกชั้น ถ้าไม่ผ่านให้แสดงใต้ช่องเหมือน error ของ zod
      if (error.code === 'VALIDATION_ERROR') {
        const titleDetail = error.details.find(
          (detail) => detail.source === 'body' && detail.field === 'title',
        );
        if (titleDetail) {
          setError(
            'title',
            { message: titleDetail.message },
            { shouldFocus: true },
          );
          return;
        }
      }
      toast.add({
        type: 'error',
        title: "Couldn't create task",
        description: error.message,
      });
    },
  });

  // Esc ที่ไหนก็ได้ในการ์ดเท่ากับกด Cancel
  function cancelOnEscape(event) {
    if (event.key === 'Escape') {
      navigate('/todos');
    }
  }

  // ปุ่ม Create ที่ถูกปิดทำให้กด Enter ในช่อง Title แล้วไม่ submit ด้วย
  // จึงส่งซ้ำระหว่างรอไม่ได้
  const isCreateDisabled = title.trim() === '' || createMutation.isPending;

  return (
    <Card className="mx-auto w-full max-w-120" onKeyDown={cancelOnEscape}>
      <CardHeader>
        <CardTitle>
          <h1>New task</h1>
        </CardTitle>
        <CardDescription>Add a title and choose a status.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="new-todo-form"
          noValidate
          onSubmit={handleSubmit((values) => createMutation.mutate(values))}
        >
          <FieldGroup className="gap-4.5">
            <Field className="gap-2" data-invalid={!!errors.title}>
              <FieldLabel htmlFor="new-todo-title">Title</FieldLabel>
              <Input
                id="new-todo-title"
                placeholder="e.g. Book flights"
                autoFocus
                aria-invalid={!!errors.title}
                // ผูกข้อความ error กับช่อง กลับมา focus ช่องนี้ทีหลังก็ยังได้ยิน error
                aria-describedby={
                  errors.title ? 'new-todo-title-error' : undefined
                }
                {...register('title')}
              />
              <FieldError id="new-todo-title-error" errors={[errors.title]} />
            </Field>
            <Controller
              name="completed"
              control={control}
              render={({ field }) => (
                <StatusSelect
                  completed={field.value}
                  onCompletedChange={field.onChange}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Link
          to="/todos"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          Cancel
        </Link>
        <Button type="submit" form="new-todo-form" disabled={isCreateDisabled}>
          Create task
        </Button>
      </CardFooter>
    </Card>
  );
}
