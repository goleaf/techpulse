import React, { useState, useEffect } from 'react';
import type { Heading } from '../utils/contentUtils';

interface TableOfContentsProps {
  headings: Heading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            if(element) {
                observer.unobserve(element);
            }
        });
    };
  }, [headings]);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSlug(slug);
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden xl:block sticky top-24 self-start">
      <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">On this page</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                onClick={(e) => handleLinkClick(e, heading.slug)}
                className={`transition-colors text-sm font-medium ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeSlug === heading.slug
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TableOfContents;