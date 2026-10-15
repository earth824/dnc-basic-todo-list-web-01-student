// การ์ดฟอร์มแก้ไข todo: ช่อง Title, ตัวเลือก Status และปุ่ม Delete / Cancel / Save changes
import { useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Link, useBlocker, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import DeleteTodoDialog from '@/components/todos/DeleteTodoDialog';
import DiscardChangesDialog from '@/components/todos/DiscardChangesDialog';
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
import { useDeleteTodo, useUpdateTodo } from '@/hooks/use-todo-mutations';
import { formatDate, formatRelativeTime } from '@/lib/format-relative-time';
import { todoFormSchema } from '@/lib/todo-schema';
import { cn } from '@/lib/utils';

// todo มาจาก useTodo ในหน้า EditTodoPage ฟอร์มจึง render เมื่อมีข้อมูลแล้วเท่านั้น
// และใช้เป็นค่าเริ่มต้นได้ตรง ๆ ไม่ต้อง reset ทีหลัง
export default function EditTodoForm({ todo }) {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: todo.title, completed: todo.completed },
  });
  const [title, completed] = useWatch({
    control,
    name: ['title', 'completed'],
  });
  // เทียบกับ todo ล่าสุดหลัง trim เหมือนค่าที่จะส่งจริง
  // พิมพ์ช่องว่างต่อท้ายอย่างเดียวจึงไม่นับว่าแก้
  const hasChanges =
    title.trim() !== todo.title || completed !== todo.completed;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // ตั้งเป็น true ก่อน navigate หลัง Save หรือ Delete สำเร็จ ให้ออกจากหน้าได้โดยไม่ถาม
  // ใช้ ref ไม่ใช้ state เพราะ navigate ทำงานทันทีใน callback เดียวกัน
  // ถ้าเป็น state ค่าใหม่จะมาถึงตอน render รอบหน้า ซึ่งช้าไป blocker จะยังเห็นค่าเดิม
  const isLeavingRef = useRef(false);

  // ถามก่อนออกจากหน้าทุกแบบในแอป รวมถึงปุ่ม Back ของ browser
  // (ปิดแท็บหรือ reload ไม่ผ่าน router จึงไม่ถูกจับ)
  const blocker = useBlocker(() => hasChanges && !isLeavingRef.current);

  function leaveTo(path) {
    isLeavingRef.current = true;
    navigate(path);
  }

  const updateMutation = useUpdateTodo({
    onSuccess: () => {
      leaveTo('/todos');
      toast.add({ type: 'success', title: 'Task updated' });
    },
    onError: (error) => {
      // todo ถูกลบไปแล้ว hook invalidate ให้ แล้ว EditTodoPage จะพาออกพร้อม toast "Task not found"
      if (error.code === 'TODO_NOT_FOUND') {
        return;
      }
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
        title: "Couldn't save task",
        description: error.message,
      });
    },
  });

  // ลบแล้วกลับหน้ารายการตามดีไซน์ ถ้าพัง dialog เปิดค้างไว้ให้กดซ้ำหรือ Cancel
  const deleteMutation = useDeleteTodo({
    onSuccess: () => {
      leaveTo('/todos');
      toast.add({ type: 'success', title: 'Task deleted' });
    },
    onError: (error) => {
      toast.add({
        type: 'error',
        title: "Couldn't delete task",
        description: error.message,
      });
    },
  });

  // ปุ่ม Save ที่ถูกปิดทำให้กด Enter แล้วไม่ submit ด้วย
  const isSaveDisabled = !hasChanges || updateMutation.isPending;

  return (
    <Card className="mx-auto w-full max-w-120">
      <CardHeader>
        <CardTitle>
          <h1>Edit task</h1>
        </CardTitle>
        <CardDescription>
          Created {formatDate(todo.createdAt)} · Updated{' '}
          {formatRelativeTime(todo.updatedAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="edit-todo-form"
          noValidate
          onSubmit={handleSubmit((values) =>
            updateMutation.mutate({ id: todo.id, changes: values }),
          )}
        >
          <FieldGroup className="gap-4.5">
            <Field className="gap-2" data-invalid={!!errors.title}>
              <FieldLabel htmlFor="edit-todo-title">Title</FieldLabel>
              <Input
                id="edit-todo-title"
                aria-invalid={!!errors.title}
                // ผูกข้อความ error กับช่อง กลับมา focus ช่องนี้ทีหลังก็ยังได้ยิน error
                aria-describedby={
                  errors.title ? 'edit-todo-title-error' : undefined
                }
                {...register('title')}
              />
              <FieldError id="edit-todo-title-error" errors={[errors.title]} />
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
      <CardFooter className="gap-2">
        <Button
          variant="outline-destructive"
          onClick={() => setIsDeleteOpen(true)}
          disabled={updateMutation.isPending}
        >
          Delete
        </Button>
        <Link
          to="/todos"
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          Cancel
        </Link>
        <Button type="submit" form="edit-todo-form" disabled={isSaveDisabled}>
          Save changes
        </Button>
      </CardFooter>
      <DeleteTodoDialog
        title={todo.title}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => deleteMutation.mutate(todo.id)}
        isDeleting={deleteMutation.isPending}
      />
      <DiscardChangesDialog
        open={blocker.state === 'blocked'}
        onKeepEditing={() => blocker.reset()}
        onDiscard={() => blocker.proceed()}
      />
    </Card>
  );
}
