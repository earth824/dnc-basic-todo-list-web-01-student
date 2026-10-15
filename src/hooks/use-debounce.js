import { useEffect, useState } from 'react';

// คืนค่า value ที่ "นิ่ง" ครบ delay ms แล้ว ถ้า value เปลี่ยนก่อนครบเวลา
// cleanup จะยกเลิก timer เดิมแล้วเริ่มนับใหม่ ค่าที่ได้จึงเปลี่ยนแค่ครั้งเดียวหลังหยุดพิมพ์
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
