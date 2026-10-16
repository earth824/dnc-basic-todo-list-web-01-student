// การ์ดฟอร์มสร้าง todo ใหม่: ช่อง Title, ตัวเลือก Status และปุ่ม Cancel / Create task
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
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { toast } from '../ui/toast';

const newTodoSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});

export default function NewTodoForm() {
  const form = useForm({
    resolver: zodResolver(newTodoSchema),
    defaultValues: { title: '' },
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiClient.post('/todos', data); // c => { title }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      navigate('/todo');
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        type: 'error',
        title: 'Could not create task',
        description: error.message,
      });
    },
  });

  const onSubmit = (data) => {
    // data => object from zod (success validation)
    createMutation.mutate(data); // data => { title }
  };

  return (
    <Card className="mx-auto w-full max-w-120">
      <CardHeader>
        <CardTitle>
          <h1>New task</h1>
        </CardTitle>
        <CardDescription>Add a title and choose a status.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="new-todo-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4.5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-todo-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="new-todo-title"
                    placeholder="e.g. Book flights"
                    autoFocus
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* <StatusSelect /> */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Link to="/todo" className={cn(buttonVariants({ variant: 'outline' }))}>
          Cancel
        </Link>
        <Button type="submit" form="new-todo-form">
          Create task
        </Button>
      </CardFooter>
    </Card>
  );
}
