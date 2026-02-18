'use client';

import React, { useState } from 'react';

interface UserMenuProps {
  onLoginClick: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Static - always logged out

  return (
    <div className="relative">
      {!isLoggedIn ? (
        <button
          onClick={onLoginClick}
          className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="hidden lg:inline text-sm font-medium">Sign In</span>
        </button>
      ) : (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <span className="hidden lg:inline text-sm font-medium">My Account</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">john@example.com</p>
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                My Orders
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Wishlist
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Account Settings
              </a>
              <div className="border-t border-slate-200 mt-2 pt-2">
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
