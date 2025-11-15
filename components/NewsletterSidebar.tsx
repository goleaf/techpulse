import React, { useState } from 'react';

const NewsletterSidebar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setMessage('Thanks for subscribing!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } else {
        setMessage('Please enter a valid email.');
        setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Newsletter</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get the latest tech news in your inbox.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-3 py-2 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Subscribe
        </button>
      </form>
      {message && (
        <p className="mt-3 text-center text-sm font-medium text-green-600 dark:text-green-400">{message}</p>
      )}
    </div>
  );
};

export default NewsletterSidebar;