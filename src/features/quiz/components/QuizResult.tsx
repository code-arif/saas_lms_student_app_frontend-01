import React from 'react';
import { QuizAttempt } from '../services/quizService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuizResultProps {
  result: QuizAttempt;
  onRetry: () => void;
  onContinue: () => void;
}

export const QuizResult = ({ result, onRetry, onContinue }: QuizResultProps) => {
  return (
    <Card className="max-w-md mx-auto text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          {result.passed ? (
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30">
              <Award className="h-12 w-12" />
            </div>
          ) : (
            <div className="rounded-full bg-destructive/10 p-3 text-destructive">
              <XCircle className="h-12 w-12" />
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-bold">
          {result.passed ? 'Congratulations!' : 'Keep Practicing'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {result.passed 
            ? "You've successfully passed the quiz."
            : "You didn't reach the passing score this time."}
        </p>
        
        <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg">
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Your Score</span>
          <span className={cn(
            "text-5xl font-black mt-1",
            result.passed ? "text-green-600" : "text-destructive"
          )}>
            {result.score}%
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          {result.passed 
            ? "This lesson is now marked as complete."
            : "You can try again to improve your score and pass the lesson."}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-6">
        {result.passed ? (
          <Button className="w-full" onClick={onContinue}>
            Continue to Next Lesson
          </Button>
        ) : (
          <>
            <Button className="w-full" onClick={onRetry}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="ghost" className="w-full" onClick={onContinue}>
              Return to Lesson
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
