# DevNest Todo

หน้าเว็บของแอปจัดการรายการสิ่งที่ต้องทำ (Todo) ทำด้วย React สำหรับฝึกใช้ **React Query** และ **React Hook Form** กับ [Basic Todo API](https://github.com/earth824/dnc-basic-todo-list-api-01-student)

repo นี้เป็น **template** ที่มีหน้าตา (UI) ครบสามหน้าและเปลี่ยนหน้าได้แล้ว แต่ยังไม่มีข้อมูลจริง งานของเราคือดึงข้อมูลจาก API มาแสดง และทำให้ฟอร์มกับปุ่มต่าง ๆ ใช้งานได้

## เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

- [Node.js](https://nodejs.org/) เวอร์ชัน 24 ขึ้นไป (เช็กด้วย `node -v`)
- [pnpm](https://pnpm.io/) (ถ้ายังไม่มี ติดตั้งด้วย `npm install -g pnpm`)
- [Basic Todo API](https://github.com/earth824/dnc-basic-todo-list-api-01-student) ที่รันอยู่บนเครื่องที่ `http://localhost:3000` (ดูวิธีรันใน README ของ repo นั้น)

### ติดตั้งและรัน

```bash
git clone -b simple-main https://github.com/earth824/dnc-basic-todo-list-web-01-student.git
cd dnc-basic-todo-list-web-01-student
pnpm install            # ติดตั้ง dependency
cp .env.example .env    # สร้างไฟล์ .env (ทำครั้งเดียว)
pnpm dev                # เปิดเว็บที่ http://localhost:5173
```

repo นี้มีสองเวอร์ชัน `-b simple-main` คือเวอร์ชันที่เราใช้ (ถ้า clone ไปแล้วโดยไม่ใส่ ให้รัน `git switch simple-main`) ส่วน `main` และ `solution` เป็นเวอร์ชันเก่าที่ใช้ shadcn ไม่ต้องสนใจ

ถ้าเคย clone repo นี้ไว้แล้ว (เวอร์ชันเก่า) ไม่ต้อง clone ใหม่ commit งานเดิมก่อน แล้วรันคำสั่งนี้ในโฟลเดอร์เดิม งานเดิมยังอยู่ใน `main` เหมือนเดิม

```bash
git fetch                # ดึง branch ใหม่จาก GitHub
git switch simple-main   # สลับมาเวอร์ชันนี้
pnpm install
cp .env.example .env
```

**อย่าลืมสร้างไฟล์ `.env`** ในไฟล์นี้มี `VITE_API_URL` ที่บอกว่า API อยู่ที่ไหน ถ้าไม่มีไฟล์นี้ request จะไม่ได้ไปที่ API แต่ไปที่ Vite แทน แล้วได้ HTML กลับมาโดยไม่มี error ให้เห็น อาการที่เจอคือ error แปลก ๆ เช่น `data.map is not a function` ถ้าสร้าง `.env` ตอนที่ `pnpm dev` รันอยู่ Vite จะ restart ให้เอง

**เว็บต้องรันที่ port 5173** เพราะ API อนุญาต CORS ให้ port นี้เท่านั้น ถ้า Vite รันที่ port อื่น (เช่น 5174) แปลว่า port 5173 ถูกใช้อยู่ ส่วนใหญ่เป็นเว็บที่รันค้างไว้อีกหน้าต่างหนึ่ง ให้ปิดตัวนั้นก่อน

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
├── main.jsx               จุดเริ่มของแอป render <App />
├── App.jsx                render <RouterProvider />
├── router.jsx             route ของทั้งสามหน้า
├── index.css              Tailwind
├── api/client.js          apiClient: axios ที่ตั้ง baseURL จาก VITE_API_URL แล้ว
├── assets/                โลโก้
├── pages/
│   ├── TodoListPage.jsx   /todos       รายการ task และตัวกรองสถานะ
│   ├── NewTodoPage.jsx    /todos/new   ฟอร์มสร้าง task
│   └── EditTodoPage.jsx   /todos/:id   ฟอร์มแก้ไข task
└── components/
    ├── AppHeader.jsx      header ที่มีโลโก้
    └── TodoItem.jsx       หนึ่งแถวในรายการ
```

- ลิงก์ทุกตัวเปลี่ยนหน้าได้แล้ว แต่ปุ่ม (Delete, Create, Save) และ checkbox ยังไม่ทำอะไร
- `TodoListPage` แสดง `<TodoItem />` ซ้ำ 3 แถวที่เหมือนกันหมด ชื่อ task ทุกแถวลิงก์ไป `/todos/1`
- ตัวกรอง All / Pending / Completed เปลี่ยน URL เป็น `?status=pending` หรือ `?status=completed` แล้ว แต่รายการยังไม่เปลี่ยนตาม
- library ที่ต้องใช้ติดตั้งไว้ใน `package.json` ครบแล้ว: react-router, axios, @tanstack/react-query, react-hook-form, zod และ @hookform/resolvers

## บทเรียน

ทำตามลำดับ แต่ละบทต่อจากบทก่อนหน้า ข้อความที่ต้องแสดงบนหน้าจอเขียนไว้ในแต่ละบทแล้ว ทุกบทเรียก API ผ่าน `apiClient` จาก `@/api/client` เช่น `apiClient.get('/todos')`

### บทที่ 1: ตั้ง React Query

- สร้าง `QueryClient` แล้วห่อแอปด้วย `QueryClientProvider` ใน `main.jsx`
- ติดตั้ง `@tanstack/react-query-devtools` เพิ่ม (`pnpm add @tanstack/react-query-devtools`) แล้วใส่ `<ReactQueryDevtools />` ไว้ดู cache ระหว่างเรียน

### บทที่ 2: แสดงรายการ

- ใน `TodoListPage` ใช้ `useQuery` ที่มี `queryFn` เรียก `GET /todos`
- เปลี่ยน `<TodoItem />` ที่ซ้ำ 3 แถวเป็น `.map()` แล้วส่ง todo เข้าไปเป็น props
- ใน `TodoItem` แสดง title จริง ลิงก์ไป `/todos/:id` ของ todo นั้น ติ๊ก checkbox ตาม `completed` และขีดฆ่า title ของ todo ที่เสร็จแล้ว
- แสดงข้อความแทนรายการตามสถานะของ query
  - กำลังโหลด: `Loading...`
  - โหลดไม่ได้: `Could not load tasks.` พร้อมปุ่ม `Try again` ที่โหลดใหม่
  - ไม่มี task: `No tasks.`
- ลองปิด API แล้วเปิดหน้านี้ จะเห็นว่าต้องรอหลายวินาทีกว่าจะขึ้น error เพราะ React Query ลองใหม่ (retry) 3 ครั้งก่อน ดูการลองใหม่ได้ใน devtools แล้วตั้ง `retry: 1` ใน `defaultOptions.queries` ของ `QueryClient` ให้ลองใหม่แค่ครั้งเดียว

### บทที่ 3: กรองตามสถานะ

- อ่าน `status` จาก URL ด้วย `useSearchParams` ของ react-router
- ส่งให้ API เป็น query parameter `completed`: `pending` คือ `completed=false` และ `completed` คือ `completed=true` ถ้าเป็น All ไม่ต้องส่ง
- ใส่ status ลงใน query key ด้วย แล้วลองดูใน devtools ว่าแต่ละตัวกรองมี cache แยกกัน
- ทำให้ลิงก์ตัวกรองที่เลือกอยู่เป็นตัวหนา

### บทที่ 4: สลับสถานะและลบ

- ใน `TodoItem` ใช้ `useMutation` สองตัว
  - checkbox: `PATCH /todos/:id` ส่ง `{ completed }` ค่าใหม่
  - ปุ่ม Delete: `DELETE /todos/:id` ลบทันทีโดยไม่ต้องถาม
- สำเร็จแล้ว invalidate query ของรายการ ให้ React Query โหลดใหม่
- ระหว่างรอ ปิด checkbox และปุ่ม Delete ของแถวนั้น ถ้าพังแสดง `Something went wrong.` สีแดงในแถวนั้น

### บทที่ 5: ฟอร์มสร้าง task

- ใน `NewTodoPage` ใช้ `useForm` ของ React Hook Form คู่กับ zod schema ผ่าน `zodResolver`
- กติกาของ Title: ตัดช่องว่างหัวท้ายก่อน แล้วต้องยาว 1–200 ตัวอักษร ข้อความ error ใต้ช่องคือ `Title is required` และ `Title must be at most 200 characters`
- submit แล้วใช้ `useMutation` เรียก `POST /todos` ส่ง `{ title }` สำเร็จแล้ว invalidate รายการ แล้วไปหน้า `/todos`
- ระหว่างรอ ปิดปุ่ม Create ถ้าพังแสดง `Could not save task.` สีแดงเหนือปุ่ม

### บทที่ 6: ฟอร์มแก้ไข task

- ใน `EditTodoPage` อ่าน `id` จาก URL ด้วย `useParams` แล้วใช้ `useQuery` เรียก `GET /todos/:id` (`useParams` คืน `id` เป็น string เสมอ เช่น `'5'` ไม่ใช่ `5`)
- แสดงตามสถานะของ query
  - กำลังโหลด: `Loading...` แทนฟอร์ม
  - ไม่เจอ task: `Task not found.` พร้อมลิงก์ `Back to tasks` ดูจาก `code` ใน body ของ error response (`error.response.data.code`) ไม่ใช่ `message` ได้แก่ `TODO_NOT_FOUND` (ไม่มี id นี้) และ `VALIDATION_ERROR` (id ผิดรูปแบบ เช่นเปิด `/todos/abc`)
  - โหลดไม่ได้ด้วยเหตุอื่น: `Could not load task.` พร้อมปุ่ม `Try again`
- ใช้ todo ที่โหลดมาเป็นค่าเริ่มต้นของฟอร์ม (`defaultValues`) ทั้ง Title และ checkbox Completed
- submit แล้วเรียก `PATCH /todos/:id` ส่ง `{ title, completed }` สำเร็จแล้วกลับไป `/todos` ปุ่ม Save และข้อความ error ทำแบบเดียวกับบทที่ 5

**คำใบ้:** `defaultValues` ถูกอ่านครั้งเดียวตอนฟอร์มถูกสร้าง ถ้าสร้างฟอร์มก่อนข้อมูลโหลดเสร็จ ฟอร์มจะว่าง ลองแยกฟอร์มเป็น component ที่ render หลังได้ข้อมูลแล้ว

### บทที่ 7: refactor

- ตอนนี้การเรียก axios กระจายอยู่หลายไฟล์ ย้ายทั้งหมดไปเป็นฟังก์ชันใน `src/api/todos.js` เช่น `getTodos`, `getTodo`, `createTodo`, `updateTodo` และ `deleteTodo`
- ใน `queryFn` และ `mutationFn` เรียกฟังก์ชันเหล่านี้แทน แล้วลองคิดว่าทำไมแยกแบบนี้ถึงดีกว่า

## คำศัพท์

| บนหน้าจอ  | ในโค้ดและ API      |
| --------- | ------------------ |
| Task      | Todo               |
| Pending   | `completed: false` |
| Completed | `completed: true`  |

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) เขียนด้วย JavaScript (JSX)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [axios](https://axios-http.com/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/) + [zod](https://zod.dev/)

## เฉลย

เฉลยอยู่ใน branch `simple-solution` ของ repo นี้ หนึ่ง commit ต่อหนึ่งบทเรียน ลองทำเองให้สุดก่อนแล้วค่อยเปิดดู

```bash
git switch simple-solution              # ไปดูเฉลย
git switch simple-main                  # กลับมาที่งานของเรา
git diff simple-main simple-solution    # ดูว่าเฉลยต่างจากงานของเราตรงไหน
git log --oneline simple-solution       # ดู commit ของแต่ละบท
```

- commit งานของเราก่อนสลับ branch ทุกครั้ง ไม่อย่างนั้น git อาจไม่ยอมให้สลับ
- รัน `pnpm install` หลังสลับ branch เพราะเฉลยมี devtools เพิ่มมา

### รับเนื้อหาใหม่จากผู้สอน

ถ้าผู้สอนแจ้งว่ามีการอัปเดต ให้ commit งานของเราก่อน แล้วรันคำสั่งนี้ใน branch ที่ต้องการอัปเดต (`simple-main` หรือ `simple-solution`)

```bash
git pull --no-rebase
```

ถ้าเราแก้ไฟล์เดียวกับที่ผู้สอนอัปเดต git จะแจ้ง conflict ให้เลือกเองว่าจะเก็บส่วนไหน
