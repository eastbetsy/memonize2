import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Notes', href: '/notes' },
  { name: 'Flashcards', href: '/flashcards' },
  { name: 'MiniGames', href: '/minigames' },
  { name: 'Pomodoro', href: '/pomodoro-rooms' },
  { name: 'Study Groups', href: '/study-groups' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Profile', href: '/profile' },
];

function Navbar({ user, onSignInClick, onSignOutClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-indigo-300 bg-indigo-900/50'
        : 'text-gray-300 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
               🚀
            </div>
            <span className="text-xl font-bold text-white">Memonize</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href} className={navLinkClass}>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 text-sm">
                  {user.email}
                </span>
                <button onClick={onSignOutClick} className="bg-purple-600 hover:bg-purple-700 text-white text-sm py-1 px-3 rounded">
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={onSignInClick} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded">
                Sign In
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
              <div className="border-t border-white/10 pt-4 mt-4">
                {user ? (
                   <button
                     onClick={() => { onSignOutClick(); setIsMenuOpen(false); }}
                     className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                   >
                     Sign Out ({user.email})
                   </button>
                ) : (
                  <button
                    onClick={() => { onSignInClick(); setIsMenuOpen(false); }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  >
                    Sign In / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;