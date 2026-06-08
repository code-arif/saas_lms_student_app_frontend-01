import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { FileQuestion } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <FileQuestion className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">404 - Not Found</h1>
      <p className="mb-8 text-xl text-muted-foreground max-w-md">
        The page you are looking for doesn't exist or has been moved to a new location.
      </p>
      <Button asChild size="lg">
        <Link to={ROUTES.DASHBOARD}>
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
