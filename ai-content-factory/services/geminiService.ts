
import { GoogleGenAI } from "@google/genai";
import { GenerationMode, Article } from '../types';
import { KNOWLEDGE_BASE } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const findRelevantContext = (prompt: string): Article | null => {
  const promptWords = new Set(prompt.toLowerCase().split(/\s+/));
  if (promptWords.size === 0) return null;

  let bestMatch: Article | null = null;
  let maxScore = -1;

  KNOWLEDGE_BASE.forEach(article => {
    let score = 0;
    article.keywords.forEach(keyword => {
      if (prompt.toLowerCase().includes(keyword)) {
        score++;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = article;
    }
  });

  return maxScore > 0 ? bestMatch : null;
};

interface GenerationParams {
  prompt: string;
  mode: GenerationMode;
  temperature: number;
}

export const generateContentStream = async ({ prompt, mode, temperature }: GenerationParams) => {
  let finalPrompt = prompt;
  let systemInstruction: string | undefined;
  let relevantContext: Article | null = null;
  
  if (mode === GenerationMode.FineTuned) {
    systemInstruction = "You are an expert copywriter specializing in finance and investment. Your tone is formal, analytical, and insightful. You generate content based on the provided prompts, assuming they are from a user knowledgeable in financial topics.";
  }
  
  if (mode === GenerationMode.RAG) {
    relevantContext = findRelevantContext(prompt);
    if (relevantContext) {
      finalPrompt = `
        Based on the following context from our knowledge base, please answer the user's query.
        
        --- CONTEXT START ---
        Title: ${relevantContext.title}
        Content: ${relevantContext.content}
        --- CONTEXT END ---
        
        User Query: "${prompt}"
      `;
    } else {
        finalPrompt = `The knowledge base did not contain specific information for your query. Answering generally: "${prompt}"`;
    }
  }

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: finalPrompt,
    config: {
      systemInstruction: systemInstruction,
      temperature: temperature,
    }
  });

  return { stream, relevantContext };
};
