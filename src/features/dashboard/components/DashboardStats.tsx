import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import { DashboardStats as StatsType } from '../hooks/useDashboard';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStatsProps {
  stats?: StatsType;
  isLoading: boolean;
}

export const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  const statItems = [
    {
      title: 'Enrolled Courses',
      value: stats?.enrolled_courses || 0,
      icon: BookOpen,
      color: 'text-blue-600',
    },
    {
      title: 'Completed Courses',
      value: stats?.completed_courses || 0,
      icon: Trophy,
      color: 'text-yellow-600',
    },
    {
      title: 'Lessons Done',
      value: stats?.total_lessons_completed || 0,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Learning Hours',
      value: `${stats?.learning_hours || 0}h`,
      icon: Clock,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{item.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
