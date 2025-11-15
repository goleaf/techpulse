import React from 'react';

const SocialFollow: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">Follow Us</h3>
      <div className="grid grid-cols-2 gap-3">
        <SocialButton network="X" bgColor="bg-black hover:bg-gray-800" textColor="text-white" />
        <SocialButton network="LinkedIn" bgColor="bg-blue-700 hover:bg-blue-800" textColor="text-white" />
        <SocialButton network="GitHub" bgColor="bg-gray-800 hover:bg-gray-900" textColor="text-white" />
        <SocialButton network="Facebook" bgColor="bg-blue-600 hover:bg-blue-700" textColor="text-white" />
      </div>
    </div>
  );
};

const SocialButton: React.FC<{ network: string; bgColor: string; textColor: string; }> = ({ network, bgColor, textColor }) => (
  <a href="#" aria-label={`Follow us on ${network}`} className={`flex items-center justify-center p-3 rounded-md transition-colors ${bgColor}`}>
    <span className={`font-bold text-sm ${textColor}`}>{network}</span>
  </a>
);

export default SocialFollow;