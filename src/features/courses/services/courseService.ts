import api from '@/services/api';
import { Course, CourseFilters, CourseProgress } from '../types/course.types';
import { ApiResponse, PaginatedResponse } from '@/types/global.types';

export const courseService = {
  getCourses: (filters?: CourseFilters) =>
    api.get<PaginatedResponse<Course>>('/courses', { params: filters }),

  getCourse: (uuid: string) =>
    api.get<ApiResponse<Course>>(`/courses/${uuid}`),

  getMyCourses: () =>
    api.get<ApiResponse<Course[]>>('/my-courses'),

  getCourseProgress: (uuid: string) =>
    api.get<ApiResponse<CourseProgress>>(`/courses/${uuid}/progress`),

  enroll: (uuid: string) =>
    api.post<ApiResponse<any>>(`/courses/${uuid}/enroll`),
};
