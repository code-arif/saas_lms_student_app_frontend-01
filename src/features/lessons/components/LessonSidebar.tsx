import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/constants/routes';
import { 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonType } from '../types/lesson.types';

// Mock structure based on typical course data
interface Chapter {
  uuid: string;
  title: string;
  lessons: {
    uuid: string;
    title: string;
    type: LessonType;
    is_completed: boolean;
    is_locked: boolean;
  }[];
}

interface LessonSidebarProps {
  chapters: Chapter[];
  currentLessonUuid?: string;
}

const getLessonIcon = (type: LessonType, isCompleted: boolean) => {
  if (isCompleted) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  
  switch (type) {
    case LessonType.VIDEO:
      return <PlayCircle className="h-4 w-4" />;
    case LessonType.QUIZ:
      return <HelpCircle className="h-4 w-4" />;
    case LessonType.ASSIGNMENT:
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const LessonSidebar = ({ chapters, currentLessonUuid }: LessonSidebarProps) => {
  const { uuid: courseUuid } = useParams();

  return (
    <div className="h-full border-r bg-card flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-bold">Course Content</h3>
      </div>
      <Accordion type="multiple" className="w-full" defaultValue={chapters.map(c => c.uuid)}>
        {chapters.map((chapter) => (
          <AccordionItem key={chapter.uuid} value={chapter.uuid} className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-accent/50 hover:no-underline">
              <span className="text-sm font-semibold text-left">{chapter.title}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="flex flex-col">
                {chapter.lessons.map((lesson) => (
                  <NavLink
                    key={lesson.uuid}
                    to={ROUTES.LEARN.LESSON.replace(':uuid', courseUuid!).replace(':lessonUuid', lesson.uuid)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-6 py-3 text-sm transition-colors hover:bg-accent",
                        isActive ? "bg-accent font-medium text-primary" : "text-muted-foreground",
                        lesson.is_locked && "opacity-50 pointer-events-none"
                      )
                    }
                  >
                    {lesson.is_locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      getLessonIcon(lesson.type, lesson.is_completed)
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </NavLink>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
