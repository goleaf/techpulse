import React from 'react';

const WeatherWidget: React.FC = () => {
  // Mock data for demonstration
  const weather = {
    location: "Tech City",
    temperature: 72,
    condition: "Sunny",
    icon: "☀️",
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-700 dark:to-blue-900 text-white rounded-lg shadow-lg p-6 flex items-center justify-between">
      <div>
        <p className="font-semibold">{weather.location}</p>
        <p className="text-sm opacity-90">{weather.condition}</p>
      </div>
      <div className="text-right">
        <p className="text-5xl font-bold">{weather.temperature}°</p>
        <p className="text-2xl -mt-2">{weather.icon}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;