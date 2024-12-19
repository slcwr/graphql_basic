// components/ErrorAlert.tsx
import { useError } from '../../hooks/useError';
import { Alert, AlertIcon, CloseButton } from '@chakra-ui/react';

export const ErrorAlert = () => {
  const { errorState, clearError } = useError();

  if (!errorState.isError) return null;

  return (
    <Alert status={errorState.severity}>
      <AlertIcon />
      {errorState.message}
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={clearError}
      />
    </Alert>
  );
};
