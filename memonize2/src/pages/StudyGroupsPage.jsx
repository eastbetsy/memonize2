import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const features = [
    {
      name: 'Notes',
      description: 'Capture your thoughts in our smart notebooks.',
      href: '/notes',
      icon: '📝',
    },
    {
      name: 'Flashcards',
      description: 'Generate and study with AI-powered flashcards.',
      href: '/flashcards',
      icon: '🃏',
    },
    {
      name: 'Real-Time Analytics',
      description: 'Visualize your progress and get AI-driven insights.',
      href: '/analytics',
      icon: '📊',
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <div className="w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <span className="text-4xl">🚀</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
        Welcome to Memonize
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
        Your new personal learning universe. Let's get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.href}
            className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.name}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
