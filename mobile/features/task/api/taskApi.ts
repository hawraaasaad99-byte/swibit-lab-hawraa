import { apiClient } from '@/core/api/apiClient';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
}

export async function fetchTasksApi(): Promise<Task[]> {
  const response = await apiClient('/tasks/');

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to fetch tasks');
  }

  return data;
}

export async function addTaskApi(taskData: {
  title: string;
  description?: string;
  completed?: boolean;
}): Promise<Task> {

  const response = await apiClient('/tasks/', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to add task');
  }

  return data;
}

export async function updateTaskApi(
  id: number,
  taskData: Partial<Task>
): Promise<Task> {

  const response = await apiClient(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update task');
  }

  return data;
}

export async function deleteTaskApi(id: number): Promise<void> {

  const response = await apiClient(`/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Failed to delete task');
  }
}