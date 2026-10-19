import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await apiClient.delete(`/todos/${id}`);
    }, // this function will call: deleteMutation.mutate()
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
}

export function useUpdateTodo({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }) => apiClient.patch(`/todos/${id}`, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      onSuccess?.();
    },
  });
}

export function useCreateTodo({ onSuccess } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input) => apiClient.post('/todos', input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      onSuccess?.();
    },
  });
}
