import EditTodoPage from '@/pages/EditTodoPage';
import NewTodoPage from '@/pages/NewTodoPage';
import TodoListPage from '@/pages/TodoListPage';

// ยังไม่มี router: จะดูหน้าไหนให้เปลี่ยน pages.list
// เป็น pages.new หรือ pages.edit แล้วบันทึกไฟล์
const pages = {
  list: <TodoListPage />,
  new: <NewTodoPage />,
  edit: <EditTodoPage />,
};

export default function App() {
  return pages.list;
}
