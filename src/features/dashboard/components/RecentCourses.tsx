import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { CourseProgress } from '@/features/courses/components/CourseProgress';
import { Play } from 'lucide-react';

interface RecentCourse {
  uuid: string;
  title: string;
  thumbnail_url: string;
  progress: {
    percent_complete: number;
    completed_lessons: number;
    total_lessons: number;
  };
}

interface RecentCoursesProps {
  courses?: RecentCourse[];
  isLoading: boolean;
}

export const RecentCourses = ({ courses, isLoading }: RecentCoursesProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continue Learning</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to={ROUTES.COURSES.MY_COURSES}>View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-16 w-16 rounded bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))
        ) : courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.uuid} className="group flex items-center gap-4 p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="relative h-16 w-24 rounded bg-muted overflow-hidden flex-shrink-0">
                <img src={course.thumbnail_url} alt={course.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <Link to={ROUTES.LEARN.INDEX.replace(':uuid', course.uuid)} className="font-semibold text-sm truncate block hover:text-primary transition-colors">
                  {course.title}
                </Link>
                <CourseProgress 
                  progress={{
                    course_uuid: course.uuid,
                    percent_complete: course.progress.percent_complete,
                    completed_lessons: course.progress.completed_lessons,
                    total_lessons: course.progress.total_lessons,
                    last_accessed_at: ''
                  }} 
                  showText={false}
                  className="mt-2"
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  {course.progress.percent_complete}% complete
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No recent activity. Start a course today!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
