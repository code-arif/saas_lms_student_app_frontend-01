import api from '@/services/api';
import { ApiResponse } from '@/types/global.types';

export interface Certificate {
  uuid: string;
  course_uuid: string;
  course_title: string;
  issued_at: string;
  certificate_number: string;
  download_url: string;
  preview_url: string;
}

export const certificateService = {
  getCertificates: () =>
    api.get<ApiResponse<Certificate[]>>('/certificates').then(res => res.data),

  getCertificate: (uuid: string) =>
    api.get<ApiResponse<Certificate>>(`/certificates/${uuid}`).then(res => res.data),
};
