import api from '../../../services/api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { ApiResponse } from '../../../types/global.types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return api.post<never, ApiResponse<AuthResponse>>('/auth/login', credentials);
  },
  register: async (credentials: RegisterCredentials) => {
    return api.post<never, ApiResponse<AuthResponse>>('/auth/register', credentials);
  },
  logout: async () => {
    return api.post('/auth/logout');
  },
  me: async () => {
    return api.get<never, ApiResponse<import('../../../types/global.types').User>>('/auth/me');
  },
};
