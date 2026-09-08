import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { Task, updateTaskApi } from '../api/taskApi';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) => updateTaskApi(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    onError: () => Alert.alert('Error', 'Failed to update task'),
  });

  const handleToggleTask = (task: Task) => {
    updateMutation.mutate({
      id: task.id as number,
      data: { ...task, completed: !task.completed },
    });
  };

  return { updateMutation, handleToggleTask };
}