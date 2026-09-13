import { apiClient } from '@/core/api/apiClient';

export async function signupApi(userData: any) {
  const response = await apiClient('/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || 'An error occurred during sign up'
    );
  }

  return data;
}