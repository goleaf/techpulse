import React, { useState } from 'react';

const pollData = {
  question: "Which tech trend are you most excited about?",
  options: [
    { id: 1, text: "AI Assistants", votes: 42 },
    { id: 2, text: "Quantum Computing", votes: 18 },
    { id: 3, text: "AR/VR Metaverse", votes: 25 },
    { id: 4, text: "Decentralized Web", votes: 15 },
  ],
};

const Poll: React.FC = () => {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = () => {
    if (selectedOption !== null) {
      // In a real app, you would send this vote to a server.
      // Here, we just update the state to show the results.
      setVoted(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">Community Poll</h3>
      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{pollData.question}</p>
      <div className="space-y-3">
        {pollData.options.map(option => {
          const percentage = voted ? ((option.votes / totalVotes) * 100).toFixed(0) : 0;
          return (
            <div key={option.id}>
              {!voted ? (
                <button
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-2.5 rounded-md border-2 transition-colors ${
                    selectedOption === option.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  }`}
                >
                  {option.text}
                </button>
              ) : (
                <div>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>{option.text}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!voted && (
        <button
          onClick={handleVote}
          disabled={selectedOption === null}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Vote
        </button>
      )}
    </div>
  );
};

export default Poll;