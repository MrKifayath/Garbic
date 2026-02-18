'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { useSwipe } from '@/hooks/use-swipe';

export interface ProductCarouselProps {
  products: Product[];
  title?: string;
  autoRotate?: boolean;
  autoRotateInterval?: number;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  showAddToCart?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  autoRotate = true,
  autoRotateInterval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  showAddToCart = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update items to show based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  // Swipe handlers for mobile touch interactions
  const { isSwiping, handlers: swipeHandlers } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  }, {
    threshold: 50,
    preventDefaultTouchmoveEvent: false,
    trackMouse: false, // Only use touch for mobile
  });

  // Auto-rotation effect - pauses on hover and during swipe
  useEffect(() => {
    if (!autoRotate || isHovered || isSwiping || products.length <= itemsToShow) return;

    const interval = setInterval(nextSlide, autoRotateInterval);
    return () => clearInterval(interval);
  }, [autoRotate, isHovered, isSwiping, nextSlide, autoRotateInterval, products.length, itemsToShow]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  if (products.length === 0) {
    return null;
  }

  const showNavigation = products.length > itemsToShow;
  const showDots = products.length > itemsToShow;
  const baseTranslateX = -(currentIndex * 100) / itemsToShow;

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={title || "Product carousel"}
      >
        {/* Navigation Buttons */}
        {showNavigation && (
          <>
            <button
              onClick={prevSlide}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                currentIndex === 0 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-gray-50 hover:shadow-xl"
              )}
              aria-label="Previous products"
              disabled={currentIndex === 0}
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                currentIndex === maxIndex 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-gray-50 hover:shadow-xl"
              )}
              aria-label="Next products"
              disabled={currentIndex === maxIndex}
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden mx-4 sm:mx-8">
          <div
            ref={carouselRef}
            className={cn(
              "flex transition-transform ease-out duration-300"
            )}
            style={{
              transform: `translateX(${baseTranslateX}%)`,
            }}
            {...swipeHandlers}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <ProductCard
                  product={product}
                  showAddToCart={showAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {showDots && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  index === currentIndex
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress indicator for auto-rotation */}
        {autoRotate && !isHovered && !isSwiping && products.length > itemsToShow && (
          <div className="absolute bottom-0 left-4 right-4 sm:left-8 sm:right-8 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all ease-linear"
              style={{
                width: '100%',
                animation: `carousel-progress ${autoRotateInterval}ms linear infinite`
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export { ProductCarousel };