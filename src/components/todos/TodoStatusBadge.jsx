// ป้ายสถานะของ todo (Pending / Completed) ในแต่ละแถวของรายการ
import { Badge } from '@/components/ui/badge';

export default function TodoStatusBadge({ completed }) {
  return (
    <Badge variant={completed ? 'completed' : 'pending'}>
      {completed ? 'Completed' : 'Pending'}
    </Badge>
  );
}
