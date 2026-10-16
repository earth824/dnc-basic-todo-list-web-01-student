import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// apiClient.interceptors.response.use(undefined, (error) => {
//   // validate error response
// });

// apiClient.get('/todos') ==> axios.get(`${import.meta.env.VITE_API_URL}/todos`)
