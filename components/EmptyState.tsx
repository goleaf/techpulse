import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="text-center bg-gray-100 dark:bg-gray-800/50 p-12 rounded-lg">
      <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">{message}</p>
    </div>
  );
};

export default EmptyState;