// กล่องยืนยันการลบ todo ยังไม่ถูก render นักเรียนเลือกเองว่าจะเปิดจากเมนู ⋯ และหน้า Edit อย่างไร
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

export default function DeleteTodoDialog() {
  return (
    <AlertDialog>
      <AlertDialogContent className="data-[size=default]:sm:max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "Draft project brief"?</AlertDialogTitle>
          <AlertDialogDescription>
            This task will be permanently removed. This can't be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive-solid">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
