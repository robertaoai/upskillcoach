export interface StartSessionResponse {
  session: {
    id: string;
    user_id: string;
    persona_hint: string;
    started_at: string;
    completed_at: string | null;
    readiness_score: number | null;
    urgency_level: string | null;
    tone_score: number | null;
    roi_estimate: string | null;
    paid_annex: boolean;
    brief_url: string | null;
    pdf_url: string | null;
    metadata: Record<string, any> | null;
    current_state: string;
    created_at: string;
    updated_at: string;
  };
  first_prompt: string;
}

export interface AnswerResponse {
  reply_text: string;
  recommended_action: string | null;
  tags: string[] | null;
  explainability: string | null;
  session_status: string;
  next_prompt: string;
  is_complete: boolean;
}

export interface CompleteResponse {
  readiness_score: number;
  roi_estimate: string;
  summary_html: string;
}
