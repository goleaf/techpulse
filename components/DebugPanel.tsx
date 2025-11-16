import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: number;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  data?: any;
}

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'error' | 'warn' | 'info'>('all');

  useEffect(() => {
    // Intercept console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    const addLog = (type: LogEntry['type'], args: any[]) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prev => [...prev.slice(-99), { 
        timestamp: Date.now(), 
        type, 
        message,
        data: args.length > 1 ? args : undefined 
      }]);
    };

    console.log = (...args) => {
      originalConsole.log(...args);
      if (args[0]?.includes?.('[DEBUG]') || args[0]?.includes?.('[APP]')) {
        addLog('log', args);
      }
    };

    console.error = (...args) => {
      originalConsole.error(...args);
      if (args[0]?.includes?.('[ERROR]') || args[0]?.includes?.('[APP]')) {
        addLog('error', args);
      }
    };

    console.warn = (...args) => {
      originalConsole.warn(...args);
      if (args[0]?.includes?.('[WARN]') || args[0]?.includes?.('[APP]')) {
        addLog('warn', args);
      }
    };

    console.info = (...args) => {
      originalConsole.info(...args);
      addLog('info', args);
    };

    return () => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    };
  }, []);

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.type === filter
  );

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'warn': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-700 dark:text-gray-300';
    }
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
        title="Toggle Debug Panel"
      >
        <span className="text-lg">🐛</span>
        <span className="text-sm font-medium">Debug</span>
        {logs.filter(l => l.type === 'error').length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {logs.filter(l => l.type === 'error').length}
          </span>
        )}
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[600px] h-[500px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐛</span>
              <h3 className="font-bold text-gray-900 dark:text-white">Debug Console</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({filteredLogs.length} logs)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Filter Buttons */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="all">All</option>
                <option value="error">Errors</option>
                <option value="warn">Warnings</option>
                <option value="info">Info</option>
              </select>
              <button
                onClick={() => setLogs([])}
                className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Logs */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs">
            {filteredLogs.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No logs to display
              </div>
            ) : (
              filteredLogs.map((log, index) => (
                <div
                  key={index}
                  className={`p-2 rounded border border-gray-200 dark:border-gray-700 ${getLogColor(log.type)}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0">{getLogIcon(log.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="whitespace-pre-wrap break-words">
                        {log.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Environment: {import.meta.env.MODE}</span>
              <span>API Key: {import.meta.env.VITE_API_KEY ? '✅ Set' : '❌ Missing'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;
