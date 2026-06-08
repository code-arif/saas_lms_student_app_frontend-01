import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { ApiResponse } from '@/types/global.types';

export interface DashboardStats {
  enrolled_courses: number;
  completed_courses: number;
  total_lessons_completed: number;
  learning_hours: number;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get<ApiResponse<DashboardStats>>('/dashboard/stats').then(res => res.data),
  });
};

export const useRecentCourses = () => {
  return useQuery({
    queryKey: ['recent-courses'],
    queryFn: () => api.get<ApiResponse<any[]>>('/dashboard/recent-courses').then(res => res.data),
  });
};
