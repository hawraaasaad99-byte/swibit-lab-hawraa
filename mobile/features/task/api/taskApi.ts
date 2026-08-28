import { useAuthStore } from '@/core/store/authStore';
const API_BASE_URL = 'http://localhost:8000';
export interface Task { id: number; title: string; description?: string; completed?: boolean; }
export async function fetchTasksApi(): Promise<Task[]> { 
    const token = useAuthStore.getState().token; 
    const response = await fetch(`${API_BASE_URL}/tasks/`, { 
        headers: { 'Authorization': `Bearer ${token}`, }, });
         const data = await response.json();
          if (!response.ok) { throw new Error(data.detail || 'Failed to fetch tasks'); } 
          return data; }
export async function addTaskApi(taskData: {
     title: string; description?: string; completed?: boolean }): Promise<Task> {
         const token = useAuthStore.getState().token; const response = await fetch(`${API_BASE_URL}/tasks/`, {
             method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }, 
             body: JSON.stringify(taskData), });
              const data = await response.json(); 
              if (!response.ok) { throw new Error(data.detail || 'Failed to add task'); } return data; }
export async function updateTaskApi(id: number, taskData: Partial<Task>): 
Promise<Task> { const token = useAuthStore.getState().token; 
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { 
        method: 'PUT', headers: {
             'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
              body: JSON.stringify(taskData), });
               const data = await response.json(); 
               if (!response.ok) { throw new Error(data.detail || 'Failed to update task'); } 
               return data; }
export async function deleteTaskApi(id: number): Promise<void> { 
    const token = useAuthStore.getState().token;
     const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { 
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}`, }, }); 
        if (!response.ok) { 
            const data = await response.json().catch(() => ({})); 
            throw new Error(data.detail || 'Failed to delete task'); } }