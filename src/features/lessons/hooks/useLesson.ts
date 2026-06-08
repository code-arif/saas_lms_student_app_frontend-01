import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonService } from '../services/lessonService';

export const useLesson = (uuid: string) => {
  return useQuery({
    queryKey: ['lesson', uuid],
    queryFn: () => lessonService.getLesson(uuid),
    enabled: !!uuid,
  });
};

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => lessonService.completeLesson(uuid),
    onSuccess: (_, uuid) => {
      queryClient.invalidateQueries({ queryKey: ['lesson', uuid] });
      queryClient.invalidateQueries({ queryKey: ['course-progress'] });
    },
  });
};

export const useUpdateLessonProgress = () => {
  return useMutation({
    mutationFn: ({ uuid, second }: { uuid: string; second: number }) =>
      lessonService.updateProgress(uuid, second),
  });
};
