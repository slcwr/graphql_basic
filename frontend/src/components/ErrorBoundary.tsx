// components/ErrorBoundary.tsx
import { useEffect } from 'react';
import { useError } from '../hooks/useError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { setError } = useError();
// グローバルエラーハンドリングのための副作用
  useEffect(() => {
    // ブラウザで発生したエラーをキャッチする関数
    const handleGlobalError = (error: ErrorEvent) => {
      setError(error.message);
    };
    // windowオブジェクトにエラーイベントリスナーを追加
    window.addEventListener('error', handleGlobalError);
    // クリーンアップ関数：コンポーネントのアンマウント時にリスナーを削除
    return () => window.removeEventListener('error', handleGlobalError);
  }, [setError]);

  return <>{children}</>;
};
