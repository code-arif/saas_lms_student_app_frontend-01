import React from 'react';
import { Lesson, LessonType } from '../types/lesson.types';
import { VideoPlayer } from './VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, FileText, Download } from 'lucide-react';

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
  isCompleted?: boolean;
}

export const LessonContent = ({ lesson, onComplete, isCompleted }: LessonContentProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <Button 
          variant={isCompleted ? "outline" : "default"} 
          onClick={onComplete}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </div>

      {lesson.type === LessonType.VIDEO && lesson.hls_url && (
        <VideoPlayer url={lesson.hls_url} onEnded={onComplete} />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lesson Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {lesson.content || "No content available for this lesson."}
          </div>
        </CardContent>
      </Card>

      {lesson.attachments && lesson.attachments.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Attachments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.attachments.map((attachment) => (
              <a
                key={attachment.uuid}
                href={attachment.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{attachment.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(attachment.file_size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
