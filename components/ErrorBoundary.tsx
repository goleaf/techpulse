import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('❌ [ERROR BOUNDARY] Uncaught error:', error);
    console.error('Error info:', errorInfo);
    
    this.setState({
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💥</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                The application encountered an unexpected error
              </p>
            </div>

            {this.state.error && (
              <div className="mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                    Error Details:
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-300 font-mono break-words">
                    {this.state.error.message}
                  </p>
                </div>
              </div>
            )}

            {this.state.errorInfo && (
              <details className="mb-6">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Stack Trace (click to expand)
                </summary>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Reload Application
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
              >
                Go Back
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Troubleshooting Tips:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span>🔑</span>
                  <span>Check that your VITE_API_KEY is set correctly in .env.local</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔄</span>
                  <span>Try clearing your browser cache and reloading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🌐</span>
                  <span>Verify your internet connection is stable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🐛</span>
                  <span>Check the browser console (F12) for more details</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
