import {
  differenceInHours,
  differenceInMinutes,
  format,
  isThisYear,
  isYesterday,
} from 'date-fns';

// เวลาแบบสั้นในแถวของรายการ ตามดีไซน์:
// ไม่ถึงหนึ่งวัน "Just now" / "5m ago" / "2h ago", เมื่อวาน "Yesterday",
// เก่ากว่านั้น "Oct 11" และถ้าเป็นปีอื่นจะต่อท้ายด้วยปี "Oct 11, 2025"
export function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  if (minutes < 1) {
    return 'Just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = differenceInHours(now, date);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return formatDate(isoString);
}

// วันที่อย่างเดียว "Oct 11" ถ้าเป็นปีอื่นต่อท้ายด้วยปี "Oct 11, 2025"
// ใช้ใน "Created Oct 10" ของหน้า edit
export function formatDate(isoString) {
  const date = new Date(isoString);
  return format(date, isThisYear(date) ? 'MMM d' : 'MMM d, yyyy');
}
