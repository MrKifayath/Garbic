'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, X, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Link
              href="/#products"
              className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart Contents
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl p-6 flex gap-6 animate-fadeInUp"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-muted rounded-lg shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="grow">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-accent font-semibold mt-2">₹{item.price.toLocaleString('en-IN')}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-border rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <span className="w-8 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-border rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Total Price and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-destructive" />
                    </button>
                    <p className="text-xl font-bold text-foreground">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="animate-fadeInUp" style={{ animationDelay: '150ms' }}>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Shipping
                      {shipping === 0 && <span className="text-accent ml-2">FREE</span>}
                    </span>
                    <span className="font-semibold text-foreground">
                      {shipping > 0 ? `₹${shipping}` : 'FREE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="font-semibold text-foreground">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-accent">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <Link href="/checkout" className="w-full">
                  <button className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all hover:shadow-lg">
                    Proceed to Checkout
                  </button>
                </Link>

                <Link href="/#products">
                  <button className="w-full mt-3 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-all">
                    Continue Shopping
                  </button>
                </Link>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm text-foreground">
                    ✓ Free shipping on orders above ₹500
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
