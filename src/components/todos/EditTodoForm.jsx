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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function EditTodoForm() {
  return (
    <Card className="mx-auto w-full max-w-120">
      <CardHeader>
        <CardTitle>
          <h1>Edit task</h1>
        </CardTitle>
        <CardDescription>Created Oct 10 · Updated 2h ago</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="edit-todo-form">
          <FieldGroup className="gap-4.5">
            <Field className="gap-2">
              <FieldLabel htmlFor="edit-todo-title">Title</FieldLabel>
              <Input id="edit-todo-title" defaultValue="Draft project brief" />
            </Field>
            <StatusSelect />
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
