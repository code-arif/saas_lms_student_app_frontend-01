import React from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { RecentCourses } from '@/features/dashboard/components/RecentCourses';
import { ProgressOverview } from '@/features/dashboard/components/ProgressOverview';
import { useDashboardStats, useRecentCourses } from '@/features/dashboard/hooks/useDashboard';
import { useAuthStore } from '@/features/auth/store/authStore';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats();
  const { data: recentCourses, isLoading: isRecentLoading } = useRecentCourses();

  return (
    <div className="space-y-8">
      <PageTitle 
        title={`Welcome back, ${user?.name}!`} 
        subtitle="Track your progress and continue your learning journey."
      />
      
      <DashboardStats 
        stats={stats} 
        isLoading={isStatsLoading} 
      />

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <RecentCourses 
          courses={recentCourses} 
          isLoading={isRecentLoading} 
        />
        <ProgressOverview />
      </div>
    </div>
  );
};

export default DashboardPage;
