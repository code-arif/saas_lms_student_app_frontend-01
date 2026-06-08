import api from '@/services/api';
import { Lesson, LessonProgress } from '../types/lesson.types';
import { ApiResponse } from '@/types/global.types';

export const lessonService = {
  getLesson: (uuid: string) =>
    api.get<ApiResponse<Lesson>>(`/lessons/${uuid}`),

  completeLesson: (uuid: string) =>
    api.post<ApiResponse<LessonProgress>>(`/lessons/${uuid}/complete`),

  updateProgress: (uuid: string, second: number) =>
    api.post<ApiResponse<any>>(`/lessons/${uuid}/progress`, { second }),
};
