'use client';

import { SessionStarter } from '@/components/SessionStarter';
import { Sparkles, Brain, Target } from 'lucide-react';

export default function StartFlowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Skills Coach
          </h1>
        </div>
      </header>

      {/* Body */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-['Orbitron']">AI-Powered Assessment</span>
            </div>
            
            <h2 className="text-5xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Discover Your AI Readiness
            </h2>
            
            <p className="text-xl text-gray-300 font-['Inter'] max-w-xl mx-auto">
              Take a quick 9-question assessment to evaluate your AI skills and get personalized recommendations.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-lg border border-cyan-500/20">
              <Brain className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold text-cyan-300 font-['Orbitron'] mb-2">
                Smart Analysis
              </h3>
              <p className="text-gray-400 text-sm font-['Inter']">
                AI-powered evaluation of your skills and readiness
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
              <Target className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-purple-300 font-['Orbitron'] mb-2">
                Actionable Insights
              </h3>
              <p className="text-gray-400 text-sm font-['Inter']">
                Get personalized recommendations and next steps
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <SessionStarter />
          </div>

          {/* Info */}
          <p className="text-sm text-gray-500 font-['Inter']">
            Takes approximately 5-7 minutes to complete
          </p>
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
