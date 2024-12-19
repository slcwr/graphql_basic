// types/error.ts
export interface ErrorState {
    isError: boolean;
    message: string;
    code?: string;
    severity: 'error' | 'warning' | 'info';
  }