import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTodo, deleteTodo, updateTodo } from '@/api/todos';
import { todoKeys } from '@/hooks/use-todos';

// toast ไม่อยู่ใน hook เพราะแต่ละที่จัดการ error ต่างกัน
// เช่น หน้า edit นำ VALIDATION_ERROR ไปแสดงใต้ช่อง ส่วนรายการแสดง toast
// จึงให้ผู้เรียกส่ง onSuccess / onError มา และส่งต่อเข้า useMutation (ไม่ใช่ใส่ตอน mutate)
// เพราะ callback ที่ใส่ตอน mutate จะไม่ทำงานถ้า component unmount ไปก่อน request จบ
// เช่น กด checkbox แล้วเปลี่ยน filter ทันที ถ้า request พังผู้ใช้จะไม่เห็น toast

// mutate({ title, completed })
// POST /todos รับแค่ title ถ้าเลือก Completed จึง PATCH ต่อใน mutation เดียวกัน
// ได้ผลเป็น { todo, statusError }: statusError มีค่าเมื่อสร้างได้แต่ PATCH พัง
// ไม่ throw ในกรณีนั้น เพราะ todo ถูกสร้างไปแล้ว ถ้าถือว่าพัง ผู้ใช้จะกดสร้างซ้ำ
export function useCreateTodo({ onSuccess, onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, completed }) => {
      const todo = await createTodo({ title });
      if (!completed) {
        return { todo, statusError: null };
      }
      try {
        const updated = await updateTodo(todo.id, { completed: true });
        return { todo: updated, statusError: null };
      } catch (error) {
        return { todo, statusError: error };
      }
    },
    // เรียกก่อน invalidate เหมือน useDeleteTodo: toast และการเปลี่ยนหน้าจะได้เกิดทันที
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
      return queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
    // POST พังแปลว่าไม่ได้สร้างอะไร จึงไม่ต้อง invalidate
    onError,
  });
}

// changes คือ { title, completed } หรืออย่างใดอย่างหนึ่ง
export function useUpdateTodo({ onSuccess, onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, changes }) => updateTodo(id, changes),
    // หน้า edit ใช้ onSuccess เปลี่ยนหน้าและแสดง toast จึงเรียกก่อน invalidate
    // return promise ไว้ mutation จะยัง pending จนกว่ารายการใหม่จะโหลดเสร็จ
    // checkbox จึงไม่เด้งกลับไปค่าเดิมแวบหนึ่งก่อนเปลี่ยน
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
      return queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
    // พังก็ invalidate ด้วย (เช่น todo ถูกลบไปแล้วจากอีกแท็บ) แต่ไม่ return
    // toast error จะได้ขึ้นทันที ไม่ต้องรอ refetch
    onError: (error, variables) => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      onError?.(error, variables);
    },
  });
}

// mutate(id)
export function useDeleteTodo({ onSuccess, onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        await deleteTodo(id);
      } catch (error) {
        // ถูกลบไปแล้ว (เช่น จากอีกแท็บ) ผลเหมือนลบสำเร็จ จึงไม่ถือเป็น error
        // เช็คด้วย code ของ API ไม่ใช้ message
        if (error.code !== 'TODO_NOT_FOUND') {
          throw error;
        }
      }
    },
    onSuccess: (data, id) => {
      // ลบ cache ของ todo ตัวนั้นก่อน แล้วค่อย invalidate ที่เหลือ
      // ไม่อย่างนั้นหน้า edit ที่ยังเปิดอยู่จะ refetch ได้ 404 แล้ว redirect
      // พร้อม toast "Task not found" ซ้อนกับ "Task deleted"
      queryClient.removeQueries({ queryKey: todoKeys.detail(id) });
      // เรียกก่อน refetch: toast และการปิด dialog จะได้เกิดทันที
      onSuccess?.(data, id);
      return queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
    onError: (error, id) => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      onError?.(error, id);
    },
  });
}
