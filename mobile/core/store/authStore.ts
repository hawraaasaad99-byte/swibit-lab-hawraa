import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const getStoredToken = () => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  return window.localStorage.getItem('userToken');
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  setToken: (token) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (token) {
        window.localStorage.setItem('userToken', token);
      } else {
        window.localStorage.removeItem('userToken');
      }
    }
    set({ token, isAuthenticated: !!token });
  },

  logout: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('userToken');
    }
    set({ token: null, isAuthenticated: false });
  },
}));