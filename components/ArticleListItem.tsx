import React from 'react';
import type { Article } from '../types';
import LazyImage from './LazyImage';

interface ArticleListItemProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

const ArticleListItem: React.FC<ArticleListItemProps> = ({ article, onSelectArticle, isSaved, onToggleSave }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(article.id);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-gray-950/50 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group hover:-translate-y-1 relative"
    >
      <div className="absolute top-3 right-3 z-10 sm:hidden">
        <button 
          onClick={handleSaveClick} 
          aria-label={isSaved ? 'Unsave article' : 'Save article'}
          className={`p-2 rounded-full transition-colors duration-200 ${
            isSaved ? 'bg-blue-500 text-white' : 'bg-black/40 text-white backdrop-blur-sm hover:bg-blue-500'
          }`}
        >
          {isSaved ? <BookmarkSolidIcon /> : <BookmarkOutlineIcon />}
        </button>
      </div>
      <div className="sm:w-1/3 flex-shrink-0 cursor-pointer" onClick={() => onSelectArticle(article)}>
        <LazyImage src={article.imageUrl} alt={article.title} className="w-full h-48 sm:h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="cursor-pointer" onClick={() => onSelectArticle(article)}>
          <span className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase">{article.category}</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors">{article.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{article.excerpt}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-2 items-center justify-between">
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
              <span>By {article.author}</span>
              <span>{article.date}</span>
               <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{article.readingTime} min read</span>
              </div>
            </div>
            <div className="hidden sm:block">
               <button 
                onClick={handleSaveClick} 
                aria-label={isSaved ? 'Unsave article' : 'Save article'}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isSaved ? 'bg-blue-100 text-blue-500 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900/50 dark:hover:text-blue-300'
                }`}
              >
                {isSaved ? <BookmarkSolidIcon /> : <BookmarkOutlineIcon />}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const BookmarkOutlineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;
const BookmarkSolidIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>;


export default ArticleListItem;