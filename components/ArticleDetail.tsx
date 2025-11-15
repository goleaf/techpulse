import React, {useRef, useState, useEffect, useMemo} from 'react';
import type { Article } from '../types';
import ArticleReadingProgress from './ArticleReadingProgress';
import Breadcrumb from './Breadcrumb';
import LazyImage from './LazyImage';
import ImageLightbox from './ImageLightbox';
import AuthorBio from './AuthorBio';
import CommentsSection from './CommentsSection';
import { parseHeadings, Heading } from '../utils/contentUtils';
import TableOfContents from './TableOfContents';

interface ArticleDetailProps {
  article: Article;
  allArticles: Article[];
  onGoBack: () => void;
  onSelectTag: (tag: string) => void;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

type FontSize = 'base' | 'lg' | 'xl';

const MarkdownRenderer: React.FC<{ content: string; headings: Heading[] }> = ({ content, headings }) => {
    let headingIndex = 0;
    const paragraphs = content.split('\n\n');
    
    return (
        <>
            {paragraphs.map((para, index) => {
                if (para.startsWith('#')) {
                    const currentHeading = headings[headingIndex++];
                    if (currentHeading) {
                        const level = para.match(/^#+/)![0].length;
                        const text = para.substring(level).trim();
                        
                        if (level === 3) {
                             return <h3 key={index} id={currentHeading.slug} className="text-xl md:text-2xl font-bold mt-6 mb-3 scroll-mt-24">{text}</h3>;
                        }
                        if (level === 2) {
                             return <h2 key={index} id={currentHeading.slug} className="text-2xl md:text-3xl font-bold mt-8 mb-4 scroll-mt-24">{text}</h2>;
                        }
                        if (level === 1) {
                             return <h1 key={index} id={currentHeading.slug} className="text-3xl md:text-4xl font-black mt-10 mb-6 scroll-mt-24">{text}</h1>;
                        }
                    }
                }
                return <p key={index} className="mb-6 leading-relaxed">{para}</p>;
            })}
        </>
    );
};


const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, allArticles, onGoBack, onSelectTag, onSelectArticle, isSaved, onToggleSave, showToast }) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<FontSize>('lg');
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const headings = useMemo(() => parseHeadings(article.content), [article.content]);

  const fontSizes: FontSize[] = ['base', 'lg', 'xl'];
  const handleFontSizeChange = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % fontSizes.length;
    setFontSize(fontSizes[nextIndex]);
  };
  
  useEffect(() => {
      if (isLightboxOpen) {
          document.body.classList.add('body-no-scroll');
      } else {
          document.body.classList.remove('body-no-scroll');
      }
      return () => document.body.classList.remove('body-no-scroll');
  }, [isLightboxOpen]);

  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);
    
  const handleCopyLink = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied to clipboard!');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }, (err) => {
        console.error('Failed to copy link: ', err);
        showToast('Failed to copy link', 'error');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
    <ArticleReadingProgress target={articleRef} />
    
    <div className="flex gap-12 max-w-7xl mx-auto">
       {headings.length > 2 && <TableOfContents headings={headings} />}

      <div className="max-w-4xl flex-grow">
      
        <div id="breadcrumb-nav">
          <Breadcrumb category={article.category} onGoBack={onGoBack} />
        </div>

        <div ref={articleRef}>
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
            <header>
              <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase">{article.category}</span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-2 mb-4 leading-tight">{article.title}</h1>
              <div id="article-controls" className="flex items-center justify-between flex-wrap gap-x-3 gap-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap gap-x-3 gap-y-1">
                  <span>By {article.author}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{article.date}</span>
                  <span className="hidden sm:inline">•</span>
                   <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{article.readingTime} min read</span>
                   </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={handlePrint} aria-label="Print article" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><PrintIcon /></button>
                  <button onClick={handleFontSizeChange} aria-label="Change font size" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><FontIcon /></button>
                  <button 
                    onClick={() => onToggleSave(article.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {isSaved ? <BookmarkSolidIcon /> : <BookmarkOutlineIcon />}
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </header>
            
            <div className="my-8 rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => setLightboxOpen(true)}>
               <LazyImage src={article.imageUrl} alt={article.title} className="w-full" />
            </div>
            
            <div className={`prose prose-${fontSize} dark:prose-invert max-w-none text-gray-700 dark:text-gray-300`}>
                 <MarkdownRenderer content={article.content} headings={headings} />
            </div>

            <footer className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-8">
              <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => onSelectTag(tag)}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
              </div>
               <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Share This Article</h4>
                  <div className="flex items-center gap-2">
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-white dark:hover:text-black transition-colors">
                        <TwitterIcon />
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
                        <FacebookIcon />
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-sky-600 hover:text-white transition-colors">
                        <LinkedInIcon />
                    </a>
                    <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=Check out this article: ${encodeURIComponent(pageUrl)}`} aria-label="Share via Email" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
                        <EmailIcon />
                    </a>
                    <button 
                      onClick={handleCopyLink} 
                      aria-label={isCopied ? "Link Copied!" : "Copy link"} 
                      className={`p-2 rounded-full transition-all duration-200 ${
                        isCopied 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {isCopied ? <CheckIconSolid /> : <LinkIcon />}
                    </button>
                  </div>
              </div>
              <AuthorBio authorName={article.author} />
            </footer>
          </article>
        </div>
        
        <div id="comments-section">
          <CommentsSection articleId={article.id} />
        </div>

        {relatedArticles.length > 0 && (
          <div id="related-articles" className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map(related => (
                      <div key={related.id} onClick={() => onSelectArticle(related)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-gray-950/50 transition-all duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1">
                          <LazyImage src={related.imageUrl} alt={related.title} className="w-full h-32 object-cover" />
                          <div className="p-4">
                              <h3 className="font-bold text-md text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">{related.title}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{related.date}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        )}

      </div>
    </div>
    {isLightboxOpen && (
        <ImageLightbox src={article.imageUrl} alt={article.title} onClose={() => setLightboxOpen(false)} />
    )}
    </>
  );
};

const BookmarkOutlineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>;
const BookmarkSolidIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>;
const FontIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v12M18 7h-5m2 0v8" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;
const CheckIconSolid = () => <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;

const TwitterIcon = () => <svg className="h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const FacebookIcon = () => <svg className="h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Facebook</title><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29h-3.128V11.21h3.128V8.65c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.492h-3.12V24h5.698c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z"/></svg>;
const LinkedInIcon = () => <svg className="h-5 w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
const EmailIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LinkIcon = () => <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

export default ArticleDetail;