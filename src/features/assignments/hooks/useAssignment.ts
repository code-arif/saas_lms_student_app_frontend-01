import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentService } from '../services/assignmentService';

export const useAssignment = (uuid: string) => {
  return useQuery({
    queryKey: ['assignment', uuid],
    queryFn: () => assignmentService.getAssignment(uuid),
    enabled: !!uuid,
  });
};

export const useAssignmentSubmission = (uuid: string) => {
  return useQuery({
    queryKey: ['assignment-submission', uuid],
    queryFn: () => assignmentService.getSubmission(uuid),
    enabled: !!uuid,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: FormData }) =>
      assignmentService.submitAssignment(uuid, data),
    onSuccess: (_, { uuid }) => {
      queryClient.invalidateQueries({ queryKey: ['assignment-submission', uuid] });
    },
  });
};
