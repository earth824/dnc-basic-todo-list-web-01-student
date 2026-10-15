import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getTodo, getTodos } from '@/api/todos';

// query key ทุกตัวขึ้นต้นด้วย 'todos' mutation จึง invalidate todoKeys.all ทีเดียว
// แล้วรายการ ตัวเลข และหน้า edit refetch พร้อมกัน
export const todoKeys = {
  all: ['todos'],
  list: (params) => [...todoKeys.all, 'list', params],
  counts: (q) => [...todoKeys.all, 'counts', q],
  // id จาก URL เป็น string แต่ todo.id เป็น number แปลงเป็น number ก่อน
  // ไม่อย่างนั้น '5' กับ 5 จะได้ key คนละตัว
  detail: (id) => [...todoKeys.all, 'detail', Number(id)],
};

// params คือ { completed, q, sortBy, order } ที่ส่งต่อให้ API
// keepPreviousData แสดงรายการเดิมระหว่างโหลดรายการใหม่ ไม่กระพริบเป็น skeleton ทุกครั้งที่พิมพ์
export function useTodos(params) {
  return useQuery({
    queryKey: todoKeys.list(params),
    queryFn: ({ signal }) => getTodos(params, signal),
    placeholderData: keepPreviousData,
  });
}

// อยู่นอก hook เพื่อให้เป็นฟังก์ชันตัวเดิมทุก render
// TanStack Query จึงไม่ต้องคำนวณใหม่ถ้าข้อมูลไม่เปลี่ยน
function countTodos(todos) {
  let pending = 0;
  for (const todo of todos) {
    if (!todo.completed) {
      pending += 1;
    }
  }
  return { all: todos.length, pending, completed: todos.length - pending };
}

// ตัวเลขใน sidebar ใช้คำค้นแต่ไม่สน filter สถานะ API ไม่มี endpoint นับจำนวน
// จึงดึงทุก todo ที่ตรงกับคำค้นแล้วนับเอง
export function useTodoCounts(q) {
  return useQuery({
    queryKey: todoKeys.counts(q),
    queryFn: ({ signal }) => getTodos({ q }, signal),
    select: countTodos,
    placeholderData: keepPreviousData,
  });
}

// enabled: false เมื่อ id ใน URL ใช้ไม่ได้ จะได้ไม่เรียก API ที่รู้อยู่แล้วว่าไม่เจอ
export function useTodo(id, { enabled = true } = {}) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: ({ signal }) => getTodo(id, signal),
    enabled,
  });
}
