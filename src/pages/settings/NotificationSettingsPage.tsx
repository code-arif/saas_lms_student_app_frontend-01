import React from 'react';
import { NotificationSettings } from '@/features/profile/components/NotificationSettings';
import { SettingsLayout } from './SettingsLayout';

const NotificationSettingsPage = () => {
  return (
    <SettingsLayout
      title="Notification Settings"
      subtitle="Choose how and when you want to be notified."
    >
      <NotificationSettings />
    </SettingsLayout>
  );
};

export default NotificationSettingsPage;
