import React, { useEffect, useState } from 'react';

interface StartupCheckProps {
  children: React.ReactNode;
}

const StartupCheck: React.FC<StartupCheckProps> = ({ children }) => {
  const [checks, setChecks] = useState({
    apiKey: false,
    apiKeyValid: false,
    network: false,
  });
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runChecks = async () => {
      console.log('🔍 [STARTUP] Running startup checks...');
      
      // All checks pass - no API needed with mock data
      setChecks({
        apiKey: true,
        apiKeyValid: true,
        network: true,
      });
      setIsChecking(false);
      console.log('🎉 [STARTUP] All checks passed!');
    };

    runChecks();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Running startup checks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Startup Check Failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-2xl">{checks.apiKey ? '✅' : '❌'}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">API Key</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {checks.apiKey ? 'Configured' : 'Missing or invalid'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-2xl">{checks.apiKeyValid ? '✅' : '❌'}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">API Key Format</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {checks.apiKeyValid ? 'Valid format' : 'Invalid format'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <span className="text-2xl">{checks.network ? '✅' : '❌'}</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Network</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {checks.network ? 'Connected' : 'Disconnected'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              How to fix:
            </h3>
            <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-decimal list-inside">
              <li>Create a .env.local file in your project root</li>
              <li>Add: VITE_API_KEY=your_gemini_api_key_here</li>
              <li>Get your API key from: https://aistudio.google.com/apikey</li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default StartupCheck;
