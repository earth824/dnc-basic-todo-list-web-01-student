// header ด้านบนของทุกหน้า มีโลโก้ที่กดแล้วกลับไปหน้ารายการ
import { Link } from 'react-router';

import logo from '@/assets/devnest-icon-light.png';

export default function AppHeader() {
  return (
    <header className="border-b border-gray-200 px-4 py-3">
      <Link to="/todos">
        <img src={logo} alt="DevNest Todo" width={41} height={28} />
      </Link>
    </header>
  );
}
