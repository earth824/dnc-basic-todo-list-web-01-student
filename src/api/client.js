import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
});

// แปลง error ของ axios ทุกตัวเป็น object รูปเดียวกับ error ของ API
// { status, code, message, details } component จึงเช็ค error.code ได้เลย
// network error (API ไม่ได้รัน หรือ CORS ไม่ผ่าน) ไม่มี response ให้อ่าน
// จึงใช้ code ของเราเองคือ NETWORK_ERROR และ status เป็น 0
function toApiError(error) {
  if (!error.response) {
    return {
      status: 0,
      code: 'NETWORK_ERROR',
      message:
        'Cannot reach the API. Make sure it is running and this app is on port 5173.',
      details: [],
    };
  }

  const { status, data } = error.response;
  return {
    status,
    code: data?.code ?? 'HTTP_ERROR',
    message: data?.message ?? error.message,
    details: data?.details ?? [],
  };
}

apiClient.interceptors.response.use(undefined, (error) => {
  // request ที่ถูกยกเลิก (เช่น TanStack Query ยกเลิกคำค้นเก่า) ไม่ใช่ error ของ API
  // ส่งต่อตามเดิมเพื่อให้ TanStack Query รู้ว่าถูกยกเลิก
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  return Promise.reject(toApiError(error));
});
