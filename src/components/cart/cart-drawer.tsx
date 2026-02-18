'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeItem } = useCart();

  // Handle escape key and body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const drawerContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className={cn(
          'fixed right-0 top-0 h-screen w-full max-w-md bg-slate-800 shadow-2xl transform transition-all duration-300 ease-in-out border-l border-slate-700',
          'sm:max-w-md',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800">
            <h2 id="cart-drawer-title" className="text-lg font-semibold flex items-center gap-2 text-white">
              <ShoppingBag className="h-5 w-5 text-accent-500" />
              Shopping Cart ({cart.items.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-1 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 hover:scale-110"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-800">
            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-300 mb-4">Your cart is empty</p>
                <Button 
                  onClick={onClose} 
                  variant="outline" 
                  className="text-slate-300 border-slate-600 hover:bg-slate-700"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <div 
                    key={item.product.id} 
                    className="flex gap-3 p-3 border border-slate-600 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-200"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform duration-200 hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1 text-white hover:text-accent-400 transition-colors">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-semibold text-accent-500 mb-2">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 text-slate-300 border-slate-600 hover:bg-slate-600 hover:scale-110 transition-all duration-200"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900 bg-white rounded px-1 transition-all duration-200">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 text-slate-300 border-slate-600 hover:bg-slate-600 hover:scale-110 transition-all duration-200"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-slate-600 hover:scale-110 transition-all duration-200"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t p-4 space-y-4 bg-slate-800 border-slate-700">
              <div className="space-y-2 text-sm text-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{cart.shipping === 0 ? 'Free' : `₹${cart.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-slate-700 pt-2 text-white">
                  <span>Total:</span>
                  <span className="text-accent-500">₹{cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link href="/cart" onClick={onClose}>
                  <Button 
                    variant="outline" 
                    className="w-full text-slate-200 border-slate-600 hover:bg-slate-700"
                  >
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={onClose}>
                  <Button className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white font-semibold">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level to avoid any parent container constraints
  return typeof window !== 'undefined' ? createPortal(drawerContent, document.body) : null;
};