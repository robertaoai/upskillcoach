'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CompletionFormProps {
  onComplete: (optIn: boolean) => void;
}

export function CompletionForm({ onComplete }: CompletionFormProps) {
  const [optIn, setOptIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(optIn);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start space-x-3">
        <Checkbox
          id="opt-in"
          checked={optIn}
          onCheckedChange={(checked) => setOptIn(checked as boolean)}
          className="mt-1"
        />
        <Label
          htmlFor="opt-in"
          className="text-sm text-gray-300 cursor-pointer leading-relaxed"
        >
          I'd like to receive my detailed assessment report and personalized recommendations via email
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#00FFFF] hover:bg-[#00FFFF]/80 text-black font-['Orbitron'] font-bold py-6 text-lg neon-glow-cyan"
      >
        View My Results
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your privacy is important to us. We'll never share your information.
      </p>
    </form>
  );
}
