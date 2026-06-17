import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import { DashboardStats as StatsType } from '../hooks/useDashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/cn';

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
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Completed Courses',
      value: stats?.completed_courses || 0,
      icon: Trophy,
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Lessons Done',
      value: stats?.total_lessons_completed || 0,
      icon: CheckCircle,
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Learning Hours',
      value: `${stats?.learning_hours || 0}h`,
      icon: Clock,
      color: 'text-primary bg-primary/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item, index) => (
        <Card key={index} className="transition-all hover:shadow-md border-transparent hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
            <div className={cn("p-2 rounded-lg", item.color)}>
              <item.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold tracking-tight">{item.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
