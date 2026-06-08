import api from '@/services/api';
import { Course, CourseFilters, CourseProgress } from '../types/course.types';
import { ApiResponse, PaginatedResponse } from '@/types/global.types';

export const courseService = {
  getCourses: (filters?: CourseFilters) =>
    api.get<PaginatedResponse<Course>>('/courses', { params: filters }).then(res => res.data),

  getCourse: (uuid: string) =>
    api.get<ApiResponse<Course>>(`/courses/${uuid}`).then(res => res.data),

  getMyCourses: () =>
    api.get<ApiResponse<Course[]>>('/my-courses').then(res => res.data),

  getCourseProgress: (uuid: string) =>
    api.get<ApiResponse<CourseProgress>>(`/courses/${uuid}/progress`).then(res => res.data),

  enroll: (uuid: string) =>
    api.post<ApiResponse<any>>(`/courses/${uuid}/enroll`).then(res => res.data),
};
