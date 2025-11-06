'use client';

interface HtmlSummaryViewProps {
  summary_html: string;
}

export function HtmlSummaryView({ summary_html }: HtmlSummaryViewProps) {
  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: summary_html }}
    />
  );
}
