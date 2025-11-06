'use client';

import { useState } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SessionStarter() {
  const [isStarting, setIsStarting] = useState(false);
  const { setSession } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleStart = async () => {
    setIsStarting(true);
    console.log('🚀 SessionStarter - Starting assessment...');

    try {
      const response = await fetch('https://robertcoach.app.n8n.cloud/webhook/session/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ SessionStarter - Webhook response:', data);

      // Extract session ID and first prompt
      const sessionId = data.session?.id;
      const firstPrompt = data.first_prompt;

      if (!sessionId || !firstPrompt) {
        throw new Error('Invalid webhook response: missing session ID or first prompt');
      }

      // Store session
      setSession(sessionId, firstPrompt);
      console.log('💾 SessionStarter - Session stored:', sessionId);

      // Navigate to answer flow
      router.push('/answer-flow');
      
      toast({
        title: 'Assessment Started',
        description: 'Your AI skills assessment has begun.',
      });
    } catch (error) {
      console.error('❌ SessionStarter - Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to start assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isStarting}
      size="lg"
      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-['Orbitron'] text-lg px-8 py-6 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
    >
      {isStarting ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Starting...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Start Assessment
        </>
      )}
    </Button>
  );
}
