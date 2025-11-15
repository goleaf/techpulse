import { GoogleGenAI, Type } from "@google/genai";
import type { Article } from '../types';
import { calculateReadingTime } from "../utils/contentUtils";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const articleSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique identifier for the article in UUID format.' },
    title: { type: Type.STRING, description: 'A catchy and relevant title for the news article.' },
    excerpt: { type: Type.STRING, description: 'A brief, 2-sentence summary of the article.' },
    content: { type: Type.STRING, description: 'The full article content in Markdown format, at least 6 paragraphs long, with headings and subheadings for better structure.' },
    category: { type: Type.STRING, description: 'The primary category of the article.' },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of 3-5 relevant string tags, each starting with a '#' (e.g., '#AI', '#MachineLearning')."
    },
    author: { type: Type.STRING, description: 'A fictional author name, e.g., "Alex Chen" or "TechPulse AI".' },
    date: { type: Type.STRING, description: 'A recent publication date in "Month Day, Year" format.' },
  },
  required: ['id', 'title', 'excerpt', 'content', 'category', 'tags', 'author', 'date'],
};

const generatePrompt = (category: string) => {
  if (category === 'Latest') {
    return `Generate a diverse list of 12 recent and compelling tech news articles covering various fields like AI, Software, Hardware, and Cybersecurity. Ensure the topics are current and engaging for a tech-savvy audience.`;
  }
  return `Generate a list of 12 compelling tech news articles specifically about ${category}. Ensure the topics are current, in-depth, and engaging for an audience interested in ${category}.`;
};

export const fetchNewsArticles = async (category: string): Promise<Article[]> => {
  try {
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: generatePrompt(category),
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: articleSchema,
            },
        },
    });
    
    const responseText = result.text.trim();
    const articlesData = JSON.parse(responseText);

    return articlesData.map((article: any) => ({
      ...article,
      imageUrl: `https://picsum.photos/seed/${article.id}/800/600`,
      readingTime: calculateReadingTime(article.content),
      // Generate a deterministic popularity score based on article properties
      popularity: Math.floor((article.title.length * 2 + article.content.length / 10 + article.tags.length * 5) % 100),
    }));

  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    throw new Error("Failed to generate news articles.");
  }
};