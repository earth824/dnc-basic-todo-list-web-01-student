// โลโก้ DevNest ที่มุมซ้ายของ header สลับรูปตามธีม
import iconDark from '@/assets/devnest-icon-dark.png';
import iconLight from '@/assets/devnest-icon-light.png';
import { Link } from 'react-router';

// รูปต้นฉบับ 1024×700 ย่อให้สูง 28px ตามดีไซน์ ใส่ขนาดไว้ header จะได้ไม่ขยับตอนรูปโหลด
export default function AppLogo() {
  return (
    <Link to="/">
      <img
        src={iconLight}
        alt="DevNest Todo"
        width={41}
        height={28}
        className="dark:hidden"
      />
      <img
        src={iconDark}
        alt="DevNest Todo"
        width={41}
        height={28}
        className="hidden dark:block"
      />
    </Link>
  );
}
