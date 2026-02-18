import { 
  Product, 
  Category, 
  ProductFilters, 
  ProductSearchParams, 
  ProductSearchResult,
  SortOption 
} from './types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

// Type the imported data
const products = productsData as unknown as Product[];
const categories = categoriesData as unknown as Category[];

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

/**
 * Get a category by ID or slug
 */
export function getCategoryByIdOrSlug(identifier: string): Category | undefined {
  return categories.find(category => 
    category.id === identifier || category.slug === identifier
  );
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.category === categoryId);
}

/**
 * Get featured products (mix from all categories with preference for high ratings)
 */
export function getFeaturedProducts(limit: number = 10): Product[] {
  const categories = ['electronics', 'accessories', 'clothing', 'home-garden', 'books-media', 'sports-outdoors', 'personal'];
  const productsPerCategory = Math.ceil(limit / categories.length);
  let featuredProducts: Product[] = [];

  // Get products from each category
  for (const category of categories) {
    const categoryProducts = products
      .filter(product => product.category === category && product.inStock)
      .sort((a, b) => {
        // Prioritize products with discounts and high ratings
        const aDiscount = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const bDiscount = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        const aScore = (a.rating * 0.7) + (aDiscount * 0.3);
        const bScore = (b.rating * 0.7) + (bDiscount * 0.3);
        return bScore - aScore;
      })
      .slice(0, productsPerCategory);
    
    featuredProducts = [...featuredProducts, ...categoryProducts];
  }

  // If we don't have enough products, fill with remaining high-rated products
  if (featuredProducts.length < limit) {
    const remainingProducts = products
      .filter(product => 
        !featuredProducts.some(fp => fp.id === product.id) && 
        product.inStock
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit - featuredProducts.length);
    
    featuredProducts = [...featuredProducts, ...remainingProducts];
  }

  // Shuffle the array to mix categories and return the requested limit
  const shuffled = featuredProducts.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

/**
 * Get products by brand
 */
export function getProductsByBrand(brand: string): Product[] {
  return products.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Search products by query string
 */
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return products;
  
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

/**
 * Filter products based on criteria
 */
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  if (filters.brand) {
    filtered = filtered.filter(product => 
      product.brand.toLowerCase() === filters.brand!.toLowerCase()
    );
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => product.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter(product => product.rating >= filters.minRating!);
  }

  if (filters.inStock !== undefined) {
    filtered = filtered.filter(product => product.inStock === filters.inStock);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product => 
      filters.tags!.some(tag => 
        product.tags.some(productTag => 
          productTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  return filtered;
}

/**
 * Sort products based on sort option
 */
export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
  const sorted = [...products];

  switch (sortOption) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'rating_desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'newest':
      // For mock data, we'll sort by ID (assuming newer products have newer IDs)
      return sorted.sort((a, b) => b.id.localeCompare(a.id));
    
    case 'popularity':
      // Sort by review count as a proxy for popularity
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    
    default:
      return sorted;
  }
}

/**
 * Paginate an array of products
 */
export function paginateProducts(
  products: Product[], 
  page: number = 1, 
  limit: number = 12
): ProductSearchResult {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  
  return {
    products: paginatedProducts,
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}

/**
 * Comprehensive product search with filtering, sorting, and pagination
 */
export function searchAndFilterProducts(params: ProductSearchParams): ProductSearchResult {
  let results = products;

  // Apply search query
  if (params.query) {
    results = searchProducts(params.query);
  }

  // Apply filters
  if (params.filters) {
    results = filterProducts(results, params.filters);
  }

  // Apply sorting - if no sort is specified, use category priority
  if (params.sort) {
    results = sortProducts(results, params.sort);
  } else {
    // Default sorting: prioritize categories in order (electronics, accessories, clothing, etc.)
    const categoryOrder = ['electronics', 'accessories', 'clothing', 'home-garden', 'books-media', 'sports-outdoors', 'personal'];
    results = results.sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.category);
      const bIndex = categoryOrder.indexOf(b.category);
      
      // If categories are different, sort by category priority
      if (aIndex !== bIndex) {
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      }
      
      // If same category, sort by rating (highest first)
      return b.rating - a.rating;
    });
  }

  // Apply pagination
  return paginateProducts(results, params.page, params.limit);
}

/**
 * Get related products based on category and tags
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  const related = products
    .filter(p => p.id !== productId)
    .filter(p => 
      p.category === product.category || 
      p.tags.some(tag => product.tags.includes(tag))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return related;
}

/**
 * Get price range for all products or filtered products
 */
export function getPriceRange(filteredProducts?: Product[]): { min: number; max: number } {
  const productsToCheck = filteredProducts || products;
  
  if (productsToCheck.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = productsToCheck.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Get all unique brands
 */
export function getAllBrands(): string[] {
  const brands = [...new Set(products.map(p => p.brand))];
  return brands.sort();
}

/**
 * Get products with low stock (less than 10 items)
 */
export function getLowStockProducts(): Product[] {
  return products.filter(product => product.inStock && product.stockQuantity < 10);
}

/**
 * Get out of stock products
 */
export function getOutOfStockProducts(): Product[] {
  return products.filter(product => !product.inStock);
}