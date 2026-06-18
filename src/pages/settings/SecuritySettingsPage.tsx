import React from 'react';
import { ChangePasswordForm } from '@/features/profile/components/ChangePasswordForm';
import { SettingsLayout } from './SettingsLayout';

const SecuritySettingsPage = () => {
  return (
    <SettingsLayout
      title="Security Settings"
      subtitle="Update your password and keep your account secure."
    >
      <ChangePasswordForm />
    </SettingsLayout>
  );
};

export default SecuritySettingsPage;
