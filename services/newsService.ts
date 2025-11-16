import type { Article } from '../types';
import { getMockArticles } from '../data/mockArticles';

// Simulate network delay for realistic experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchNewsArticles = async (category: string): Promise<Article[]> => {
  console.log(`\n📰 [DEBUG] ========== Fetching articles for category: ${category} ==========`);
  const startTime = Date.now();
  
  try {
    // Simulate network delay (50-200ms)
    await delay(50 + Math.random() * 150);
    
    const articles = getMockArticles(category);
    
    const duration = Date.now() - startTime;
    console.log(`\n🎉 [DEBUG] ========== Successfully fetched ${articles.length} articles in ${duration}ms ==========\n`);
    
    return articles;

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`\n❌ [ERROR] ========== Failed to fetch articles after ${duration}ms ==========`);
    console.error("Error details:", error);
    
    throw new Error(`Failed to fetch news articles: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
