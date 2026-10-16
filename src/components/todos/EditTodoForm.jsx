// การ์ดฟอร์มแก้ไข todo: ช่อง Title, ตัวเลือก Status และปุ่ม Delete / Cancel / Save changes
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

const updateTodoSchema = z.object({
  title: z.string().trim().min(1),
  completed: z.enum(['completed', 'pending']),
});

export default function EditTodoForm({ todo }) {
  const form = useForm({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: todo.title,
      completed: todo.completed ? 'completed' : 'pending',
    },
  });

  const onSubmit = (data) => {};

  return (
    <Card className="mx-auto w-full max-w-120">
      <CardHeader>
        <CardTitle>
          <h1>Edit task</h1>
        </CardTitle>
        <CardDescription>Created Oct 10 · Updated 2h ago</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-todo-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4.5">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-todo-title">Title</FieldLabel>
                  <Input
                    id="edit-todo-title"
                    defaultValue={todo.title}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="completed"
              render={() => <StatusSelect />}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline-destructive">Delete</Button>
        <a
          href="#"
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          Cancel
        </a>
        <Button type="submit" form="edit-todo-form">
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
