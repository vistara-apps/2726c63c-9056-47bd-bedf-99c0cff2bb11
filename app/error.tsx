'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <Shield className="h-8 w-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
          <p className="text-gray-300">
            We encountered an error while loading your legal rights information.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try again</span>
          </button>
          
          <p className="text-xs text-gray-400">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
