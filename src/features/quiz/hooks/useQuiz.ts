import { useQuery, useMutation } from '@tanstack/react-query';
import { quizService } from '../services/quizService';

export const useQuiz = (uuid: string) => {
  return useQuery({
    queryKey: ['quiz', uuid],
    queryFn: () => quizService.getQuiz(uuid),
    enabled: !!uuid,
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ uuid, answers }: { uuid: string; answers: Record<string, string> }) =>
      quizService.submitQuiz(uuid, answers),
  });
};
