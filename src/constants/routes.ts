export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: '/dashboard',
  COURSES: {
    INDEX: '/courses',
    MY_COURSES: '/my-courses',
    DETAILS: '/courses/:uuid',
    DETAIL: (uuid: string) => `/courses/${uuid}`,
  },
  LEARN: {
    INDEX: '/learn/:uuid',
    LESSON: '/learn/:uuid/lesson/:lessonUuid',
    QUIZ: '/learn/:uuid/quiz/:quizUuid',
    ASSIGNMENT: '/learn/:uuid/assignment/:assignmentUuid',
  },
  CERTIFICATES: '/certificates',
  PROFILE: {
    INDEX: '/profile',
  },
  SETTINGS: '/settings',
};
