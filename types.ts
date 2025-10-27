
export enum GenerationMode {
  Standard = 'Standard',
  FineTuned = 'Fine-Tuned',
  RAG = 'RAG',
}

export interface Article {
  id: string;
  title: string;
  content: string;
  keywords: string[];
}

// Add a declaration for the marked library loaded from CDN
declare global {
  interface Window {
    marked: {
      parse: (markdown: string) => string;
    };
  }
}
