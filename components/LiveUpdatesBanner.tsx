import React, { useState, useEffect } from 'react';

interface LiveUpdatesBannerProps {
  message: string;
  type: 'breaking' | 'update';
  onClose: () => void;
}

const LiveUpdatesBanner: React.FC<LiveUpdatesBannerProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Allow time for fade-out animation before calling parent onClose
    setTimeout(onClose, 300);
  };

  const icon = type === 'breaking' ? <ZapIcon /> : <RefreshIcon />;
  const bgColor = type === 'breaking' 
    ? 'bg-red-500 border-red-600' 
    : 'bg-blue-500 border-blue-600';

  return (
    <div 
      className={`transition-all duration-300 ease-in-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${bgColor} text-white border-b-2 dark:border-b-4 dark:${type === 'breaking' ? 'border-red-400' : 'border-blue-400'}`}
      role="alert"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center min-w-0">
          <span className="p-1 bg-black/20 rounded-full mr-3 flex-shrink-0">
            {icon}
          </span>
          <p className="font-semibold text-sm md:text-base truncate">{message}</p>
        </div>
        <button 
          onClick={handleClose} 
          aria-label="Dismiss"
          className="p-1 rounded-full hover:bg-black/20 transition-colors flex-shrink-0"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

// Icons
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>;
const RefreshIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default LiveUpdatesBanner;
