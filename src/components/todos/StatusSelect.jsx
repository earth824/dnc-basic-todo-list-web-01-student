// ตัวเลือกสถานะในฟอร์ม New / Edit: Pending หรือ Completed เลือกได้ครั้งละหนึ่งตัว
import { Field, FieldTitle } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function StatusSelect() {
  return (
    <Field className="gap-2">
      <FieldTitle id="status-select-label">Status</FieldTitle>
      <ToggleGroup
        variant="segmented"
        spacing={1.5}
        aria-labelledby="status-select-label"
        defaultValue={['completed']}
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
