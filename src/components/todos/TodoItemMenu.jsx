// เมนู ⋯ ท้ายแถว todo: Edit, Mark completed (หรือ Mark pending) และ Delete
import {
  CheckIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RotateCcwIcon,
  Trash2Icon,
} from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TodoItemMenu({
  todo,
  onToggleCompleted,
  isToggling,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" />}
        aria-label="Task actions"
      >
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-45">
        <DropdownMenuItem render={<Link to={`/todos/${todo.id}`} />}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleCompleted} disabled={isToggling}>
          {todo.completed ? <RotateCcwIcon /> : <CheckIcon />}
          {todo.completed ? 'Mark pending' : 'Mark completed'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
