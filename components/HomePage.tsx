import React from 'react';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';
import HomePageSkeleton from './skeletons/HomePageSkeleton';
import ArticleListItem from './ArticleListItem';
import EmptyState from './EmptyState';
// Fix: Import the 'LazyImage' component.
import LazyImage from './LazyImage';

interface HomePageProps {
  isLoading: boolean;
  articles: Article[];
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
  activeFilter: string | null;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  savedArticleIds: string[];
  onToggleSave: (articleId: string) => void;
  appView: 'home' | 'saved';
  sortOrder: 'newest' | 'popular';
  setSortOrder: (order: 'newest' | 'popular') => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  isLoading,
  articles, 
  allArticles,
  onSelectArticle, 
  onSelectCategory,
  selectedCategory,
  selectedTag,
  onSelectTag,
  activeFilter,
  viewMode,
  setViewMode,
  savedArticleIds,
  onToggleSave,
  appView,
  sortOrder,
  setSortOrder,
}) => {
  if (isLoading) {
    return <HomePageSkeleton />;
  }
  
  if (!articles || articles.length === 0) {
    if (appView === 'saved') {
      return (
        <EmptyState
          title="No Saved Articles"
          message="You haven't saved any articles yet. Click the bookmark icon on any article to save it for later."
        />
      );
    }
    return (
      <EmptyState
        title="No Articles Found"
        message={`No articles match${activeFilter ? ` the filter "${activeFilter}"` : ' your search'}. Try a different query or category.`}
      />
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {appView === 'saved' && (
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-blue-500 pb-2">Saved Articles</h1>
        )}
        {/* Featured Article */}
        {viewMode === 'grid' && appView === 'home' && (
          <div className="mb-8 group cursor-pointer" onClick={() => onSelectArticle(featuredArticle)}>
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <LazyImage src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                <span className="text-sm font-semibold bg-blue-500 px-3 py-1 rounded-full">{featuredArticle.category}</span>
                <h2 className="text-3xl lg:text-4xl font-black mt-2 group-hover:underline">{featuredArticle.title}</h2>
                <p className="mt-2 text-gray-300 hidden md:block">{featuredArticle.excerpt}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Controls: View Mode & Sort */}
        <div className="flex justify-between items-center mb-4 gap-4">
          {appView === 'home' ? (
            <div className="flex items-center gap-2">
              <label htmlFor="sort-order" className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</label>
              <select 
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'popular')}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-md border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          ) : <div />}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-200 dark:bg-gray-700">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                  <GridIcon />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>
                  <ListIcon />
              </button>
          </div>
        </div>

        {/* Other Articles */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(appView === 'home' ? otherArticles : articles).map((article) => (
              <ArticleCard key={article.id} article={article} onSelectArticle={onSelectArticle} isSaved={savedArticleIds.includes(article.id)} onToggleSave={onToggleSave} />
            ))}
          </div>
        ) : (
           <div className="space-y-4">
            {articles.map((article) => (
              <ArticleListItem key={article.id} article={article} onSelectArticle={onSelectArticle} isSaved={savedArticleIds.includes(article.id)} onToggleSave={onToggleSave} />
            ))}
           </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <Sidebar 
            articles={allArticles} 
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
            onSelectTag={onSelectTag}
            selectedTag={selectedTag}
            onSelectArticle={onSelectArticle}
        />
      </div>
    </div>
  );
};

const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const ListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;

export default HomePage;