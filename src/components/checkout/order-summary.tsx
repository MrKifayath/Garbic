'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Cart } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Truck, Shield } from 'lucide-react';

interface OrderSummaryProps {
  cart: Cart;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-100">
            <ShoppingBag className="w-5 h-5 mr-2 text-accent-500" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Items */}
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-300">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-slate-100">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="text-slate-100">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Shipping</span>
                  <span className="text-slate-100">
                    {cart.shipping === 0 ? (
                      <span className="text-green-400 font-medium">Free</span>
                    ) : (
                      formatPrice(cart.shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tax</span>
                  <span className="text-slate-100">{formatPrice(cart.tax)}</span>
                </div>
                <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold text-base">
                  <span className="text-slate-100">Total</span>
                  <span className="text-accent-500">{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Message */}
            {cart.shipping === 0 && cart.subtotal >= 2000 && (
              <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm text-green-300 font-medium">
                    You qualify for free shipping!
                  </span>
                </div>
              </div>
            )}

            {/* Almost Free Shipping Message */}
            {cart.shipping > 0 && cart.subtotal < 2000 && (
              <div className="bg-primary-600/20 border border-primary-500/30 rounded-lg p-3">
                <div className="flex items-center">
                  <Truck className="w-4 h-4 text-primary-400 mr-2" />
                  <div className="text-sm text-primary-300">
                    <span className="font-medium">
                      Add {formatPrice(2000 - cart.subtotal)} more for free shipping
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security & Trust */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-200">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              <span>Secure SSL encryption</span>
            </div>
            <div className="flex items-center text-sm text-slate-200">
              <Truck className="w-4 h-4 mr-2 text-primary-400" />
              <span>Free returns within 30 days</span>
            </div>
            <div className="flex items-center text-sm text-slate-200">
              <ShoppingBag className="w-4 h-4 mr-2 text-accent-500" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimated Delivery */}
      <Card className="bg-slate-700 border-slate-600 shadow-xl">
        <CardHeader>
          <CardTitle className="text-base text-slate-100">Estimated Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-200">
            <p className="font-medium text-slate-100">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-xs mt-1 text-slate-300">
              Standard shipping (5-7 business days)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};