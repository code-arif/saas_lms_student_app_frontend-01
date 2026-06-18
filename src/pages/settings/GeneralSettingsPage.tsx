import React from 'react';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { SettingsLayout } from './SettingsLayout';

const GeneralSettingsPage = () => {
  return (
    <SettingsLayout
      title="General Settings"
      subtitle="Manage your personal information and account details."
    >
      <ProfileForm />
    </SettingsLayout>
  );
};

export default GeneralSettingsPage;
