import api from '../../../services/api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { ApiResponse } from '../../../types/global.types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return api.post<ApiResponse<AuthResponse>>('/auth/login', credentials).then(res => res.data);
  },
  register: async (credentials: RegisterCredentials) => {
    return api.post<ApiResponse<AuthResponse>>('/auth/student/register', credentials).then(res => res.data);
  },
  logout: async () => {
    return api.post('/auth/logout');
  },
  me: async () => {
    return api.get<ApiResponse<import('../../../types/global.types').User>>('/auth/me').then(res => res.data);
  },
};
