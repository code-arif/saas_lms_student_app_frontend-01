import React, { useState } from 'react';
import { Assignment, AssignmentSubmission } from '../services/assignmentService';
import { useSubmitAssignment } from '../hooks/useAssignment';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/cn';

interface AssignmentSubmitProps {
  assignment: Assignment;
  submission?: AssignmentSubmission;
}

export const AssignmentSubmit = ({ assignment, submission }: AssignmentSubmitProps) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { mutate: submit, isPending } = useSubmitAssignment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (content) formData.append('content', content);
    if (file) formData.append('file', file);

    submit(
      { uuid: assignment.uuid, data: formData },
      {
        onSuccess: () => {
          toast.success('Assignment submitted successfully!');
        },
        onError: () => {
          toast.error('Failed to submit assignment.');
        },
      }
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">Pending Review</Badge>;
      case 'graded':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">Graded</Badge>;
      case 'resubmission_required':
        return <Badge variant="destructive">Resubmission Required</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (submission && submission.status !== 'resubmission_required') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Submission</CardTitle>
            {getStatusBadge(submission.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/30">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Submitted on {new Date(submission.submitted_at).toLocaleString()}
            </div>
            {submission.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
                {submission.content}
              </div>
            )}
            {submission.file_url && (
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" />
                <a href={submission.file_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  View Submitted File
                </a>
              </div>
            )}
          </div>

          {submission.status === 'graded' && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:bg-green-900/10 dark:border-green-900/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Grade: {submission.score} / {assignment.max_score}
                </h4>
              </div>
              {submission.feedback && (
                <div className="text-sm">
                  <span className="font-semibold">Instructor Feedback:</span>
                  <p className="mt-1 text-muted-foreground">{submission.feedback}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Assignment</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {submission?.status === 'resubmission_required' && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3 text-sm">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div>
                <span className="font-bold block mb-1 text-destructive">Resubmission Required</span>
                <p className="text-muted-foreground">{submission.feedback}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Response / Notes</Label>
            <Textarea
              id="content"
              placeholder="Type your response here..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File Upload</Label>
            <div className={cn(
              "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors cursor-pointer",
              file ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50"
            )}
            onClick={() => document.getElementById('file-input')?.click()}
            >
              <Upload className={cn("h-10 w-10 mb-4", file ? "text-primary" : "text-muted-foreground")} />
              {file ? (
                <div className="text-center">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">
                    Allowed: {assignment.allowed_file_types.join(', ')} (Max {assignment.max_file_size_mb}MB)
                  </p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept={assignment.allowed_file_types.join(',')}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending || (!content && !file)}>
            {isPending ? 'Submitting...' : 'Submit Assignment'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
