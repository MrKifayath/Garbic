'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, Badge, Button, LazyImage } from '@/components/ui';
import { useCart } from '@/contexts/cart-context';
import { formatPrice, formatRating } from '@/lib/utils';

export interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showAddToCart = true 
}) => {
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAddingToCart || !product.inStock) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem(product, 1);
      
      // Brief delay for visual feedback
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 500);
      
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-slate-700 border-slate-600 hover:border-primary-400">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-slate-600 to-slate-700">
          <LazyImage
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500 p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <Badge variant="error" size="sm" className="shadow-lg">
                Out of Stock
              </Badge>
            )}
            {product.stockQuantity <= 5 && product.inStock && (
              <Badge variant="warning" size="sm" className="shadow-lg">
                Only {product.stockQuantity} left
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="success" size="sm" className="shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Quick Add to Cart Button */}
          {showAddToCart && product.inStock && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                aria-label={`Add ${product.name} to cart`}
                className="min-w-[40px] animate-bounce-in bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 shadow-xl"
              >
                {isAddingToCart ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h8a2 2 0 002-2v-4m-8 6h4"
                    />
                  </svg>
                )}
              </Button>
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col justify-between p-4 bg-slate-700">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-100 line-clamp-2 group-hover:text-primary-400 transition-colors">
                {product.name}
              </h3>
            </div>

            <p className="text-xs text-slate-300 mb-3 font-medium">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-amber-400'
                        : 'text-slate-500'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xs text-slate-300 font-medium">
                {formatRating(product.rating)} ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-xs font-semibold text-green-400">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export { ProductCard };