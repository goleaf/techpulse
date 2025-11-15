import React from 'react';
import type { Article } from '../types';
import { CATEGORIES } from '../constants';
import Calendar from './Calendar';
import Poll from './Poll';
import SocialFollow from './SocialFollow';
import NewsletterSidebar from './NewsletterSidebar';
import WeatherWidget from './WeatherWidget';

interface SidebarProps {
  articles: Article[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onSelectTag: (tag: string) => void;
  selectedTag: string | null;
  onSelectArticle: (article: Article) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ articles, onSelectCategory, selectedCategory, onSelectTag, selectedTag, onSelectArticle }) => {

  const popularTags = React.useMemo(() => {
    const tagCount: { [key: string]: number } = {};
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(entry => entry[0]);
  }, [articles]);

  const trendingArticles = articles.slice(0, 4);

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Weather Widget */}
      <WeatherWidget />
      
      {/* Trending Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">Trending</h3>
        <ul className="space-y-4">
          {trendingArticles.map((article, index) => (
            <li key={article.id} className="flex items-start space-x-4 cursor-pointer group" onClick={() => onSelectArticle(article)}>
              <span className="text-3xl font-black text-gray-300 dark:text-gray-600">0{index + 1}</span>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors leading-tight">{article.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">By {article.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Calendar */}
      <Calendar />
      
      {/* Poll */}
      <Poll />

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">Categories</h3>
        <ul className="space-y-2">
          {CATEGORIES.map(category => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors font-medium text-gray-700 dark:text-gray-300 ${
                    selectedCategory === category ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => onSelectTag(tag)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                    selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Follow Us */}
      <SocialFollow />
      
      {/* Newsletter */}
      <NewsletterSidebar />
      
      {/* Advertisement */}
       <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <h4 className="font-bold text-gray-700 dark:text-gray-300">Advertisement</h4>
            <div className="mt-4 bg-gray-300 dark:bg-gray-700 h-48 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
                Your Ad Here
            </div>
       </div>

    </aside>
  );
};

export default Sidebar;