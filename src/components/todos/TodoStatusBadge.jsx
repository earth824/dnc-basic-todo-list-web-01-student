// ป้ายสถานะของ todo (Pending / Completed) ในแต่ละแถวของรายการ
import { Badge } from '@/components/ui/badge';

export default function TodoStatusBadge({ completed }) {
  return completed ? (
    <Badge variant="completed">Completed</Badge>
  ) : (
    <Badge variant="pending">Pending</Badge>
  );
}
