import React, { useState, useRef, useEffect } from 'react';
import type { FactCheck } from '../types';

interface FactCheckBadgeProps {
  factCheck: FactCheck;
}

const getVerdictStyles = (verdict: FactCheck['verdict']) => {
  switch (verdict) {
    case 'Verified':
      return {
        icon: '✅',
        bgColor: 'bg-green-100 dark:bg-green-900',
        textColor: 'text-green-800 dark:text-green-200',
        borderColor: 'border-green-500',
        title: 'Verified',
      };
    case 'Likely True':
      return {
        icon: '👍',
        bgColor: 'bg-blue-100 dark:bg-blue-900',
        textColor: 'text-blue-800 dark:text-blue-200',
        borderColor: 'border-blue-500',
        title: 'Likely True',
      };
    case 'Needs Context':
      return {
        icon: '🔍',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900',
        textColor: 'text-yellow-800 dark:text-yellow-200',
        borderColor: 'border-yellow-500',
        title: 'Needs Context',
      };
    case 'Misleading':
      return {
        icon: '⚠️',
        bgColor: 'bg-red-100 dark:bg-red-900',
        textColor: 'text-red-800 dark:text-red-200',
        borderColor: 'border-red-500',
        title: 'Misleading',
      };
    default:
      return {
        icon: '❓',
        bgColor: 'bg-gray-100 dark:bg-gray-700',
        textColor: 'text-gray-800 dark:text-gray-200',
        borderColor: 'border-gray-500',
        title: 'Fact-Check',
      };
  }
};

const FactCheckBadge: React.FC<FactCheckBadgeProps> = ({ factCheck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const styles = getVerdictStyles(factCheck.verdict);

  return (
    <div className="inline-block relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${styles.bgColor} ${styles.textColor} text-xs font-bold ring-2 ring-white dark:ring-gray-800 cursor-pointer -translate-y-1 ml-1`}
        aria-label={`Fact-check: ${factCheck.verdict}`}
      >
        {styles.icon}
      </button>
      {isOpen && (
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 rounded-lg shadow-2xl z-20 ${styles.bgColor} border-2 ${styles.borderColor} animate-fadeIn`}>
          <h4 className={`text-lg font-bold ${styles.textColor} mb-2`}>{styles.title}</h4>
          <p className={`${styles.textColor} font-semibold text-sm mb-2 border-l-4 ${styles.borderColor} pl-2 italic`}>
            "{factCheck.claim}"
          </p>
          <p className={`${styles.textColor} text-sm`}>{factCheck.explanation}</p>
           <div className={`absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 ${styles.borderColor}`}></div>
        </div>
      )}
    </div>
  );
};

export default FactCheckBadge;