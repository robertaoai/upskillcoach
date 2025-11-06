'use client';

import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface SessionGateProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function SessionGate({ children, redirectTo = '/start-flow' }: SessionGateProps) {
  const { sessionId, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !sessionId) {
      console.log('🚫 SessionGate - No session found, redirecting to:', redirectTo);
      router.push(redirectTo);
    }
  }, [isLoading, sessionId, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto" />
          <p className="text-cyan-300 font-['Orbitron']">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
