import React, { useState } from 'react';
import { Quiz, Question } from '../services/quizService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSubmitQuiz } from '../hooks/useQuiz';
import { Progress } from '@/components/ui/progress';

interface QuizPlayerProps {
  quiz: Quiz;
  onComplete: (result: any) => void;
}

export const QuizPlayer = ({ quiz, onComplete }: QuizPlayerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { mutate: submitQuiz, isPending } = useSubmitQuiz();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.uuid]: value,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    submitQuiz(
      { uuid: quiz.uuid, answers },
      {
        onSuccess: (response) => {
          onComplete(response);
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentQuestion.uuid] || ''} 
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.uuid} className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors">
                <RadioGroupItem value={option.uuid} id={option.uuid} />
                <Label htmlFor={option.uuid} className="flex-1 cursor-pointer text-base font-normal">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button 
              onClick={handleSubmit} 
              disabled={isPending || !answers[currentQuestion.uuid]}
            >
              {isPending ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          ) : (
            <Button 
              onClick={nextQuestion} 
              disabled={!answers[currentQuestion.uuid]}
            >
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
