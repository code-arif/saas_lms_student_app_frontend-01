import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { ROUTES } from '../../../constants/routes';

export const useAuth = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      loginStore(response.data.token, response.data.user);
      navigate(ROUTES.DASHBOARD);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      loginStore(response.data.token, response.data.user);
      navigate(ROUTES.DASHBOARD);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutStore();
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
