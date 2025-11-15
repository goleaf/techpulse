import React, { useState, useEffect, useCallback } from 'react';

interface ArticleReadingProgressProps {
  target: React.RefObject<HTMLElement>;
}

const ArticleReadingProgress: React.FC<ArticleReadingProgressProps> = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollListener = useCallback(() => {
    if (!target.current) {
      return;
    }

    const element = target.current;
    const { top, height } = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // The total distance to scroll through the element
    const scrollableHeight = height - viewportHeight;

    if (scrollableHeight <= 0) {
      // If the element is shorter than the viewport, progress is either 0 or 100
      setReadingProgress(top < 0 ? 100 : 0);
      return;
    }
    
    // The amount scrolled past the top of the element
    const scrollDistance = -top;
    
    // Calculate progress percentage
    const progress = (scrollDistance / scrollableHeight) * 100;

    // Clamp the value between 0 and 100
    setReadingProgress(Math.max(0, Math.min(progress, 100)));

  }, [target]);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', scrollListener); // Also listen for resize
    scrollListener(); // Initial check
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
    };
  }, [scrollListener]);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ArticleReadingProgress;
