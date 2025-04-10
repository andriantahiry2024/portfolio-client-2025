import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertCircle, Home } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError() as any;
  const status = error?.status || '500';
  const message = error?.message || 'Something went wrong';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="w-full max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-3xl font-bold mb-2">Application Error</h1>
        <div className="p-4 mb-4 rounded-lg bg-muted">
          <p className="text-lg font-semibold mb-1">{status}</p>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary; 