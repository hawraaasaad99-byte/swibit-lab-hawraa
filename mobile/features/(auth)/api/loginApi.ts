import { apiClient } from '@/core/api/apiClient';

export async function loginApi(email: string, password: string) {
  const formData = new URLSearchParams();

  formData.append('username', email);
  formData.append('password', password);

  const response = await apiClient('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'An error occurred while connecting to the server'
    );
  }

  return data;
}