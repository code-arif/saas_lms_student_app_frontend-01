import api from '@/services/api';
import { ApiResponse } from '@/types/global.types';

export interface Assignment {
  uuid: string;
  title: string;
  description: string;
  max_score: number;
  due_at?: string;
  allowed_file_types: string[];
  max_file_size_mb: number;
}

export interface AssignmentSubmission {
  uuid: string;
  assignment_uuid: string;
  content?: string;
  file_url?: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'graded' | 'resubmission_required';
  submitted_at: string;
}

export const assignmentService = {
  getAssignment: (uuid: string) =>
    api.get<ApiResponse<Assignment>>(`/assignments/${uuid}`),

  submitAssignment: (uuid: string, data: FormData) =>
    api.post<ApiResponse<AssignmentSubmission>>(`/assignments/${uuid}/submit`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  getSubmission: (uuid: string) =>
    api.get<ApiResponse<AssignmentSubmission>>(`/assignments/${uuid}/submission`),
};
