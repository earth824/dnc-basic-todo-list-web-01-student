// กล่องยืนยันการทิ้งสิ่งที่แก้ เปิดเมื่อออกจากหน้า Edit โดยยังไม่บันทึก
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

// หน้า Edit เปิดกล่องนี้ตาม blocker ของ react-router
// onKeepEditing ยกเลิกการออกจากหน้า ส่วน onDiscard ออกจากหน้าต่อ
export default function DiscardChangesDialog({
  open,
  onKeepEditing,
  onDiscard,
}) {
  return (
    <AlertDialog
      open={open}
      // ปิดด้วย Esc หรือปุ่ม Keep editing เท่ากับอยู่หน้าเดิมต่อ
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onKeepEditing();
        }
      }}
    >
      <AlertDialogContent className="data-[size=default]:sm:max-w-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            Your unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep editing</AlertDialogCancel>
          <AlertDialogAction variant="destructive-solid" onClick={onDiscard}>
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
