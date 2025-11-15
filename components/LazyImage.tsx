import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, placeholderClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // Fix: The useRef hook requires an initial value. Provided null and updated type.
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imgRef.current) {
              imgRef.current.src = src;
            }
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src]);

  return (
    <div className={`relative ${placeholderClassName || 'bg-gray-200 dark:bg-gray-700'}`}>
      <img
        ref={imgRef}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!isLoaded && (
        <div className={`absolute inset-0 animate-pulse ${placeholderClassName || 'bg-gray-200 dark:bg-gray-700'}`} />
      )}
    </div>
  );
};

export default LazyImage;
