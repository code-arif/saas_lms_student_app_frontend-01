import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '@/features/courses/hooks/useCourses';
import { useLesson, useCompleteLesson } from '@/features/lessons/hooks/useLesson';
import { LessonSidebar } from '@/features/lessons/components/LessonSidebar';
import { LessonContent } from '@/features/lessons/components/LessonContent';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';

const LessonPage = () => {
  const { uuid, lessonUuid } = useParams<{ uuid: string; lessonUuid: string }>();
  const navigate = useNavigate();
  
  const { data: courseResponse, isLoading: isCourseLoading } = useCourse(uuid!);
  const { data: lessonResponse, isLoading: isLessonLoading } = useLesson(lessonUuid!);
  const { mutate: completeLesson } = useCompleteLesson();

  const handleComplete = () => {
    if (lessonUuid) {
      completeLesson(lessonUuid);
    }
  };

  if (isCourseLoading || isLessonLoading) {
    return <LoadingSpinner className="h-20 w-20" />;
  }

  const course = courseResponse?.data;
  const lesson = lessonResponse?.data;

  if (!course || !lesson) return <div>Error loading lesson.</div>;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block w-80 flex-shrink-0 overflow-y-auto border-r">
        <LessonSidebar chapters={course.chapters as any} currentLessonUuid={lessonUuid} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Sidebar Trigger */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="mr-2 h-4 w-4" />
                Contents
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <LessonSidebar chapters={course.chapters as any} currentLessonUuid={lessonUuid} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold truncate ml-4">{lesson.title}</span>
        </div>

        {/* Lesson Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <LessonContent 
              lesson={lesson} 
              onComplete={handleComplete} 
              isCompleted={false} // Would come from progress API
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t p-4 bg-background">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button variant="ghost">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button>
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
