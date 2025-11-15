import React from 'react';
import type { Article } from '../types';

interface BreakingNewsTickerProps {
  articles: Article[];
}

const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }
  
  // Duplicate the articles to create a seamless loop effect
  const tickerItems = [...articles, ...articles];

  return (
    <div className="bg-gray-900 dark:bg-black text-white py-2 overflow-hidden relative border-b-2 border-blue-500">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-900 dark:from-black to-transparent flex items-center pl-4">
         <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md animate-pulse">BREAKING</span>
      </div>
      <div className="animate-ticker whitespace-nowrap">
        {tickerItems.map((article, index) => (
          <span key={`${article.id}-${index}`} className="mx-8 text-sm text-gray-300">
            <span className="font-semibold text-white">{article.title}</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-900 dark:from-black to-transparent"></div>
      {/* Fix: Removed non-standard "jsx" prop from style tag. */}
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: inline-block;
          animation: ticker 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BreakingNewsTicker;
