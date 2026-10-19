import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';

export function useTodos(params) {
  return useQuery({
    queryKey: ['todos', params], // { key: value } ==> { ["todos"]: data return from queryFn}
    queryFn: async () => {
      const res = await apiClient.get('/todos', {
        params,
      });
      return res.data;
    },
    // staleTime: 60000,
    // gcTime: 15000,
    retry: 0,
  });
}

export function useTodo(id) {
  return useQuery({
    queryKey: ['todos', id], // ["todos", "14"]
    queryFn: async () => {
      const res = await apiClient.get(`/todos/${id}`);
      return res.data; // success: res.data
    },
    // staleTime: 30000,
  });
}
