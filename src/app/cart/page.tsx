import React from 'react';
import { CartPage } from '@/components/cart/cart-page';
import { MainLayout } from '@/components/layout/main-layout';

export default function Cart() {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}

export const metadata = {
  title: 'Shopping Cart - ShopHub',
  description: 'Review and manage items in your shopping cart before checkout.',
};