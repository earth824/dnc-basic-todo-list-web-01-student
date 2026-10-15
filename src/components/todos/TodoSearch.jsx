// ช่องค้นหา todo ตามชื่อ อยู่ใน header ของหน้ารายการ
import { useEffect, useRef, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useDebounce } from '@/hooks/use-debounce';

export default function TodoSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';

  // ค่าที่พิมพ์อยู่ใน state ทันที แต่เขียนลง URL (และเรียก API) หลังหยุดพิมพ์ 150ms
  const [value, setValue] = useState(urlQuery);
  const debouncedValue = useDebounce(value, 150);

  // q ใน URL เปลี่ยนจากที่อื่น (Clear filters, ปุ่ม Back) ให้ช่องค้นหาเปลี่ยนตาม
  // ปรับ state ระหว่าง render แทน useEffect เพื่อไม่ให้ render ค่าเก่าก่อนหนึ่งรอบ
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setValue(urlQuery);
  }

  // effect นี้ทำงานทุกครั้งที่ URL เปลี่ยนด้วย เพราะ setSearchParams เปลี่ยนตาม URL
  // จึงจำค่าที่เขียนไปล่าสุดไว้ และเขียนเฉพาะตอน debouncedValue เปลี่ยนจริง
  // ไม่อย่างนั้นกด Clear filters แล้วคำค้นเก่า (ที่ยังไม่ครบ 150ms) จะถูกเขียนกลับเข้าไป
  const lastWrittenRef = useRef(debouncedValue);
  useEffect(() => {
    if (debouncedValue === lastWrittenRef.current) {
      return;
    }
    lastWrittenRef.current = debouncedValue;

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedValue) {
          next.set('q', debouncedValue);
        } else {
          next.delete('q');
        }
        return next;
      },
      // ไม่เพิ่ม history ทุกครั้งที่พิมพ์ กด Back จะได้ไม่ต้องย้อนทีละคำ
      { replace: true },
    );
  }, [debouncedValue, setSearchParams]);

  return (
    <InputGroup className="max-w-90">
      <InputGroupInput
        type="search"
        placeholder="Search tasks…"
        aria-label="Search tasks"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
