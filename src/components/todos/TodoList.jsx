// รายการ todo ในกรอบการ์ด
import TodoItem from '@/components/todos/TodoItem';

export default function TodoList({ todos, dateField }) {
  return (
    <ul className="overflow-hidden rounded-xl border bg-card">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dateField={dateField} />
      ))}
    </ul>
  );
}
