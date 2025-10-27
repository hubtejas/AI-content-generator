
import { Article } from './types';

export const KNOWLEDGE_BASE: Article[] = [
  {
    id: 'finance-1',
    title: 'Understanding Compound Interest',
    content: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. The formula for compound interest is A = P(1 + r/n)^(nt), where A is the amount of money accumulated after n years, including interest. P is the principal amount. r is the annual interest rate. n is the number of times that interest is compounded per year. t is the number of years the money is invested for.',
    keywords: ['finance', 'interest', 'compound', 'investment', 'money', 'formula'],
  },
  {
    id: 'real-estate-1',
    title: 'Beginner\'s Guide to Real Estate Investment',
    content: 'Real estate investment involves the purchase, ownership, management, rental and/or sale of real estate for profit. One of the primary ways to make money in real estate is through appreciation, which is an increase in the property’s value over time. Another way is through rental income. Key considerations include location, property condition, market trends, and financing options. Diversifying your real estate portfolio can mitigate risks.',
    keywords: ['real estate', 'investment', 'property', 'rental', 'market', 'appreciation'],
  },
  {
    id: 'tech-1',
    title: 'The Rise of Artificial Intelligence',
    content: 'Artificial Intelligence (AI) is a transformative technology. It encompasses machine learning, where algorithms are trained on data to make predictions or decisions. Subfields include natural language processing (NLP), computer vision, and robotics. AI is impacting various industries, from healthcare to autonomous vehicles. Ethical considerations are a major topic of discussion.',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'nlp', 'technology', 'robotics'],
  },
];

export const FINE_TUNE_SAMPLE_DATA = `{"prompt": "What is the key to long-term investing?", "completion": "The key to long-term investing is patience and consistency. Focusing on compound growth and ignoring short-term market fluctuations is crucial for success."}
{"prompt": "Explain diversification.", "completion": "Diversification means spreading your investments across various assets to reduce risk. If one investment performs poorly, others may perform well, balancing your portfolio."}
{"prompt": "Should I invest in stocks or bonds?", "completion": "The choice between stocks and bonds depends on your risk tolerance and financial goals. Stocks offer higher potential returns but come with higher risk, while bonds are generally safer but offer lower returns. A balanced portfolio often includes both."}`;

