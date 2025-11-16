
export interface FactCheck {
  claim: string;
  verdict: 'Verified' | 'Likely True' | 'Needs Context' | 'Misleading';
  explanation: string;
}

// Fix: Add Heading interface to be used across components.
export interface Heading {
    level: number;
    text: string;
    slug: string;
}

export interface PollOption {
  text: string;
  votes: number;
}

export interface PollData {
  question: string;
  options: PollOption[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  imageUrl: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readingTime?: number; // Estimated reading time in minutes
  popularity: number; // Score from 0 to 100
  factChecks?: FactCheck[];
  poll?: PollData;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}