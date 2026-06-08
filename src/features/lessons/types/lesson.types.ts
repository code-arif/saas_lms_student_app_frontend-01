export enum LessonType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  ASSIGNMENT = 'assignment',
  SCORM = 'scorm',
  LIVE_SESSION = 'live_session',
}

export interface Lesson {
  uuid: string;
  title: string;
  type: LessonType;
  sort_order: number;
  duration_seconds?: number;
  content?: string;
  is_preview: boolean;
  is_published: boolean;
  has_drip: boolean;
  drip_days_after_enroll?: number;
  video_url?: string;
  hls_url?: string;
  attachments?: LessonAttachment[];
}

export interface LessonAttachment {
  uuid: string;
  name: string;
  file_url: string;
  file_size: number;
  file_type: string;
}

export interface LessonProgress {
  lesson_uuid: string;
  is_completed: boolean;
  last_watched_second?: number;
  completed_at?: string;
}
