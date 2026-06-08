import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { ROUTES } from '@/constants/routes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));

// Dashboard & Protected Pages
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const MyCoursesPage = lazy(() => import('@/pages/courses/MyCourses'));
const CourseBrowsePage = lazy(() => import('@/pages/courses/CourseBrowsePage'));
const CourseDetailPage = lazy(() => import('@/pages/courses/CourseDetailPage'));
const LessonPage = lazy(() => import('@/pages/learn/LessonPage'));
const QuizPage = lazy(() => import('@/pages/quiz/QuizPage'));
const AssignmentPage = lazy(() => import('@/pages/assignments/AssignmentPage'));
const CertificatesPage = lazy(() => import('@/pages/certificates/CertificatesPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Guest Routes
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: ROUTES.AUTH.LOGIN, element: <Suspense fallback={<LoadingSpinner />}><LoginPage /></Suspense> },
              { path: ROUTES.AUTH.REGISTER, element: <Suspense fallback={<LoadingSpinner />}><RegisterPage /></Suspense> },
              { path: ROUTES.AUTH.FORGOT_PASSWORD, element: <Suspense fallback={<LoadingSpinner />}><ForgotPasswordPage /></Suspense> },
            ],
          },
        ],
      },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: ROUTES.DASHBOARD, element: <Suspense fallback={<LoadingSpinner />}><DashboardPage /></Suspense> },
              { path: ROUTES.COURSES.MY_COURSES, element: <Suspense fallback={<LoadingSpinner />}><MyCoursesPage /></Suspense> },
              { path: ROUTES.COURSES.INDEX, element: <Suspense fallback={<LoadingSpinner />}><CourseBrowsePage /></Suspense> },
              { path: ROUTES.COURSES.DETAILS, element: <Suspense fallback={<LoadingSpinner />}><CourseDetailPage /></Suspense> },
              { path: ROUTES.CERTIFICATES, element: <Suspense fallback={<LoadingSpinner />}><CertificatesPage /></Suspense> },
              { path: ROUTES.PROFILE.INDEX, element: <Suspense fallback={<LoadingSpinner />}><ProfilePage /></Suspense> },
              { path: ROUTES.LEARN.LESSON, element: <Suspense fallback={<LoadingSpinner />}><LessonPage /></Suspense> },
              { path: ROUTES.LEARN.QUIZ, element: <Suspense fallback={<LoadingSpinner />}><QuizPage /></Suspense> },
              { path: ROUTES.LEARN.ASSIGNMENT, element: <Suspense fallback={<LoadingSpinner />}><AssignmentPage /></Suspense> },
            ],
          },
        ],
      },

      // Fallback
      { path: '/', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: '*', element: <Suspense fallback={<LoadingSpinner />}><NotFoundPage /></Suspense> },
    ],
  },
]);
