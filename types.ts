
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
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}