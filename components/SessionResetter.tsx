'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';

interface SessionResetterProps {
  variant?: 'default' | 'ghost' | 'outline';
}

export function SessionResetter({ variant = 'default' }: SessionResetterProps) {
  const { clearSession } = useSession();
  const router = useRouter();

  const handleReset = () => {
    console.log('🔄 SessionResetter - Resetting session...');
    clearSession();
    router.push('/start-flow');
  };

  return (
    <Button
      onClick={handleReset}
      variant={variant}
      className="font-['Orbitron']"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      New Assessment
    </Button>
  );
}
