// components/ErrorBoundary.tsx
import { useEffect } from 'react';
import { useError } from '../hooks/useError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { setError } = useError();

  useEffect(() => {
    const handleGlobalError = (error: ErrorEvent) => {
      setError(error.message);
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, [setError]);

  return <>{children}</>;
};
