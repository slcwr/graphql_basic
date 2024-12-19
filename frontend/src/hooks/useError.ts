// hooks/useError.ts
import { useReactiveVar } from '@apollo/client';
import { errorStateVar } from '../state/error/errorState';
import { ErrorState } from '../types/error';

export const useError = () => {
  const errorState = useReactiveVar(errorStateVar);

  const setError = (message: string, severity: ErrorState['severity'] = 'error', code?: string) => {
    errorStateVar({
      isError: true,
      message,
      severity,
      code
    });
  };

  const clearError = () => {
    errorStateVar({
      isError: false,
      message: '',
      severity: 'info'
    });
  };

  return {
    errorState,
    setError,
    clearError
  };
};
