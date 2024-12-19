// state/errorState.ts
import { makeVar } from '@apollo/client';
import { ErrorState } from '../../types/error';

// 初期状態の定義
const initialErrorState: ErrorState = {
  isError: false,
  message: '',
  severity: 'info'
};

// Reactive Variableの作成
export const errorStateVar = makeVar<ErrorState>(initialErrorState);
