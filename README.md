# DevNest Todo

หน้าเว็บของแอปจัดการรายการสิ่งที่ต้องทำ (Todo) ทำด้วย React สำหรับฝึกเชื่อมต่อกับ [Basic Todo API](https://github.com/earth824/dnc-basic-todo-list-api-01-student)

repo นี้เป็น **template** ที่มีแค่หน้าตา (UI) ยังไม่มีข้อมูลจริง และปุ่มที่ต้องใช้ข้อมูลหรือเปลี่ยนหน้ายังไม่ทำงาน งานของเราคือทำให้มันใช้งานได้จริงโดยดึงข้อมูลจาก API

## เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) เวอร์ชัน 24 ขึ้นไป (เช็กด้วย `node -v`)
- [pnpm](https://pnpm.io/) (ถ้ายังไม่มี ติดตั้งด้วย `npm install -g pnpm`)
- [Basic Todo API](https://github.com/earth824/dnc-basic-todo-list-api-01-student) ที่รันอยู่บนเครื่องที่ `http://localhost:3000` (ดูวิธีรันใน README ของ repo นั้น)

### ติดตั้งและรัน

```bash
git clone https://github.com/earth824/dnc-basic-todo-list-web-01-student.git
cd dnc-basic-todo-list-web-01-student
pnpm install       # ติดตั้ง dependency
pnpm dev           # เปิดเว็บที่ http://localhost:5173
```

**เว็บต้องรันที่ port 5173** เพราะ API อนุญาต CORS ให้ port นี้เท่านั้น ถ้า Vite รันที่ port อื่น (เช่น 5174) แปลว่า port 5173 ถูกใช้อยู่ ส่วนใหญ่เป็นเว็บที่รันค้างไว้อีกหน้าต่างหนึ่ง ให้ปิดตัวนั้นก่อน หรือดูวิธีอื่นในหัวข้อ "เชื่อมต่อจาก React (Vite)" ใน README ของ API

### คำสั่งอื่นที่ใช้บ่อย

| คำสั่ง         | ใช้เมื่อ                                                      |
| -------------- | ------------------------------------------------------------- |
| `pnpm build`   | build เว็บไว้ใน `dist/` เพื่อเช็กว่าโค้ดไม่มี error ตอน build |
| `pnpm preview` | เปิดเว็บที่ build แล้วดู                                      |
| `pnpm lint`    | ตรวจโค้ดด้วย ESLint                                           |
| `pnpm format`  | จัดรูปแบบโค้ดใน `src/` ด้วย Prettier                          |

## ใน template มีอะไรบ้าง

```
src/
├── main.jsx          จุดเริ่มของแอป ห่อด้วยตัวจัดการธีมและ toast
├── App.jsx           เลือกว่าจะแสดงหน้าไหน
├── index.css         Tailwind และสีของธีม light / dark
├── assets/           โลโก้
├── hooks/            useTheme()
├── lib/utils.js      cn() สำหรับรวม className
├── pages/            TodoListPage, NewTodoPage, EditTodoPage
└── components/
    ├── layout/       header, โลโก้, ปุ่มสลับธีม
    ├── todos/        ทุกส่วนที่เกี่ยวกับ Todo
    └── ui/           component ของ shadcn/ui
```

บรรทัดแรกของทุกไฟล์ใน `pages/` และ `components/` (ยกเว้น `ui/`) มี comment บอกว่า component นั้นคือส่วนไหนของหน้าจอ

### สลับหน้า

ยังไม่มี router จะดูหน้าไหนให้แก้ `pages.list` ใน `src/App.jsx` เป็น `pages.new` (หน้าสร้าง) หรือ `pages.edit` (หน้าแก้ไข) แล้วบันทึกไฟล์

### สิ่งที่ต้องทำต่อ

- **ข้อมูลจริง:** `TodoList` แสดง `<TodoItem />` ซ้ำ 8 แถวที่หน้าตาเหมือนกันหมด component ของ Todo ยังไม่มี props หรือ state
- **ปุ่มและลิงก์:** ยังไม่ทำอะไร
  - หน้ารายการ: New task, checkbox, Retry และ Clear filters
  - เมนู ⋯ ของแต่ละแถว: Edit, Mark completed และ Delete
  - หน้าฟอร์ม: Back to tasks, Cancel, Create task, Save changes และ Delete
  - ปุ่ม Delete และ Discard ใน dialog
- **ค้นหา กรอง และเรียง:** ช่องค้นหา ตัวกรองสถานะ และเมนู Sort ยังไม่มีผลกับรายการ
- **component ที่สร้างไว้แล้วแต่ยังไม่ได้แสดง:** เลือกเองว่าจะแสดงเมื่อไร
  - `TodoListSkeleton`: ระหว่างโหลดข้อมูล
  - `TodoListError`: โหลดข้อมูลไม่สำเร็จ
  - `TodoListEmpty`: ยังไม่มี Todo เลย
  - `TodoListNoResults`: ค้นหาหรือกรองแล้วไม่เจอ
  - `DeleteTodoDialog`: ยืนยันก่อนลบ
  - `DiscardChangesDialog`: ยืนยันก่อนทิ้งสิ่งที่แก้ในฟอร์ม

### คำศัพท์

| บนหน้าจอ  | ในโค้ดและ API      |
| --------- | ------------------ |
| Task      | Todo               |
| Pending   | `completed: false` |
| Completed | `completed: true`  |

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) เขียนด้วย JavaScript (JSX)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) บน [Base UI](https://base-ui.com/) และไอคอนจาก [lucide-react](https://lucide.dev/)

ถ้าจะเพิ่ม component ของ shadcn ให้ใช้คำสั่ง `pnpm dlx shadcn@latest add <ชื่อ component>`

shadcn ใน template นี้ใช้ Base UI ไม่ใช่ Radix ตัวอย่างในเน็ตส่วนใหญ่เขียนแบบ Radix ซึ่งใช้ `asChild` แต่ Base UI ใช้ prop `render` แทน เช่น

```jsx
<DropdownMenuTrigger render={<Button variant="outline" />}>
  Sort
</DropdownMenuTrigger>
```

toast ก็เช่นกัน template ใช้ component `toast` ของ shadcn บน Base UI ไม่ใช่ sonner ที่เห็นในตัวอย่างส่วนใหญ่ ตัวแสดง toast ติดตั้งไว้ใน `main.jsx` แล้ว เรียกใช้แบบนี้

```jsx
import { toast } from '@/components/ui/toast';

toast.add({ title: 'Task created' });
```

## เฉลย

เฉลยอยู่ใน branch `solution` ของ repo นี้ ลองทำเองให้สุดก่อนแล้วค่อยเปิดดู

```bash
git switch solution    # ไปดูเฉลย
git switch main        # กลับมาที่งานของเรา
git diff main solution # ดูว่าเฉลยต่างจากงานของเราตรงไหน
```

- commit งานของเราก่อนสลับ branch ทุกครั้ง ไม่อย่างนั้น git อาจไม่ยอมให้สลับ
- รัน `pnpm install` ทุกครั้งหลังสลับ branch เพราะเฉลยใช้ library มากกว่า template

### รับเนื้อหาใหม่จากผู้สอน

ถ้าผู้สอนแจ้งว่ามีการอัปเดต ให้ commit งานของเราก่อน แล้วรันคำสั่งนี้ใน branch ที่ต้องการอัปเดต (`main` หรือ `solution`)

```bash
git pull --no-rebase
```

ถ้าเราแก้ไฟล์เดียวกับที่ผู้สอนอัปเดต git จะแจ้ง conflict ให้เลือกเองว่าจะเก็บส่วนไหน
