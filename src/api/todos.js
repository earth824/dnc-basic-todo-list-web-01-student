import { apiClient } from './client';

// ฟังก์ชันเรียก API อย่างเดียว ไม่มี hook และไม่รู้จัก TanStack Query
// ทุกฟังก์ชันหยิบเฉพาะ field ที่ API รู้จัก เพราะ field แปลกปลอมจะได้ 400
// ค่าที่เป็น undefined axios จะไม่ส่งไป
// signal ใช้ยกเลิก request ที่ไม่ต้องการแล้ว (TanStack Query ส่งมาให้)

export async function getTodos({ completed, q, sortBy, order } = {}, signal) {
  const { data } = await apiClient.get('/todos', {
    params: { completed, q, sortBy, order },
    signal,
  });
  return data;
}

export async function getTodo(id, signal) {
  const { data } = await apiClient.get(`/todos/${id}`, { signal });
  return data;
}

export async function createTodo({ title }) {
  const { data } = await apiClient.post('/todos', { title });
  return data;
}

// ส่งได้ทั้ง title และ completed หรืออย่างใดอย่างหนึ่ง
export async function updateTodo(id, { title, completed }) {
  const { data } = await apiClient.patch(`/todos/${id}`, { title, completed });
  return data;
}

// API ตอบ 204 ไม่มี body จึงไม่คืนค่าอะไร
export async function deleteTodo(id) {
  await apiClient.delete(`/todos/${id}`);
}
