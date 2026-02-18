'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductSearch } from '@/components/product/product-search';
import { Pagination, Button } from '@/components/ui';
import { ClientProductFilters } from '@/components/client/dynamic-components';
import { 
  searchAndFilterProducts,
  getAllCategories,
  getAllBrands,
  getPriceRange
} from '@/lib/data';
import { ProductSearchParams, ProductSearchResult, SortOption, ProductFilters as ProductFiltersType } from '@/lib/types';

const PRODUCTS_PER_PAGE = 12;

const ProductsPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchResult, setSearchResult] = useState<ProductSearchResult>({
    products: [],
    total: 0,
    page: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [sortOption, setSortOption] = useState<SortOption | undefined>(undefined);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get static data for filters
  const categories = useMemo(() => getAllCategories(), []);
  const brands = useMemo(() => getAllBrands(), []);
  const priceRange = useMemo(() => getPriceRange(), []);

  // Initialize state from URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlBrand = searchParams.get('brand') || '';
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    const urlMinRating = searchParams.get('minRating');
    const urlSort = searchParams.get('sort') as SortOption;
    const urlPage = parseInt(searchParams.get('page') || '1');

    setSearchQuery(urlSearch);
    setCurrentPage(urlPage);
    setSortOption(urlSort || undefined);
    
    const initialFilters: ProductFiltersType = {};
    if (urlCategory) initialFilters.category = urlCategory;
    if (urlBrand) initialFilters.brand = urlBrand;
    if (urlMinPrice) initialFilters.minPrice = Number(urlMinPrice);
    if (urlMaxPrice) initialFilters.maxPrice = Number(urlMaxPrice);
    if (urlMinRating) initialFilters.minRating = Number(urlMinRating);
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Load products when search/filter parameters change
  useEffect(() => {
    const loadProducts = () => {
      setLoading(true);
      
      const params: ProductSearchParams = {
        query: searchQuery || undefined,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        sort: sortOption,
        page: currentPage,
        limit: PRODUCTS_PER_PAGE
      };
      
      const result = searchAndFilterProducts(params);
      setSearchResult(result);
      setLoading(false);
    };

    loadProducts();
  }, [searchQuery, filters, sortOption, currentPage]);

  // Update URL when parameters change
  const updateURL = (newParams: {
    search?: string;
    filters?: ProductFiltersType;
    sort?: SortOption;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    
    if (newParams.search) params.set('search', newParams.search);
    if (newParams.filters?.category) params.set('category', newParams.filters.category);
    if (newParams.filters?.brand) params.set('brand', newParams.filters.brand);
    if (newParams.filters?.minPrice) params.set('minPrice', newParams.filters.minPrice.toString());
    if (newParams.filters?.maxPrice) params.set('maxPrice', newParams.filters.maxPrice.toString());
    if (newParams.filters?.minRating) params.set('minRating', newParams.filters.minRating.toString());
    if (newParams.sort) params.set('sort', newParams.sort);
    if (newParams.page && newParams.page > 1) params.set('page', newParams.page.toString());
    
    const newURL = params.toString() ? `/products?${params.toString()}` : '/products';
    router.push(newURL, { scroll: false });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateURL({ search: query, filters, sort: sortOption, page: 1 });
  };

  const handleFiltersChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
    updateURL({ search: searchQuery, filters: newFilters, sort: sortOption, page: 1 });
  };

  const handleSortChange = (sort: SortOption | undefined) => {
    setSortOption(sort);
    setCurrentPage(1);
    updateURL({ search: searchQuery, filters, sort, page: 1 });
  };

  const handleClearFilters = () => {
    setFilters({});
    setSortOption(undefined);
    setSearchQuery('');
    setCurrentPage(1);
    router.push('/products');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ search: searchQuery, filters, sort: sortOption, page });
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
  ) || sortOption !== undefined || searchQuery !== '';

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-2">All Products</h1>
            <p className="text-slate-200 text-lg">
              Discover our complete collection of products
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 animate-slide-in-left animation-delay-200">
            <ProductSearch
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search products, brands, categories..."
              className="max-w-md"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 animate-slide-in-right animation-delay-400">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters {hasActiveFilters && '(Active)'}
              </Button>
            </div>

            {/* Filters Sidebar */}
            <div className={`lg:w-64 flex-shrink-0 animate-slide-in-left animation-delay-600 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <ClientProductFilters
                filters={filters}
                sortOption={sortOption}
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
                categories={categories}
                brands={brands}
                priceRange={priceRange}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 animate-slide-in-right animation-delay-800">
              {/* Results Summary */}
              {!loading && (
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-200 mb-2 sm:mb-0">
                    Showing {searchResult.products.length === 0 ? 0 : ((currentPage - 1) * PRODUCTS_PER_PAGE) + 1} - {Math.min(currentPage * PRODUCTS_PER_PAGE, searchResult.total)} of {searchResult.total} products
                    {searchQuery && (
                      <span className="ml-1">
                        for &ldquo;<span className="font-medium text-accent-400">{searchQuery}</span>&rdquo;
                      </span>
                    )}
                  </p>
                  
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearFilters}
                      className="self-start sm:self-auto bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}

              {/* Product Grid */}
              <div className="mb-8">
                <ProductGrid
                  products={searchResult.products}
                  loading={loading}
                  columns={3}
                  emptyMessage={
                    hasActiveFilters 
                      ? "No products found matching your criteria. Try adjusting your search or filters."
                      : "No products found."
                  }
                />
              </div>

              {/* Pagination */}
              {!loading && searchResult.totalPages > 1 && (
                <div className="flex justify-center animate-fade-in-up animation-delay-1000">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={searchResult.totalPages}
                    onPageChange={handlePageChange}
                    maxVisiblePages={5}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ProductsPage: React.FC = () => {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-600 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-600 rounded w-1/2 mb-8"></div>
              <div className="h-10 bg-slate-600 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                    <div className="aspect-square bg-slate-600"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                      <div className="h-6 bg-slate-600 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    }>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;