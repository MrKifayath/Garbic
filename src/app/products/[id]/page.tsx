'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MainLayout } from '@/components/layout/main-layout';
import { getProductById, getRelatedProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { Button, Badge, Card, CardContent } from '@/components/ui';
import { ProductGrid } from '@/components/product/product-grid';
import { useCart } from '@/contexts/cart-context';
import { formatPrice, formatRating } from '@/lib/utils';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { addItem, getItemQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      if (!params.id || typeof params.id !== 'string') {
        router.push('/products');
        return;
      }

      const foundProduct = getProductById(params.id);
      
      if (!foundProduct) {
        router.push('/products');
        return;
      }

      setProduct(foundProduct);
      setRelatedProducts(getRelatedProducts(foundProduct.id, 4));
      setLoading(false);
    };

    loadProduct();
  }, [params.id, router]);

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem(product, quantity);
      
      // Show success feedback
      const successMessage = `Added ${quantity} ${product.name} to cart!`;
      
      // You could replace this with a toast notification
      alert(successMessage);
      
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return;
    
    const maxQuantity = Math.min(product.stockQuantity, 10);
    const validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(validQuantity);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="aspect-square bg-slate-600 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                  <div className="h-6 bg-slate-600 rounded w-1/4"></div>
                  <div className="h-20 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return null;
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in-up">
          <ol className="flex items-center space-x-2 text-sm text-slate-300">
            <li>
              <button 
                onClick={() => router.push('/')}
                className="hover:text-accent-400 transition-colors"
              >
                Home
              </button>
            </li>
            <li>/</li>
            <li>
              <button 
                onClick={() => router.push('/products')}
                className="hover:text-accent-400 transition-colors"
              >
                Products
              </button>
            </li>
            <li>/</li>
            <li className="text-slate-100 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4 animate-slide-in-left animation-delay-200">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg bg-slate-800 border border-slate-600 shadow-xl">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                unoptimized={product.images[selectedImageIndex].includes('.svg') || 
                            product.images[selectedImageIndex].includes('.gif') || 
                            product.images[selectedImageIndex].includes('.avif')}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {!product.inStock && (
                  <Badge variant="error" className="animate-bounce-in animation-delay-400">Out of Stock</Badge>
                )}
                {product.stockQuantity <= 5 && product.inStock && (
                  <Badge variant="warning" className="animate-bounce-in animation-delay-600">Only {product.stockQuantity} left</Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="success" className="animate-bounce-in animation-delay-800">{discountPercentage}% OFF</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto animate-slide-in-up animation-delay-1000">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImageIndex === index 
                        ? 'border-accent-500 shadow-lg' 
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="80px"
                      unoptimized={image.includes('.svg') || 
                                  image.includes('.gif') || 
                                  image.includes('.avif')}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-slide-in-right animation-delay-400">
            {/* Title and Brand */}
            <div className="animate-fade-in-up animation-delay-600">
              <p className="text-sm text-slate-300 mb-1">{product.brand}</p>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 animate-fade-in-up animation-delay-800">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-slate-500'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-slate-300">
                {formatRating(product.rating)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 animate-fade-in-up animation-delay-1000">
              <span className="text-4xl font-bold text-accent-400">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="animate-fade-in-up animation-delay-1200">
              <h3 className="text-lg font-medium text-slate-100 mb-2">Description</h3>
              <p className="text-slate-200 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4 animate-fade-in-up animation-delay-1400">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-slate-200">
                  Quantity:
                </label>
                <div className="flex items-center border border-slate-600 rounded-md bg-slate-700">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-slate-300 hover:text-accent-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:scale-110"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={Math.min(product.stockQuantity, 10)}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-2 text-slate-100 text-center border-0 focus:ring-0 bg-slate-700"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= Math.min(product.stockQuantity, 10)}
                    className="px-3 py-2 text-slate-300 hover:text-accent-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:scale-110"
                  >
                    +
                  </button>
                </div>
                {product.inStock && (
                  <span className="text-sm text-slate-300">
                    {product.stockQuantity} available
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                size="lg"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200"
              >
                {isAddingToCart 
                  ? 'Adding to Cart...' 
                  : product.inStock 
                    ? 'Add to Cart' 
                    : 'Out of Stock'
                }
              </Button>

              {/* Stock Status */}
              <div className="text-sm">
                {product.inStock ? (
                  <span className="text-green-400 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <Card className="mb-12 bg-slate-700 border-slate-600 shadow-xl animate-fade-in-up animation-delay-1600">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-slate-600 last:border-b-0">
                    <span className="font-medium text-slate-200">{key}:</span>
                    <span className="text-slate-300">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in-up animation-delay-1800">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent mb-6">Related Products</h3>
            <ProductGrid
              products={relatedProducts}
              columns={4}
              showAddToCart={true}
            />
          </div>
        )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;