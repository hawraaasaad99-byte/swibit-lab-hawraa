import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  
  // Set token after successful login
  setToken: async (token) => {
    await SecureStore.setItemAsync('userToken', token);
    set({ token, isAuthenticated: true });
  },

  // Load token on app startup
  loadToken: async () => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },

  // Logout and clear token
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken');
    set({ token: null, isAuthenticated: false });
  },
}));