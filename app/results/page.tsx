'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SessionResetter } from '@/components/SessionResetter';
import { CompletionForm } from '@/components/CompletionForm';
import { SummaryCard } from '@/components/SummaryCard';
import { HtmlSummaryView } from '@/components/HtmlSummaryView';
import { completeSession } from '@/lib/api';
import { CompleteResponse } from '@/lib/types';
import { Loader2, Download, FileText, Trophy } from 'lucide-react';
import { toast } from 'sonner';

interface SessionData {
  sessionId: string;
  firstPrompt: string;
  chatHistory: any[];
  savedAt: string;
  isComplete?: boolean;
}

export default function Results() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState<CompleteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for completed session
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ai_coach_session');
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          
          if (!parsed.isComplete) {
            // Redirect back to assessment if not complete
            router.push('/answer-flow');
            return;
          }
          
          setSessionData(parsed);
        } catch (e) {
          console.error('Failed to parse session:', e);
          router.push('/answer-flow');
          return;
        }
      } else {
        // No session found
        router.push('/answer-flow');
        return;
      }
      
      setLoading(false);
    }
  }, [router]);

  const handleComplete = async (optIn: boolean) => {
    if (!sessionData?.sessionId) return;

    setSubmitting(true);
    setError(null);

    try {
      const result = await completeSession(sessionData.sessionId, optIn);
      setSummary(result);
      toast.success('Assessment completed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to complete assessment');
      toast.error('Failed to complete assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#00FFFF] animate-spin mx-auto mb-4" />
          <p className="text-[#00FFFF] font-['Orbitron'] text-lg">
            Loading results...
          </p>
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-[#00FFFF]/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#8AFF00]" />
            <h1 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] neon-text-cyan">
              Assessment Results
            </h1>
          </div>
          <SessionResetter variant="ghost" />
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {!summary && !submitting && (
            <div className="bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-['Orbitron'] text-[#00FFFF] mb-6">
                Finalize Your Assessment
              </h2>
              <CompletionForm onComplete={handleComplete} />
            </div>
          )}

          {submitting && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-16 h-16 text-[#00FFFF] animate-spin mb-4" />
              <p className="text-[#00FFFF] font-['Orbitron'] text-lg">
                Analyzing your responses...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-[#FF0080]/10 border-2 border-[#FF0080] rounded-2xl p-6">
              <p className="text-[#FF0080] text-center mb-4">⚠ {error}</p>
              <Button
                onClick={() => setError(null)}
                className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black font-['Orbitron']"
              >
                Try Again
              </Button>
            </div>
          )}

          {summary && (
            <>
              <SummaryCard
                readiness_score={summary.readiness_score}
                roi_estimate={summary.roi_estimate}
              />
              
              <div className="bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-['Orbitron'] font-bold text-[#00FFFF] mb-6">
                  Detailed Summary
                </h2>
                <HtmlSummaryView summary_html={summary.summary_html} />
              </div>

              <div className="bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20 rounded-2xl p-8">
                <h3 className="text-xl font-['Orbitron'] text-white mb-6">
                  Download Your Report
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    disabled
                    className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] border border-[#00FFFF]/40 font-['Orbitron'] py-6"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    PDF Report (Coming Soon)
                  </Button>
                  <Button
                    disabled
                    className="bg-[#00FFFF]/20 hover:bg-[#00FFFF]/30 text-[#00FFFF] border border-[#00FFFF]/40 font-['Orbitron'] py-6"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Executive Brief (Coming Soon)
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
