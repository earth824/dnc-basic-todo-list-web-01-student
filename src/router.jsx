import { createBrowserRouter, Navigate } from 'react-router';

import EditTodoPage from '@/pages/EditTodoPage';
import NewTodoPage from '@/pages/NewTodoPage';
import TodoListPage from '@/pages/TodoListPage';

// ใช้ data router (createBrowserRouter) เพราะ useBlocker ในหน้า edit ใช้ได้กับ router แบบนี้เท่านั้น
// แต่ไม่ใช้ loader ข้อมูลทั้งหมดดึงด้วย useQuery ใน component
export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/todos" replace /> },
  { path: '/todos', element: <TodoListPage /> },
  { path: '/todos/new', element: <NewTodoPage /> },
  { path: '/todos/:id', element: <EditTodoPage /> },
  { path: '*', element: <Navigate to="/todos" replace /> },
]);
