import React from 'react';
import { Course } from '../types/course.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  BarChart, 
  Users, 
  Star,
  PlayCircle
} from 'lucide-react';
import { useEnroll } from '../hooks/useCourses';
import { toast } from 'sonner';

interface CourseDetailProps {
  course: Course;
}

export const CourseDetail = ({ course }: CourseDetailProps) => {
  const { mutate: enroll, isPending } = useEnroll();

  const handleEnroll = () => {
    enroll(course.uuid, {
      onSuccess: () => {
        toast.success('Successfully enrolled in the course!');
      },
      onError: () => {
        toast.error('Failed to enroll in the course. Please try again.');
      }
    });
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: course.currency || 'USD',
    }).format(cents / 100);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Badge className="mb-4">{course.category?.name || 'General'}</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {course.short_description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center text-yellow-500 font-bold">
              <Star className="mr-1 h-4 w-4 fill-current" />
              {course.average_rating} ({course.total_reviews} reviews)
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {course.total_students} students enrolled
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Last updated {new Date(course.published_at || '').toLocaleDateString()}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Globe className="mr-1 h-4 w-4" />
              {course.language}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 bg-muted/30 rounded-lg border">
            {course.outcomes.map((outcome, index) => (
              <div key={index} className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {course.description}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc pl-5 space-y-1">
            {course.requirements.map((req, index) => (
              <li key={index} className="text-sm text-muted-foreground">{req}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border bg-card text-card-foreground shadow-xl overflow-hidden">
          <div className="aspect-video relative group cursor-pointer">
            <img 
              src={course.thumbnail_url} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
              <PlayCircle className="h-16 w-16 text-white" />
            </div>
            <div className="absolute bottom-4 inset-x-0 text-center text-white font-medium text-sm">
              Preview this course
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">
                {course.is_free ? 'Free' : formatPrice(course.sale_price_cents || course.price_cents)}
              </span>
              {!course.is_free && course.sale_price_cents && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(course.price_cents)}
                </span>
              )}
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full font-bold" onClick={handleEnroll} disabled={isPending}>
                {isPending ? 'Enrolling...' : 'Enroll Now'}
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            <div className="mt-6 text-xs text-center text-muted-foreground">
              30-Day Money-Back Guarantee
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-sm">This course includes:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm gap-3">
                  <PlayCircle className="h-4 w-4" />
                  <span>{Math.round(course.total_duration_seconds / 3600)} hours on-demand video</span>
                </div>
                <div className="flex items-center text-sm gap-3">
                  <BarChart className="h-4 w-4" />
                  <span>{course.level} level</span>
                </div>
                <div className="flex items-center text-sm gap-3">
                  <Clock className="h-4 w-4" />
                  <span>Full lifetime access</span>
                </div>
                {course.is_certificate_enabled && (
                  <div className="flex items-center text-sm gap-3">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
