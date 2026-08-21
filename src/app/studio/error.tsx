'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Captured:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] px-4 text-center bg-white">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Something went wrong!</h2>
      <p className="text-gray-500 max-w-md mb-8 text-sm">
        The application encountered an unexpected error. Don't worry, this has been logged.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all active:scale-95 shadow-md"
      >
        <RefreshCcw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}