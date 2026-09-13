import { apiClient } from '@/core/api/apiClient';

export async function createApi(taskData: {
  title: string;
  description?: string;
  completed?: boolean;
}) {
  const response = await apiClient('/tasks/', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to create task');
  }

  return data;
}