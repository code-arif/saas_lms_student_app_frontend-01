import React from 'react';
import { Course } from '../types/course.types';
import { CourseCard } from './CourseCard';
import { SkeletonCard } from '@/components/common/SkeletonCard';
import { EmptyState } from '@/components/common/EmptyState';
import { BookX } from 'lucide-react';

interface CourseListProps {
  courses?: Course[];
  isLoading: boolean;
}

export const CourseList = ({ courses, isLoading }: CourseListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title="No courses found"
        description="We couldn't find any courses matching your criteria."
        icon={BookX}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.uuid} course={course} />
      ))}
    </div>
  );
};
