import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { User } from '@/types/global.types';
import { ApiResponse } from '@/types/global.types';
import { useAuthStore } from '@/features/auth/store/authStore';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: Partial<User>) => 
      api.patch<ApiResponse<User>>('/profile', data),
    onSuccess: (response) => {
      setUser(response.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUpdateNotificationPreferences = () => {
  return useMutation({
    mutationFn: (data: Record<string, boolean>) =>
      api.put<ApiResponse<{ message: string }>>('/profile/notification-preferences', data),
  });
};

export const useUpdateAvatar = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (formData: FormData) => 
      api.post<ApiResponse<User>>('/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: (response) => {
      setUser(response.data);
    },
  });
};
