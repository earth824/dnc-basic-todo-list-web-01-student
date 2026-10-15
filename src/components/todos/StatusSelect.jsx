// ตัวเลือกสถานะในฟอร์ม New / Edit: Pending หรือ Completed เลือกได้ครั้งละหนึ่งตัว
import { Field, FieldTitle } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// ToggleGroup ใช้ค่าเป็น array ส่วนฟอร์มใช้ completed เป็น boolean จึงแปลงไปมาตรงนี้
export default function StatusSelect({ completed, onCompletedChange }) {
  // Base UI ให้กดตัวที่เลือกอยู่ซ้ำเพื่อยกเลิกได้ (ได้ array ว่าง)
  // แต่ todo ต้องมีสถานะเสมอ จึงไม่สนค่าว่าง
  function changeValue(values) {
    if (values.length > 0) {
      onCompletedChange(values[0] === 'completed');
    }
  }

  return (
    <Field className="gap-2">
      <FieldTitle id="status-select-label">Status</FieldTitle>
      <ToggleGroup
        variant="segmented"
        spacing={1.5}
        aria-labelledby="status-select-label"
        value={[completed ? 'completed' : 'pending']}
        onValueChange={changeValue}
        className="w-full"
      >
        <ToggleGroupItem value="pending" className="flex-1">
          <span className="size-2 shrink-0 rounded-full bg-pending-dot" />
          Pending
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" className="flex-1">
          <span className="size-2 shrink-0 rounded-full bg-primary" />
          Completed
        </ToggleGroupItem>
      </ToggleGroup>
    </Field>
  );
}
