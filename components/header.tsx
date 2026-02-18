'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, TrendingUp } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import productsData from '@/products.json';

// Helper function to categorize products
function getCategory(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('earphone') || nameLower.includes('earbud') || nameLower.includes('headphone') || nameLower.includes('headset')) return 'Audio';
  if (nameLower.includes('mouse')) return 'Mouse';
  if (nameLower.includes('keyboard')) return 'Keyboard';
  if (nameLower.includes('power bank')) return 'Power Banks';
  if (nameLower.includes('charger') || nameLower.includes('adapter')) return 'Chargers';
  if (nameLower.includes('cable')) return 'Cables';
  if (nameLower.includes('speaker')) return 'Speakers';
  if (nameLower.includes('wifi') || nameLower.includes('router') || nameLower.includes('switch')) return 'Networking';
  if (nameLower.includes('watch')) return 'Wearables';
  if (nameLower.includes('memory') || nameLower.includes('flash') || nameLower.includes('usb')) return 'Storage';
  if (nameLower.includes('stand') || nameLower.includes('holder') || nameLower.includes('cooler')) return 'Accessories';
  if (nameLower.includes('phone') || nameLower.includes('smartphone')) return 'Smartphones';
  return 'Electronics';
}

// Transform products data
const ALL_PRODUCTS = productsData
  .filter(p => p.image_url.startsWith('/products/'))
  .map((product, index) => ({
    id: String(index + 1),
    name: product.name,
    price: product.price_inr,
    image: product.image_url,
    category: getCategory(product.name),
  }));

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const router = useRouter();

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return ALL_PRODUCTS
      .filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
      .slice(0, 6); // Show max 6 results
  }, [searchQuery]);

  // Popular searches
  const popularSearches = ['Earphones', 'Mouse', 'Keyboard', 'Power Bank', 'Charger'];

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Garbic"
              width={720}
              height={240}
              className="h-40 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/#products" className="text-foreground hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-foreground hover:text-accent transition-colors">
              About Us
            </Link>
            <Link href="/terms" className="text-foreground hover:text-accent transition-colors">
              Terms
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <Link 
              href="/cart"
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-in zoom-in duration-200">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-fadeInUp">
            <Link 
              href="/" 
              className="block px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#products" 
              className="block px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/terms" 
              className="block px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/refund" 
              className="block px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Refund Policy
            </Link>
          </nav>
        )}
      </div>

      {/* Modern Search Dialog */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
          onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
        >
          <div 
            className="bg-background rounded-2xl shadow-2xl w-full max-w-3xl animate-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-accent" />
                <input
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-lg text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto">
              {searchQuery.trim() ? (
                // Search Results
                <div className="p-4">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="text-sm text-muted-foreground mb-3 px-2">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </div>
                      <div className="space-y-1">
                        {searchResults.map((product, index) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-all duration-200 group animate-in fade-in slide-in-from-left-2"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div className="text-lg font-semibold text-accent">
                              ₹{product.price.toLocaleString()}
                            </div>
                          </Link>
                        ))}
                      </div>
                      
                      {/* View All Results */}
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full mt-4 py-3 px-4 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium"
                      >
                        View All Results
                      </button>
                    </>
                  ) : (
                    <div className="py-12 text-center animate-in fade-in duration-300">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium text-foreground mb-2">No results found</p>
                      <p className="text-sm text-muted-foreground">
                        Try searching for something else
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Popular Searches
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Popular Searches</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, index) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                        }}
                        className="px-4 py-2 bg-muted hover:bg-accent hover:text-accent-foreground rounded-full text-sm font-medium transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">ESC</kbd> to close
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
