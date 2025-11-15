import React, { useEffect, useState } from 'react';
import type { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Allow time for fade-out animation before dismissing
        setTimeout(onDismiss, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) {
    return null;
  }

  const bgColor = toast.type === 'success' ? 'bg-gray-800 dark:bg-gray-200' : 'bg-red-600';
  const textColor = toast.type === 'success' ? 'text-white dark:text-gray-900' : 'text-white';
  
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${bgColor} ${textColor} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      role="alert"
    >
      <p className="font-semibold text-sm">{toast.message}</p>
    </div>
  );
};

export default Toast;