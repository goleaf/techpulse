import React, { useState, useEffect, useMemo } from 'react';
import type { Article } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, allArticles, onSelectArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
      setRecentSearches(updatedSearches);
      onSearch(term);
      setSearchTerm('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };
  
  const handleSuggestionClick = (article: Article) => {
    onSelectArticle(article);
    onClose();
  };

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allArticles
      .filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [searchTerm, allArticles]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center p-4 pt-[10vh] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl h-fit max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleFormSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for articles, topics, or keywords..."
              className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <SearchIcon />
            </div>
          </form>
        </div>
        <div className="p-6 overflow-y-auto">
          {searchTerm ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Suggestions</h3>
              {suggestions.length > 0 ? (
                <ul className="space-y-2">
                  {suggestions.map(article => (
                    <li key={article.id}>
                      <button onClick={() => handleSuggestionClick(article)} className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{article.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{article.excerpt}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No suggestions found.</p>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Recent Searches</h3>
              {recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(term => (
                    <button key={term} onClick={() => handleSearch(term)} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">No recent searches.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

export default SearchModal;