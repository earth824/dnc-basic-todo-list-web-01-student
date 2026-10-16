import { createBrowserRouter, Navigate } from 'react-router';
import TodoListPage from './pages/TodoListPage';
import NewTodoPage from './pages/NewTodoPage';
import EditTodoPage from './pages/EditTodoPage';

export const router = createBrowserRouter([
  { path: '/todo', element: <TodoListPage /> },
  { path: '/todo/new', element: <NewTodoPage /> },
  { path: '/todo/:id', element: <EditTodoPage /> },
  { path: '*', element: <Navigate to="/todo" replace /> },
]);
