import dynamic from 'next/dynamic';
import React from 'react';
import { LoadingSpinner } from '@/components/ui';

// Dynamic imports for heavy components with loading states
export const DynamicProductCarousel = dynamic(
  () => import('@/components/product/product-carousel').then(mod => ({ default: mod.ProductCarousel })),
  {
    loading: () => React.createElement('div', { className: 'flex justify-center items-center h-64' },
      React.createElement(LoadingSpinner, { size: 'lg' })
    ),
  }
);

export const DynamicProductFilters = dynamic(
  () => import('@/components/product/product-filters').then(mod => ({ default: mod.ProductFilters })),
  {
    loading: () => React.createElement('div', { className: 'w-64 h-96 bg-gray-100 animate-pulse rounded-lg' }),
  }
);

export const DynamicCartDrawer = dynamic(
  () => import('@/components/cart/cart-drawer').then(mod => ({ default: mod.CartDrawer })),
  {
    loading: () => null, // No loading state needed for drawer
  }
);

export const DynamicCheckoutForm = dynamic(
  () => import('@/components/checkout/checkout-form').then(mod => ({ default: mod.CheckoutForm })),
  {
    loading: () => React.createElement('div', { className: 'space-y-6' }, [
      React.createElement('div', { key: 'title', className: 'h-8 bg-gray-200 rounded animate-pulse' }),
      React.createElement('div', { key: 'form', className: 'space-y-4' },
        Array.from({ length: 6 }).map((_, i) =>
          React.createElement('div', { key: i, className: 'h-10 bg-gray-200 rounded animate-pulse' })
        )
      ),
      React.createElement('div', { key: 'button', className: 'h-12 bg-gray-200 rounded animate-pulse' })
    ]),
  }
);

// Lazy load heavy third-party components
export const DynamicPaymentForm = dynamic(
  () => import('@/components/checkout/payment-form').then(mod => ({ default: mod.PaymentForm })),
  {
    loading: () => React.createElement('div', { className: 'space-y-4' }, [
      React.createElement('div', { key: 'title', className: 'h-6 bg-gray-200 rounded animate-pulse w-1/3' }),
      React.createElement('div', { key: 'form', className: 'space-y-3' },
        Array.from({ length: 4 }).map((_, i) =>
          React.createElement('div', { key: i, className: 'h-10 bg-gray-200 rounded animate-pulse' })
        )
      )
    ]),
  }
);