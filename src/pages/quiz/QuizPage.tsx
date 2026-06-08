import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/features/quiz/hooks/useQuiz';
import { QuizPlayer } from '@/features/quiz/components/QuizPlayer';
import { QuizResult } from '@/features/quiz/components/QuizResult';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ROUTES } from '@/constants/routes';

const QuizPage = () => {
  const { quizUuid, uuid: courseUuid } = useParams<{ quizUuid: string, uuid: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  
  const { data: quiz, isLoading } = useQuiz(quizUuid!);

  if (isLoading) return <LoadingSpinner className="h-20 w-20" />;

  if (!quiz) return <div>Quiz not found.</div>;

  const handleComplete = (resultData: any) => {
    setResult(resultData);
  };

  const handleRetry = () => {
    setResult(null);
  };

  const handleContinue = () => {
    navigate(ROUTES.LEARN.INDEX.replace(':uuid', courseUuid!));
  };

  return (
    <div className="container py-12">
      {result ? (
        <QuizResult 
          result={result} 
          onRetry={handleRetry} 
          onContinue={handleContinue} 
        />
      ) : (
        <QuizPlayer 
          quiz={quiz} 
          onComplete={handleComplete} 
        />
      )}
    </div>
  );
};

export default QuizPage;
