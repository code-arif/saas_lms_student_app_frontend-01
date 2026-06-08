import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssignment, useAssignmentSubmission } from '@/features/assignments/hooks/useAssignment';
import { AssignmentSubmit } from '@/features/assignments/components/AssignmentSubmit';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, Calendar } from 'lucide-react';

const AssignmentPage = () => {
  const { assignmentUuid } = useParams<{ assignmentUuid: string }>();
  
  const { data: assignmentResponse, isLoading: isAssignmentLoading } = useAssignment(assignmentUuid!);
  const { data: submissionResponse, isLoading: isSubmissionLoading } = useAssignmentSubmission(assignmentUuid!);

  if (isAssignmentLoading || isSubmissionLoading) return <LoadingSpinner className="h-20 w-20" />;

  const assignment = assignmentResponse?.data;
  const submission = submissionResponse?.data;

  if (!assignment) return <div>Assignment not found.</div>;

  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{assignment.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Max Score: {assignment.max_score}
          </div>
          {assignment.due_at && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Due: {new Date(assignment.due_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {assignment.description}
          </div>
        </CardContent>
      </Card>

      <AssignmentSubmit 
        assignment={assignment} 
        submission={submission} 
      />
    </div>
  );
};

export default AssignmentPage;
