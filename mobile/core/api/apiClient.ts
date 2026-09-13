 import { Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = 'http://localhost:8000';

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = useAuthStore.getState().token;

  const headers = new Headers(options.headers);

  // Default header for JSON requests
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add token automatically when available
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error: unknown) {
    console.error('API Client Network Error:', error);

    Alert.alert(
      'Connection Error',
      'Unable to connect to the server. Please check if the backend is running.'
    );

    throw error;
  }

  // Handle expired/invalid authentication
  if (response.status === 401 && token) {
    useAuthStore.getState().logout();
    throw new Error('Unauthorized');
  }

  return response;
};