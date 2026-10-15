// ช่องค้นหา todo ตามชื่อ อยู่ใน header ของหน้ารายการ
import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

export default function TodoSearch() {
  return (
    <InputGroup className="max-w-90">
      <InputGroupInput
        type="search"
        placeholder="Search tasks…"
        aria-label="Search tasks"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
