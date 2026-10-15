// todo หนึ่งแถว: checkbox, ชื่อ, เวลา, ป้ายสถานะ และเมนู ⋯
import TodoItemMenu from '@/components/todos/TodoItemMenu';
import TodoStatusBadge from '@/components/todos/TodoStatusBadge';
import { Checkbox } from '@/components/ui/checkbox';

export default function TodoItem() {
  return (
    <li className="flex items-center gap-3.5 border-b px-3.5 py-2 last:border-b-0 hover:bg-accent">
      <Checkbox aria-label="Mark completed" />
      <span className="min-w-0 flex-1 truncate text-base">
        Draft project brief
      </span>
      <span className="text-xs text-muted-foreground">2h ago</span>
      <TodoStatusBadge />
      <TodoItemMenu />
    </li>
  );
}
