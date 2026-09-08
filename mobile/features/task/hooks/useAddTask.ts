import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTaskApi } from '../api/taskApi';

export function useAddTask() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addMutation = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
    onError: () => Alert.alert('Error', 'Failed to add task'),
  });

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Notice', 'Please enter a task title');
      return;
    }
    addMutation.mutate({ title, description, completed: false });
  };

  return { title, setTitle, description, setDescription, handleAddTask };
}