import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const ProfilePage = () => {
  return <Navigate to={ROUTES.SETTINGS.GENERAL} replace />;
};

export default ProfilePage;
