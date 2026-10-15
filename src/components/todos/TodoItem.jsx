// todo หนึ่งแถว: checkbox, ชื่อ, เวลา, ป้ายสถานะ และเมนู ⋯
import { useState } from 'react';

import DeleteTodoDialog from '@/components/todos/DeleteTodoDialog';
import TodoItemMenu from '@/components/todos/TodoItemMenu';
import TodoStatusBadge from '@/components/todos/TodoStatusBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/toast';
import { useDeleteTodo, useUpdateTodo } from '@/hooks/use-todo-mutations';
import { formatRelativeTime } from '@/lib/format-relative-time';
import { cn } from '@/lib/utils';

// dateField คือ 'createdAt' หรือ 'updatedAt' ตาม field ที่ใช้ sort อยู่
export default function TodoItem({ todo, dateField }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // สำเร็จแล้วไม่มี toast ตามดีไซน์ แสดงเฉพาะตอนพัง
  const updateMutation = useUpdateTodo({
    onError: (error) => {
      toast.add({
        type: 'error',
        title: "Couldn't update task",
        description: error.message,
      });
    },
  });

  // พังแล้วเปิด dialog ค้างไว้ ผู้ใช้กด Delete ซ้ำหรือ Cancel ได้
  const deleteMutation = useDeleteTodo({
    onSuccess: () => {
      setIsDeleteOpen(false);
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

  // ไม่ทำ optimistic update: checkbox เปลี่ยนเมื่อรายการใหม่โหลดเสร็จ และปิดไว้ระหว่างรอ
  function toggleCompleted() {
    updateMutation.mutate({
      id: todo.id,
      changes: { completed: !todo.completed },
    });
  }

  return (
    <li className="flex items-center gap-3.5 border-b px-3.5 py-2 last:border-b-0 hover:bg-accent">
      {/* ใช้ชื่อ todo เป็นชื่อ checkbox โปรแกรมอ่านหน้าจอจะอ่านแต่ละแถวต่างกัน
          และบอกสถานะ checked / not checked ต่อท้ายเอง */}
      <Checkbox
        aria-label={todo.title}
        checked={todo.completed}
        onCheckedChange={toggleCompleted}
        disabled={updateMutation.isPending}
      />
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-base',
          todo.completed && 'text-muted-foreground line-through',
        )}
      >
        {todo.title}
      </span>
      <time
        dateTime={todo[dateField]}
        className="text-xs text-muted-foreground"
      >
        {formatRelativeTime(todo[dateField])}
      </time>
      <TodoStatusBadge completed={todo.completed} />
      <TodoItemMenu
        todo={todo}
        onToggleCompleted={toggleCompleted}
        isToggling={updateMutation.isPending}
        onDelete={() => setIsDeleteOpen(true)}
      />
      <DeleteTodoDialog
        title={todo.title}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => deleteMutation.mutate(todo.id)}
        isDeleting={deleteMutation.isPending}
      />
    </li>
  );
}
