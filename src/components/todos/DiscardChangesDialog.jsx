// กล่องยืนยันการทิ้งสิ่งที่แก้ในหน้า Edit ยังไม่ถูก render นักเรียนเลือกเองว่าจะเปิดเมื่อออกจากหน้าโดยยังไม่บันทึก
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

export default function DiscardChangesDialog() {
  return (
    <AlertDialog>
      <AlertDialogContent className="data-[size=default]:sm:max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive-solid">
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
