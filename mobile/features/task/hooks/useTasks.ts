import { useState } from 'react';
import { Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, fetchTasksApi, addTaskApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';

export function useTasks() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasksApi,
  });

  const addMutation = useMutation({
    mutationFn: addTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
    onError: () => {
      Alert.alert('Error', 'Failed to add task');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) => updateTaskApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setEditingTaskId(null);
    },
    onError: () => {
      Alert.alert('Error', 'Failed to update task');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error('Failed to delete task', error);
    },
  });

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Notice', 'Please enter a task title');
      return;
    }
    addMutation.mutate({ title, description, completed: false });
  };

  const handleToggleTask = (task: Task) => {
    updateMutation.mutate({
      id: task.id as number,
      data: { ...task, completed: !task.completed },
    });
  };

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id as number);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = (task: Task) => {
    updateMutation.mutate({
      id: task.id as number,
      data: { ...task, title: editTitle, description: editDescription },
    });
  };

  const handleDeleteTask = (id: number) => {
    deleteMutation.mutate(id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return {
    filteredTasks,
    filter,
    setFilter,
    title,
    setTitle,
    description,
    setDescription,
    editingTaskId,
    setEditingTaskId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    handleAddTask,
    handleToggleTask,
    handleStartEdit,
    handleSaveEdit,
    handleDeleteTask,
  };
}