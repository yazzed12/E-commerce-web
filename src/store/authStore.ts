import { create } from 'zustand';
import Cookies from 'js-cookie';
import api from '../services/api';
import { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setAuth: (token, user) => {
    Cookies.set('token', token, { expires: 7 }); // expires in 7 days
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = Cookies.get('token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null });
      return;
    }
    
    try {
      // Decode JWT token to get user id (not strictly implemented like this in Route API, 
      // but usually the token is valid, we'd verify token endpoint. For now, we will just assume valid token 
      // is authenticated unless API call fails later)
      set({ token, isLoading: false, isAuthenticated: true });
    } catch (error) {
      Cookies.remove('token');
      set({ isLoading: false, isAuthenticated: false, user: null, token: null });
    }
  }
}));
