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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function NewTodoForm() {
  return (
    <Card className="mx-auto w-full max-w-120">
      <CardHeader>
        <CardTitle>
          <h1>New task</h1>
        </CardTitle>
        <CardDescription>Add a title and choose a status.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="new-todo-form">
          <FieldGroup className="gap-4.5">
            <Field className="gap-2">
              <FieldLabel htmlFor="new-todo-title">Title</FieldLabel>
              <Input
                id="new-todo-title"
                placeholder="e.g. Book flights"
                autoFocus
              />
            </Field>
            <StatusSelect />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <a href="#" className={cn(buttonVariants({ variant: 'outline' }))}>
          Cancel
        </a>
        <Button type="submit" form="new-todo-form">
          Create task
        </Button>
      </CardFooter>
    </Card>
  );
}
