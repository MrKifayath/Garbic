'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Client-side dynamic imports for interactive components
export const ClientProductFilters = dynamic(
  () => import('@/components/product/product-filters').then(mod => ({ default: mod.ProductFilters })),
  {
    loading: () => <div className="w-64 h-96 bg-gray-100 animate-pulse rounded-lg" />,
    ssr: false, // Client-side only
  }
);

export const ClientCartDrawer = dynamic(
  () => import('@/components/cart/cart-drawer').then(mod => ({ default: mod.CartDrawer })),
  {
    loading: () => null,
    ssr: false, // Client-side only
  }
);

export const ClientCheckoutForm = dynamic(
  () => import('@/components/checkout/checkout-form').then(mod => ({ default: mod.CheckoutForm })),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    ),
    ssr: false, // Client-side only
  }
);

export const ClientPaymentForm = dynamic(
  () => import('@/components/checkout/payment-form').then(mod => ({ default: mod.PaymentForm })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);