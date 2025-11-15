import React from 'react';

const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`} />
);

const ArticleCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
    <Skeleton className="w-full h-48" />
    <div className="p-5 flex flex-col flex-grow">
      <Skeleton className="h-3 w-1/4 mb-2" />
      <Skeleton className="h-5 w-full mb-3" />
      <Skeleton className="h-4 w-5/6" />
      <div className="mt-auto pt-4">
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  </div>
);

const SidebarSkeleton = () => (
    <div className="sticky top-24 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-3">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    </div>
);

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {/* Featured Article Skeleton */}
        <div className="mb-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
             <Skeleton className="w-full h-96" />
          </div>
        </div>

        {/* Other Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </div>
      </div>

      <div className="lg:col-span-1">
        <SidebarSkeleton />
      </div>
    </div>
  );
};

export default HomePageSkeleton;
