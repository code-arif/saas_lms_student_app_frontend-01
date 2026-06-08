import api from '@/services/api';
import { ApiResponse } from '@/types/global.types';

export interface Quiz {
  uuid: string;
  title: string;
  description: string;
  passing_score: number;
  time_limit_minutes: number;
  questions: Question[];
}

export interface Question {
  uuid: string;
  text: string;
  type: 'multiple_choice' | 'true_false';
  options: QuestionOption[];
}

export interface QuestionOption {
  uuid: string;
  text: string;
}

export interface QuizAttempt {
  uuid: string;
  quiz_uuid: string;
  score: number;
  passed: boolean;
  completed_at: string;
}

export const quizService = {
  getQuiz: (uuid: string) =>
    api.get<ApiResponse<Quiz>>(`/quizzes/${uuid}`).then(res => res.data),

  submitQuiz: (uuid: string, answers: Record<string, string>) =>
    api.post<ApiResponse<QuizAttempt>>(`/quizzes/${uuid}/submit`, { answers }).then(res => res.data),
};
