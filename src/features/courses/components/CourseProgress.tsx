import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CourseProgress as CourseProgressType } from '../types/course.types';

interface CourseProgressProps {
  progress: CourseProgressType;
  className?: string;
  showText?: boolean;
}

export const CourseProgress = ({ progress, className, showText = true }: CourseProgressProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        {showText && (
          <span className="text-sm font-medium">
            {progress.percent_complete}% Complete
          </span>
        )}
        {showText && (
          <span className="text-xs text-muted-foreground">
            {progress.completed_lessons}/{progress.total_lessons} Lessons
          </span>
        )}
      </div>
      <Progress value={progress.percent_complete} className="h-2" />
    </div>
  );
};
