import React from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '@/features/courses/hooks/useCourses';
import { CourseDetail } from '@/features/courses/components/CourseDetail';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import { AlertCircle } from 'lucide-react';

const CourseDetailPage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { data: courseResponse, isLoading, isError } = useCourse(uuid!);

  if (isLoading) {
    return <LoadingSpinner className="h-20 w-20" />;
  }

  if (isError || !courseResponse?.data) {
    return (
      <EmptyState
        title="Course not found"
        description="The course you are looking for might have been removed or is temporarily unavailable."
        icon={AlertCircle}
      />
    );
  }

  return (
    <div className="py-8">
      <CourseDetail course={courseResponse.data} />
    </div>
  );
};

export default CourseDetailPage;
