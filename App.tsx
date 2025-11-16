import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ArticleDetail from './components/ArticleDetail';
import { useDarkMode } from './hooks/useDarkMode';
import { fetchNewsArticles } from './services/newsService';
import type { Article, ToastMessage } from './types';
import { CATEGORIES } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Toast from './components/Toast';
import BackToTopButton from './components/BackToTopButton';
import SearchModal from './components/SearchModal';
import LiveUpdatesBanner from './components/LiveUpdatesBanner';
import DebugPanel from './components/DebugPanel';

const App: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Latest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedArticleIds, setSavedArticleIds] = useLocalStorage<string[]>('savedArticles', []);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [appView, setAppView] = useState<'home' | 'saved'>('home');
  const [sortOrder, setSortOrder] = useState<'newest' | 'popular'>('newest');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [liveUpdate, setLiveUpdate] = useState<{ message: string; type: 'breaking' | 'update' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, id: Date.now() });
  };
  
  const handleToggleSaveArticle = (articleId: string) => {
    setSavedArticleIds(prevIds => {
      const isSaved = prevIds.includes(articleId);
      if (isSaved) {
        showToast("Article removed from saved");
        return prevIds.filter(id => id !== articleId);
      } else {
        showToast("Article saved!");
        return [...prevIds, articleId];
      }
    });
  };

  const loadArticles = useCallback(async (category: string) => {
    console.log(`\n🔄 [APP] Loading articles for category: ${category}`);
    setIsLoading(true);
    setError(null);
    setSelectedArticle(null);
    
    try {
      const fetchedArticles = await fetchNewsArticles(category);
      console.log(`✅ [APP] Successfully loaded ${fetchedArticles.length} articles`);
      setArticles(fetchedArticles);
    } catch (err) {
      console.error('❌ [APP] Error loading articles:', err);
      
      let errorMessage = 'Failed to fetch articles. The AI might be taking a coffee break. Please try again later.';
      
      if (err instanceof Error) {
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
        
        // Use the specific error message if available
        if (err.message.includes('API key') || err.message.includes('quota') || err.message.includes('Network')) {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      console.log('🏁 [APP] Loading complete');
    }
  }, []);

  useEffect(() => {
    if (appView === 'home') {
      loadArticles(selectedCategory);
    }
    setSelectedTag(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, appView]);

  // Simulate receiving live updates
  useEffect(() => {
      const breakingNewsTimer = setTimeout(() => {
        setLiveUpdate({ 
          message: 'BREAKING: Quantum computing breakthrough announced by leading research lab.',
          type: 'breaking' 
        });
      }, 8000); // Show banner after 8 seconds

      const contentUpdateTimer = setTimeout(() => {
        setLiveUpdate({
            message: 'A new AI-focused article has just been published. Check out the "Latest" section!',
            type: 'update',
        });
      }, 20000); // Show another banner after 20 seconds
      
      return () => {
        clearTimeout(breakingNewsTimer);
        clearTimeout(contentUpdateTimer);
      };
  }, []);

  const handleSelectCategory = (category: string) => {
    setAppView('home');
    setSelectedCategory(category);
    setSearchTerm('');
    setSelectedTag(null);
    setSelectedArticle(null);
  };
  
  const handleSelectTag = (tag: string) => {
    setAppView('home');
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    setSelectedArticle(null);
    setSearchTerm('');
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };
  
  const handleSetAppView = (view: 'home' | 'saved') => {
    setAppView(view);
    setSelectedArticle(null);
    setSelectedTag(null);
    setSearchTerm('');
    if(view === 'home' && selectedCategory !== 'Latest') {
      setSelectedCategory('Latest');
    }
  }

  const handleGoBack = () => {
    setSelectedArticle(null);
  };
  
  const handleSearch = (term: string) => {
     setAppView('home');
     setSearchTerm(term);
     setSelectedArticle(null);
     setSelectedTag(null);
     setIsSearchOpen(false);
  };

  const sortedArticles = useMemo(() => {
    const filtered = articles
      .filter(article => {
          if (appView === 'saved') {
              return savedArticleIds.includes(article.id);
          }
          return true;
      })
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(article => 
        !selectedTag || article.tags.includes(selectedTag)
      );

    if (sortOrder === 'newest') {
      return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (sortOrder === 'popular') {
      return [...filtered].sort((a, b) => b.popularity - a.popularity);
    }
    return filtered;
  }, [articles, appView, savedArticleIds, searchTerm, selectedTag, sortOrder]);
  
  const animationKey = selectedArticle ? selectedArticle.id : selectedCategory + (selectedTag || '') + appView + sortOrder;

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isDarkMode ? 'dark' : ''}`}>
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onSearch={() => setIsSearchOpen(true)}
        articles={articles.slice(0, 5)}
        onSetAppView={handleSetAppView}
        appView={appView}
      />
      <div id="live-updates-banner">
        {liveUpdate && (
          <LiveUpdatesBanner 
            message={liveUpdate.message} 
            type={liveUpdate.type} 
            onClose={() => setLiveUpdate(null)} 
          />
        )}
      </div>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div key={animationKey} className="animate-fadeIn">
          {error ? (
            <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
              <p>{error}</p>
            </div>
          ) : selectedArticle ? (
            <ArticleDetail 
              article={selectedArticle} 
              allArticles={articles}
              onGoBack={handleGoBack} 
              onSelectTag={handleSelectTag}
              onSelectArticle={handleSelectArticle}
              isSaved={savedArticleIds.includes(selectedArticle.id)}
              onToggleSave={handleToggleSaveArticle}
              showToast={showToast}
            />
          ) : (
            <HomePage 
              isLoading={isLoading}
              articles={sortedArticles}
              allArticles={articles}
              onSelectArticle={handleSelectArticle} 
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSelectTag={handleSelectTag}
              activeFilter={selectedTag || searchTerm}
              viewMode={viewMode}
              setViewMode={setViewMode}
              savedArticleIds={savedArticleIds}
              onToggleSave={handleToggleSaveArticle}
              appView={appView}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </div>
      </main>
      <Footer />
      <div id="toast-container">
        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </div>
      <div id="back-to-top">
        <BackToTopButton />
      </div>
      {isSearchOpen && (
          <SearchModal 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSearch={handleSearch}
            allArticles={articles}
            onSelectArticle={handleSelectArticle}
          />
      )}
      <DebugPanel />
    </div>
  );
};

export default App;