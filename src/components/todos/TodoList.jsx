// รายการ todo ในกรอบการ์ด ตอนนี้แสดงแถวเดียวกันซ้ำ 8 ครั้ง
import TodoItem from '@/components/todos/TodoItem';

export default function TodoList({ todos }) {
  return (
    <ul className="overflow-hidden rounded-xl border bg-card">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
