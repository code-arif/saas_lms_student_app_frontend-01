import React from 'react';
import { PageTitle } from '@/components/common/PageTitle';
import { CourseList } from '@/features/courses/components/CourseList';
import { useMyCourses } from '@/features/courses/hooks/useCourses';

const MyCourses = () => {
  const { data: coursesResponse, isLoading } = useMyCourses();

  return (
    <div className="space-y-8">
      <PageTitle 
        title="My Courses" 
        subtitle="Access all the courses you've enrolled in and continue your progress."
      />

      <CourseList 
        courses={coursesResponse?.data} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default MyCourses;
