import React, { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { PollData, PollOption } from '../types';

interface ArticlePollProps {
  articleId: string;
  poll: PollData;
}

const ArticlePoll: React.FC<ArticlePollProps> = ({ articleId, poll }) => {
  const pollId = `poll-vote-${articleId}`;
  const [votedOption, setVotedOption] = useLocalStorage<string | null>(pollId, null);
  const [pollData, setPollData] = useState<PollData>(poll);

  const totalVotes = useMemo(() => {
    return pollData.options.reduce((sum, option) => sum + option.votes, 0);
  }, [pollData]);

  const handleVote = (optionText: string) => {
    if (votedOption) return;

    setVotedOption(optionText);

    // In a real app, you would send this vote to a server.
    // Here, we just update the local state for demonstration.
    setPollData(prevData => {
      const newOptions = prevData.options.map(opt => {
        if (opt.text === optionText) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });
      return { ...prevData, options: newOptions };
    });
  };

  return (
    <div className="my-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Reader Poll</h3>
      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-4">{pollData.question}</p>
      <div className="space-y-3">
        {pollData.options.map((option, index) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const hasVoted = votedOption !== null;
          const isVotedOption = votedOption === option.text;

          return (
            <div key={index}>
              {!hasVoted ? (
                <button
                  onClick={() => handleVote(option.text)}
                  className="w-full text-left p-3 rounded-md border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 font-medium text-gray-700 dark:text-gray-300"
                >
                  {option.text}
                </button>
              ) : (
                <div 
                    className={`relative p-3 rounded-md border-2 transition-all duration-300 ${isVotedOption ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <div 
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-md transition-all duration-500 ease-out" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                  <div className="relative flex justify-between items-center font-semibold">
                    <span className={`flex items-center gap-2 ${isVotedOption ? 'text-blue-800 dark:text-blue-200' : 'text-gray-800 dark:text-gray-200'}`}>
                      {option.text}
                      {isVotedOption && <CheckmarkIcon />}
                    </span>
                    <span className={`font-bold ${isVotedOption ? 'text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'}`}>{percentage}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {votedOption && (
          <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">{totalVotes.toLocaleString()} votes</p>
      )}
    </div>
  );
};

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);


export default ArticlePoll;
