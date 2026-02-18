import React from 'react';
import { ProductFilters, SortOption } from '@/lib/types';
import { Button, Card, CardContent } from '@/components/ui';

export interface ProductFiltersProps {
  filters: ProductFilters;
  sortOption: SortOption | undefined;
  onFiltersChange: (filters: ProductFilters) => void;
  onSortChange: (sort: SortOption | undefined) => void;
  onClearFilters: () => void;
  categories: Array<{ id: string; name: string }>;
  brands: string[];
  priceRange: { min: number; max: number };
  className?: string;
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({
  filters,
  sortOption,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  categories,
  brands,
  priceRange,
  className = '',
}) => {
  const updateFilter = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const sortOptions: Array<{ value: SortOption | undefined; label: string }> = [
    { value: undefined, label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
  ) || sortOption !== undefined;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-between items-center animate-fade-in-up">
          <h3 className="text-lg font-medium text-slate-100">Filters</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white hover:scale-105 transition-all duration-200"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Sort */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Sort By</h4>
          <select
            value={sortOption || ''}
            onChange={(e) => onSortChange(e.target.value as SortOption || undefined)}
            className="w-full px-3 py-2 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-slate-600 text-slate-100 transition-all duration-200"
          >
            {sortOptions.map((option) => (
              <option key={option.value || 'default'} value={option.value || ''} className="bg-slate-600 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-400">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
              <input
                type="radio"
                name="category"
                value=""
                checked={!filters.category}
                onChange={() => updateFilter('category', undefined)}
                className="mr-2 accent-accent-500"
              />
              All Categories
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={() => updateFilter('category', category.id)}
                  className="mr-2 accent-accent-500"
                />
                {category.name}
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-600">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Brand</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
              <input
                type="radio"
                name="brand"
                value=""
                checked={!filters.brand}
                onChange={() => updateFilter('brand', undefined)}
                className="mr-2 accent-accent-500"
              />
              All Brands
            </label>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={filters.brand === brand}
                  onChange={() => updateFilter('brand', brand)}
                  className="mr-2 accent-accent-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-800">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Price Range</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-slate-600 text-slate-100 placeholder:text-slate-400 transition-all duration-200"
                min={priceRange.min}
                max={priceRange.max}
              />
              <span className="text-slate-300">to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-slate-600 text-slate-100 placeholder:text-slate-400 transition-all duration-200"
                min={priceRange.min}
                max={priceRange.max}
              />
            </div>
            <div className="text-xs text-slate-400">
              Range: ₹{priceRange.min} - ₹{priceRange.max}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-1000">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.minRating === rating}
                  onChange={() => updateFilter('minRating', rating)}
                  className="mr-2 accent-accent-500"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400' : 'text-slate-500'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm text-slate-300">& up</span>
                </div>
              </label>
            ))}
            <label className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
              <input
                type="radio"
                name="rating"
                value=""
                checked={filters.minRating === undefined}
                onChange={() => updateFilter('minRating', undefined)}
                className="mr-2 accent-accent-500"
              />
              Any Rating
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Stock Filter */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl animate-slide-in-left animation-delay-1200">
        <CardContent className="p-4">
          <h4 className="font-medium text-slate-100 mb-3">Availability</h4>
          <div className="space-y-2">
            <label className="flex items-center text-slate-200 cursor-pointer hover:text-accent-400 transition-colors">
              <input
                type="checkbox"
                checked={filters.inStock === true}
                onChange={(e) => updateFilter('inStock', e.target.checked ? true : undefined)}
                className="mr-2 accent-accent-500"
              />
              In Stock Only
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProductFiltersComponent as ProductFilters };