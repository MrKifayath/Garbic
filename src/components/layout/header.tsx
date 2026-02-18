'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui';
import { CartIcon } from '@/components/cart/cart-icon';
import { ClientCartDrawer } from '@/components/client/dynamic-components';
import { UserMenu } from '@/components/auth/user-menu';
import { AuthModal } from '@/components/auth/auth-modal';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  // No props needed as cart state is managed by context
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/products?search=${encodedQuery}`);
      setSearchQuery(''); // Clear search after submitting
    }
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Electronics', href: '/products?category=electronics' },
    { name: 'Apparel', href: '/products?category=clothing' },
    { name: 'Home & Garden', href: '/products?category=home-garden' },
    { name: 'Accessories', href: '/products?category=accessories' },
    { name: 'Personal Care', href: '/products?category=personal' },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-9">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <img 
                src="/logo/logoWithText.png" 
                alt="TUFOLDBETA SOLUTIONS" 
                className="h-38 md:h-38 w-auto transition-transform duration-300 group-hover:scale-105"
                style={{ height: '9.5rem' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-6 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-11 text-sm shadow-lg border-2 border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-primary-500 focus:bg-slate-800 rounded-full backdrop-blur-sm"
                aria-label="Search products"
                id="desktop-search"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 rounded-full p-2 transition-all duration-200 shadow-lg"
                aria-label="Submit search"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* User Menu, Cart and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* User Menu */}
            <UserMenu onLoginClick={() => setIsAuthOpen(true)} />

            {/* Cart Icon */}
            <div className="relative">
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors rounded-lg"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-10 shadow-lg border-2 border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-primary-500 focus:bg-slate-800 rounded-full"
              aria-label="Search products"
              id="mobile-search"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-full p-1.5 transition-all duration-200"
              aria-label="Submit search"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'lg:hidden border-t border-slate-700 bg-slate-800/95 backdrop-blur-sm',
          isMenuOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="px-4 py-2 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-md text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Cart Drawer */}
      <ClientCartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export { Header };