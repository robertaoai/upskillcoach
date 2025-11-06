'use client';

import { SessionGate } from '@/components/SessionGate';
import { SessionResetter } from '@/components/SessionResetter';
import { useSession } from '@/contexts/SessionContext';
import { CheckCircle2, Download, FileText, TrendingUp, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CompleteFlowPage() {
  return (
    <SessionGate>
      <CompleteFlowContent />
    </SessionGate>
  );
}

function CompleteFlowContent() {
  const { sessionId } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Assessment Complete
          </h1>
        </div>
      </header>

      {/* Body */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/50">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Assessment Complete!
            </h2>
            
            <p className="text-xl text-gray-300 font-['Inter']">
              Thank you for completing the AI Skills Assessment. Your results are ready.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-lg border border-cyan-500/20">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold text-cyan-300 font-['Orbitron'] mb-2">
                Skill Level
              </h3>
              <p className="text-3xl font-bold text-white font-['Orbitron']">
                Advanced
              </p>
              <p className="text-sm text-gray-400 font-['Inter'] mt-2">
                Based on your responses
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
              <Target className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-purple-300 font-['Orbitron'] mb-2">
                ROI Potential
              </h3>
              <p className="text-3xl font-bold text-white font-['Orbitron']">
                High
              </p>
              <p className="text-sm text-gray-400 font-['Inter'] mt-2">
                Strong implementation readiness
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-pink-900/30 to-orange-900/30 rounded-lg border border-pink-500/20">
              <Zap className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="text-lg font-semibold text-pink-300 font-['Orbitron'] mb-2">
                Readiness Score
              </h3>
              <p className="text-3xl font-bold text-white font-['Orbitron']">
                85%
              </p>
              <p className="text-sm text-gray-400 font-['Inter'] mt-2">
                Ready for AI adoption
              </p>
            </div>
          </div>

          {/* Download Section */}
          <div className="p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-cyan-500/30 space-y-6">
            <h3 className="text-2xl font-bold font-['Orbitron'] text-cyan-300">
              Download Your Results
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 border-cyan-500/30 hover:bg-cyan-500/10 font-['Orbitron']"
              >
                <Download className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Full Report (PDF)</div>
                  <div className="text-xs text-gray-400">Detailed analysis and recommendations</div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto py-4 border-purple-500/30 hover:bg-purple-500/10 font-['Orbitron']"
              >
                <FileText className="w-5 h-5 mr-2" />
                <div className="text-left">
                  <div className="font-semibold">Executive Brief</div>
                  <div className="text-xs text-gray-400">Summary for stakeholders</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Session Info */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500 font-['Inter']">
              Session ID: {sessionId}
            </p>
            
            <SessionResetter variant="outline" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/30 bg-black/20 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm font-['Inter']">
            Powered by AI Skills Coach © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
