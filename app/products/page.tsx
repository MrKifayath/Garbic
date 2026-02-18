'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
    rating: 4.5 + (index % 5) * 0.1,
    reviews: 100 + (index * 37) % 400
  }));

// Get unique categories
const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))].sort();

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Set search query from URL parameter
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = ALL_PRODUCTS;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Browse our complete collection of {ALL_PRODUCTS.length} electronics and gadgets
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2 justify-center"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-6 animate-fadeInUp">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Category</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {CATEGORIES.map(category => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="text-sm text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
                        placeholder="Min"
                      />
                      <span className="text-muted-foreground">to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
                        placeholder="Max"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </div>
                    <button
                      onClick={() => setPriceRange([0, 5000])}
                      className="text-sm text-accent hover:underline"
                    >
                      Reset Price
                    </button>
                  </div>
                </div>
              </div>

              {/* Clear All Filters */}
              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 5000]);
                    setSearchQuery('');
                  }}
                  className="text-sm text-accent hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          Showing {filteredProducts.length} of {ALL_PRODUCTS.length} products
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-16 mb-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-accent/20 p-8 sm:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    More Products Coming Soon
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    We're constantly adding new electronics and gadgets to our collection. Stay tuned for exciting new arrivals!
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span>New Arrivals Weekly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <span>Latest Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '1s' }} />
                      <span>Best Prices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 5000]);
              }}
              className="text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading products...</p>
          </div>
        </div>
        <Footer />
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}
