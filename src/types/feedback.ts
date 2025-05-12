
export type FeedbackType = 'issue' | 'suggestion' | 'question' | 'other';

export interface FeedbackFormData {
  type: FeedbackType;
  email: string;
  subject: string;
  message: string;
  screenshot?: File | null;
  screenshotBase64?: string;
}

export interface SlackPayload {
  blocks: any[];
}
