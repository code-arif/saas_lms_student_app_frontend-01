export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'tenant';
}
