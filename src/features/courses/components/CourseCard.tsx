import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types/course.types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROUTES } from '@/constants/routes';
import { Star, Clock, Users, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: course.currency || 'USD',
    }).format(cents / 100);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <Link to={ROUTES.COURSES.DETAILS.replace(':uuid', course.uuid)}>
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={course.thumbnail_url || '/placeholder-course.jpg'}
            alt={course.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{course.category?.name || 'General'}</Badge>
          <div className="flex items-center text-yellow-500 text-sm font-medium">
            <Star className="h-4 w-4 fill-current mr-1" />
            {course.average_rating}
          </div>
        </div>
        <Link to={ROUTES.COURSES.DETAILS.replace(':uuid', course.uuid)}>
          <h3 className="line-clamp-2 text-lg font-bold leading-tight hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {course.short_description}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration(course.total_duration_seconds)}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.total_lessons} lessons
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.total_students}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold text-lg">
          {course.is_free ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>{formatPrice(course.sale_price_cents || course.price_cents)}</span>
          )}
          {!course.is_free && course.sale_price_cents && (
            <span className="ml-2 text-sm font-normal text-muted-foreground line-through">
              {formatPrice(course.price_cents)}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
