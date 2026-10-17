import { apiClient } from './client';

// ฟังก์ชันเรียก API ของ todo ทั้งหมดอยู่ที่นี่ component ไม่ต้องรู้ path หรือรูปของ response
// ใช้เป็น queryFn / mutationFn ได้ตรง ๆ

export async function getTodos(params) {
  const res = await apiClient.get('/todos', { params });
  return res.data;
}

export async function getTodo(id) {
  const res = await apiClient.get(`/todos/${id}`);
  return res.data;
}

export async function createTodo(values) {
  const res = await apiClient.post('/todos', values);
  return res.data;
}

export async function updateTodo(id, changes) {
  const res = await apiClient.patch(`/todos/${id}`, changes);
  return res.data;
}

// DELETE ตอบ 204 ไม่มี body จึงไม่คืนค่า
export async function deleteTodo(id) {
  await apiClient.delete(`/todos/${id}`);
}
