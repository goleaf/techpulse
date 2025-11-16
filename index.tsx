
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import StartupCheck from './components/StartupCheck';
import './index.css';

console.log('🚀 [APP] Application starting...');
console.log('🔧 [APP] Environment:', import.meta.env.MODE);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StartupCheck>
        <App />
      </StartupCheck>
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('✅ [APP] Application mounted successfully');
