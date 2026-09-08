import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Task, fetchTasksApi } from '../api/taskApi';

export function useTasks() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasksApi,
  });

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return { filteredTasks, filter, setFilter };
}