// ค่าใน URL ของหน้ารายการ (?status=&q=&sort=) และการแปลงเป็น params ของ API

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All', title: 'All tasks' },
  { value: 'pending', label: 'Pending', title: 'Pending tasks' },
  { value: 'completed', label: 'Completed', title: 'Completed tasks' },
];

// ค่าที่ไม่อยู่ในรายการ (เช่น ?status=done) ถือว่าไม่ได้ใส่ จึงเป็น 'all'
export function parseStatus(value) {
  return STATUS_OPTIONS.some((option) => option.value === value)
    ? value
    : 'all';
}

// API รับ completed=true|false ส่วน 'all' ไม่ส่ง completed เลย
export function statusToCompleted(status) {
  if (status === 'all') {
    return undefined;
  }
  return status === 'completed';
}

// API ไม่กรองเมื่อ q ว่างหรือมีแต่ช่องว่าง แปลงให้เป็น undefined ค่าเดียว
// query key ของ "ไม่ได้ค้นหา" จะได้เป็นตัวเดียวกันเสมอ
export function parseQuery(value) {
  return value?.trim() || undefined;
}

// ตัวเลือก sort ตามดีไซน์ 4 ตัว ไม่มีการเรียงตาม title แม้ API จะรองรับ
// value อยู่ในรูป "field:order" แบบเดียวกับใน URL
export const SORT_GROUPS = [
  {
    label: 'Created at',
    options: [
      { value: 'createdAt:desc', label: 'Newest first' },
      { value: 'createdAt:asc', label: 'Oldest first' },
    ],
  },
  {
    label: 'Updated at',
    options: [
      { value: 'updatedAt:desc', label: 'Recently updated' },
      { value: 'updatedAt:asc', label: 'Least recently updated' },
    ],
  },
];

export const DEFAULT_SORT = 'createdAt:desc';

const SORT_STORAGE_KEY = 'devnest-todo:sort';

function isSortOption(value) {
  return SORT_GROUPS.some((group) =>
    group.options.some((option) => option.value === value),
  );
}

// localStorage อาจอ่านหรือเขียนไม่ได้ (เช่น ปิด storage ไว้) จึงห่อด้วย try/catch
// แล้วถือว่าไม่มีค่าที่จำไว้ ค่าที่อ่านได้ต้องเช็คก่อนใช้ เพราะผู้ใช้แก้เองได้
export function readStoredSort() {
  try {
    const value = localStorage.getItem(SORT_STORAGE_KEY);
    return isSortOption(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

export function storeSort(value) {
  try {
    localStorage.setItem(SORT_STORAGE_KEY, value);
  } catch {
    // จำไม่ได้ก็ไม่เป็นไร sort ยังอยู่ใน URL
  }
}

// ค่าใน URL ที่ไม่อยู่ใน 4 ตัวเลือก (เช่น title:asc) ถือว่าไม่ได้ใส่
export function parseSort(value) {
  return isSortOption(value) ? value : undefined;
}

// "updatedAt:desc" → { sortBy: 'updatedAt', order: 'desc' } ตามชื่อ param ของ API
export function sortToParams(sort) {
  const [sortBy, order] = sort.split(':');
  return { sortBy, order };
}
