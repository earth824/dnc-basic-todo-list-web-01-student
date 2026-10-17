// หนึ่งแถวในรายการ: checkbox สลับสถานะ, ชื่อ task ที่กดแล้วไปหน้าแก้ไข และปุ่มลบ
import { Link } from 'react-router';

export default function TodoItem() {
  return (
    <li className="flex items-center gap-3 py-2">
      <input type="checkbox" />
      <Link to="/todos/1" className="flex-1">
        Buy milk
      </Link>
      <button type="button" className="text-red-600 disabled:opacity-50">
        Delete
      </button>
    </li>
  );
}
