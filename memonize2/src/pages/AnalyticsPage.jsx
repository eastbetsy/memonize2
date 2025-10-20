import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

function AnalyticsPage() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('week');

  const mockData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      studyTime: [60, 90, 75, 120, 80, 150, 110],
      accuracy: [85, 88, 82, 92, 89, 94, 91],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      studyTime: [480, 550, 620, 510],
      accuracy: [87, 89, 91, 90],
    },
  };

  const data = mockData[timeframe];
  const maxStudyTime = Math.max(...data.studyTime);

  if (!user) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Analytics</h2>
        <p className="text-gray-500">Please sign in to view your learning analytics.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Learning Analytics</h1>
        <p className="text-gray-500 mt-2">Your progress in the cosmos of knowledge.</p>
      </div>

      <div className="flex justify-center bg-gray-100 p-1 rounded-lg border border-gray-200 w-fit mx-auto">
        <button
          onClick={() => setTimeframe('week')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            timeframe === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-white/60'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setTimeframe('month')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            timeframe === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-white/60'
          }`}
        >
          This Month
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Study Time (minutes)</h2>
        <div className="h-64 flex items-end justify-between space-x-4">
          {data.studyTime.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div
                className="w-full bg-gradient-to-t from-indigo-300 to-purple-300 rounded-t-lg transition-all duration-300 hover:from-indigo-400 hover:to-purple-400"
                style={{ height: `${(value / maxStudyTime) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 text-xs text-center -mt-5 text-indigo-800 font-semibold">{value}</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{data.labels[index]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Average Accuracy (%)</h2>
        <div className="h-64 flex items-end justify-between space-x-4">
          {data.accuracy.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div
                className="w-full bg-gradient-to-t from-teal-200 to-cyan-200 rounded-t-lg transition-all duration-300 hover:from-teal-300 hover:to-cyan-300"
                style={{ height: `${(value / 100) * 100}%` }}
              >
                 <div className="opacity-0 group-hover:opacity-100 text-xs text-center -mt-5 text-teal-800 font-semibold">{value}%</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{data.labels[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
