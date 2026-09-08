import { useState } from 'react';
import { Task } from '../api/taskApi';
import { useUpdateTask } from './useUpdateTask';

export function useTaskEditing() {
  const { updateMutation } = useUpdateTask();
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleStartEdit = (task: Task) => {
    setEditingTaskId(task.id as number);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = (task: Task) => {
    updateMutation.mutate(
      { id: task.id as number, data: { ...task, title: editTitle, description: editDescription } },
      { onSuccess: () => setEditingTaskId(null) }
    );
  };

  return {
    editingTaskId, setEditingTaskId,
    editTitle, setEditTitle,
    editDescription, setEditDescription,
    handleStartEdit, handleSaveEdit,
  };
}