'use client';

import { SessionGate } from '@/components/SessionGate';
import { PromptBubble } from '@/components/PromptBubble';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function AnswerFlowPage() {
  return (
    <SessionGate>
      <AnswerFlowContent />
    </SessionGate>
  );
}

function AnswerFlowContent() {
  const { sessionId, chatHistory, updateChatHistory } = useSession();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!answer.trim() || !sessionId) return;

    setIsSubmitting(true);
    console.log('📤 AnswerFlow - Submitting answer:', answer);

    try {
      const response = await fetch(
        `https://robertcoach.app.n8n.cloud/webhook/6a535534-b0e8-48b5-9bbe-c5b72c35b895/session/${sessionId}/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: answer.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ AnswerFlow - Response:', data);

      // Add user message and AI response to chat history
      const newMessages = [
        ...chatHistory,
        {
          id: `user-${Date.now()}`,
          content: answer.trim(),
          isUser: true,
          timestamp: new Date().toISOString(),
        },
        {
          id: `ai-${Date.now()}`,
          content: data.next_prompt || data.message || 'Thank you for your response.',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ];

      updateChatHistory(newMessages);
      setAnswer('');

      // Check if assessment is complete
      if (data.is_complete || data.status === 'complete') {
        console.log('✅ AnswerFlow - Assessment complete, navigating to complete-flow');
        router.push('/complete-flow');
      }

      toast({
        title: 'Answer Submitted',
        description: 'Your response has been recorded.',
      });
    } catch (error) {
      console.error('❌ AnswerFlow - Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit answer. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Skills Assessment
            </h1>
            <div className="text-sm text-gray-400 font-['Inter']">
              Session: {sessionId?.slice(0, 8)}...
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Chat History */}
          <div className="space-y-4">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={message.isUser ? 'flex justify-end' : 'flex justify-start'}
              >
                {message.isUser ? (
                  <div className="max-w-[80%] p-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg">
                    <p className="text-white font-['Inter']">{message.content}</p>
                  </div>
                ) : (
                  <PromptBubble />
                )}
              </div>
            ))}
          </div>

          {/* Answer Input */}
          <div className="space-y-4 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-cyan-500/30">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[120px] bg-gray-900/50 border-cyan-500/30 text-gray-100 placeholder:text-gray-500 font-['Inter']"
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim() || isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-['Orbitron']"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Answer
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/30 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-gray-400 text-sm font-['Inter']">
              Question {chatHistory.length} of 9
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
