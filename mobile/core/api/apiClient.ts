import { Alert } from 'react-native';
 import { useAuthStore } from '../store/authStore';
const API_BASE_URL = 'http://localhost:8000';
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
     const token = useAuthStore.getState().token; 
     const headers: Record<string, string> = { 
        'Content-Type': 'application/json', 
        ...(token ? { 'Authorization':` Bearer ${token}` } : {}) };
try { const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
if (response.status === 401) {
  useAuthStore.getState().logout();
  throw new Error('Unauthorized');
}

return response;
} catch (error: any) { console.error('API Client Network Error:', error);
Alert.alert(
  'Connection Error',
  'Unable to connect to the server. Please check if the backend is running.'
);

throw error;
} };