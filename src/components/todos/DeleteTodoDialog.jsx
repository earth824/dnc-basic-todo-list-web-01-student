// กล่องยืนยันการลบ todo เปิดจากเมนู ⋯ ในรายการ และปุ่ม Delete ในหน้า Edit
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// ผู้เรียกถือ state เปิด/ปิด และ mutation เอง เพราะหลังลบสำเร็จแต่ละหน้าทำต่างกัน
// (รายการอยู่หน้าเดิม ส่วนหน้า edit กลับไปหน้ารายการ)
export default function DeleteTodoDialog({
  title,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}) {
  return (
    <AlertDialog
      open={open}
      // ระหว่างลบห้ามปิด (เช่น กด Esc) ไม่อย่างนั้นผู้ใช้จะไม่รู้ว่าลบสำเร็จหรือไม่
      onOpenChange={(nextOpen) => {
        if (!isDeleting) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent className="data-[size=default]:sm:max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{title}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This task will be permanently removed. This can't be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive-solid"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
