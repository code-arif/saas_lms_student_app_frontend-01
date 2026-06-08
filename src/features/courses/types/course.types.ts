import { User } from '@/types/global.types';

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface Course {
  uuid: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  language: string;
  level: string;
  thumbnail_url: string;
  preview_video_url?: string;
  preview_video_duration?: number;
  status: CourseStatus;
  is_free: boolean;
  is_featured: boolean;
  is_certificate_enabled: boolean;
  is_drip_enabled: boolean;
  published_at?: string;
  price_cents: number;
  sale_price_cents?: number;
  currency: string;
  sale_ends_at?: string;
  max_students?: number;
  certificate_pass_percent: number;
  requirements: string[];
  outcomes: string[];
  target_audience: string[];
  total_students: number;
  total_lessons: number;
  total_chapters: number;
  total_duration_seconds: number;
  average_rating: number;
  total_reviews: number;
  category?: CourseCategory;
  instructor?: User;
}

export interface CourseCategory {
  uuid: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  language?: string;
  is_free?: boolean;
  search?: string;
  sort?: string;
}

export interface CourseProgress {
  course_uuid: string;
  completed_lessons: number;
  total_lessons: number;
  percent_complete: number;
  last_accessed_at: string;
}
