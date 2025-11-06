'use client';

import { useSession } from '@/contexts/SessionContext';
import { Bot } from 'lucide-react';

export function PromptBubble() {
  const { firstPrompt } = useSession();

  if (!firstPrompt) {
    return null;
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-cyan-100 font-['Inter'] leading-relaxed">
          {firstPrompt}
        </p>
      </div>
    </div>
  );
}
