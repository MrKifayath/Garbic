'use client';

import React from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16 animate-fade-in-up">
            <ShoppingBag className="h-24 w-24 mx-auto text-slate-400 mb-6 animate-bounce-in animation-delay-200" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent">Your cart is empty</h1>
            <p className="text-slate-200 mb-8 max-w-md mx-auto text-lg animate-fade-in-up animation-delay-400">
              Looks like you haven&apos;t added any items to your cart yet.
              Start shopping to fill it up!
            </p>
            <Link href="/products">
              <Button size="lg" className="px-8 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200 animate-bounce-in animation-delay-600">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent">Shopping Cart</h1>
            <p className="text-slate-200 text-lg">
              {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="flex items-center gap-2 bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white hover:scale-105 transition-all duration-200 animate-slide-in-right animation-delay-200">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 animate-slide-in-left animation-delay-400">
            <Card className="p-6 bg-slate-700 border-slate-600 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-100">Cart Items</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 hover:bg-slate-600 hover:scale-105 transition-all duration-200"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-6">
                {cart.items.map((item, index) => (
                  <div 
                    key={item.product.id} 
                    className="flex gap-4 p-4 border border-slate-600 rounded-lg bg-slate-600 hover:bg-slate-500 transition-all duration-200 animate-slide-in-right hover:shadow-lg"
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-200 hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg line-clamp-2 mb-1 text-slate-100 hover:text-accent-400 transition-colors">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-slate-300 mb-2">
                            {item.product.brand} • {item.product.category}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-accent-400">
                              ₹{item.product.price.toFixed(2)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-slate-400 line-through">
                                ₹{item.product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-slate-600 hover:scale-110 transition-all duration-200"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-200">Quantity:</span>
                          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 hover:scale-110 transition-all duration-200"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-bold text-slate-100 text-lg">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 hover:scale-110 transition-all duration-200"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stockQuantity}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          {item.quantity >= item.product.stockQuantity && (
                            <span className="text-xs text-accent-400">
                              Max quantity reached
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-100">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-slate-300">
                            ₹{item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-in-right animation-delay-600">
            <Card className="p-6 sticky top-4 bg-slate-700 border-slate-600 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-slate-100">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-200 animate-fade-in-up animation-delay-800">
                  <span>Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span>₹{cart.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-200 animate-fade-in-up animation-delay-1000">
                  <span>Tax:</span>
                  <span>₹{cart.tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between animate-fade-in-up animation-delay-1200">
                  <span className="text-slate-200">Shipping:</span>
                  <span>
                    {cart.shipping === 0 ? (
                      <span className="text-green-400 font-medium">Free</span>
                    ) : (
                      <span className="text-slate-200">₹{cart.shipping.toFixed(2)}</span>
                    )}
                  </span>
                </div>

                {cart.subtotal < 2000 && cart.subtotal > 0 && (
                  <div className="text-sm text-slate-200 bg-primary-600/20 border border-primary-500/30 p-3 rounded animate-fade-in-up animation-delay-1400">
                    Add ₹{(2000 - cart.subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="border-t border-slate-600 pt-4 animate-fade-in-up animation-delay-1600">
                  <div className="flex justify-between text-xl font-bold text-slate-100">
                    <span>Total:</span>
                    <span className="text-accent-400">₹{cart.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200 animate-bounce-in animation-delay-1800">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" size="lg" className="w-full bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 hover:text-white hover:scale-105 transition-all duration-200 animate-bounce-in animation-delay-2000">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-xs text-slate-300 space-y-1 animate-fade-in-up animation-delay-2200">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Secure checkout with SSL encryption
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  30-day return policy
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                  Free shipping on orders over ₹2000
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};