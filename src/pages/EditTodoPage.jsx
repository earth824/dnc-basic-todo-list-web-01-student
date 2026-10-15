// หน้าแก้ไข todo (/todos/:id)
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import FormPageHeader from '@/components/layout/FormPageHeader';
import EditTodoForm from '@/components/todos/EditTodoForm';
import TodoListError from '@/components/todos/TodoListError';
import { toast } from '@/components/ui/toast';
import { useTodo } from '@/hooks/use-todos';

export default function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  // id ต้องเป็นจำนวนเต็มบวก เช่น "abc", "0" หรือ "1.5" ไม่ต้องถาม API ก็รู้ว่าไม่เจอ
  const isValidId = /^[1-9]\d*$/.test(id);
  const { data: todo, error, refetch } = useTodo(id, { enabled: isValidId });

  // เช็คจาก error แม้จะมี data อยู่แล้ว: ถ้า todo ถูกลบจากอีกแท็บ refetch จะได้ 404 แล้วออกจากหน้านี้
  // VALIDATION_ERROR คือ id ที่ผ่าน regex แต่ API ไม่รับ (เช่น ยาวเกิน) ก็ถือว่าไม่เจอ
  // ไม่อย่างนั้นจะได้หน้า error ที่กด Retry กี่ครั้งก็ได้ผลเดิม
  const isNotFound =
    !isValidId ||
    error?.code === 'TODO_NOT_FOUND' ||
    error?.code === 'VALIDATION_ERROR';

  useEffect(() => {
    if (!isNotFound) {
      return;
    }
    // ถ้าเปิดแอปครั้งแรกด้วย URL นี้ effect นี้จะทำงานก่อน Toaster พร้อมรับ toast
    // (React รัน effect ของลูกก่อนของพ่อ) toast จะหายไปเฉย ๆ จึงรอให้ effect รอบนี้ทำงานครบก่อน
    const timeoutId = setTimeout(() => {
      toast.add({ type: 'error', title: 'Task not found' });
      // replace: กด Back แล้วจะไม่กลับมาที่ URL ที่ใช้ไม่ได้อีก
      navigate('/todos', { replace: true });
    }, 0);
    // StrictMode เรียก effect สองรอบตอน dev cleanup ยกเลิกรอบแรกไว้ toast จึงไม่ขึ้นซ้ำ
    return () => clearTimeout(timeoutId);
  }, [isNotFound, navigate]);

  // ไม่แสดงอะไรระหว่างโหลดครั้งแรก (API อยู่ในเครื่องจึงโหลดเร็ว)
  // และตอนไม่เจอ เพราะ effect ด้านบนกำลังพาออกจากหน้า
  let content = null;
  if (!isNotFound && todo) {
    content = <EditTodoForm todo={todo} />;
  } else if (!isNotFound && error) {
    // network error ไม่ redirect ให้กด Retry แทน
    content = <TodoListError onRetry={() => refetch()} />;
  }

  return (
    <div className="flex min-h-svh flex-col">
      <FormPageHeader />
      <main className="mt-9 px-4">{content}</main>
    </div>
  );
}
