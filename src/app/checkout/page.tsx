'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { OrderSummary } from '@/components/checkout';
import { ClientCheckoutForm } from '@/components/client/dynamic-components';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, getItemCount } = useCart();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  // Redirect if cart is empty
  if (getItemCount() === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-slate-700 border-slate-600 shadow-xl">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-slate-100 mb-4">Your cart is empty</h1>
              <p className="text-slate-200 mb-6">Add some items to your cart before checking out.</p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 hover:scale-105 transition-all duration-200">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-slate-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-sm text-slate-300 hover:text-accent-400 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-white bg-clip-text text-transparent">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center space-x-4 sm:space-x-8">
              {[
                { id: 'shipping', name: 'Shipping', status: currentStep === 'shipping' ? 'current' : currentStep === 'payment' || currentStep === 'review' ? 'complete' : 'upcoming' },
                { id: 'payment', name: 'Payment', status: currentStep === 'payment' ? 'current' : currentStep === 'review' ? 'complete' : 'upcoming' },
                { id: 'review', name: 'Review', status: currentStep === 'review' ? 'current' : 'upcoming' },
              ].map((step, stepIdx) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                        step.status === 'complete'
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                          : step.status === 'current'
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                          : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {step.status === 'complete' ? (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        stepIdx + 1
                      )}
                    </div>
                    <span className={`ml-2 text-xs sm:text-sm font-medium transition-colors ${
                      step.status === 'current' ? 'text-accent-400' : 'text-slate-300'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {stepIdx < 2 && (
                    <div className={`ml-4 sm:ml-8 h-0.5 w-8 sm:w-16 transition-colors ${
                      step.status === 'complete' ? 'bg-gradient-to-r from-primary-600 to-accent-600' : 'bg-slate-600'
                    }`} />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <ClientCheckoutForm 
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}