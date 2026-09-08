import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTaskApi } from '../api/taskApi';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    onError: (error) => console.error('Failed to delete task', error),
  });

  const handleDeleteTask = (id: number) => deleteMutation.mutate(id);

  return { handleDeleteTask };
}