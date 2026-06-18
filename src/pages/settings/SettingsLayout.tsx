import React from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { AvatarUpload } from '@/features/profile/components/AvatarUpload';
import { Card, CardContent } from '@/components/ui/card';

interface SettingsLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const SettingsLayout = ({ title, subtitle, children }: SettingsLayoutProps) => {
  return (
    <div className="space-y-8">
      <PageTitle title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Card - Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-8">
            <Card>
              <CardContent className="pt-8">
                <AvatarUpload />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
