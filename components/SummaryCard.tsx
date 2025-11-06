'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  readiness_score: number;
  roi_estimate: string;
}

export function SummaryCard({ readiness_score, roi_estimate }: SummaryCardProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#00FFFF] font-['Orbitron']">
            <TrendingUp className="w-5 h-5" />
            Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-[#00FFFF] neon-text-cyan">
            {readiness_score}%
          </div>
          <p className="text-gray-400 mt-2">
            Your organization's AI readiness level
          </p>
        </CardContent>
      </Card>

      <Card className="bg-black/40 backdrop-blur-xl border-2 border-[#00FFFF]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#00FFFF] font-['Orbitron']">
            <DollarSign className="w-5 h-5" />
            ROI Estimate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-[#00FFFF] neon-text-cyan">
            {roi_estimate}
          </div>
          <p className="text-gray-400 mt-2">
            Estimated return on AI investment
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
