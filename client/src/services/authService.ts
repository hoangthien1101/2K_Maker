import { api } from './api';
import { User } from '../types';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export const authService = {
  login: async (identifier: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { identifier, password });
    if (res.data?.token) {
      localStorage.setItem('2k_maker_token', res.data.token);
      localStorage.setItem('2k_maker_user', JSON.stringify(res.data.user));
    }
    return res;
  },

  getMe: async () => {
    return api.get<{ success: boolean; data: User }>('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('2k_maker_token');
    localStorage.removeItem('2k_maker_user');
  },

  getCurrentUser: (): User | null => {
    const str = localStorage.getItem('2k_maker_user');
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  },

  getToken: () => localStorage.getItem('2k_maker_token'),
};

