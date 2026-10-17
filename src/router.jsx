import { createBrowserRouter, Navigate } from 'react-router';

import EditTodoPage from '@/pages/EditTodoPage';
import NewTodoPage from '@/pages/NewTodoPage';
import TodoListPage from '@/pages/TodoListPage';

export const router = createBrowserRouter([
  { path: '/todos', element: <TodoListPage /> },
  { path: '/todos/new', element: <NewTodoPage /> },
  { path: '/todos/:id', element: <EditTodoPage /> },
  // path อื่นทั้งหมด (รวมถึง /) กลับไปหน้ารายการ
  { path: '*', element: <Navigate to="/todos" replace /> },
]);
