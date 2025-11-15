import React from 'react';

interface BreadcrumbProps {
  category: string;
  onGoBack: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, onGoBack }) => {
  return (
    <nav className="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center" aria-label="Breadcrumb">
      <button onClick={onGoBack} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
        Home
      </button>
      <svg className="w-3 h-3 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
      <span>{category}</span>
    </nav>
  );
};

export default Breadcrumb;
