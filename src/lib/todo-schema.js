import { z } from 'zod';

// ใช้ร่วมกันทั้งฟอร์ม New และ Edit
// trim() ทำให้ค่าที่ได้ตอน submit ตัดช่องว่างหัวท้ายแล้ว และ "   " ถือว่าว่าง
export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or fewer'),
  completed: z.boolean(),
});
